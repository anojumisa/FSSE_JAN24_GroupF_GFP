import Navbar from "@/components/layouts/Landing_Page/Navbar";
import ProductCard from "@/components/products/ProductCard";
import { useEffect, useState } from "react";
import { shuffleArray } from "@/utils/shuffleArray"; // Import the shuffle function

interface Product {
	id: string;
	image_url: string;
	name: string;
	price: number;
	stock: number;
}

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

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
			setProducts(shuffleArray(data.products)); // Shuffle the products before setting the state
			console.log(data);
		} catch (error) {
			console.error("Error fetching products:", error);
			setProducts([]);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="p-8">
			<div className="mb-20">
				<Navbar />
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{currentProducts.map((product: Product) => (
					<ProductCard key={product.id} data={product} />
				))}
			</div>

			<div className="flex justify-center mt-8">
				<button
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-4 py-2 mx-1 bg-amber-400 hover:bg-amber-600 hover:text-white cursor-pointer rounded border border-black w-1/12 transition duration-300 ease-in-out transform hover:scale-105  "
				>
					Previous
				</button>
				<button
					onClick={() => paginate(currentPage + 1)}
					disabled={indexOfLastProduct >= products.length}
					className="px-4 py-2 mx-1 bg-amber-400 hover:bg-amber-600 hover:text-white cursor-pointer rounded border border-black w-1/12 transition duration-300 ease-in-out transform hover:scale-105 "
				>
					Next
				</button>
			</div>
		</div>
	);
}
