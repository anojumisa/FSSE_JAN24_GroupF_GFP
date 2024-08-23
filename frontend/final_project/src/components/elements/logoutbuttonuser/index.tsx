import React from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token'); // Adjusted key to 'access_token'

      if (!token) {
        router.push('/login'); // Redirect if token doesn't exist
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('access_token'); // Clear the token from local storage
        toast.success('Logout successful!');
        router.push('/login'); // Redirect to login page after logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
