import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next"); // This is important for accessibility

const ProductModal = ({
	isOpen,
	onRequestClose,
}: {
	isOpen: boolean;
	onRequestClose: () => void;
}) => {
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [stockQuantity, setStockQuantity] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [location, setLocation] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const productData = {
			name: productName,
			description: productDescription,
			price: parseFloat(productPrice), // Convert to number
			stock_quantity: parseInt(stockQuantity, 10), // Convert to number
			image_url: imageUrl,
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
			className="modal"
			overlayClassName="overlay"
		>
			<h2>Add New Product</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Product Name</label>
					<input
						type="text"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Product Description</label>
					<input
						type="text"
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Product Price</label>
					<input
						type="number"
						value={productPrice}
						onChange={(e) => setProductPrice(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Stock Quantity</label>
					<input
						type="number"
						value={stockQuantity}
						onChange={(e) => setStockQuantity(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Image URL</label>
					<input
						type="text"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</div>
				<div>
					<label>Location</label>
					<input
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
				
				<button type="submit">Submit</button>
				<button type="button" onClick={onRequestClose}>
					Cancel
				</button>
			</form>
		</Modal>
	);
};

export default ProductModal;
