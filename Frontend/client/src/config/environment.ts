// Environment Configuration
export const ENV_CONFIG = {
  // API Configuration
  // Prefer relative base in dev to work with integrated Vite middleware
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  
  // EmailJS Configuration
  // Do not provide defaults for secrets; require env to be set
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'TRINTZ',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
  
  // Contact Information
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'hello@trintz.com',
  CONTACT_PHONE: import.meta.env.VITE_CONTACT_PHONE || '+91 63830 93272',
  COMPANY_LOCATION: import.meta.env.VITE_COMPANY_LOCATION || 'San Francisco, CA',
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  PROJECTS: '/api/projects',
  SERVICES: '/api/services',
  TEAM: '/api/team',
  CONTACT: '/api/contact',
  HEALTH: '/api/health',
} as const;

// Default API timeout
export const DEFAULT_API_TIMEOUT = 10000;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  API_ERROR: 'An error occurred while fetching data. Please try again later.',
  CONTACT_ERROR: 'Failed to send message. Please try again or contact us directly.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;
