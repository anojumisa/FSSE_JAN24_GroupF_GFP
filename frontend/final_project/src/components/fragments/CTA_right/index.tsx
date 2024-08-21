import Button from "@/components/elements/button";
import { useEffect, useRef } from "react";
import ImageComponent from "./ImageComponent";

interface SectionProps {
	title: string;
	description: string;
	firstLink: string;
	secondLink: string;
	buttonText: string;
	buttonLink: string;
	bulletPoints?: string[]; // Make bulletPoints optional
}

const CTA_Right: React.FC<SectionProps> = ({
	title,
	description,
	firstLink,
	secondLink,
	buttonText,
	buttonLink,
	bulletPoints = [], 
}) => {
	const imageRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate");
					} else {
						entry.target.classList.remove("animate");
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		if (imageRef.current) {
			observer.observe(imageRef.current);
		}

		return () => {
			if (imageRef.current) {
				observer.unobserve(imageRef.current);
			}
		};
	}, []);

	return (
		<section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 mt-10 mb-10 shadow-2xl h-[30rem]">
			
			<div className="p-8 md:p-12 lg:px-16 lg:py-12">
				<div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
					<h2 className="text-2xl font-bold text-slate-700 md:text-3xl">
						{title}
					</h2>
					<p className="hidden text-gray-700 md:mt-4 md:block text-lg">
						{description}
					</p>

					<ul className="list-none text-gray-700 md:mt-4">
						{bulletPoints.map((point, index) => (
							<li key={index} className="flex items-center">
								<svg
									className="w-10 h-7 mr-2 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									></path>
								</svg>
								{point}
							</li>
						))}
					</ul>
					<div className="mt-4 md:mt-8">
						<Button name={buttonText} href={buttonLink} />
					</div>
				</div>
			</div>
			<div className="relative h-56 w-full sm:h-full">
				<a className="absolute inset-0 h-full w-full object-cover sm:h-full rounded-full bg-black/5 ltr:md:rounded-l-none rtl:md:rounded-r-none z-10" />
				<ImageComponent firstLink={firstLink} secondLink={secondLink} />
			</div>
		</section>
	);
};

export default CTA_Right;
