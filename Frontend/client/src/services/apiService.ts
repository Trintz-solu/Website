import { ENV_CONFIG, API_ENDPOINTS, ERROR_MESSAGES, DEFAULT_API_TIMEOUT } from '@/config/environment';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// API Service class
export class ApiService {
  private static baseURL = ENV_CONFIG.API_BASE_URL;
  private static timeout = ENV_CONFIG.API_TIMEOUT;

  /**
   * Make HTTP request with error handling
   */
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: 'Request timeout. Please try again.',
          };
        }
        
        if (error.message.includes('Failed to fetch')) {
          return {
            success: false,
            error: ERROR_MESSAGES.NETWORK_ERROR,
          };
        }
        
        return {
          success: false,
          error: error.message,
        };
      }
      
      return {
        success: false,
        error: ERROR_MESSAGES.UNKNOWN_ERROR,
      };
    }
  }

  /**
   * GET request
   */
  static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  static async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  static async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Health check
   */
  static async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.get(API_ENDPOINTS.HEALTH);
  }

  /**
   * Get projects
   */
  static async getProjects(): Promise<ApiResponse<{ projects: any[] }>> {
    return this.get(API_ENDPOINTS.PROJECTS);
  }

  /**
   * Get services
   */
  static async getServices(): Promise<ApiResponse<{ services: any[] }>> {
    return this.get(API_ENDPOINTS.SERVICES);
  }

  /**
   * Get team members
   */
  static async getTeam(): Promise<ApiResponse<{ team: any[] }>> {
    return this.get(API_ENDPOINTS.TEAM);
  }

  /**
   * Submit contact form
   */
  static async submitContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.post(API_ENDPOINTS.CONTACT, data);
  }
}

// Utility function to handle API responses
export function handleApiResponse<T>(
  response: ApiResponse<T>,
  onSuccess: (data: T) => void,
  onError?: (error: string) => void
): void {
  if (response.success && response.data) {
    onSuccess(response.data);
  } else {
    const errorMessage = response.error || ERROR_MESSAGES.UNKNOWN_ERROR;
    console.error('API Error:', errorMessage);
    if (onError) {
      onError(errorMessage);
    }
  }
}
