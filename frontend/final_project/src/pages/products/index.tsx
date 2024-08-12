import Navbar from "@/components/layouts/Landing_Page/Navbar";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/utils/products";
import Container from "postcss/lib/container";

export default function Products() {
    return (
        <div className="p-8">
            <div className="mb-20">
                <Navbar />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {products.map((products:any) => (
                    <ProductCard data={products} />
                ))}

            </div>                
        </div>
    )
}