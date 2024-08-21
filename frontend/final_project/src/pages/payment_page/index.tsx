import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '../../types/user/types';

const PaymentPage: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('mbanking');
  const [selectedBank, setSelectedBank] = useState<string>(''); // State for selected bank
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    const cartItems = JSON.parse(localStorage.getItem('eShopCartItems') || '[]');
    setCartProducts(cartItems);

    const totalAmount = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    setCartTotalAmount(totalAmount);
  }, [router]);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleBankSelection = (bank: string) => {
    setSelectedBank(bank);
  };

  const handleConfirmPayment = () => {
    if (paymentMethod === 'cod') {
      setModalMessage('Order received. You will be redirected to your dashboard.');
    } else if (paymentMethod === 'mbanking') {
      setModalMessage(`
        <strong style="font-size: 1.2em;">Payment Instruction</strong><br/><br/>
        Terima kasih atas kepercayaan anda.<br/>
        segera selesaikan pembayaran anda sebesar ₹${cartTotalAmount} ke rekening bersama Localbites dibawah ini:<br/><br/>
        BCA A.N. Localbites 50012312<br/><br/>
        jika anda sudah menyelesaikan transaksi, resi akan segera dikirimkan ke email anda dalam kurun waktu 1x5 jam setelah anda mengkonfirmasi pembayaran anda.
      `);
    }
    setIsModalOpen(true);

    localStorage.removeItem('eShopCartItems');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/Dashboard_User');
  };

  if (!userData || !cartProducts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">You're almost there...!</h2>

        {/* Delivery Address */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>
          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
            <p className="text-lg">{userData.first_name} {userData.last_name}</p>
            <p className="text-gray-600">{userData.address}</p>
            <p className="text-gray-600">{userData.city}, {userData.state} - {userData.zip_code}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
            {cartProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center mb-3">
                <p className="text-lg">{product.name}</p>
                <p className="text-lg">{product.quantity} x ₹{product.price}</p>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between items-center text-lg font-bold">
              <p>Total:</p>
              <p>₹{cartTotalAmount}</p>
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
              checked={paymentMethod === 'cod'}
              onChange={() => handlePaymentMethodChange('cod')}
              className="mr-2 leading-tight"
            />
            <span>Cash on Delivery</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="mbanking"
              checked={paymentMethod === 'mbanking'}
              onChange={() => handlePaymentMethodChange('mbanking')}
              className="mr-2 leading-tight"
            />
            <span>Mbanking</span>
          </label>

          {/* Bank Selection */}
          {paymentMethod === 'mbanking' && (
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

        <button
          onClick={handleConfirmPayment}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
          disabled={paymentMethod === 'mbanking' && !selectedBank} // Disable if Mbanking and no bank selected
        >
          Confirm Payment
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <p className="text-gray-800 text-center mb-4" dangerouslySetInnerHTML={{ __html: modalMessage }}></p>
              <button
                onClick={closeModal}
                className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
