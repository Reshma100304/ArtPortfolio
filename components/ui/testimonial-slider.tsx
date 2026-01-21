"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
    _id?: string;
    id?: string | number;
    quote?: string;
    content?: string;
    name: string;
    username?: string;
    role?: string;
    avatar?: string;
    rating?: number;
}

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

const getVisibleCount = (width: number): number => {
    if (width >= 1280) return 3;
    if (width >= 768) return 2;
    return 1;
};

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const [direction, setDirection] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);

            const oldVisibleCount = getVisibleCount(windowWidth);
            const newVisibleCount = getVisibleCount(newWidth);

            if (oldVisibleCount !== newVisibleCount) {
                const maxIndexForNewWidth = testimonials.length - newVisibleCount;
                if (currentIndex > maxIndexForNewWidth) {
                    setCurrentIndex(Math.max(0, maxIndexForNewWidth));
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth, currentIndex, testimonials.length]);

    useEffect(() => {
        if (!isAutoPlaying || testimonials.length <= getVisibleCount(windowWidth)) return;

        const startAutoPlay = () => {
            autoPlayRef.current = setInterval(() => {
                const visibleCount = getVisibleCount(windowWidth);
                const maxIndex = testimonials.length - visibleCount;

                if (currentIndex >= maxIndex) {
                    setDirection(-1);
                    setCurrentIndex((prev) => prev - 1);
                } else if (currentIndex <= 0) {
                    setDirection(1);
                    setCurrentIndex((prev) => prev + 1);
                } else {
                    setCurrentIndex((prev) => prev + direction);
                }
            }, 4000);
        };

        startAutoPlay();

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, currentIndex, windowWidth, direction, testimonials.length]);

    const visibleCount = getVisibleCount(windowWidth);
    const maxIndex = Math.max(0, testimonials.length - visibleCount);
    const canGoNext = currentIndex < maxIndex;
    const canGoPrev = currentIndex > 0;

    const goNext = () => {
        if (canGoNext) {
            setDirection(1);
            setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
            pauseAutoPlay();
        }
    };

    const goPrev = () => {
        if (canGoPrev) {
            setDirection(-1);
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
            pauseAutoPlay();
        }
    };

    const pauseAutoPlay = () => {
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    const handleDragEnd = (event: any, info: any) => {
        const { offset } = info;
        const swipeThreshold = 30;

        if (offset.x < -swipeThreshold && canGoNext) {
            goNext();
        } else if (offset.x > swipeThreshold && canGoPrev) {
            goPrev();
        }
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        pauseAutoPlay();
    };

    if (testimonials.length === 0) return null;

    return (
        <div className="relative" ref={containerRef}>
            <div className="flex justify-center sm:justify-end sm:absolute sm:-top-20 right-0 space-x-2 mb-8 sm:mb-0">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goPrev}
                    disabled={!canGoPrev}
                    className={`p-3 rounded-full ${canGoPrev
                            ? 'bg-white dark:bg-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 text-primary dark:text-primary-light border border-stone-100'
                            : 'bg-gray-50 dark:bg-gray-800 text-gray-300 cursor-not-allowed border border-stone-50'
                        } transition-all duration-300`}
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={20} className="w-5 h-5" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goNext}
                    disabled={!canGoNext}
                    className={`p-3 rounded-full ${canGoNext
                            ? 'bg-white dark:bg-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 text-primary dark:text-primary-light border border-stone-100'
                            : 'bg-gray-50 dark:bg-gray-800 text-gray-300 cursor-not-allowed border border-stone-50'
                        } transition-all duration-300`}
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={20} className="w-5 h-5" />
                </motion.button>
            </div>

            <div className="overflow-hidden relative -mx-4 px-4 sm:mx-0 sm:px-0">
                <motion.div
                    className="flex"
                    animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
                    transition={{
                        type: 'spring',
                        stiffness: 70,
                        damping: 20
                    }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial._id || testimonial.id}
                            className={`flex-shrink-0 w-full ${visibleCount === 3 ? 'md:w-1/3' :
                                    visibleCount === 2 ? 'md:w-1/2' : 'w-full'
                                } p-4`}
                            initial={{ opacity: 0.5, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98, cursor: 'grabbing' }}
                            style={{ cursor: 'grab' }}
                        >
                            <motion.div
                                className="relative overflow-hidden rounded-3xl p-8 h-full bg-white dark:bg-gray-800 border border-stone-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="absolute -top-4 -left-4 opacity-5 dark:opacity-10">
                                    <Quote size={80} className="text-primary dark:text-primary-light" />
                                </div>

                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="flex gap-1 mb-6 text-amber-500">
                                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + (i * 0.1) }}
                                                key={i}
                                            >
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <p className="text-base sm:text-lg text-stone-600 dark:text-gray-300 italic mb-8 leading-relaxed">
                                        &ldquo;{testimonial.content || testimonial.quote}&rdquo;
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-stone-50 dark:border-gray-700">
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex-shrink-0">
                                                {testimonial.avatar ? (
                                                    <img
                                                        src={testimonial.avatar}
                                                        alt={testimonial.name}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center font-bold text-lg">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                )}
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-primary/20 dark:bg-primary-light/20"
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0, 0.3, 0]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatDelay: 1
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-stone-900 dark:text-white">{testimonial.name}</h4>
                                                <p className="text-stone-400 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest">{testimonial.role || testimonial.username || 'Verified Customer'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {testimonials.length > visibleCount && (
                <div className="flex justify-center mt-12 gap-2">
                    {Array.from({ length: testimonials.length - visibleCount + 1 }, (_: any, index: any) => (
                        <motion.button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="relative focus:outline-none h-4 flex items-center"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Go to testimonial ${index + 1}`}
                        >
                            <motion.div
                                className={`rounded-full transition-all duration-500 ${index === currentIndex
                                        ? 'w-8 h-1.5 bg-primary dark:bg-primary-light'
                                        : 'w-2 h-1.5 bg-stone-200 dark:bg-gray-600'
                                    }`}
                            />
                        </motion.button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestimonialSlider;
