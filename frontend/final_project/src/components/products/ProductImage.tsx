import { CartProductType } from "@/pages/product/ProductDetails";
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
    return (
        <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] max-h-[300px]
        sm:min-h-[400px]">
            <div className="col-span-5 relative aspect-square">
                <Image fill src={cartProduct.image} alt={cartProduct.name} className="w-full h-full object-contain max-h-[500px] max-h-[300px] sm:min-h-[400px]"/>

            </div>
        </div>
    )
}

export default ProductImage;