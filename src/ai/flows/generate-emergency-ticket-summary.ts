'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate a concise summary for each Digital Emergency Ticket.
 *
 * - generateEmergencyTicketSummary - A function that generates a summary for an emergency ticket.
 * - GenerateEmergencyTicketSummaryInput - The input type for the generateEmergencyTicketSummary function.
 * - GenerateEmergencyTicketSummaryOutput - The return type for the generateEmergencyTicketSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmergencyTicketSummaryInputSchema = z.object({
  incidentType: z.string().describe('The type of incident (e.g., fire, accident).'),
  severityLevel: z.string().describe('The severity level of the incident (e.g., low, medium, high).'),
  gpsCoordinates: z.string().describe('The GPS coordinates of the incident.'),
  aiConfidenceScore: z.number().describe('The AI confidence score for the incident verification.'),
  supportingPosts: z.array(z.string()).describe('A list of supporting social media posts related to the incident.'),
});
export type GenerateEmergencyTicketSummaryInput = z.infer<typeof GenerateEmergencyTicketSummaryInputSchema>;

const GenerateEmergencyTicketSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the emergency ticket.'),
});
export type GenerateEmergencyTicketSummaryOutput = z.infer<typeof GenerateEmergencyTicketSummaryOutputSchema>;

export async function generateEmergencyTicketSummary(input: GenerateEmergencyTicketSummaryInput): Promise<GenerateEmergencyTicketSummaryOutput> {
  return generateEmergencyTicketSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmergencyTicketSummaryPrompt',
  input: {schema: GenerateEmergencyTicketSummaryInputSchema},
  output: {schema: GenerateEmergencyTicketSummaryOutputSchema},
  prompt: `You are an AI assistant that summarizes emergency tickets for authority users.

  Given the following information about an emergency incident, generate a concise and informative summary.

  Incident Type: {{{incidentType}}}
  Severity Level: {{{severityLevel}}}
  GPS Coordinates: {{{gpsCoordinates}}}
  AI Confidence Score: {{{aiConfidenceScore}}}
  Supporting Posts: {{#each supportingPosts}}{{{this}}}\n{{/each}}

  Summary:`,
});

const generateEmergencyTicketSummaryFlow = ai.defineFlow(
  {
    name: 'generateEmergencyTicketSummaryFlow',
    inputSchema: GenerateEmergencyTicketSummaryInputSchema,
    outputSchema: GenerateEmergencyTicketSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
