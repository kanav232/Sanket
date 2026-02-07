'use server';

/**
 * @fileOverview An AI agent for classifying the intent of social media posts to identify emergency situations.
 *
 * - classifyEmergencyIntent - A function that classifies the intent of a social media post.
 * - ClassifyEmergencyIntentInput - The input type for the classifyEmergencyIntent function.
 * - ClassifyEmergencyIntentOutput - The return type for the classifyEmergencyIntent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyEmergencyIntentInputSchema = z.object({
  text: z.string().describe('The text content of the social media post.'),
});
export type ClassifyEmergencyIntentInput = z.infer<typeof ClassifyEmergencyIntentInputSchema>;

const ClassifyEmergencyIntentOutputSchema = z.object({
  isEmergency: z.boolean().describe('Whether the social media post indicates an emergency situation.'),
  severity: z
    .enum(['negligible', 'minor', 'moderate', 'severe', 'critical'])
    .describe('The severity level of the emergency situation.'),
  reason: z.string().describe('The reasoning behind the classification.'),
});
export type ClassifyEmergencyIntentOutput = z.infer<typeof ClassifyEmergencyIntentOutputSchema>;

export async function classifyEmergencyIntent(
  input: ClassifyEmergencyIntentInput
): Promise<ClassifyEmergencyIntentOutput> {
  return classifyEmergencyIntentFlow(input);
}

const classifyEmergencyIntentPrompt = ai.definePrompt({
  name: 'classifyEmergencyIntentPrompt',
  input: {schema: ClassifyEmergencyIntentInputSchema},
  output: {schema: ClassifyEmergencyIntentOutputSchema},
  prompt: `You are an AI assistant designed to classify social media posts and identify emergency situations.

  Analyze the provided text content to determine if it indicates a real-world emergency.
  Consider factors such as mentions of accidents, injuries, property damage, or threats to public safety.

  Based on your analysis, set the 'isEmergency' field to true if an emergency is detected; otherwise, set it to false.

  If an emergency is detected, determine the severity level based on the following scale:
  - negligible: No immediate danger or risk.
  - minor: Limited impact, easily manageable.
  - moderate: Significant disruption, requires attention.
  - severe: Widespread impact, requires immediate response.
  - critical: Life-threatening situation, requires urgent action.

  Provide a brief explanation for your classification in the 'reason' field.

  Text: {{{text}}}
  Output format: {isEmergency: boolean, severity: string, reason: string}
`,
});

const classifyEmergencyIntentFlow = ai.defineFlow(
  {
    name: 'classifyEmergencyIntentFlow',
    inputSchema: ClassifyEmergencyIntentInputSchema,
    outputSchema: ClassifyEmergencyIntentOutputSchema,
  },
  async input => {
    const {output} = await classifyEmergencyIntentPrompt(input);
    return output!;
  }
);
