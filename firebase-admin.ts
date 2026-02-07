import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (error) {
    console.warn('Firebase admin initialization failed (expected during local dev without creds):', error);
  }
}

export const db = admin.firestore();

export { admin };
