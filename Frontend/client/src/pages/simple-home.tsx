import React from 'react';
import PageLayout from '@/components/layout/page-layout';

export default function SimpleHome() {
  return (
    <PageLayout className="flex items-center justify-center py-16">
      <div className="text-center w-full max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-electric mb-4">
          TRINTZ
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          Welcome to the future of AI integration
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">React is Working!</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              If you can see this page, React is loading properly.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Server Status</h2>
            <p className="text-green-500 text-sm sm:text-base">✅ Server running on port 5173</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
