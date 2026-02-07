"use client";

import type { Incident } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import {
  Flame,
  Car,
  Users,
  TrafficCone,
  Search,
  AlertTriangle,
} from 'lucide-react';

const severityConfig = {
  critical: { color: 'bg-red-500', name: 'Critical' },
  severe: { color: 'bg-orange-500', name: 'Severe' },
  moderate: { color: 'bg-yellow-500', name: 'Moderate' },
  minor: { color: 'bg-blue-500', name: 'Minor' },
};

const incidentTypeConfig: {
  [key in Incident['type']]: { icon: React.ElementType };
} = {
  Fire: { icon: Flame },
  Accident: { icon: Car },
  Congestion: { icon: TrafficCone },
  'Public Unrest': { icon: Users },
};

export default function IncidentList({
  incidents,
  selectedIncident,
  onSelectIncident,
}: {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onSelectIncident: (incident: Incident) => void;
}) {
  return (
    <aside className="hidden md:flex flex-col w-80 lg:w-96 border-r bg-card">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search incidents..." className="pl-9" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {incidents.map((incident) => {
            const Icon =
              incidentTypeConfig[incident.type]?.icon || AlertTriangle;
            return (
              <button
                key={incident.id}
                onClick={() => onSelectIncident(incident)}
                className={cn(
                  'w-full text-left p-3 rounded-lg transition-colors',
                  selectedIncident?.id === incident.id
                    ? 'bg-primary/10'
                    : 'hover:bg-primary/5'
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-1 h-2.5 w-2.5 rounded-full shrink-0',
                      severityConfig[incident.severity].color
                    )}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">
                          {incident.type}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(incident.timestamp), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground truncate mt-1">
                      {incident.location}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {incident.summary}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
