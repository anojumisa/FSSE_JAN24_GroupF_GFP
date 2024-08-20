import React, { useState } from "react";
import { User } from "../../../../types/user/types"; // Adjust the import path if needed

interface BiodataProps {
	user: UserType;
	onUpdate: (updatedUser: UserType) => void;
}

interface UserType {
	first_name: string;
	last_name: string;
	email: string;
	address: string;
	city: string; // Provide a default value for the city property
	state?: string;
	zip_code?: string;
	image_url?: string;
	created_at: string;
	username: string;
}

const Biodata: React.FC<BiodataProps> = ({ user, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<User>(user);
	const [error, setError] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				throw new Error("No token found in localStorage");
			}

			// Upload the image if a file is selected
			let imageUrl = formData.image_url;
			if (file) {
				const formData = new FormData();
				formData.append("image", file);

				const uploadResponse = await fetch("http://127.0.0.1:5000/upload", {
					method: "POST",
					body: formData,
				});

				if (!uploadResponse.ok) {
					throw new Error(
						`Image upload failed with status: ${uploadResponse.status}`
					);
				}

				const uploadData = await uploadResponse.json();
				imageUrl = uploadData.url;

				// Log the image URL to ensure it's correctly formed
				console.log("Uploaded image URL:", imageUrl);
			}
			// Update the user with the new image URL
			const updatedUser = { ...formData, image_url: imageUrl };

			// Log the updatedUser object to ensure it has all required fields
			console.log("Updated user data:", updatedUser);

			const response = await fetch("http://127.0.0.1:5000/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedUser),
			});

			// Log the response status and data
			console.log("Response status:", response.status);
			const responseData = await response.json();
			console.log("Response data:", responseData);

			if (response.ok) {
				onUpdate(responseData);
				setIsEditing(false);
				setError(null); // Clear any previous errors
			} else {
				console.error("Failed to update user:", responseData);
				setError(
					"An error occurred while updating the biodata. Please try again."
				);
			}
		} catch (error) {
			console.error("Error:", error);
			setError(
				"An error occurred while updating the biodata. Please try again."
			);
		}
	};

	// Log the user image URL to verify it's being passed correctly
	console.log("User image URL:", user.image_url);

	return (
		<div>
			{isEditing ? (
				<form
					onSubmit={handleSubmit}
					className="space-y-4 bg-amber-400 p-4 rounded-lg"
				>
					{error && <p className="text-red-500">{error}</p>}
					<div className="flex flex-col space-y-4">
						<div className="flex items-center">
							<label className="text-black w-32">First Name:</label>
							<input
								type="text"
								name="first_name"
								value={formData.first_name}
								onChange={handleChange}
								className="bg-white text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
								required
							/>
						</div>
						<div className="flex items-center">
							<label className="text-black w-32">Last Name:</label>
							<input
								type="text"
								name="last_name"
								value={formData.last_name}
								onChange={handleChange}
								className="bg-white text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
								required
							/>
						</div>
						<div className="flex items-center">
							<label className="text-black w-32">Email:</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="bg-white text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
								required
							/>
						</div>
						<div className="flex items-center">
							<label className="text-black w-32">Address:</label>
							<input
								type="text"
								name="address"
								value={formData.address}
								onChange={handleChange}
								className="bg-white text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
							/>
						</div>
						<div className="flex items-center">
							<label className="text-black w-32">City:</label>
							<input
								type="text"
								name="city"
								value={formData.city}
								onChange={handleChange}
								className="bg-white text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
							/>
						</div>
						<div className="flex items-center">
							<label className="text-black w-32">State:</label>
							<input
								type="text"
								name="state"
								value={formData.state}
								onChange={handleChange}
								className="bg-white text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
							/>
						</div>
						<div className="flex items-center">
							<label className="text-black w-32">Zip Code:</label>
							<input
								type="text"
								name="zip_code"
								value={formData.zip_code}
								onChange={handleChange}
								className="bg-white text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
							/>
						</div>
						<div className="flex items-center">
							<label className="text-black w-32">Image URL:</label>
							<input
								type="file"
								name="image_url"
								onChange={handleFileChange}
								className="bg-white text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
							/>
						</div>
					</div>
					<div className="flex space-x-4">
						<button
							type="submit"
							className="bg-black text-white w-24 h-10 border rounded-lg shadow-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
						>
							Save
						</button>
						<button
							type="button"
							onClick={() => setIsEditing(false)}
							className="bg-red-500 text-white w-24 h-10 border rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300"
						>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<div>
					<div className="bg-gradient-to-r from-amber-400 via-amber-700 to-amber-900 p-4 rounded border border-gray-950">
                    <div className="bg-gradient-to-r from-amber-900 via-gray-700 to-gray-900 rounded overflow-hidden shadow-lg p-4">							{" "}
							{user.image_url && (
								<div className="flex justify-center">
									<img
										src={user.image_url}
										alt={`${user.first_name} ${user.last_name}`}
										className="w-32 h-32 rounded-full object-cover object-top"
									/>
								</div>
							)}
							<div className="text-center text-white">
								<h1>
									{user.first_name} {user.last_name}
								</h1>
								<h2 className="text-xs">Registered at {user.created_at}</h2>
							</div>
						</div>
						<p className="font-bold mb-2 underline">Contact Details:</p>
						<p className=" mb-2">username: {user.username}</p>
						<p className=" mb-2">Email: {user.email}</p>
						<p className=" mb-2">
							Address: {user.address}, {user.city}, {user.state},{" "}
							{user.zip_code}
						</p>
						<button
							onClick={() => setIsEditing(true)}
							className="bg-black text-white w-20 h-8 border rounded-lg"
						>
							Edit
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Biodata;
