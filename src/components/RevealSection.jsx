'use client';

import { useEffect, useRef, useState } from 'react';

export default function RevealSection({ className, children }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return undefined;

    // Without IntersectionObserver (or if it never fires) content must not stay hidden.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // Low threshold + positive bottom margin: tall sections are revealed as soon as
      // they approach the viewport instead of waiting until 15% of them is on screen.
      { threshold: 0.01, rootMargin: '0px 0px 80px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={[
        // Only opacity/transform are animated (never `all`) to avoid layout/paint work.
        'transition-[opacity,transform] duration-700 motion-reduce:transition-none',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className || '',
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </section>
  );
}
