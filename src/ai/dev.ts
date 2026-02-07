import { config } from 'dotenv';
config();

import '@/ai/flows/classify-emergency-intent.ts';
import '@/ai/flows/generate-emergency-ticket-summary.ts';
import '@/ai/flows/extract-location-from-text.ts';
import '@/ai/flows/validate-visual-evidence.ts';