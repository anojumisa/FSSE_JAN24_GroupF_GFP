import ProductCard from "@/components/fragments/ProductCard";
import CardCategoryTwo from "@/components/fragments/CategoryCardTwo";

interface Product {
	id: number;
	name: string;
	description: string;
	descriptiontwo: string;
	price: number;
	image_url: string;
}

const ProductCardCategoryTwo: React.FC = () => {
	return (
		<div className="grid grid-cols-5">
			<CardCategoryTwo
				title="Indulge in Local Flavors"
				description="Explore a curated selection of the most popular savory treats from the region"
				descriptiontwo="From local favorites to unique dishes, explore flavors that pack a punch."
				buttonText="Explore Savory Treats!"
			/>
			<ProductCard
				name="Pempek Lenjer"
				price={"4.9k"}
				onAddToCart={() => {}}
				link="/product/55"
				image="https://storage.googleapis.com/localbites_storage_2/lenjer.jpeg"
			/>
			<ProductCard
				name="Pempek Telor"
				price={"10k"}
				onAddToCart={() => {}}
				link="/product/10"
				image="https://storage.googleapis.com/localbites_storage/telor-kecil-web-2.jpg"
			/>
			<ProductCard
				name="Retak Tenggiri"
				price={"48k"}
				onAddToCart={() => {}}
				link="/product/48"
				image="https://storage.googleapis.com/localbites_storage_2/tenggiri.jpeg"
			/>
			<ProductCard
				name="Ikan Roa Rica"
				price={"44.5k"}
				onAddToCart={() => {}}
				link="/product/64"
				image="https://storage.googleapis.com/localbites_storage_2/ikanroa-siap-makan.jpg"
			/>
		</div>
	);
};

export default ProductCardCategoryTwo;
