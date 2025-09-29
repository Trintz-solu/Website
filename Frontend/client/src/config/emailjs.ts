import { ENV_CONFIG } from './environment';

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  serviceId: ENV_CONFIG.EMAILJS_SERVICE_ID,
  templateId: ENV_CONFIG.EMAILJS_TEMPLATE_ID,
  publicKey: ENV_CONFIG.EMAILJS_PUBLIC_KEY,
} as const;

// EmailJS template parameters
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  time?: string;
}
