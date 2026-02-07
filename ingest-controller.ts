
// ingest-controller.ts (Aggregated)
import type { Request, Response } from 'express';
import { db } from './firebase-admin';
import * as admin from 'firebase-admin';
import { classifyEmergencyIntent } from '@/ai/flows/classify-emergency-intent';
import { validateVisualEvidence } from '@/ai/flows/validate-visual-evidence';
import { extractLocationFromText } from '@/ai/flows/extract-location-from-text';
import { generateEmergencyTicketSummary } from '@/ai/flows/generate-emergency-ticket-summary';
import { Incident, ValidationMetrics } from '@/lib/types';
import { calculateConfidence } from '@/lib/calculate-confidence';

export const ingestData = async (req: Request, res: Response) => {
  const { text, photoDataUri, authorType = 'unverified' } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text content is required' });
  }

  try {
    // 1. Classify Intent
    const classification = await classifyEmergencyIntent({ text });

    if (!classification.isEmergency) {
      return res.status(200).json({
        message: 'Processed, but not classified as an emergency.',
        classification
      });
    }

    // Determine incident type (simple keyword matching as fallback)
    let type: Incident['type'] = 'Public Unrest';
    const lowerText = text.toLowerCase();
    if (lowerText.includes('fire')) type = 'Fire';
    else if (lowerText.includes('accident') || lowerText.includes('crash') || lowerText.includes('collision')) type = 'Accident';
    else if (lowerText.includes('traffic') || lowerText.includes('congestion')) type = 'Congestion';

    // 2. Validate Evidence & Location
    const [evidence, locationResult] = await Promise.all([
      photoDataUri
        ? validateVisualEvidence({ photoDataUri, description: text })
        : Promise.resolve(null),
      extractLocationFromText({ text })
    ]);

    const locationName = locationResult.locationReferences.length > 0
      ? locationResult.locationReferences[0]
      : 'Unknown Location';

    // 3. Check for Existing Incident (Aggregation)
    // For MVP: Simple check - same Type and close enough location name (exact match for now)
    // In real app: Geospatial query within 5km radius
    const existingIncidentsSnapshot = await db.collection('incidents')
      .where('type', '==', type)
      .where('status', 'in', ['new', 'in-progress', 'acknowledged'])
      .get();

    let existingIncidentDoc = null;
    let incidentData = null;

    // ultra-simple fuzzy match simulation
    existingIncidentsSnapshot.forEach(doc => {
      const data = doc.data() as Incident;
      if (data.location === locationName) { // Exact string match for MVP simulation
        existingIncidentDoc = doc;
        incidentData = data;
      }
    });

    if (existingIncidentDoc && incidentData) {
      // --- UPDATE EXISTING ---
      // Explicit cast to avoid 'never' issue if TS inference fails
      const docRef = (existingIncidentDoc as admin.firestore.QueryDocumentSnapshot).ref;
      const currentData = incidentData as Incident;

      console.log(`[Ingest] Found existing incident ${(existingIncidentDoc as any).id}. Aggregating.`);

      const metrics: ValidationMetrics = {
        postCount: (currentData.validationMetrics?.postCount || 0) + 1,
        verifiedPostCount: (currentData.validationMetrics?.verifiedPostCount || 0) + (authorType === 'verified' ? 1 : 0),
        relevantMediaCount: (currentData.validationMetrics?.relevantMediaCount || 0) + (evidence && evidence.confidenceScore > 0.7 ? 1 : 0)
      };

      const newConfidence = calculateConfidence({
        baseSeverity: currentData.severity,
        metrics
      });

      const updates = {
        posts: admin.firestore.FieldValue.arrayUnion(text),
        validationMetrics: metrics,
        confidence: Math.round(newConfidence * 100), // Store as percentage 0-100
        timestamp: new Date().toISOString() // Bump timestamp to show recent activity
      };

      await docRef.update(updates);

      return res.status(200).json({
        message: 'Incident aggregated',
        id: (existingIncidentDoc as any).id,
        updatedConfidence: updates.confidence
      });

    } else {
      // --- CREATE NEW ---
      console.log(`[Ingest] Creating new incident.`);
      const newIncidentRef = db.collection('incidents').doc();

      const metrics: ValidationMetrics = {
        postCount: 1,
        verifiedPostCount: authorType === 'verified' ? 1 : 0,
        relevantMediaCount: evidence && evidence.confidenceScore > 0.7 ? 1 : 0
      };

      const confidenceScore = calculateConfidence({
        baseSeverity: classification.severity as Incident['severity'],
        metrics
      });

      // Generate initial summary
      const summaryResult = await generateEmergencyTicketSummary({
        incidentType: type,
        severityLevel: classification.severity,
        gpsCoordinates: `${28.6139}, ${77.2090}`,
        aiConfidenceScore: confidenceScore,
        supportingPosts: [text]
      });

      const newIncident: Incident = {
        id: newIncidentRef.id,
        type,
        severity: classification.severity as Incident['severity'],
        location: locationName,
        coordinates: { lat: 28.6139, lng: 77.2090 }, // Default/Mock coord
        timestamp: new Date().toISOString(),
        confidence: Math.round(confidenceScore * 100),
        posts: [text],
        status: 'new',
        summary: summaryResult.summary,
        validationMetrics: metrics
      };

      await newIncidentRef.set(newIncident);

      return res.status(201).json({
        message: 'Incident created',
        ...newIncident
      });
    }

  } catch (error) {
    console.error('Ingestion error:', error);
    res.status(500).json({ error: 'Failed to ingest data' });
  }
};
