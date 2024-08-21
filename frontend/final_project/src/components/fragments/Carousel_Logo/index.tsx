import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css"; // Import Glide.js CSS

export default function CarouselLogo() {
    useEffect(() => {
        const slider = new Glide(".glide-09", {
            type: "carousel",
            autoplay: 1,
            animationDuration: 4500,
            animationTimingFunc: "linear",
            perView: 3,
            breakpoints: {
                1024: {
                    perView: 2,
                },
                640: {
                    perView: 1,
                    gap: 36,
                },
            },
        }).mount();

        return () => {
            slider.destroy();
        };
    }, []);

    return (
        <>
            {/* <!-- Component: Testimonial carousel --> */}
            <div className="glide-09 relative w-full overflow-hidden">
                {/* <!-- Slides --> */}
                <div data-glide-el="track" className="w-full">
                    <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex h-10 overflow-hidden p-0 justify-center">
                        <li className="flex-shrink-0">
                            <img
                                src="/carousel/carousel1.png"
                                className="m-auto h-20 max-h-full w-auto max-w-full"
                                alt="Logo 1"
                            />
                        </li>
                        <li className="flex-shrink-0">
                            <img
                                src="/carousel/carousel2.png"
                                className="m-auto h-20 max-h-full w-auto max-w-full"
                                alt="Logo 2"
                            />
                        </li>
                        <li className="flex-shrink-0">
                            <img
                                src="/carousel/carousel3.png"
                                className="m-auto h-20 max-h-full w-auto max-w-full"
                                alt="Logo 3"
                            />
                        </li>
                        <li className="flex-shrink-0">
                            <img
                                src="/carousel/carousel4.png"
                                className="m-auto h-20 max-h-full w-auto max-w-full"
                                alt="Logo 4"
                            />
                        </li>
                        <li className="flex-shrink-0">
                            <img
                                src="/carousel/carousel5.png"
                                className="m-auto h-20 max-h-full w-auto max-w-full"
                                alt="Logo 5"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            {/* <!-- End Testimonial carousel --> */}
        </>
    );
}