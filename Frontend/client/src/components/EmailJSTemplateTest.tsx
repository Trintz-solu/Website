import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { EmailJSService } from '@/services/emailjsService';
import { EMAILJS_CONFIG } from '@/config/emailjs';

export default function EmailJSTemplateTest() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const testContactForm = async () => {
    setIsLoading(true);
    try {
      const result = await EmailJSService.sendContactForm({
        name: 'Template Test User',
        email: 'test@example.com',
        subject: 'Testing Contact Form Template',
        message: 'This is a test to verify the contact form template (template_xeahw8u) is working correctly.',
        time: new Date().toLocaleString(),
      });
      
      toast({
        title: result.success ? "✅ Contact Form Test Success!" : "❌ Contact Form Test Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "❌ Test Error",
        description: "Contact form test failed. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const testContactFormOnly = async () => {
    setIsLoading(true);
    try {
      const result = await EmailJSService.sendContactFormOnly({
        name: 'Template Test User',
        email: 'test@example.com',
        subject: 'Testing Contact Form Only',
        message: 'This is a test to verify the contact form is working correctly without duplicates.',
        time: new Date().toLocaleString(),
      });
      
      toast({
        title: result.success ? "✅ Contact Form Test Success!" : "❌ Contact Form Test Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "❌ Test Error",
        description: "Contact form test failed. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">EmailJS Contact Form Test</h2>
        <p className="text-muted-foreground mb-6">
          Test the contact form template to ensure it works correctly
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Current Configuration:</h3>
        <ul className="text-sm space-y-1">
          <li><strong>Service ID:</strong> {EMAILJS_CONFIG.serviceId}</li>
          <li><strong>Contact Form Template:</strong> {EMAILJS_CONFIG.templateId}</li>
          <li><strong>Public Key:</strong> {EMAILJS_CONFIG.publicKey}</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1  gap-4">
          <Button 
            onClick={testContactForm} 
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            Test Contact Form (Direct)
          </Button>
          
          <Button 
            onClick={testContactFormOnly} 
            disabled={isLoading}
            className="w-full"
            variant="default"
          >
            Test Contact Form (Simplified)
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Expected Results:</h3>
        <ul className="text-sm space-y-1">
          <li><strong>Contact Form (Direct):</strong> You should receive 1 message</li>
          <li><strong>Contact Form (Simplified):</strong> You should receive 1 message</li>
          <li><strong>No Auto-Reply:</strong> No duplicate messages sent to clients</li>
        </ul>
      </div>
    </div>
  );
}
