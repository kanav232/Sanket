import { Request, Response } from 'express';
import { db, admin } from './firebase-admin';
import { Incident } from '@/lib/types';

export const getIncidents = async (req: Request, res: Response) => {
  try {
    const { status, severity } = req.query;
    let query: admin.firestore.Query = db.collection('incidents');

    if (status) {
      query = query.where('status', '==', (Array.isArray(status) ? status[0] : status) as string);
    }
    if (severity) {
      query = query.where('severity', '==', (Array.isArray(severity) ? severity[0] : severity) as string);
    }

    const snapshot = await query.get();
    const incidents = snapshot.docs.map((doc: { id: any; data: () => any; }) => ({
      id: doc.id,
      ...doc.data(),
    })) as Incident[];

    res.status(200).json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
};

export const getIncident = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const docId = Array.isArray(id) ? id[0] : id;
    const doc = await db.collection('incidents').doc(docId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.status(200).json({ id: doc.id, ...doc.data() } as Incident);
  } catch (error) {
    console.error('Error fetching incident:', error);
    res.status(500).json({ error: 'Failed to fetch incident' });
  }
};

export const updateIncident = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const docId = Array.isArray(id) ? id[0] : id;
    const updates = req.body;
    
    await db.collection('incidents').doc(docId).update(updates);
    
    const updatedDoc = await db.collection('incidents').doc(docId).get();
    res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() } as Incident);
  } catch (error) {
    console.error('Error updating incident:', error);
    res.status(500).json({ error: 'Failed to update incident' });
  }
};

export const deleteIncident = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const docId = Array.isArray(id) ? id[0] : id;
    await db.collection('incidents').doc(docId).delete();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting incident:', error);
    res.status(500).json({ error: 'Failed to delete incident' });
  }
};