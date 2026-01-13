import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ServicesSection from './components/ServicesSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';

const App = () => {
    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <ServicesSection />
            <ReviewsSection />
            <Footer />
        </div>
    );
};

export default App;