'use server';

/**
 * @fileOverview Detects anomalous activity based on location data and triggers alerts.
 *
 * - detectAnomalousActivity - A function that detects unusual activity based on location data.
 * - DetectAnomalousActivityInput - The input type for the detectAnomalousActivity function.
 * - DetectAnomalousActivityOutput - The return type for the detectAnomalousActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomalousActivityInputSchema = z.object({
  locationHistory: z
    .array(z.object({
      latitude: z.number().describe('Latitude of the location'),
      longitude: z.number().describe('Longitude of the location'),
      timestamp: z.number().describe('Timestamp of the location data (Unix epoch)'),
    }))
    .describe('History of location data for the tourist.'),
  expectedRoute: z
    .array(z.object({
      latitude: z.number().describe('Latitude of the expected location'),
      longitude: z.number().describe('Longitude of the expected location'),
    }))
    .optional()
    .describe('The expected route of the tourist, if available.'),
  activityThreshold: z.number().default(0.2).describe('Threshold for detecting anomalous activity. Lower values are more sensitive.'),
  timeThresholdSeconds: z.number().default(600).describe('Time window in seconds to consider for anomaly detection.'),
});
export type DetectAnomalousActivityInput = z.infer<typeof DetectAnomalousActivityInputSchema>;

const DetectAnomalousActivityOutputSchema = z.object({
  isAnomalous: z.boolean().describe('Whether anomalous activity is detected.'),
  anomalyDescription: z.string().optional().describe('Description of the anomaly, if any.'),
});
export type DetectAnomalousActivityOutput = z.infer<typeof DetectAnomalousActivityOutputSchema>;

export async function detectAnomalousActivity(input: DetectAnomalousActivityInput): Promise<DetectAnomalousActivityOutput> {
  return detectAnomalousActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnomalousActivityPrompt',
  input: {schema: DetectAnomalousActivityInputSchema},
  output: {schema: DetectAnomalousActivityOutputSchema},
  prompt: `You are an AI assistant specializing in detecting anomalous activity for tourists based on their location data.

  You will receive a history of location data, and an expected route if available.  Your task is to determine if the tourist's current activity is anomalous based on deviations from the expected route or sudden stops.

  Location History:
  {{#each locationHistory}}
  - Latitude: {{this.latitude}}, Longitude: {{this.longitude}}, Timestamp: {{this.timestamp}}
  {{/each}}

  {{#if expectedRoute}}
  Expected Route:
  {{#each expectedRoute}}
  - Latitude: {{this.latitude}}, Longitude: {{this.longitude}}
  {{/each}}
  {{else}}
  No expected route provided.
  {{/if}}

  Activity Threshold: {{activityThreshold}}
  Time Threshold (seconds): {{timeThresholdSeconds}}

  Consider factors such as:
  - Sudden stops or prolonged periods of no movement.
  - Deviations from the expected route, if provided.
  - Uncharacteristic changes in speed or direction.

  Based on the provided data, determine if the tourist's activity is anomalous. If it is, provide a description of the anomaly. If not, isAnomalous is false.
  Make sure the anomaly description is no more than 20 words.
  Given the time threshold and activity threshold, be conservative when determining if the user's activity is anomalous.
  Do not consider the user's activity to be anomalous if there is not enough data.
`,
});

const detectAnomalousActivityFlow = ai.defineFlow(
  {
    name: 'detectAnomalousActivityFlow',
    inputSchema: DetectAnomalousActivityInputSchema,
    outputSchema: DetectAnomalousActivityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


