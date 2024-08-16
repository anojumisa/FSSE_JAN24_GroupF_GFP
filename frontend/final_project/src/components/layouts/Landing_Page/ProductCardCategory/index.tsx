import React, { useEffect, useState } from "react";
import ProductCard from "@/components/fragments/ProductCard";
import CardCategory from "@/components/fragments/CategoryCard";

interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	image_url: string;
}

const ProductCardCategory: React.FC = () => {
	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		const fetchFeaturedProduct = async () => {
			try {
				const response = await fetch("http://127.0.0.1:5000/featured-products");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				if (data.length > 0) {
					setProduct(data[0]); // Fetch only the first product
				}
			} catch (error) {
				console.error("Error fetching featured product:", error);
			}
		};

		fetchFeaturedProduct();
	}, []);

	return (
		<div className="grid grid-cols-5">
			<CardCategory />
			{product && <ProductCard key={product.id} product={product} />}
		</div>
	);
};

export default ProductCardCategory;
