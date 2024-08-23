import React, { useState, useEffect } from "react";

interface Testimonial {
    image: string;
    heading: string;
    name: string;
    origin: string;
    rating: string;
    testimonial: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (testimonials.length === 0) return;

        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
                setAnimate(false);
            }, 500); // Duration of the animation
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (testimonials.length === 0) {
        return <div>No testimonials available</div>;
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-r from-slate-800 via-amber-400 to-red-700 shadow-2xl">
            <h1 className="text-4xl text-slate-800 font-bold shadow-lg leading-loose text-center w-1/2">
                What our customers say about us
            </h1>
            <div className={`testimonial-container ${animate ? "slide-in" : ""} text-center bg-slate-900 p-8 rounded-3xl shadow-2xl w-8/12`}>
                <p className="text-yellow-600 text-3xl mb-4">{currentTestimonial.rating}</p>
                <h1 className="text-2xl text-amber-400 leading-relaxed text-center font-semibold mb-4 w-7/12 mx-auto">
                    {currentTestimonial.testimonial}
                </h1>
                <div className="flex justify-center gap-4 items-center">
                    <div className="rounded-full w-18 h-20 bg-black overflow-hidden transform transition-transform duration-500 hover:scale-110 ">
                        <img src={currentTestimonial.image} alt={currentTestimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col tracking-wider">
                        <label className="text-amber-600 font-bold text-base">
                            {currentTestimonial.name}
                        </label>
                        <label className="text-gray-400 font-normal text-sm">
                            {currentTestimonial.origin}
                        </label>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .testimonial-container {
                    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
                }

                .slide-in {
                    animation: slideIn 0.5s forwards;
                }

                .testimonial-container p,
                .testimonial-container h1,
                .testimonial-container label {
                    animation: fadeIn 1s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}