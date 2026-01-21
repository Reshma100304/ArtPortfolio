import React, { useState, useEffect } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import ReviewForm from './ReviewForm';
import TestimonialSlider from './ui/testimonial-slider';

const initialReviews = [
    {
        id: 'seed-1',
        name: "Abhishek",
        role: "Interior Designer",
        content: "I commissioned a Lippan art piece and the result is absolutely stunning!.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000"
    },
    {
        id: 'seed-2',
        name: "Rahul Verma",
        role: "Gift Buyer",
        content: "Ordered a custom pencil sketch for my wife's birthday. She was in tears when she saw it. Reshma captured the emotions so beautifully.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000"
    },
    {
        id: 'seed-3',
        name: "Ananya Gupta",
        role: "Interior Enthusiast",
        content: "The Mandala art I purchased brings such a calming vibe to my workspace. The colors and precision are top-notch. Highly recommended!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000"
    }
];

const ReviewsSection = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reviews');
            if (response.ok) {
                const data = await response.json();
                setReviews([...data, ...initialReviews]);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReviewAdded = (newReview) => {
        setReviews([newReview, ...reviews]);
    };

    return (
        <section id="reviews" className="py-24 bg-stone-50 overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-900 font-medium text-xs uppercase tracking-wider mb-4"
                        >
                            Testimonials
                        </motion.span>
                        <h2 className="text-4xl sm:text-5xl font-serif text-stone-900 mb-4">Client Love</h2>
                        <div className="w-16 h-1 bg-amber-600 rounded-full mb-6"></div>
                        <p className="text-stone-500 text-lg">
                            Stories from people who have brought a piece of my art into their lives.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-stone-900 border border-stone-200 rounded-full font-medium shadow-sm hover:shadow-md transition-all whitespace-nowrap"
                    >
                        <MessageSquarePlus size={20} className="text-amber-600" />
                        Write a Review
                    </motion.button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    <TestimonialSlider testimonials={reviews} />
                )}
            </div>

            <ReviewForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onReviewAdded={handleReviewAdded}
            />
        </section>
    );
};

export default ReviewsSection;
