import { useEffect, useRef } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (!options.repeat) observer.unobserve(entry.target);
          } else if (options.repeat) {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: options.threshold || 0.15, ...options }
    );

    // Observe all children with animation classes
    const animated = el.querySelectorAll('.fly-up, .fly-left, .fly-right, .fade-in');
    animated.forEach((child) => observer.observe(child));

    // Also observe the element itself
    if (
      el.classList.contains('fly-up') ||
      el.classList.contains('fly-left') ||
      el.classList.contains('fly-right') ||
      el.classList.contains('fade-in')
    ) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [options.repeat, options.threshold]);

  return ref;
}
