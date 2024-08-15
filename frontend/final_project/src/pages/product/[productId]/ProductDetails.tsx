import Navbar from "@/components/layouts/Landing_Page/Navbar";
import Button from "@/components/products/Button";
import ProductImage from "@/components/products/ProductImage";
import SetQuantity from "@/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    quantity: number,
    price: number,
    image: string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
    
}

const ProductDetails:React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const { cartTotalQty } = useCart();
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        quantity: 1,
        price: product.price,
        image: product.image
    })

    const router = useRouter()

    // console.log("Received Product in ProductDetails:", product);
    // console.log(cartTotalQty);
    console.log(cartProducts)

    useEffect(() => {
        setIsProductInCart(false)

        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if(existingIndex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [cartProducts]);

    if (!product) {
        return <div>No product found.</div>;
    }

    const handleQtyIncrease = useCallback (() => {  
        // Max Product (Opsional)
        if (cartProduct.quantity === 99) {
            return;
        }

        setCartProduct((prev) => ({
            ...prev, 
            quantity: prev.quantity + 1
        }));
    }, [cartProduct]);

    const handleQtyDecrease = useCallback (() => {

        if (cartProduct.quantity === 1) {
            return;
        }

        setCartProduct((prev) => ({
            ...prev, 
            quantity: prev.quantity - 1
        }));      
    }, [cartProduct]);

    return (
        <>
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImage cartProduct={cartProduct} product={product} />
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <h2 className="mb-2 text-3xl font-medium text-slate-700">{product.name}</h2>
            <Horizontal /> 
            <div className="mt-2 text-justify">{product.description}</div>                
            <Horizontal />
            <div>
                <span className="font-semibold">CATEGORY:</span> {product.category}
            </div>
            <div>
                <span className="font-semibold">BRAND:</span> {product.brand}
            </div>
            <div className={product.inStock ? "text-blue-400" : "text-red-400"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
            <Horizontal />
            {isProductInCart ? <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle className="text-teal-400" size={20}/>
                <span>Product added to cart</span>
            </p>
            <div>
                <Button label="View Cart" outline onClick={() => {
                    router.push('/cart')
                }}/>
            </div>
            </> : <>
            <SetQuantity cartProduct={cartProduct} handleQtyIncrease={handleQtyIncrease} handleQtyDecrease={handleQtyDecrease}/>
            <Horizontal />
            <div className="max-w-[300px]">
                <Button outline label="Add to cart" onClick={() => handleAddProductToCart(cartProduct)}/>
            </div>            
            </>}
        </div>
        </div>                
        </>
    )
}

export default ProductDetails;