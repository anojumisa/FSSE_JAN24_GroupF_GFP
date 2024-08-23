import React from "react";

// Define the props interface
interface CategoryCardProps {
	title: string;
	description: string;
	descriptiontwo: string;
	buttonText: string;
}

// Modify the CategoryCard component to accept props
const CategoryCard: React.FC<CategoryCardProps> = ({
	title,
	description,
	descriptiontwo,
	buttonText,
}) => {
	return (
		<div className="mx-auto my-8 bg-black p-8 text-white sm:max-w-lg sm:rounded-xl md:py-16 lg:mx-0 lg:max-w-xs">
			<h2 className="mb-6 max-w-lg text-3xl font-bold sm:text-4xl">{title}</h2>
			<ul className="mb-8 flex max-w-xl flex-wrap gap-4">
				<li className="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="shrink-0 h-6 w-6 text-green-500"
					>
						<path
							fillRule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="text-gray-300">{description}</p>
				</li>
				<li className="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="shrink-0 h-6 w-6 text-green-500"
					>
						<path
							fillRule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="text-gray-300">{descriptiontwo}</p>
				</li>
			</ul>
			<button className="focus:outline-4 rounded-xl  px-4 py-3 font-medium text-white italic text-xl shadow-md outline-white transition text-left">
				{buttonText}
			</button>
		</div>
	);
};

export default CategoryCard;
