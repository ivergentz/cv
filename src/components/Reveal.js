import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? '0' : '10px')});
  transition:
    opacity 250ms cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 250ms cubic-bezier(0.2, 0.7, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

export default function Reveal({ children, as = 'div', className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Wrap ref={ref} $visible={visible} as={as} className={className}>
      {children}
    </Wrap>
  );
}
