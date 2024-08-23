import React, { useState } from "react";
import { ProductOverviewData } from "../../../../types/seller";
import toast from "react-hot-toast";

interface ProductOverviewProps {
	overview: ProductOverviewData[];
	onUpdateProduct: (id: number, updatedProduct: ProductOverviewData) => void;
	onRemoveProduct: (id: number) => void;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({
	overview,
	onUpdateProduct,
	onRemoveProduct,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [currentProduct, setCurrentProduct] =
		useState<ProductOverviewData | null>(null);
	const [productIdToRemove, setProductIdToRemove] = useState<number | null>(
		null
	);
	const [file, setFile] = useState<File | null>(null);

	const handleOpenModal = (product: ProductOverviewData) => {
		setCurrentProduct(product);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setCurrentProduct(null);
		setFile(null);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const handleSaveChanges = async () => {
		if (currentProduct) {
			try {
				const token = localStorage.getItem("token");

				// Upload the image if a file is selected
				let imageUrl = currentProduct.image_url;
				if (file) {
					const formData = new FormData();
					formData.append("image", file);

					const uploadResponse = await fetch("http://127.0.0.1:5000/upload", {
						method: "POST",
						body: formData,
					});

					if (!uploadResponse.ok) {
						throw new Error(`HTTP error! status: ${uploadResponse.status}`);
					}

					const uploadData = await uploadResponse.json();
					imageUrl = uploadData.url;
				}

				// Update the product with the new image URL
				const updatedProduct = { ...currentProduct, image_url: imageUrl };

				const response = await fetch(
					`http://127.0.0.1:5000/update_product/${currentProduct.id}`,
					{
						method: "PUT",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(updatedProduct),
						credentials: "include",
					}
				);

				const updatedProductData = await response.json();
				if (response.ok) {
					onUpdateProduct(currentProduct.id, updatedProductData);
					handleCloseModal();
				} else {
					toast.error("Error: " + updatedProductData.message);
					console.error("Failed to update product");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (currentProduct) {
			setCurrentProduct({
				...currentProduct,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleOpenConfirmModal = (id: number) => {
		setProductIdToRemove(id);
		setIsConfirmModalOpen(true);
	};

	const handleCloseConfirmModal = () => {
		setIsConfirmModalOpen(false);
		setProductIdToRemove(null);
	};

	const handleConfirmRemove = async () => {
		if (productIdToRemove !== null) {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					`http://127.0.0.1:5000/remove_product/${productIdToRemove}`,
					{
						method: "DELETE",
						mode: "cors",
						headers: {
							Authorization: `Bearer ${token}`,
						},
						credentials: "include",
					}
				);

				if (response.ok) {
					onRemoveProduct(productIdToRemove);
					handleCloseConfirmModal();
				} else {
					console.error("Failed to remove product");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};

	return (
		<div className="bg-slate-950 text-amber-400 p-4 rounded">
			<h2 className="text-xl text-white font-semibold mb-4">Product Overview</h2>
			{overview.map((product) => (
				<div key={product.id} className="mb-4 ">
					{product.image_url && (
						<>
							{console.log("Fetching image URL:", product.image_url)}
							<img
								src={product.image_url}
								alt={product.name}
								className="product-image"
							/>
						</>
					)}
					<p>ID: {product.id}</p>
					<p>Nama Produk: {product.name}</p>
					<p>Jumlah Produk: {product.stock_quantity}</p>
					<p>Harga: {product.price}</p>
					<button
						className="bg-lime-400 text-slate-950 px-2 py-1 rounded mr-2 hover:bg-lime-600 hover:text-white"
						onClick={() => handleOpenModal(product)}
					>
						Update
					</button>
					<button
						className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
						onClick={() => handleOpenConfirmModal(product.id)}
					>
						Remove
					</button>
				</div>
			))}

			{isModalOpen && currentProduct && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded">
						<h2 className="text-xl font-semibold mb-4">Update Product</h2>
						<label>
							Nama Produk:
							<input
								type="text"
								name="name"
								value={currentProduct.name}
								onChange={handleChange}
								className="border p-2 rounded mb-2"
							/>
						</label>
						<label>
							Jumlah Produk:
							<input
								type="number"
								name="stock_quantity"
								value={currentProduct.stock_quantity}
								onChange={handleChange}
								className="border p-2 rounded mb-2"
							/>
						</label>
						<label>
							Harga:
							<input
								type="number"
								name="price"
								value={currentProduct.price}
								onChange={handleChange}
								className="border p-2 rounded mb-2"
							/>
						</label>
						<label>
							Gambar:
							<input
								type="file"
								name="image"
								onChange={handleFileChange}
								className="border p-2 rounded mb-2"
							/>
						</label>
						<div className="flex justify-end">
							<button
								className="bg-gray-500 text-white px-2 py-1 rounded mr-2"
								onClick={handleCloseModal}
							>
								Cancel
							</button>
							<button
								className="bg-blue-500 text-white px-2 py-1 rounded"
								onClick={handleSaveChanges}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			{isConfirmModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded">
						<h2 className="text-xl font-semibold mb-4">Confirm Removal</h2>
						<p>Are you sure you want to remove this item?</p>
						<div className="flex justify-end">
							<button
								className="bg-gray-500 text-white px-2 py-1 rounded mr-2"
								onClick={handleCloseConfirmModal}
							>
								Cancel
							</button>
							<button
								className="bg-red-500 text-white px-2 py-1 rounded"
								onClick={handleConfirmRemove}
							>
								Remove
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductOverview;
