import { CartProductType } from "@/pages/product/[productId]/ProductDetails";
import Image from "next/image";
import React from "react";

interface ProductImageProps {
    cartProduct: CartProductType,
    product: any
}

const ProductImage: React.FC<ProductImageProps> = ({
    cartProduct,
    product
}) => {
    const image_url = product.image_url;
    console.log("Fetching image URL:", image_url);
    return (
        <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] sm:min-h-[400px]">
            <div className="col-span-5 relative aspect-square">
                <Image 
                    fill 
                    src={image_url} 
                    alt={cartProduct.name} 
                    className="w-full h-full object-contain max-h-[500px] sm:min-h-[400px]" // Added rounded-lg class
                />
            </div>
        </div>
    )
}

export default ProductImage;