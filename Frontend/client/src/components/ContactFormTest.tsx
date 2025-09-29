import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { EmailJSService } from '@/services/emailjsService';
import { ContactFormData } from '@/config/emailjs';

export default function ContactFormTest() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Contact Form Message',
    message: 'This is a test message to verify that contact form messages are being sent to gangeswarajj25@gmail.com',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('🧪 Testing contact form submission...');
      console.log('📧 Form data:', formData);
      
      const result = await EmailJSService.sendContactFormOnly(formData as ContactFormData);
      
      if (result.success) {
        toast({
          title: "✅ Test Successful!",
          description: "Contact form sent to gangeswarajj25@gmail.com. Check your email!",
          variant: "default",
        });
        console.log('✅ Contact form test successful!');
      } else {
        toast({
          title: "❌ Test Failed",
          description: result.message,
          variant: "destructive",
        });
        console.error('❌ Contact form test failed:', result.message);
      }
    } catch (error) {
      console.error('❌ Test error:', error);
      toast({
        title: "❌ Test Error",
        description: "Failed to send test message. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🧪 Contact Form Test
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        This will send a test message to <strong>gangeswarajj25@gmail.com</strong>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            type="email"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <Input
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Message subject"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <Textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your message"
            rows={4}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Sending Test Message...' : 'Send Test Message to gangeswarajj25@gmail.com'}
        </Button>
      </form>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">📧 EmailJS Configuration:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li><strong>Service ID:</strong> service_n25wl0p</li>
          <li><strong>Template ID:</strong> template_xeahw8u</li>
          <li><strong>Recipient Email:</strong> gangeswarajj25@gmail.com</li>
          <li><strong>Public Key:</strong> Qy7kySp-clZirkuIt</li>
        </ul>
      </div>
    </div>
  );
}
