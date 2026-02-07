
export interface ClassificationResult {
  isEmergency: boolean;
  severity: 'critical' | 'severe' | 'moderate' | 'minor' | 'low';
  reason: string;
}

export const classifyEmergencyIntent = async ({ text }: { text: string }): Promise<ClassificationResult> => {
  console.log(`[Mock] Classifying intent for: "${text}"`);

  // Simple keyword detection for demo purposes
  const lower = text.toLowerCase();
  const isEmergency = lower.includes('fire') || lower.includes('accident') || lower.includes('help') || lower.includes('crash') || lower.includes('emergency') || lower.includes('stuck');

  return {
    isEmergency,
    severity: isEmergency ? 'moderate' : 'low',
    reason: isEmergency ? 'Detected keywords indicating potential emergency' : 'No emergency keywords detected'
  };
};
