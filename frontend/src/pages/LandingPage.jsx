import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Analytics from "../components/landing/Analytics";
import Newsletter from "../components/landing/Newsletter";
import Cards from '../components/landing/Cards';
import Footer from '../components/landing/Footer';


const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  );
};

export default LandingPage;