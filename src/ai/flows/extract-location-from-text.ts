
export interface LocationResult {
  locationReferences: string[];
  coordinates?: { lat: number; lng: number };
}

const MOCK_LOCATIONS = [
  'Connaught Place, New Delhi',
  'Hauz Khas Village, New Delhi',
  'Karol Bagh, New Delhi',
  'Chandni Chowk, New Delhi',
  'Lajpat Nagar, New Delhi',
  'Saket, New Delhi'
];

export const extractLocationFromText = async ({ text }: { text: string }): Promise<LocationResult> => {
  console.log(`[Mock] Extracting location from: "${text}"`);

  // Randomly pick a location for variety in the demo
  const randomLocation = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];

  return {
    locationReferences: [randomLocation]
  };
};
