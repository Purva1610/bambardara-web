import React from 'react';
import Hero from './Hero';
import Legacy from './sections/Legacy';
import Accommodation from './sections/Accommodation';
import Experiences from './sections/Experiences';
import Wellness from './sections/Wellness';
import Dining from './sections/Dining';
import Occasions from './sections/Occasions';
import Sustainability from './sections/Sustainability';
import GalleryMosaic from './sections/GalleryMosaic';
import Enquiry from './sections/Enquiry';

export default function Home() {
  return (
    <>
      <Hero />
      <Legacy />
      <Accommodation />
      <Experiences />
      <Wellness />
      <Dining />
      <Occasions />
      <Sustainability />
      <GalleryMosaic />
      <Enquiry />
    </>
  );
}
