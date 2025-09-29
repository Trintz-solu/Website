import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { ApiService } from '@/services/apiService';

interface HealthStatus {
  status: 'checking' | 'healthy' | 'unhealthy';
  message: string;
  timestamp?: string;
}

export default function HealthCheck() {
  const [health, setHealth] = useState<HealthStatus>({
    status: 'checking',
    message: 'Checking system health...'
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await ApiService.healthCheck();
        
        if (response.success && response.data) {
          setHealth({
            status: 'healthy',
            message: 'All systems operational',
            timestamp: response.data.timestamp
          });
        } else {
          setHealth({
            status: 'unhealthy',
            message: response.error || 'Health check failed'
          });
        }
      } catch (error) {
        setHealth({
          status: 'unhealthy',
          message: 'Unable to connect to server'
        });
      }
    };

    checkHealth();
    
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (health.status) {
      case 'checking':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'unhealthy':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (health.status) {
      case 'checking':
        return 'text-yellow-500';
      case 'healthy':
        return 'text-green-500';
      case 'unhealthy':
        return 'text-red-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm border border-muted/50 rounded-lg p-3 shadow-lg z-50">
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <div className="text-sm">
          <div className={`font-medium ${getStatusColor()}`}>
            {health.message}
          </div>
          {health.timestamp && (
            <div className="text-xs text-muted-foreground">
              {new Date(health.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
