import React from 'react';

const AboutSection = () => (
    <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif mb-8">The Artist Behind the Work</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
                I am an independent artist specializing in handcrafted and customized artworks.
                My portfolio showcases a diverse range of traditional and contemporary art forms,
                created with attention to detail and personalization. From the intricate mirrors of
                <strong> Lippan Art</strong> to the glossy finish of <strong>Resin</strong>, every piece tells a story.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="bg-stone-50 px-4 py-2 rounded-lg border border-stone-200 text-sm">✨ Handcrafted Originals</div>

                <div className="bg-stone-50 px-4 py-2 rounded-lg border border-stone-200 text-sm">🎨 100% Customizable</div>
            </div>
        </div>
    </section>
);

export default AboutSection;