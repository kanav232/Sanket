'use client';

import dynamic from 'next/dynamic';
import { Incident } from '@/lib/types';

// Dynamically import the map to avoid "window is not defined" errors with Leaflet
const IncidentMap = dynamic(() => import('./IncidentMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
      Loading Map...
    </div>
  ),
});

interface MapWrapperProps {
  incidents: Incident[];
  selectedIncident?: Incident | null;
}

export default function MapWrapper({ incidents, selectedIncident }: MapWrapperProps) {
  return <IncidentMap incidents={incidents} selectedIncident={selectedIncident} />;
}
