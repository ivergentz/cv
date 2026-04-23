import React from 'react';
import Hero from '../components/sections/Hero';
import Positioning from '../components/sections/Positioning';
import Products from '../components/sections/Products';
import Clients from '../components/sections/Clients';
import Stations from '../components/sections/Stations';
import Principles from '../components/sections/Principles';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <Products />
      <Clients />
      <Stations />
      <Principles />
      <Contact />
    </>
  );
}
