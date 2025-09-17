'use server';

/**
 * @fileOverview A flow to generate a dummy FIR (First Information Report) in case a tourist goes missing.
 *
 * - generateDummyFIR - A function that generates a dummy FIR report.
 * - GenerateDummyFIRInput - The input type for the generateDummyFIR function.
 * - GenerateDummyFIROutput - The return type for the generateDummyFIR function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDummyFIRInputSchema = z.object({
  touristName: z.string().describe('The name of the missing tourist.'),
  passportNumber: z.string().describe('The passport number of the missing tourist.'),
  aadhaarNumber: z.string().optional().describe('The Aadhaar number of the missing tourist, if available.'),
  drivingLicense: z.string().optional().describe('The driving license number of the missing tourist, if available.'),
  itinerary: z.string().describe('The last known itinerary of the missing tourist.'),
  emergencyContactName: z.string().describe('Name of the emergency contact.'),
  emergencyContactNumber: z.string().describe('Number of the emergency contact.'),
  lastKnownLocation: z.string().describe('The last known location of the missing tourist.'),
  timeLastSeen: z.string().describe('The time the tourist was last seen (ISO format).'),
  dateOfReport: z.string().describe('The date the report is being filed (ISO format).'),
});
export type GenerateDummyFIRInput = z.infer<typeof GenerateDummyFIRInputSchema>;

const GenerateDummyFIROutputSchema = z.object({
  firReport: z.string().describe('The generated dummy FIR report.'),
});
export type GenerateDummyFIROutput = z.infer<typeof GenerateDummyFIROutputSchema>;

export async function generateDummyFIR(input: GenerateDummyFIRInput): Promise<GenerateDummyFIROutput> {
  return generateDummyFIRFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDummyFIRPrompt',
  input: {schema: GenerateDummyFIRInputSchema},
  output: {schema: GenerateDummyFIROutputSchema},
  prompt: `You are an AI assistant specialized in generating preliminary First Information Reports (FIR) for missing tourists.

  Given the following information about a missing tourist, generate a detailed and comprehensive dummy FIR report. The report should include all the provided details and be formatted in a way that is easily understandable by law enforcement agencies.  The FIR should include details like name, passport number, Aadhaar number, driving license, last known location, time last seen, emergency contact details, and itinerary. Make it sound realistic and save time for the police to create an official one.

  Tourist Name: {{{touristName}}}
  Passport Number: {{{passportNumber}}}
  {{#if aadhaarNumber}}
  Aadhaar Number: {{{aadhaarNumber}}}
  {{/if}}
  {{#if drivingLicense}}
  Driving License: {{{drivingLicense}}}
  {{/if}}
  Itinerary: {{{itinerary}}}
  Emergency Contact Name: {{{emergencyContactName}}}
  Emergency Contact Number: {{{emergencyContactNumber}}}
  Last Known Location: {{{lastKnownLocation}}}
  Time Last Seen: {{{timeLastSeen}}}
  Date of Report: {{{dateOfReport}}}

  Ensure the report is well-structured, includes a clear description of the circumstances, and provides all necessary information for initiating a search and rescue operation.
  `,
});

const generateDummyFIRFlow = ai.defineFlow(
  {
    name: 'generateDummyFIRFlow',
    inputSchema: GenerateDummyFIRInputSchema,
    outputSchema: GenerateDummyFIROutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
