import React, { useState } from "react";
import ProductModal from "../../../fragments/ProductModal"; // Adjust the import path as necessary
import { FaPlus } from "react-icons/fa";

const TopButtons = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<div className="flex space-x-4">
				<button
					className="bg-amber-400 text-black py-2 px-4 rounded flex items-center"
					onClick={openModal}
				>
					<FaPlus className="mr-2" />
					Add New Product
				</button>
			</div>

			<ProductModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				productId={0}
			/>
		</div>
	);
};

export default TopButtons;
