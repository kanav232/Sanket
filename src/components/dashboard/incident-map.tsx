"use client";

import Image from 'next/image';
import type { Incident } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const severityConfig = {
  critical: { color: 'bg-red-500', shadow: 'shadow-red-500/50' },
  severe: { color: 'bg-orange-500', shadow: 'shadow-orange-500/50' },
  moderate: { color: 'bg-yellow-500', shadow: 'shadow-yellow-500/50' },
  minor: { color: 'bg-blue-500', shadow: 'shadow-blue-500/50' },
};

export default function IncidentMap({
  incidents,
  selectedIncident,
  onSelectIncident
}: {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onSelectIncident: (incident: Incident) => void;
}) {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-background');

  // These are just for positioning on a placeholder.
  // A real implementation would convert lat/lng to screen coordinates.
  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = Math.min(40, 30 + index * 2);
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { top: `${y}%`, left: `${x}%` };
  };

  return (
    <div className="relative h-full w-full">
      {mapImage && (
        <Image
          src={mapImage.imageUrl}
          alt={mapImage.description}
          fill
          className="object-cover"
          data-ai-hint={mapImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/20" />
      <TooltipProvider>
        {incidents.map((incident, index) => {
          const position = getPosition(index, incidents.length);
          const severity = severityConfig[incident.severity];
          const isSelected = selectedIncident?.id === incident.id;

          return (
            <Tooltip key={incident.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onSelectIncident(incident)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: position.top, left: position.left }}
                >
                  <div
                    className={cn(
                      'relative h-4 w-4 rounded-full border-2 border-white/80 transition-all duration-300',
                      severity.color,
                      isSelected ? 'scale-150 ring-4 ring-white' : 'hover:scale-125'
                    )}
                  >
                    {incident.severity === 'critical' && (
                      <div className={cn("absolute inset-0 rounded-full animate-ping", severity.color)} />
                    )}
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{incident.type} at {incident.location}</p>
                <p className="text-sm text-muted-foreground capitalize">Severity: {incident.severity}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
