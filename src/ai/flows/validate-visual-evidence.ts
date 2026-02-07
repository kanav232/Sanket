'use server';

/**
 * @fileOverview An AI agent for validating visual evidence in social media posts.
 *
 * - validateVisualEvidence - A function that handles the validation of visual evidence.
 * - ValidateVisualEvidenceInput - The input type for the validateVisualEvidence function.
 * - ValidateVisualEvidenceOutput - The return type for the validateVisualEvidence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateVisualEvidenceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo related to a social media post, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('The description of the social media post.'),
});
export type ValidateVisualEvidenceInput = z.infer<typeof ValidateVisualEvidenceInputSchema>;

const ValidateVisualEvidenceOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the visual evidence is valid or not.'),
  confidenceScore: z.number().describe('The confidence score of the validation.'),
  details: z.string().describe('Additional details about the validation.'),
});
export type ValidateVisualEvidenceOutput = z.infer<typeof ValidateVisualEvidenceOutputSchema>;

export async function validateVisualEvidence(input: ValidateVisualEvidenceInput): Promise<ValidateVisualEvidenceOutput> {
  return validateVisualEvidenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateVisualEvidencePrompt',
  input: {schema: ValidateVisualEvidenceInputSchema},
  output: {schema: ValidateVisualEvidenceOutputSchema},
  prompt: `You are an expert in validating visual evidence from social media posts to confirm emergency situations.

You will be provided with a photo and a description of the social media post. Your task is to determine if the visual evidence (the photo) supports the claim made in the description.

Based on the photo and description, determine if the visual evidence is valid and provide a confidence score.

Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Consider the following:
- Does the photo align with the description?
- Is there any evidence of manipulation or misrepresentation in the photo?
- How confident are you in your assessment?
`,
});

const validateVisualEvidenceFlow = ai.defineFlow(
  {
    name: 'validateVisualEvidenceFlow',
    inputSchema: ValidateVisualEvidenceInputSchema,
    outputSchema: ValidateVisualEvidenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
