import React, { useState } from "react";
import Link from "next/link";
import { HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";
import { FaPlus, FaEdit } from "react-icons/fa";

const Sidebar = ({ onAddProduct }: { onAddProduct: () => void }) => {
	const [isMinimized, setIsMinimized] = useState(false);

	const toggleSidebar = () => {
		setIsMinimized(!isMinimized);
	};

	return (
		<div
			className={`relative space-y-9 p-4 bg-amber-400 h-screen ${
				isMinimized ? "w-16" : "w-64"
			}`}
		>
			<button
				onClick={toggleSidebar}
				className="absolute cursor-pointer top-4 right-4 mb-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none  "
			>
				{isMinimized ? (
					<HiArrowRightCircle size={50} />
				) : (
					<HiArrowLeftCircle size={50} />
				)}
			</button>
			{!isMinimized && (
				<>
					<Link href="/">
						<img
							src="localbites_logo.png"
							alt="localbites logo"
							className="w-32"
						/>
					</Link>
					<nav>
						<ul className="space-y-6">
							<li className="mb-2 flex items-center">
								<FaPlus className="mr-2" />
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										onAddProduct();
									}}
									className="text-gray-700 hover:text-gray-900 text-xl font-bold"
								>
									Add New Product
								</a>
							</li>
							<li className="flex items-center">
								<FaEdit className="mr-2" />
								<a
									href="*"
									className="text-gray-700 hover:text-gray-900 text-xl font-bold"
								>
									Edit your store info
								</a>
							</li>
						</ul>
					</nav>
				</>
			)}
		</div>
	);
};

export default Sidebar;
