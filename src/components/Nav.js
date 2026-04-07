import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: ${({ $scrolled }) => $scrolled ? 'rgba(14,14,15,0.96)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(12px)' : 'none'};
  border-bottom: ${({ $scrolled, theme }) => $scrolled ? `0.5px solid ${theme.gray600}33` : 'none'};
  transition: background 0.4s ease, border 0.4s ease;

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`;

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fontSans};
  font-weight: 100;
  font-size: 17px;
  color: ${({ theme }) => theme.white};
  letter-spacing: -0.01em;

  strong {
    font-family: ${({ theme }) => theme.fontSlab};
    font-weight: 800;
  }
`;

const Links = styled.ul`
  display: flex;
  gap: 32px;
  list-style: none;

  @media (max-width: 600px) {
    gap: 20px;
  }
`;

const NavLink = styled.a`
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray400};
  font-weight: 400;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.white};
  }

  @media (max-width: 480px) {
    display: none;
    &:last-child { display: block; }
  }
`;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <NavBar $scrolled={scrolled}>
      <Logo href="/">Iver <strong>Gentz</strong></Logo>
      <Links>
        <NavLink onClick={() => scrollTo('projekte')}>Projekte</NavLink>
        <NavLink onClick={() => scrollTo('erfahrung')}>Erfahrung</NavLink>
        <NavLink onClick={() => scrollTo('skills')}>Skills</NavLink>
        <NavLink onClick={() => scrollTo('kontakt')}>Kontakt</NavLink>
      </Links>
    </NavBar>
  );
}
