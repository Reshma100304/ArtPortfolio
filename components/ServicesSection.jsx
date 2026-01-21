import React from 'react';
import { Palette, Gift, Brush } from 'lucide-react';

const ServicesSection = () => (
    <section id="services" className="py-20 bg-stone-900 text-stone-300">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-serif text-white">What I Offer</h2>
                <div className="w-16 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-amber-600 transition duration-300">
                    <div className="bg-stone-900 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-amber-500">
                        <Palette size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Custom Commissions</h3>
                    <p className="leading-relaxed">
                        Fully customized artworks based on your theme, size requirements, and color palette. Perfect for matching your home decor.
                    </p>
                </div>

                <div className="bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-amber-600 transition duration-300">
                    <div className="bg-stone-900 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-amber-500">
                        <Gift size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Gifting Solutions</h3>
                    <p className="leading-relaxed">
                        Unique, personalized gifting options for housewarmings, weddings, offices, and special occasions.
                    </p>
                </div>

                <div className="bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-amber-600 transition duration-300">
                    <div className="bg-stone-900 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-amber-500">
                        <Brush size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Prints & Originals</h3>
                    <p className="leading-relaxed">
                        Choose from available original handcrafted pieces or order high-quality prints of existing artworks in custom sizes.
                    </p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <p className="text-stone-400 italic font-light tracking-wide">
                    "Promising to give the best output with affordable pricing"
                </p>
            </div>
        </div>
    </section>
);

export default ServicesSection;