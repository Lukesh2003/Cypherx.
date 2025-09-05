'use server';

/**
 * @fileOverview A translation AI agent that translates alerts and UI text.
 *
 * - translateText - A function that translates text to a specified language.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateTextInputSchema = z.object({
  texts: z.array(z.string()).describe('The text content to translate.'),
  language: z.string().describe('The target language for translation (e.g., es for Spanish).'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedTexts: z.array(z.string()).describe('The translated text.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateTexts(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const translateTextPrompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: {schema: TranslateTextInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `Translate the following text content to {{language}}. Maintain the original JSON array structure in your response.

{{#each texts}}
- {{{this}}}
{{/each}}
`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async input => {
    const {output} = await translateTextPrompt(input);
    return output!;
  }
);
