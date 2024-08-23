import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface OrderData {
    payment_method: string;
    delivery_option: string;
    total: number;
    status: string;
    total_price: number;
}

const PaymentInstructionPage: React.FC = () => {
    const router = useRouter();
    const [orderData, setOrderData] = useState<OrderData | null>(null);

    useEffect(() => {
        if (router.query.orderData) {
            const parsedOrderData = JSON.parse(router.query.orderData as string);
            setOrderData(parsedOrderData);
        }
    }, [router.query.orderData]);

    const handleBackToDashboard = () => {
        router.push("/Dashboard_User");
    };

    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-slate-800 min-h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Payment Instructions</h2>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
                    <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                        <p>Payment Method: {orderData.payment_method.toUpperCase()}</p>
                        <p>Delivery Option: {orderData.delivery_option.toLocaleUpperCase()}</p>
                        <p>Total Price: <span className="font-bold underline text-red-700">Rp{orderData.total_price}</span></p>
                        <p>Status: {orderData.status}</p>
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                    <p>Please follow the instructions below to complete your payment:</p>
                    <ol className="list-decimal list-inside mt-2">
                        <li>Transfer the total amount to the following bank account: 1234567890 (BCA)</li>
                        <li>After transferring, please upload the proof of payment in the payment confirmation page</li>
                        <li>Wait for the admin to confirm your payment</li>
                    </ol>
                    
                </div>
                <button
                    onClick={handleBackToDashboard}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PaymentInstructionPage;