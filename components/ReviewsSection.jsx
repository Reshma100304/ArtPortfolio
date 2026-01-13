import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Abhishek",
        role: "Interior Designer",
        content: "I commissioned a Lippan art piece and the result is absolutely stunning!.",
        rating: 5
    },
    {
        id: 2,
        name: "Rahul Verma",
        role: "Gift Buyer",
        content: "Ordered a custom pencil sketch for my wife's birthday. She was in tears when she saw it. Reshma captured the emotions so beautifully.",
        rating: 5
    },
    {
        id: 3,
        name: "Ananya Gupta",
        role: "Interior Enthusiast",
        content: "The Mandala art I purchased brings such a calming vibe to my workspace. The colors and precision are top-notch. Highly recommended!",
        rating: 5
    }
];

const ReviewsSection = () => {
    return (
        <section id="reviews" className="py-20 bg-stone-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif text-stone-900">Client Love</h2>
                    <div className="w-16 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
                    <p className="text-stone-500 mt-4 max-w-2xl mx-auto">
                        Stories from people who have brought a piece of my art into their lives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg transition-all duration-300 relative group">
                            <Quote className="absolute top-6 right-6 text-stone-100 fill-stone-100 group-hover:text-amber-50 group-hover:fill-amber-50 transition-colors duration-300" size={48} />

                            <div className="flex gap-1 mb-6 text-amber-500">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-stone-600 leading-relaxed mb-6 italic relative z-10">
                                "{review.content}"
                            </p>

                            <div className="mt-auto border-t border-stone-100 pt-6">
                                <h4 className="font-bold text-stone-900">{review.name}</h4>
                                <p className="text-xs font-medium text-stone-400 uppercase tracking-widest">{review.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
