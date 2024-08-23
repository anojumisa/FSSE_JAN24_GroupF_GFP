import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "../../types/user/types";
import Navbar from "@/components/layouts/About_Page/MiniNavbar";

interface CartItem {
    id: number;
    product_name: string;
    price: number;
    quantity: number;
    total_price: number;
    image_url: string;
}

interface PaymentPageProps {
    initialCartItems: CartItem[];
}

const PaymentPage: React.FC<PaymentPageProps> = ({ initialCartItems = [] }) => {
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string>("cod");
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [deliveryOption, setDeliveryOption] = useState<string>("drone");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setUserData(data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/cart`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                const data = await response.json();
                console.log("API Response:", data); // Log the entire API response

                if (data.cart_items) {
                    const items = data.cart_items.map((item: any) => ({
                        ...item,
                        price: parseFloat(item.price),
                        total_price: parseFloat(item.total_price),
                    }));
                    setCartItems(items);

                    // Calculate total amount after setting cart items
                    const total = items.reduce(
                        (sum: number, item: CartItem) => sum + item.total_price,
                        0
                    );
                    setTotalAmount(total);
                } else {
                    console.error("cart_items is undefined in the API response");
                    setCartItems([]); // Fallback to an empty array
                    setTotalAmount(0); // Fallback to zero total amount
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setCartItems([]); // Fallback to an empty array in case of error
                setTotalAmount(0); // Fallback to zero total amount in case of error
            } finally {
                setIsLoading(false);
            }
        };

        const fetchData = async () => {
            await fetchUserData();
            await fetchCartItems();
        };

        fetchData();
    }, []);

    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method);
    };

    const handleBankSelection = (bank: string) => {
        setSelectedBank(bank);
    };

    const handleDeliveryOptionChange = (option: string) => {
        setDeliveryOption(option);
    };

    const handleConfirmPayment = async () => {
        if (!paymentMethod || !deliveryOption || cartItems.length === 0) {
            setModalMessage("Please ensure all fields are filled and cart is not empty.");
            setIsModalOpen(true);
            return;
        }

        const orderData = {
            payment_method: paymentMethod,
            delivery_option: deliveryOption,
            total: totalAmount,
            status: "pending",
            total_price: totalAmount,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create_order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify(orderData),
            });
            const data = await response.json();
            console.log("API Response:", data); // Log the entire API response
            if (response.ok) {
                setModalMessage(
                    `Order placed successfully! Order ID: ${data.order_id}`
                );
                router.push({
                    pathname: "/payment_instruction",
                    query: { orderData: JSON.stringify(orderData) },
                });
            } else {
                setModalMessage(`Order placement failed: ${data.message}`);
            }
        } catch (error) {
            setModalMessage(`Order placement failed: ${error.message}`);
        }
        setIsModalOpen(true);
        localStorage.removeItem("cartProducts");
    };

    const closeModal = () => {
        setIsModalOpen(false);
        router.push("/Dashboard_User");
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log("Cart Items:", cartItems); // Log cart items before rendering

    return (
        <div className="bg-slate-800 min-h-screen flex justify-center items-center">
            <Navbar />
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    You're almost there...!
                </h2>

                {/* Delivery Address */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>
                    <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                        <p className="text-lg">
                            {userData?.first_name} {userData?.last_name}
                        </p>
                        <p className="text-gray-600">{userData?.address}</p>
                        <p className="text-gray-600">
                            {userData?.city}, {userData?.state} - {userData?.zip_code}
                        </p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
                    <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center mb-2"
                                >
                                    <p>
                                        {item.product_name} x {item.quantity}
                                    </p>
                                    <p>Rp{item.total_price}</p>
                                </div>
                            ))
                        ) : (
                            <p>No items in the cart</p>
                        )}
                        <hr className="my-4" />
                        <div className="flex justify-between items-center text-lg font-bold">
                            <p>Total:</p>
                            <p>Rp{totalAmount}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Method Options */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                    <label className="block mb-2">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => handlePaymentMethodChange("cod")}
                            className="mr-2 leading-tight"
                        />
                        <span>Cash on Delivery</span>
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="mbanking"
                            checked={paymentMethod === "mbanking"}
                            onChange={() => handlePaymentMethodChange("mbanking")}
                            className="mr-2 leading-tight"
                        />
                        <span>Bank Transfer</span>
                    </label>

                    {/* Bank Selection */}
                    {paymentMethod === "mbanking" && (
                        <div className="mt-4">
                            <label className="block mb-2 font-semibold">Select Bank</label>
                            <select
                                value={selectedBank}
                                onChange={(e) => handleBankSelection(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select Bank</option>
                                <option value="BNI">BNI</option>
                                <option value="BCA">BCA</option>
                                <option value="Mandiri">Mandiri</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Delivery Options */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Delivery Options</h3>
                    <label className="block mb-2">
                        <input
                            type="radio"
                            name="deliveryOption"
                            value="drone"
                            checked={deliveryOption === "drone"}
                            onChange={() => handleDeliveryOptionChange("drone")}
                            className="mr-2 leading-tight"
                        />
                        <span>Drone Delivery</span>
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            name="deliveryOption"
                            value="bicycle"
                            checked={deliveryOption === "bicycle"}
                            onChange={() => handleDeliveryOptionChange("bicycle")}
                            className="mr-2 leading-tight"
                        />
                        <span>Bicycle Delivery</span>
                    </label>
                </div>

                <button
                    onClick={handleConfirmPayment}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
                    disabled={paymentMethod === "mbanking" && !selectedBank}
                >
                    Confirm Order
                </button>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <p
                                className="text-gray-800 text-center mb-4"
                                dangerouslySetInnerHTML={{ __html: modalMessage }}
                            ></p>
                            <button
                                onClick={closeModal}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;