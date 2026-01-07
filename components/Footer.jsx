import React from 'react';
import { Mail, Instagram } from 'lucide-react';

const Footer = () => (
    <footer id="contact" className="bg-white border-t border-stone-200 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif text-stone-900 mb-6">Ready to Create Something Beautiful?</h2>
            <p className="text-stone-600 mb-8 max-w-xl mx-auto">
                Customization details, pricing, and timelines are discussed personally to ensure your vision comes to life perfectly.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=reshmasasanapuri@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-stone-700 transition shadow-lg">
                    <Mail size={18} /> Send an Email
                </a>
                <a href="https://www.instagram.com/artistry_reshuu" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition shadow-lg">
                    <Instagram size={18} /> DM on Instagram
                </a>
            </div>

            <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center text-stone-500 text-sm">
                <p>&copy; 2024 Your Art Brand. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <span className="hover:text-stone-900 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-stone-900 cursor-pointer">Terms of Service</span>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
