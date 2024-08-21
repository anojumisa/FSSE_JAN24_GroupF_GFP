import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Dashboard_Seller/Sidebar";
import TopButtons from "../../components/layouts/Dashboard_Seller/TopButtons";
import Notification from "../../components/layouts/Dashboard_Seller/Notifications";
import LogoutButton from "@/components/elements/logoutbuttonseller";
import Orders from "../../components/layouts/Dashboard_Seller/Orders";
import ProductOverview from "../../components/layouts/Dashboard_Seller/ProductOverview";
import StoreInfo from "../../components/layouts/Dashboard_Seller/StoreInfo";
import {
	Order,
	ProductOverviewData,
	StoreInfo as StoreInfoType,
} from "../../types/seller"; // Adjust the path as necessary
import ProductModal from "@/components/fragments/ProductModal";
import SellerNavbar from "../../components/layouts/Dashboard_Seller/navbar";

const Dashboard = () => {
	const [orders, setOrders] = useState<Order[] | null>(null);
	const [overview, setOverview] = useState<ProductOverviewData[]>([]); // Initialize to an empty array
	const [storeInfo, setStoreInfo] = useState<StoreInfoType | null>(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/store/orders`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				console.log("Orders:", data.orders);
				setOrders(data.orders);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};

		const fetchOverview = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/store/products_overview`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				console.log("Product Overview:", data);

				if (data.products && Array.isArray(data.products)) {
					setOverview(data.products);
				} else {
					console.error(
						"Fetched overview data does not contain products array:",
						data
					);
					setOverview([]);
				}
			} catch (error) {
				console.error("Error fetching product overview:", error);
			}
		};

		const fetchStoreInfo = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/store/info`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				console.log("Store Info:", data);
				setStoreInfo(data);
			} catch (error) {
				console.error("Error fetching store info:", error);
			}
		};

		fetchOrders();
		fetchOverview();
		fetchStoreInfo();
	}, []);

	const [products, setProducts] = useState<ProductOverviewData[]>(overview);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductOverviewData | null>(null);

	const handleUpdateProduct = async (
		id: number,
		updatedProduct: { name: string; stock_quantity: number; price: number }
	) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/update_product/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedProduct),
				}
			);

			if (response.ok) {
				const data = await response.json();
				setProducts(
					products.map((product) =>
						product.id === id ? data.product : product
					)
				);
			} else {
				console.error("Failed to update product");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleRemoveProduct = async (id: number) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/remove_product/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token here
					},
				}
			);

			if (response.ok) {
				setProducts(products.filter((product) => product.id !== id));
			} else {
				console.error("Failed to remove product");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleUpdateStoreInfo = (updatedStoreInfo: StoreInfoType) => {
		setStoreInfo(updatedStoreInfo);
	};

	const openModal = (product: ProductOverviewData) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

	const openAddProductModal = () => {
		setIsAddProductModalOpen(true);
	};

	const closeAddProductModal = () => {
		setIsAddProductModalOpen(false);
	};

	return (
		<div>
			{/* Navbar */}
			<SellerNavbar storeName={storeInfo?.store_name || "Your Store"} />

			{/* Adjust the padding-top to match the height of the navbar */}
			<div className="flex pt-20">
				<Sidebar onAddProduct={openAddProductModal} />
				<div className="flex-1 p-6">
					<div className="flex justify-between mb-6">
						<TopButtons />
						<div className="flex space-x-4">
							<Notification
								storeName={storeInfo?.store_name || "Your Store"}
								storeImage={storeInfo?.image_url || ""}
							/>
							<LogoutButton />
						</div>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<StoreInfo
							storeInfo={storeInfo}
							onUpdateStoreInfo={handleUpdateStoreInfo}
						/>
						<Orders orders={orders} />
						<div>
							<ProductOverview
								overview={overview}
								onUpdateProduct={(id) => {
									const product = products.find((p) => p.id === id);
									if (product) openModal(product);
								}}
								onRemoveProduct={handleRemoveProduct} // Use the handleRemoveProduct function
							/>
						</div>
					</div>
				</div>
			</div>
			<ProductModal
				isOpen={isAddProductModalOpen}
				onRequestClose={closeAddProductModal}
				productId={0} // Replace 0 with the actual product ID
			/>
		</div>
	);
};

export default Dashboard;
