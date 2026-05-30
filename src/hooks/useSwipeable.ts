import { useCallback, useRef } from "react";

interface UseSwipeableOpts {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

interface SwipeableHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

// Detect horizontal swipe gestures on a touch surface and call onSwipeLeft /
// onSwipeRight when a swipe exceeds the threshold and is more horizontal than
// vertical. Multi-touch gestures (pinch-zoom) and predominantly-vertical
// motion (page scroll) are deliberately ignored so swipe never hijacks them.
export function useSwipeable({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeableOpts): SwipeableHandlers {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) {
      startX.current = null;
      startY.current = null;
      return;
    }
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (startX.current === null || startY.current === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);

      startX.current = null;
      startY.current = null;

      if (adx < threshold) return;
      if (ady > adx) return;

      if (dx < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    },
    [onSwipeLeft, onSwipeRight, threshold],
  );

  return { onTouchStart, onTouchEnd };
}
