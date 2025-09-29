import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, ContactFormData } from '@/config/emailjs';

// Initialize EmailJS
if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
  // Fail fast in development if config is missing
  if (import.meta.env.DEV) {
    console.error('EmailJS configuration is missing. Please set VITE_EMAILJS_* env variables.');
  }
} else {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

export class EmailJSService {
  /**
   * Send contact form email
   */
  static async sendContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📧 Sending contact form via EmailJS:', data);

      const templateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        time: new Date().toLocaleString(),
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('✅ Contact form sent successfully:', response);
      return { success: true, message: 'Message sent successfully! We\'ll get back to you soon.' };
    } catch (error) {
      console.error('❌ Contact form error:', error);
      return { 
        success: false, 
        message: 'Failed to send message. Please try again or contact us directly.' 
      };
    }
  }


  /**
   * Send contact form only (no auto-reply to prevent duplicates)
   */
  static async sendContactFormOnly(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🚀 Starting contact form process...');
      console.log('📧 Contact form data:', data);
      
      // Send contact form only
      console.log('📤 Sending contact form...');
      const contactResult = await this.sendContactForm(data);
      
      if (!contactResult.success) {
        console.log('❌ Contact form failed');
        return contactResult;
      }
      
      console.log('✅ Contact form sent successfully');
      console.log('🎉 Process completed successfully');

      return { 
        success: true, 
        message: 'Message sent successfully! We\'ll get back to you soon.' 
      };
    } catch (error) {
      console.error('❌ Contact form error:', error);
      return { 
        success: false, 
        message: 'Failed to send message. Please try again or contact us directly.' 
      };
    }
  }
}
