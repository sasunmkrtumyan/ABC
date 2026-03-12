'use client';

import { useEffect, useRef, useState } from 'react';

export default function RevealSection({ className, children }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(target);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={[
        'transition-all duration-700',
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
