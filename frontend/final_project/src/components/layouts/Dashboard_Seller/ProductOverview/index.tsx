import React, { useState } from "react";
import { ProductOverviewData } from "../../../../types/seller";

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
	const [currentProduct, setCurrentProduct] =
		useState<ProductOverviewData | null>(null);

	const handleOpenModal = (product: ProductOverviewData) => {
		setCurrentProduct(product);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setCurrentProduct(null);
	};

	return (
		<div className="bg-slate-950 text-amber-400 p-4 rounded">
			<h2 className="text-xl text-white font-semibold mb-4">Product Overview</h2>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b border-gray-200">ID</th>
						<th className="py-2 px-4 border-b border-gray-200">Product Name</th>
						<th className="py-2 px-4 border-b border-gray-200">Quantity</th>
						<th className="py-2 px-4 border-b border-gray-200">Price</th>
						<th className="py-2 px-4 border-b border-gray-200">Actions</th>
					</tr>
				</thead>
				<tbody>
					{overview.map((product) => (
						<tr key={product.id}>
							<td className="py-2 px-4 border-b border-gray-200">{product.id}</td>
							<td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
							<td className="py-2 px-4 border-b border-gray-200">{product.stock_quantity}</td>
							<td className="py-2 px-4 border-b border-gray-200">{product.price}</td>
							<td className="py-2 px-4 border-b border-gray-200">
								<button
									className="bg-lime-400 text-slate-950 px-2 py-1 rounded mr-2 hover:bg-lime-600 hover:text-white"
									onClick={() => handleOpenModal(product)}
								>
									Update
								</button>
								<button
									className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
									onClick={() => onRemoveProduct(product.id)}
								>
									Remove
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{isModalOpen && currentProduct && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded">
						<h2 className="text-xl font-semibold mb-4">Update Product</h2>
						<label>
							Product Name:
							<input
								type="text"
								name="name"
								value={currentProduct.name}
								onChange={(e) =>
									setCurrentProduct({ ...currentProduct, name: e.target.value })
								}
								className="border p-2 rounded mb-2"
							/>
						</label>
						<label>
							Quantity:
							<input
								type="number"
								name="stock_quantity"
								value={currentProduct.stock_quantity}
								onChange={(e) =>
									setCurrentProduct({
										...currentProduct,
										stock_quantity: parseInt(e.target.value, 10),
									})
								}
								className="border p-2 rounded mb-2"
							/>
						</label>
						<label>
							Price:
							<input
								type="number"
								name="price"
								value={currentProduct.price}
								onChange={(e) =>
									setCurrentProduct({
										...currentProduct,
										price: parseFloat(e.target.value),
									})
								}
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
								onClick={() => {
									onUpdateProduct(currentProduct.id, currentProduct);
									handleCloseModal();
								}}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductOverview;
