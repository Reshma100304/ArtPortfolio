import { ChevronRight } from 'lucide-react';
import { Typewriter } from './ui/typewriter';

const HeroSection = () => (
    <header className="relative bg-stone-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-stone-900 mb-6">
                Where Tradition Meets <br /> <span className="text-amber-700 italic">Contemporary Design</span>
            </h1>
            <div className="text-xl md:text-2xl text-stone-600 font-light mb-4">
                Handcrafted pieces curated for your unique space in <Typewriter
                    text={["Lippan Art", "Resin Art", "Texture Art", "Mandala Art", "Pencil Sketches"]}
                    speed={70}
                    className="text-amber-700 font-medium"
                    waitTime={1500}
                    deleteSpeed={40}
                />
            </div>
            {/* <p className="mt-4 text-xl text-stone-600 max-w-2xl mx-auto font-light">
                Handcrafted pieces curated for your unique space.
            </p> */}
            <div className="mt-10 flex justify-center gap-4">
                <a href="#portfolio" className="bg-amber-700 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition shadow-lg flex items-center gap-2">
                    View Gallery <ChevronRight size={18} />
                </a>
                <a href="#contact" className="bg-white text-stone-800 border border-stone-300 px-8 py-3 rounded-full hover:bg-stone-50 transition">
                    Custom Orders
                </a>
            </div>
        </div>

        {/* Cat Mascot */}
        <div className="absolute bottom-4 right-12 md:bottom-10 md:right-24 w-32 md:w-48 lg:w-64 transform transition-all duration-700 hover:scale-110 hover:-rotate-6 pointer-events-none md:pointer-events-auto select-none">
            <img
                src="/cat-mascot.png"
                alt="Waving Cat Mascot"
                className="w-full h-auto drop-shadow-xl animate-bounce-subtle"
            />
        </div>
    </header>
);

export default HeroSection;