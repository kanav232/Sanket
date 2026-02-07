export type Incident = {
  id: string;
  type: 'Fire' | 'Accident' | 'Congestion' | 'Public Unrest';
  severity: 'critical' | 'severe' | 'moderate' | 'minor';
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  confidence: number;
  posts: string[];
  status: 'new' | 'acknowledged' | 'in-progress' | 'resolved' | 'false-positive';
  summary: string;
};

export type User = {
  name: string;
  email: string;
  role: 'admin' | 'authority' | 'viewer';
  avatar: string;
};
