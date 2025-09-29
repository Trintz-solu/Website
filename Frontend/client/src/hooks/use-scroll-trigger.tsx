import { useEffect, useRef } from 'react';

interface UseScrollTriggerOptions {
  trigger?: Element | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

// DISABLED for maximum performance - no scroll triggers
export function useScrollTrigger({
  trigger,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack
}: UseScrollTriggerOptions) {
  // Completely disabled to eliminate performance overhead
  return null;
}
