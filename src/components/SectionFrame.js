import React from 'react';
import styled from 'styled-components';
import { bgFor, fgFor, mutedFor, hairlineFor } from '../styles/theme';

/**
 * SectionFrame — a full-width band with a centred content column.
 * bg: 'paper' (default) | 'alt' | 'ink'
 */

const Band = styled.section`
  position: relative;
  background: ${({ $bg }) => bgFor($bg)};
  color: ${({ $bg }) => fgFor($bg)};
  --ink: ${({ $bg }) => fgFor($bg)};
  --muted: ${({ $bg }) => mutedFor($bg)};
  --line: ${({ $bg }) => hairlineFor($bg)};
`;

const Inner = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: ${({ $tight }) =>
    $tight ? 'clamp(56px, 8vw, 104px)' : 'clamp(88px, 12vw, 168px)'} ${({ theme }) => theme.gutter};
`;

export default function SectionFrame({ bg = 'paper', tight = false, children, innerRef, ...rest }) {
  return (
    <Band $bg={bg} {...rest}>
      <Inner $tight={tight} ref={innerRef}>
        {children}
      </Inner>
    </Band>
  );
}
