'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Constant px/s keeps both rows in sync even with different logo counts.
const DEFAULT_PIXELS_PER_SECOND = 95;
const DEFAULT_MOBILE_PIXELS_PER_SECOND = 75;
const MOBILE_MEDIA_QUERY = '(max-width: 640px)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Infinite logo strip driven by requestAnimationFrame.
 *
 * - Touch devices no longer freeze from sticky CSS :hover pause.
 * - Native <img> hits the CDN directly (skips /_next/image for dozens of logos).
 * - Fixed tile size + placeholder keeps the loop width stable while images load.
 */
export default function LogoMarquee({
  items = [],
  direction = 'left',
  pixelsPerSecond = DEFAULT_PIXELS_PER_SECOND,
  mobilePixelsPerSecond = DEFAULT_MOBILE_PIXELS_PER_SECOND,
  className = '',
}) {
  const shellRef = useRef(null);
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const inViewRef = useRef(true);
  const hoverPausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const speedRef = useRef(pixelsPerSecond);
  const directionRef = useRef(direction);
  const [copyCount, setCopyCount] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  speedRef.current = isMobile ? mobilePixelsPerSecond : pixelsPerSecond;
  directionRef.current = direction;

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    const width = setWidthRef.current;
    if (!track || !width) return;

    if (reducedMotionRef.current) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    const offset = offsetRef.current % width;
    const x = directionRef.current === 'right' ? offset - width : -offset;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }, []);

  const measure = useCallback(() => {
    const shell = shellRef.current;
    const firstSet = firstSetRef.current;
    if (!shell || !firstSet) return;

    const width = firstSet.getBoundingClientRect().width;
    if (!width) return;

    // Keep the loop seamless if measured width changes after images settle.
    const previous = setWidthRef.current;
    if (previous > 0 && width !== previous) {
      offsetRef.current = (offsetRef.current / previous) * width;
    }
    setWidthRef.current = width;
    setCopyCount((current) => {
      const next = Math.max(2, Math.ceil(shell.clientWidth / width) + 1);
      return current === next ? current : next;
    });
    applyTransform();
  }, [applyTransform]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mobileQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const syncMobile = () => setIsMobile(mobileQuery.matches);
    const syncMotion = () => {
      reducedMotionRef.current = motionQuery.matches;
      applyTransform();
    };

    syncMobile();
    syncMotion();
    mobileQuery.addEventListener('change', syncMobile);
    motionQuery.addEventListener('change', syncMotion);
    return () => {
      mobileQuery.removeEventListener('change', syncMobile);
      motionQuery.removeEventListener('change', syncMotion);
    };
  }, [applyTransform]);

  useEffect(() => {
    measure();

    const shell = shellRef.current;
    const firstSet = firstSetRef.current;
    if (!shell || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(measure);
    observer.observe(shell);
    if (firstSet) observer.observe(firstSet);
    return () => observer.disconnect();
  }, [measure, items, isMobile, copyCount]);

  // Warm cache for unique URLs so duplicate sets paint from cache immediately.
  useEffect(() => {
    if (typeof window === 'undefined' || !items.length) return undefined;

    const seen = new Set();
    const loaders = [];
    for (const item of items) {
      const src = String(item?.imageUrl || '').trim();
      if (!src || seen.has(src)) continue;
      seen.add(src);
      const img = new window.Image();
      img.decoding = 'async';
      img.src = src;
      loaders.push(img);
    }

    return () => {
      loaders.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
    };
  }, [items]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    const visibility = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
        if (entry?.isIntersecting) lastTsRef.current = 0;
      },
      { rootMargin: '120px 0px', threshold: 0.01 },
    );
    visibility.observe(shell);

    const finePointer =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia(FINE_POINTER_QUERY)
        : null;

    const onEnter = () => {
      if (finePointer?.matches) hoverPausedRef.current = true;
    };
    const onLeave = () => {
      hoverPausedRef.current = false;
      lastTsRef.current = 0;
    };

    shell.addEventListener('mouseenter', onEnter);
    shell.addEventListener('mouseleave', onLeave);

    const tick = (timestamp) => {
      rafRef.current = window.requestAnimationFrame(tick);

      if (reducedMotionRef.current || !inViewRef.current || hoverPausedRef.current) {
        lastTsRef.current = 0;
        return;
      }

      const width = setWidthRef.current;
      if (!width) return;

      if (!lastTsRef.current) {
        lastTsRef.current = timestamp;
        return;
      }

      // Cap dt so tab-restore / long frames don't jump the strip.
      const deltaSeconds = Math.min((timestamp - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = timestamp;
      offsetRef.current = (offsetRef.current + speedRef.current * deltaSeconds) % width;
      applyTransform();
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      visibility.disconnect();
      shell.removeEventListener('mouseenter', onEnter);
      shell.removeEventListener('mouseleave', onLeave);
    };
  }, [applyTransform, items]);

  if (!items.length) return null;

  return (
    <div ref={shellRef} className={['marquee-shell', className].join(' ').trim()}>
      <div ref={trackRef} className="marquee-track">
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? firstSetRef : undefined}
            className="marquee-set"
            aria-hidden={copyIndex > 0 ? 'true' : undefined}
          >
            {items.map((item, itemIndex) => (
              <div key={`${copyIndex}-${item.id}`} className="marquee-item">
                <img
                  src={item.imageUrl}
                  alt={item.alt || ''}
                  width={160}
                  height={80}
                  decoding="async"
                  // Never lazy-load marquee tiles: CSS transforms often prevent
                  // lazy intersection, leaving blank logos as the strip scrolls.
                  loading="eager"
                  fetchPriority={copyIndex === 0 && itemIndex < 8 ? 'high' : 'low'}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
