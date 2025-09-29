import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ApiTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testProjectsApi = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing /api/projects endpoint...');
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      console.log('📊 API Response:', data);
      setResult({
        status: response.status,
        ok: response.ok,
        data: data
      });
    } catch (error) {
      console.error('❌ API Test Error:', error);
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  const testHealthApi = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing /health endpoint...');
      const response = await fetch('/health');
      const data = await response.json();
      
      console.log('📊 Health Response:', data);
      setResult({
        status: response.status,
        ok: response.ok,
        data: data
      });
    } catch (error) {
      console.error('❌ Health Test Error:', error);
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🧪 API Test
      </h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button 
            onClick={testProjectsApi} 
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Testing...' : 'Test /api/projects'}
          </Button>
          
          <Button 
            onClick={testHealthApi} 
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            {loading ? 'Testing...' : 'Test /health'}
          </Button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Test Result:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
