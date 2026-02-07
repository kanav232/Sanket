'use server';
/**
 * @fileOverview Extracts landmarks and location references from text using an LLM.
 *
 * - extractLocationFromText - A function that extracts location information from text.
 * - ExtractLocationFromTextInput - The input type for the extractLocationFromText function.
 * - ExtractLocationFromTextOutput - The return type for the extractLocationFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractLocationFromTextInputSchema = z.object({
  text: z.string().describe('The text from which to extract location information.'),
});
export type ExtractLocationFromTextInput = z.infer<
  typeof ExtractLocationFromTextInputSchema
>;

const ExtractLocationFromTextOutputSchema = z.object({
  locationReferences: z
    .array(z.string())
    .describe('An array of location references extracted from the text.'),
});
export type ExtractLocationFromTextOutput = z.infer<
  typeof ExtractLocationFromTextOutputSchema
>;

export async function extractLocationFromText(
  input: ExtractLocationFromTextInput
): Promise<ExtractLocationFromTextOutput> {
  return extractLocationFromTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractLocationFromTextPrompt',
  input: {schema: ExtractLocationFromTextInputSchema},
  output: {schema: ExtractLocationFromTextOutputSchema},
  prompt: `You are an expert at extracting location references from text.

  Given the following text, extract any landmarks or location references.
  Return a JSON array of strings.

  Text: {{{text}}}`,
});

const extractLocationFromTextFlow = ai.defineFlow(
  {
    name: 'extractLocationFromTextFlow',
    inputSchema: ExtractLocationFromTextInputSchema,
    outputSchema: ExtractLocationFromTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
