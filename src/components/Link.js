import styled from 'styled-components';

export const AnimatedLink = styled.a`
  position: relative;
  display: inline-block;
  padding-bottom: 1px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: currentColor;
    transform: scaleX(${(props) => (props.$always ? 1 : 0)});
    transform-origin: left center;
    transition: transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
    opacity: ${(props) => (props.$always ? 0.35 : 1)};
  }

  &:hover::after {
    transform: scaleX(1);
    opacity: 1;
  }
`;
