import React, { useState, useEffect } from 'react';
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import Image from "next/image";
import { truncateText } from "@/utils/truncateText";
import SetQuantity from "@/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
    item: CartProductType
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();
    const [productName, setProductName] = useState("");

    const handleRemove = async (product: CartProductType) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/cart/${product.product_id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            if (response.ok) {
                handleRemoveProductFromCart(product);
            } else {
                console.error("Failed to remove product from cart");
            }
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    const fetchProductDetails = async (productId: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/product/${productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            const product = await response.json();
            return product;
        } catch (error) {
            console.error("Error fetching product details:", error);
            return null;
        }
    };

    useEffect(() => {
        const getProductDetails = async () => {
            const product = await fetchProductDetails(item.product_id);
            if (product) {
                setProductName(product.name);
            }
        };

        getProductDetails();
    }, [item.product_id]);

    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.image_url} alt={productName || item.name} fill className="object-contain" />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>
                        <span>{truncateText(productName) || item.name}</span>
                    </Link>
                    <div className="w-[70px]">
                        <button className="text-slate-500 underline" onClick={() => handleRemove(item)}>Remove</button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price)}</div>
            <div className="justify-self-center">
                <SetQuantity cartCounter={true} cartProduct={item} handleQtyDecrease={() => { handleCartQtyDecrease(item) }} handleQtyIncrease={() => { handleCartQtyIncrease(item) }} />
            </div>
            <div className="justify-self-end font-semibold">
                {formatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
}

export default ItemContent;