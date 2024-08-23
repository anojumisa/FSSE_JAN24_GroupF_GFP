import Button from "@/components/products/Button";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CartClient = () => {
    const { handleClearCart, cartTotalAmount } = useCart();
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/cart`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                const data = await response.json();
                setCartProducts(data.cart_items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <Link
                        href={"/products"}
                        className="text-slate-500 flex items-center gap-1 mt-2"
                    >
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }
	

    return (
        <div>
            <div className="text-2xl text-center">Shopping Cart</div>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>
            <div>
                {cartProducts &&
                    cartProducts.map((item) => {
                        return <ItemContent key={item.id} item={item} />;
                    })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <div className="w-[90px]">
                        <Button
                            label="Clear Cart"
                            onClick={() => {
                                handleClearCart();
                            }}
                            small
                            outline
                        />
                    </div>
                    <div className="text-sm flex flex-col gap-1 items-start">
                        <div className="flex justify-between w-full text-base font-semibold">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotalAmount)}</span>
                        </div>
                        <p className="text-slate-500">
                            Taxes and Shipping calculated at checkout
                        </p>
                    </div>
                </div>

                <div className="flex justify-end items-end gap-4">
                    <Button
                        label="Checkout"
                        onClick={() => {
							router.push("/payment_page");
						}}
                        disabled={loading}
                    />
                    {message && <p className="mt-2 text-red-500">{message}</p>}
                    <Link
                        href={"/products"}
                        className="text-slate-500 flex items-center gap-1 mt-2"
                    >
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartClient;