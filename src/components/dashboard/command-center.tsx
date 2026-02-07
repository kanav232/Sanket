"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import type { Incident } from '@/lib/types';
import { mockIncidents } from '@/lib/mock-data';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardHeader from './header';
import IncidentList from './incident-list';
import IncidentMap from './incident-map';
import IncidentDetails from './incident-details';

export default function CommandCenter() {
  const { user } = useAuth();
  const router = useRouter();
  const [incidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (incidents.length > 0 && !selectedIncident) {
      setSelectedIncident(incidents[0]);
    }
  }, [incidents, selectedIncident]);


  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
  };
  
  const handleUpdateIncident = (updatedIncident: Incident) => {
    // In a real app, this would be an API call
    // For now, we just update the local state
    const index = incidents.findIndex(i => i.id === updatedIncident.id);
    if(index !== -1) {
        const newIncidents = [...incidents];
        newIncidents[index] = updatedIncident;
        // This is a bit of a hack to re-render, a proper state management would be better
        // For this demo, it's fine.
        setSelectedIncident(updatedIncident);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col bg-background">
        <DashboardHeader />
        <div className="flex flex-1 overflow-hidden">
          <IncidentList
            incidents={incidents}
            selectedIncident={selectedIncident}
            onSelectIncident={handleSelectIncident}
          />
          <main className="flex-1 overflow-y-auto">
            <IncidentMap
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={handleSelectIncident}
            />
          </main>
          <IncidentDetails
            incident={selectedIncident}
            onClose={() => setSelectedIncident(null)}
            onUpdateIncident={handleUpdateIncident}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
