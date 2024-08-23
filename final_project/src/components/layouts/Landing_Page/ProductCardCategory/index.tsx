import React, { useEffect, useState } from "react";
import ProductCard from "@/components/fragments/ProductCard";
import CardCategory from "@/components/fragments/CategoryCard";

interface Product {
	id: number;
	name: string;
	description: string;
	descriptiontwo: string;
	price: number;
	image_url: string;
}

const ProductCardCategory: React.FC = () => {
	return (
		<div className="grid grid-cols-5">
			<CardCategory
				title="Delight Your Sweet Tooth"
				description="Delight in the region’s favorite sweets, perfect for any occasion."
				descriptiontwo="From traditional delights to innovative confections"
				buttonText="Find Sweets Nearby!"
			/>
			<ProductCard
				name="Brownies Panggang"
				price={"66k"}
				onAddToCart={() => {}}
				link="/product/25"
				image="https://storage.googleapis.com/localbites_storage/brownis-2.png"
			/>
			<ProductCard
				name="Kenari Cokelat"
				price={"48k"}
				onAddToCart={() => {}}
				link="/product/67"
				image="https://storage.googleapis.com/localbites_storage_2/kenari-coklat.jpg"
			/>
			<ProductCard
				name="Chocoberry"
				price={"45k"}
				onAddToCart={() => {}}
				link="/product/88"
				image="https://storage.googleapis.com/localbites_storage_2/chocoberry.jpg"
			/>
			<ProductCard
				name="Choco Roll"
				price={"52.5k"}
				onAddToCart={() => {}}
				link="/product/80"
				image="https://storage.googleapis.com/localbites_storage_2/choco_roll.jpg"
			/>
		</div>
	);
};

export default ProductCardCategory;
