import { CartProductType } from "@/pages/product/[productId]/ProductDetails";
import { products } from "../utils/products";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
        null
    );
    const [cartTotalAmount, setCartTotalAmount] = useState(0);

    console.log("qty", cartTotalQty);
    console.log("amount", cartTotalAmount);

    useEffect(() => {
        const cartItems: any = localStorage.getItem("eShopCartItems");
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(cProducts);
    }, []);

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity;

                        acc.total += itemTotal;
                        acc.qty += item.quantity;

                        return acc;
                    },
                    {
                        total: 0,
                        qty: 0,
                    }
                );

                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        };

        getTotals();
    }, [cartProducts]);

    const handleAddProductToCart = useCallback(
        async (product: CartProductType) => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                toast.error("Authentication required!");
                return;
            }

            console.log("Product object:", product); // Log the entire product object

            const productId = product.id;
            if (!productId) {
                console.error("Product ID is empty");
                toast.error("Product ID is missing");
                return;
            }
            console.log("Adding product to cart:", {
                productId,
                quantity: product.quantity,
            });

            try {
                const response = await fetch("http://127.0.0.1:5000/cart/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        productId: parseInt(productId, 10), // Ensure productId is an integer
                        quantity: product.quantity,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json(); // Get detailed error information
                    console.error("Error response:", errorData);
                    throw new Error(errorData.message || "Failed to add product to cart");
                }

                setCartProducts((prev) => {
                    let updatedCart = prev ? [...prev, product] : [product];
                    toast.success("Product added to cart!");
                    localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
                    return updatedCart;
                });
            } catch (error: any) {
                console.error("Error adding product to cart:", error);
                toast.error(error.message || "Failed to add product to cart");
            }
        },
        []
    );

    const handleRemoveProductFromCart = useCallback(
        (product: CartProductType) => {
            if (cartProducts) {
                const filteredProducts = cartProducts.filter((item) => {
                    return item.id !== product.id;
                });

                setCartProducts(filteredProducts);
                toast.success("Product removed");
                localStorage.setItem(
                    "eShopCartItems",
                    JSON.stringify(filteredProducts)
                );
            }
        },
        [cartProducts]
    );

    const handleCartQtyIncrease = useCallback(
        (product: CartProductType) => {
            let updatedCart;

            if (cartProducts) {
                updatedCart = [...cartProducts];
                const existingIndex = cartProducts.findIndex(
                    (item) => item.id === product.id
                );

                if (existingIndex > -1) {
                    const newQuantity = Math.min(
                        product.quantity + 1,
                        product.stock_quantity
                    );
                    updatedCart[existingIndex].quantity = newQuantity;
                }

                setCartProducts(updatedCart);
                localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            }
        },
        [cartProducts]
    );

    const handleCartQtyDecrease = useCallback(
        (product: CartProductType) => {
            let updatedCart;

            if (product.quantity === 1) {
                return toast.error("Minimum quantity reached");
            }

            if (cartProducts) {
                updatedCart = [...cartProducts];
                const existingIndex = cartProducts.findIndex(
                    (item) => item.id === product.id
                );

                if (existingIndex > -1) {
                    updatedCart[existingIndex].quantity -= 1;
                }

                setCartProducts(updatedCart);
                localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            }
        },
        [cartProducts]
    );

    const handleClearCart = useCallback(async () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            toast.error("Authentication required!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/cart/clear", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                throw new Error(errorData.message || "Failed to clear cart");
            }

            setCartProducts(null);
            setCartTotalQty(0);
            setCartTotalAmount(0);
            localStorage.setItem("eShopCartItems", JSON.stringify(null));
            toast.success("Cart cleared successfully!");
        } catch (error: any) {
            console.error("Error clearing cart:", error);
            toast.error(error.message || "Failed to clear cart");
        }
    }, []);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
    };
    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
};