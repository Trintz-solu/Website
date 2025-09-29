import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { EmailJSService } from '@/services/emailjsService';
import { ContactFormData } from '@/config/emailjs';

export default function EmailJSTest() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [testData, setTestData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Message',
    message: 'This is a test message from the EmailJS integration.',
  });

  const handleTestContact = async () => {
    setIsLoading(true);
    try {
      const result = await EmailJSService.sendContactForm(testData as ContactFormData);
      
      toast({
        title: result.success ? "Success!" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Test failed. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestAutoReply = async () => {
    setIsLoading(true);
    try {
      const result = await EmailJSService.sendAutoReply({
        name: testData.name,
        title: testData.subject,
        email: testData.email,
      });
      
      toast({
        title: result.success ? "Success!" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Auto-reply test failed. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestBoth = async () => {
    setIsLoading(true);
    try {
      const result = await EmailJSService.sendContactFormOnly(testData as ContactFormData);
      
      toast({
        title: result.success ? "Success!" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Combined test failed. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">EmailJS Integration Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            value={testData.name}
            onChange={(e) => setTestData({ ...testData, name: e.target.value })}
            placeholder="Test User"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            value={testData.email}
            onChange={(e) => setTestData({ ...testData, email: e.target.value })}
            placeholder="test@example.com"
            type="email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <Input
            value={testData.subject}
            onChange={(e) => setTestData({ ...testData, subject: e.target.value })}
            placeholder="Test Subject"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <Textarea
            value={testData.message}
            onChange={(e) => setTestData({ ...testData, message: e.target.value })}
            placeholder="Test message content"
            rows={4}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={handleTestContact} 
          disabled={isLoading}
          variant="outline"
        >
          Test Contact Form
        </Button>
        
        <Button 
          onClick={handleTestAutoReply} 
          disabled={isLoading}
          variant="outline"
        >
          Test Auto-Reply
        </Button>
        
        <Button 
          onClick={handleTestBoth} 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Test Both (Contact + Auto-Reply)
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        <p><strong>Service ID:</strong> service_n25wl0p</p>
        <p><strong>Template ID:</strong> template_xeahw8u</p>
        <p><strong>Public Key:</strong> Qy7kySp-clZirkuIt</p>
      </div>
    </div>
  );
}
