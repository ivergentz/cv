import React from 'react';
import styled from 'styled-components';
import { bgFor, fgFor, mutedFor, hairlineFor, accentFor } from '../styles/theme';

/**
 * SectionFrame — a full-width colour field with a centred content column.
 * bg: 'paper' (default) | 'alt' | 'ink' | 'accent'
 * Exposes --ink, --muted, --line, --accent for children.
 */

const Band = styled.section`
  position: relative;
  background: ${({ $bg }) => bgFor($bg)};
  color: ${({ $bg }) => fgFor($bg)};
  --ink: ${({ $bg }) => fgFor($bg)};
  --muted: ${({ $bg }) => mutedFor($bg)};
  --line: ${({ $bg }) => hairlineFor($bg)};
  --accent: ${({ $bg }) => accentFor($bg)};
  --field: ${({ $bg }) => bgFor($bg)};
`;

const Inner = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: ${({ $tight }) => ($tight ? 'clamp(48px, 7vw, 96px)' : 'clamp(72px, 10vw, 152px)')}
    ${({ theme }) => theme.gutter};
`;

export default function SectionFrame({ bg = 'paper', tight = false, children, ...rest }) {
  return (
    <Band $bg={bg} {...rest}>
      <Inner $tight={tight}>{children}</Inner>
    </Band>
  );
}
