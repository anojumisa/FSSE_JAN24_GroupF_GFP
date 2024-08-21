import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next"); // This is important for accessibility

const ProductModal = ({
	isOpen,
	onRequestClose,
	productId,
}: {
	isOpen: boolean;
	onRequestClose: () => void;
	productId: number;
}) => {
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [stockQuantity, setStockQuantity] = useState("");
	
	const [location, setLocation] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const productData = {
			name: productName,
			description: productDescription,
			price: parseFloat(productPrice), // Convert to number
			stock_quantity: parseInt(stockQuantity, 10), // Convert to number
			
			location: location,
		};
		console.log("Sending product data:", productData);

		try {
			const token = localStorage.getItem("token");
			const response = await fetch("http://127.0.0.1:5000/products", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(productData),
				credentials: "include",
			});
			console.log("Response status:", response.status);

			if (response.ok) {
				const result = await response.json();
				console.log(result.message);
				onRequestClose(); // Close the modal after successful submission
			} else {
				const errorResult = await response.json();
				console.error("Failed to add product:", errorResult.message);
				console.error("Error details:", errorResult.details);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Add New Product"
			className="modal w-1/2 h-auto bg-gray-100 p-8 rounded-lg"
			overlayClassName="overlay"
		>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold text-black-600 sm:text-3xl">
					Add New Product
				</h2>
				<button
					onClick={onRequestClose}
					className="text-2xl text-gray-500 hover:text-gray-700 focus:outline-none "
				>
					&times;
				</button>
			</div>

			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						value={productName}
						className="w-full rounded-lg border-yellow-100 mt-3 mb-3 p-3 pe-12 text-sm shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
						placeholder="Enter product name"
						onChange={(e) => setProductName(e.target.value)}
						required
					/>
				</div>
				<div className=" ">
					<input
						type="text"
						className="w-full rounded-lg border-gray-50 mt-3 mb-3 p-3 pe-12 text-sm shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
						placeholder="Enter product description"
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
						required
					/>
				</div>
				<div className="flex">
					<span className="inline-flex items-center mt-3 mb-3 px-3 text-sm text-gray-900 bg-gray-50 border border-e-0 border-gray-300 rounded-s-md  dark:text-gray-400 dark:border-gray-600">
						Rp.
					</span>
					<input
						type="number"
						className="rounded-none rounded-e-lg bg-gray-50 mt-3 mb-3 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-2 focus:ring-amber-400 focus:outline-none border border-e-0 border-gray-300"
						placeholder="Enter product price"
						value={productPrice}
						onChange={(e) => setProductPrice(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						type="number"
						className="w-full rounded-lg border-yellow-100 mt-3 mb-3 p-4 pe-12 text-sm shadow-sm focus:ring-amber-400 focus:outline-none"
						placeholder="Enter stock quantity"
						value={stockQuantity}
						onChange={(e) => setStockQuantity(e.target.value)}
						required
					/>
				</div>
				{/* <div>
					<input type="file" onChange={handleFileChange} />
				</div> */}
				{/* <div>
					<input
						type="text"
						className="w-full rounded-lg border-yellow-100 mt-3 mb-3 p-4 pe-12 text-sm shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
						placeholder="Enter image URL"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</div> */}
				<div>
					<input
						type="text"
						className="w-full rounded-lg border-yellow-100 mt-3 mb-3 p-4 pe-12 text-sm shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
						placeholder="Enter location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
				<div className="flex justify-evenly mt-8">
					<button
						type="submit"
						className="bg-amber-500 w-36 text-white font-bold py-2 px-4 rounded hover:bg-amber-900 hover:text-white transition-transform duration-300 ease-in-out"
						
					>
						Submit
					</button>
					<button
						type="button"
						onClick={onRequestClose}
						className="bg-red-500 w-36 text-white font-bold py-2 px-4 rounded hover:bg-red-900 transition-transform duration-600 ease-in-out"
					>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ProductModal;
