import React from 'react';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => (
    <header className="relative bg-stone-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-stone-900 mb-6">
                Where Tradition Meets <br /> <span className="text-amber-700 italic">Contemporary Design</span>
            </h1>
            <p className="mt-4 text-xl text-stone-600 max-w-2xl mx-auto font-light">
                Handcrafted Lippan, Resin, and Texture Art curated for your unique space.
            </p>
            <div className="mt-10 flex justify-center gap-4">
                <a href="#portfolio" className="bg-amber-700 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition shadow-lg flex items-center gap-2">
                    View Gallery <ChevronRight size={18} />
                </a>
                <a href="#contact" className="bg-white text-stone-800 border border-stone-300 px-8 py-3 rounded-full hover:bg-stone-50 transition">
                    Custom Orders
                </a>
            </div>
        </div>
    </header>
);

export default HeroSection;