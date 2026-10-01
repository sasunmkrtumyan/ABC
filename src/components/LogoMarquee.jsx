'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

// Driving the animation off a constant speed instead of a fixed duration keeps
// both rows moving at the same pace even though they hold different logo counts.
const DEFAULT_PIXELS_PER_SECOND = 110;

// On a narrow screen the desktop speed crosses the whole visible width in a
// couple of seconds, which reads as much faster. Matches the breakpoint that
// shrinks `.marquee-item` in globals.css.
const DEFAULT_MOBILE_PIXELS_PER_SECOND = 50;
const MOBILE_MEDIA_QUERY = '(max-width: 640px)';

/**
 * Infinite logo strip.
 *
 * The item list is repeated enough times to always cover the visible area, and
 * the track slides by exactly one repetition before restarting. That keeps the
 * spacing between the last and first logo identical to every other gap, so the
 * restart is invisible no matter how many logos there are.
 */
export default function LogoMarquee({
  items = [],
  direction = 'left',
  pixelsPerSecond = DEFAULT_PIXELS_PER_SECOND,
  mobilePixelsPerSecond = DEFAULT_MOBILE_PIXELS_PER_SECOND,
  className = '',
}) {
  const shellRef = useRef(null);
  const firstSetRef = useRef(null);
  const [setWidth, setSetWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  const measure = useCallback(() => {
    const shell = shellRef.current;
    const firstSet = firstSetRef.current;
    if (!shell || !firstSet) return;

    const width = firstSet.getBoundingClientRect().width;
    if (!width) return;

    setSetWidth(width);
    // One full set slides out of view each cycle, so the remaining copies have
    // to be wide enough to cover the shell on their own.
    setCopyCount(Math.max(2, Math.ceil(shell.clientWidth / width) + 1));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const query = window.matchMedia(MOBILE_MEDIA_QUERY);
    const syncIsMobile = () => setIsMobile(query.matches);

    syncIsMobile();
    query.addEventListener('change', syncIsMobile);
    return () => query.removeEventListener('change', syncIsMobile);
  }, []);

  useEffect(() => {
    // Logo tiles change size at the mobile breakpoint, so re-measure there too.
    measure();

    const shell = shellRef.current;
    if (!shell || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(measure);
    observer.observe(shell);
    return () => observer.disconnect();
  }, [measure, items, isMobile]);

  if (!items.length) return null;

  const speed = isMobile ? mobilePixelsPerSecond : pixelsPerSecond;
  const duration = setWidth ? setWidth / speed : 0;

  return (
    <div ref={shellRef} className={['marquee-shell', className].join(' ').trim()}>
      <div
        className="marquee-track"
        style={{
          '--marquee-shift': `${setWidth}px`,
          animationDuration: duration ? `${duration}s` : undefined,
          // Hold still until the first measurement lands, otherwise the track
          // animates against a zero-width shift.
          animationPlayState: duration ? undefined : 'paused',
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? firstSetRef : undefined}
            className="marquee-set"
            aria-hidden={copyIndex > 0 ? 'true' : undefined}
          >
            {items.map((item) => (
              <div key={`${copyIndex}-${item.id}`} className="marquee-item">
                <Image
                  src={item.imageUrl}
                  alt={item.alt || ''}
                  fill
                  sizes="160px"
                  // The strip clips its overflow, so lazy loading would leave
                  // off-screen logos unfetched and scroll blank gaps into view.
                  loading="eager"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
