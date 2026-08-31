
import { db } from '../../firebase-admin';
import { Incident } from '@/lib/types';
import DashboardClient from '../components/DashboardClient';

async function getIncidents(): Promise<Incident[]> {
  try {
    const snapshot = await db.collection('incidents').orderBy('timestamp', 'desc').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Incident[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Always log the real error so we can debug
    console.error('[page.tsx] ❌ Firebase fetch FAILED. Falling back to mock data.');
    console.error('[page.tsx] Error:', errorMessage);
    console.error('[page.tsx] GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.error('[page.tsx] FIREBASE_SERVICE_ACCOUNT set:', !!process.env.FIREBASE_SERVICE_ACCOUNT);

    // Check for missing project ID or missing credential file (ENOENT)
    if (errorMessage.includes('Unable to detect a Project Id') ||
      errorMessage.includes('does not exist') ||
      errorMessage.includes('Cloud Firestore API has not been used') ||
      errorMessage.includes('DECODER routines::unsupported') ||
      (error as any)?.code === 'ENOENT' ||
      (error as any)?.code === 7 ||
      (error as any)?.code === 2) {
      console.warn('⚠️ Running in local mode: Firebase credentials not found or API disabled. Using mock data.');
    } else {
      console.error('Unhandled Firebase error:', error);
    }
    // Return mock data so the UI still works locally without credentials
    return [

      {
        id: 'mock-1',
        type: 'Fire',
        severity: 'severe',
        location: 'Connaught Place, New Delhi',
        coordinates: { lat: 28.6315, lng: 77.2167 },
        timestamp: new Date().toISOString(),
        confidence: 95,
        status: 'new',
        summary: 'Reported fire at a commercial complex near inner circle.',
        posts: [],
        validationMetrics: { postCount: 5, verifiedPostCount: 2, relevantMediaCount: 3 }
      },
      {
        id: 'mock-2',
        type: 'Accident',
        severity: 'moderate',
        location: 'Ring Road, Near Nehru Place',
        coordinates: { lat: 28.5498, lng: 77.2537 },
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        confidence: 88,
        status: 'in-progress',
        summary: 'Traffic collision involving two vehicles causing congestion.',
        posts: [],
        validationMetrics: { postCount: 3, verifiedPostCount: 1, relevantMediaCount: 0 }
      },
      {
        id: 'mock-3',
        type: 'Public Unrest',
        severity: 'minor',
        location: 'Karol Bagh Market',
        coordinates: { lat: 28.6520, lng: 77.1910 },
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        confidence: 75,
        status: 'resolved',
        summary: 'Small crowd gathering reported, situation normalized.',
        posts: [],
        validationMetrics: { postCount: 12, verifiedPostCount: 0, relevantMediaCount: 1 }
      }

    ];
  }
}


export default async function DashboardPage() {
  const incidents = await getIncidents();
  return <DashboardClient incidents={incidents} />;
}


