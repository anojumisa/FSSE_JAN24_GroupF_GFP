import { useEffect, useRef } from "react";

interface ImageComponentProps {
    firstLink: string;
    secondLink: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
    firstLink,
    secondLink,
}) => {
    const firstImageRef = useRef<HTMLImageElement>(null);
    const secondImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === firstImageRef.current) {
                        entry.target.classList.add("fantastic-move-right");
                    } else if (entry.target === secondImageRef.current) {
                        entry.target.classList.add("fantastic-move-delay-right");
                    }
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );
        if (firstImageRef.current) observer.observe(firstImageRef.current);
        if (secondImageRef.current) observer.observe(secondImageRef.current);

        return () => {
            if (firstImageRef.current) observer.unobserve(firstImageRef.current);
            if (secondImageRef.current) observer.unobserve(secondImageRef.current);
        };
    }, []);

    return (
        <div className="relative h-96 w-full sm:h-full">
            <a href={firstLink}>
                <img
                    ref={firstImageRef}
                    src={firstLink}
                    alt="Description of image"
                    className="absolute h-80 w-80 object-cover rounded-full ltr:md:rounded-l-none rtl:md:rounded-r-none z-10"
                    style={{ bottom: "12%", left: "15%" }}
                />
            </a>
            <a href={secondLink}>
                <img
                    ref={secondImageRef}
                    src={secondLink}
                    alt="Description of image"
                    className="absolute h-80 w-80 object-cover rounded-full ltr:md:rounded-l-none rtl:md:rounded-r-none z-20"
                    style={{ bottom: "25%", left: "50%" }}
                />
            </a>
        </div>
    );
};

export default ImageComponent;