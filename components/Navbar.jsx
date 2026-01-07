import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <img src="/logo.png" alt="Artistry Logo" className="h-10 w-auto object-contain" />
                        <span className="text-xl font-serif font-bold tracking-wider text-stone-900">ARTISTRY</span>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <a href="#about" className="hover:text-amber-600 transition-colors">About</a>
                        <a href="#portfolio" className="hover:text-amber-600 transition-colors">Portfolio</a>
                        <a href="#services" className="hover:text-amber-600 transition-colors">Services</a>
                        <a href="#contact" className="bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition-all">
                            Get in Touch
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-stone-600 hover:text-stone-900">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-stone-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#about" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-stone-50">About</a>
                        <a href="#portfolio" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-stone-50">Portfolio</a>
                        <a href="#services" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-stone-50">Services</a>
                        <a href="#contact" onClick={toggleMenu} className="block px-3 py-2 text-amber-600 font-bold">Contact Me</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
