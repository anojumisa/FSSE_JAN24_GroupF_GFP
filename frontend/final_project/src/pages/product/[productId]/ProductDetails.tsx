import Navbar from "@/components/layouts/Landing_Page/Navbar";
import Button from "@/components/products/Button";
import ProductImage from "@/components/products/ProductImage";
import SetQuantity from "@/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    stock_quantity: number,
    image_url: string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

const ProductDetails:React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const { cartTotalQty } = useCart();
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product?.id || '',
        name: product?.name || '',
        description: product?.description || '',
        quantity: 1,
        stock_quantity: product?.stock_quantity || 0,
        price: product?.price || 0,
        image_url: product?.image_url || ''
    })

    const router = useRouter()

    console.log("Received Product in ProductDetails:", product);
    console.log(cartTotalQty);
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

        if (cartProduct.quantity >= cartProduct.stock_quantity) {
            toast.error("Max quantity reached");
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
        <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} product={product} />
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="mb-2 text-3xl font-medium text-slate-700">{product.name}</h2>
                <Horizontal /> 
                <div className="mt-2 text-justify text-xl font-medium text-slate-700">{formatPrice(product.price)}</div>                
                <Horizontal />
                <div className="mt-2 text-justify">{product.description}</div>                
                <Horizontal />
                <div>
                    <span className="font-semibold">STOCK:</span> {product.stock_quantity}
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