// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure scroll performance
  measureScrollPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFrame = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.metrics.set('fps', fps);
        
        // Log performance warnings
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}fps`);
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrame);
    };
    
    requestAnimationFrame(measureFrame);
  }

  // Check for expensive CSS properties
  auditCSSPerformance() {
    const expensiveProperties = [
      'backdrop-filter',
      'filter',
      'box-shadow',
      'background-attachment',
      'mix-blend-mode',
      'transform-style'
    ];

    const elements = document.querySelectorAll('*');
    const issues: string[] = [];

    elements.forEach((element) => {
      const styles = window.getComputedStyle(element);
      
      expensiveProperties.forEach(prop => {
        const value = styles.getPropertyValue(prop);
        if (value && value !== 'none' && value !== 'initial') {
          issues.push(`${element.tagName}.${element.className}: ${prop}: ${value}`);
        }
      });
    });

    if (issues.length > 0) {
      console.warn('Expensive CSS properties detected:', issues);
    }

    return issues;
  }

  // Get performance metrics
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  // Start monitoring
  startMonitoring() {
    this.measureScrollPerformance();
    
    // Audit CSS on load
    window.addEventListener('load', () => {
      setTimeout(() => this.auditCSSPerformance(), 1000);
    });
  }
}

// Auto-start monitoring in development
if (process.env.NODE_ENV === 'development') {
  PerformanceMonitor.getInstance().startMonitoring();
}
