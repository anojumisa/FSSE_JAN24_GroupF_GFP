import Navbar from "@/components/layouts/Landing_Page/Navbar";
import ProductCard from "@/components/products/ProductCard";
import { useEffect, useState } from "react";
// import { products } from "@/utils/products";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
  }

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
        const response = await fetch('http://127.0.0.1:5000/products', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(values)
        });
        
        const data = await response.json();
        setProducts(data.products);
        console.log(data);

        } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        }
    };
        useEffect(() => {
            fetchProducts();
        }, []);
    
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