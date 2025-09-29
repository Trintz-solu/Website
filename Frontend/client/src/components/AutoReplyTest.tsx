import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { EmailJSService } from '@/services/emailjsService';

export default function AutoReplyTest() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [testData, setTestData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Auto-Reply',
  });

  const testAutoReply = async () => {
    setIsLoading(true);
    try {
      console.log('🧪 Testing auto-reply only...');
      console.log('📧 Test data:', testData);
      
      const result = await EmailJSService.sendAutoReply({
        name: testData.name,
        title: testData.subject,
        email: testData.email,
      });
      
      console.log('📧 Auto-reply result:', result);
      
      toast({
        title: result.success ? "✅ Auto-Reply Test Success!" : "❌ Auto-Reply Test Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error('❌ Auto-reply test error:', error);
      toast({
        title: "❌ Test Error",
        description: "Auto-reply test failed. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Auto-Reply Duplicate Test</h2>
        <p className="text-muted-foreground mb-6">
          Test only the auto-reply to see if it sends duplicates
        </p>
      </div>

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
      </div>

      <Button 
        onClick={testAutoReply} 
        disabled={isLoading}
        className="w-full"
        variant="default"
      >
        {isLoading ? 'Testing...' : 'Test Auto-Reply Only'}
      </Button>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Expected Result:</h3>
        <p className="text-sm">
          <strong>{testData.email}</strong> should receive <strong>exactly 1 auto-reply message</strong>.
          If they receive 2 messages, the issue is in the EmailJS template configuration.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Debugging Steps:</h3>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Open browser console (F12)</li>
          <li>Click "Test Auto-Reply Only"</li>
          <li>Check console logs for any duplicate calls</li>
          <li>Check if {testData.email} receives 1 or 2 messages</li>
        </ol>
      </div>
    </div>
  );
}
