import React, { useState, useEffect } from "react";
import Navbar from "@/components/layouts/Landing_Page/Navbar";
import ProductCard from "@/components/products/ProductCard";
import Sidebar from "@/components/layouts/Search_Result/sidebar"; // Adjust the import based on your project structure
import { shuffleArray } from "@/utils/shuffleArray"; // Import the shuffle function

interface Product {
	id: string;
	image_url: string;
	name: string;
	price: number;
	stock: number;
	location: string; // Assuming location is a property of Product
}

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

	const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number>(0);
	const [filteredProductItems, setFilteredProductItems] = useState<Product[]>(
		[]
	);

	const fetchProducts = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/products", {
				mode: "cors",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			const shuffledProducts: Product[] = shuffleArray(data.products); // Shuffle the products before setting the state
			setProducts(shuffledProducts);
			setFilteredProductItems(shuffledProducts); // Initialize filtered products
			console.log(data);
		} catch (error) {
			console.error("Error fetching products:", error);
			setProducts([]);
			setFilteredProductItems([]);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		// Filter product items based on selected locations and price
		const filtered = products.filter(
			(item: Product) =>
				(selectedLocations.length === 0 ||
					selectedLocations.includes(item.location)) &&
				(selectedPrice === 0 || item.price <= selectedPrice)
		);
		setFilteredProductItems(filtered);
	}, [selectedLocations, selectedPrice, products]); // Ensure correct dependencies

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProductItems.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="border-slate-950 p-8 mt-16">
			<Navbar />

			<Sidebar
				selectedLocations={selectedLocations}
				setSelectedLocations={setSelectedLocations}
				selectedPrice={selectedPrice}
				setSelectedPrice={setSelectedPrice}
			/>
			<div className="ml-64 p-8">
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{currentProducts.map((product: Product) => (
						<ProductCard key={product.id} data={product} />
					))}
				</div>

				<div className="flex justify-center mt-8">
					<button
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
						className="px-4 py-2 mx-1 bg-amber-400 hover:bg-amber-600 hover:text-white cursor-pointer rounded border border-black w-1/12 transition duration-300 ease-in-out transform hover:scale-105"
					>
						Previous
					</button>
					<button
						onClick={() => paginate(currentPage + 1)}
						disabled={indexOfLastProduct >= filteredProductItems.length}
						className="px-4 py-2 mx-1 bg-amber-400 hover:bg-amber-600 hover:text-white cursor-pointer rounded border border-black w-1/12 transition duration-300 ease-in-out transform hover:scale-105"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}
