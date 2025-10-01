import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Loading from "@/components/ui/loading";
import Home from "@/pages/home";
import AboutPage from "@/pages/about";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";

import NotFound from "@/pages/not-found";
import { Suspense, useEffect } from "react";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

function Router() {
  useEffect(() => {
    // On initial load, if URL contains a hash, smooth-scroll with navbar offset
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.querySelector(hash) as HTMLElement | null;
          if (!el) return;
          const nav = document.querySelector('nav');
          const navHeight = (nav as HTMLElement | null)?.offsetHeight ?? 96;
          const rect = el.getBoundingClientRect();
          const y = rect.top + window.scrollY - navHeight;
          gsap.to(window, { duration: 0.6, scrollTo: { y, autoKill: true }, ease: 'power2.out' });
        }, 100);
      });
    }
  }, []);
  return (
    <Suspense fallback={<Loading text="Loading TRINTZ..." />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-and-conditions" component={TermsConditions} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
