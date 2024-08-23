import React from "react";
import { useRouter } from "next/router";
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButtonUser = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				router.push("/store_login");
				return;
			}

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/store_logout`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				localStorage.removeItem("token");
				router.push("/store_login");
			} else {
				console.error("Logout failed");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<button
			onClick={handleLogout}
			className="bg-rose-700 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center"
		>
			<FaSignOutAlt className="mr-2" />
			Logout
		</button>
	);
};

export default LogoutButtonUser;
