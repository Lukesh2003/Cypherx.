import { config } from 'dotenv';
config();

import '@/ai/flows/detect-anomalous-activity.ts';
import '@/ai/flows/translate-alerts-and-ui.ts';
import '@/ai/flows/generate-dummy-fir.ts';