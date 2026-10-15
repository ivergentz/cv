import React from 'react';
import IntroModal from '../components/IntroModal';
import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import Positioning from '../components/sections/Positioning';
import CaseStudy from '../components/sections/CaseStudy';
import Products from '../components/sections/Products';
import Stations from '../components/sections/Stations';
import Principles from '../components/sections/Principles';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <main>
      <IntroModal />
      <Hero />
      <Marquee />
      <Positioning />
      <CaseStudy />
      <Products />
      <Stations />
      <Principles />
      <Contact />
    </main>
  );
}
