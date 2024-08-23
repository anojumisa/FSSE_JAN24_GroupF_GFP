import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const withIntersectionObserver = (WrappedComponent: React.ComponentType) => {
	return (props: any) => {
		const { ref, inView } = useInView({
			triggerOnce: true,
			threshold: 0.5,
		});

		const [isVisible, setIsVisible] = useState(false);

		useEffect(() => {
			if (inView) {
				setIsVisible(true);
			}
		}, [inView]);

		return (
			<div
				ref={ref}
				className={`transition-opacity duration-1000 ${
					isVisible ? "opacity-100" : "opacity-0"
				}`}
			>
				<WrappedComponent {...props} />
			</div>
		);
	};
};

export default withIntersectionObserver;
