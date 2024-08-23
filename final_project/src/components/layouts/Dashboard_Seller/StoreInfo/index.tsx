import React, { useState, useEffect } from "react";
import { StoreInfo as StoreInfoType } from "../../../../types/seller"; // adjust the path as necessary

interface StoreInfoProps {
	storeInfo: StoreInfoType | null;
	onUpdateStoreInfo: (updatedStoreInfo: StoreInfoType) => void;
}

const StoreInfo: React.FC<StoreInfoProps> = ({
	storeInfo,
	onUpdateStoreInfo,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedStoreInfo, setEditedStoreInfo] = useState<StoreInfoType | null>(
		storeInfo
	);
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setEditedStoreInfo(storeInfo);
	}, [storeInfo]);

	if (!storeInfo) {
		return <p>Loading...</p>;
	}

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setEditedStoreInfo(storeInfo);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditedStoreInfo((prevState) =>
			prevState ? { ...prevState, [name]: value } : null
		);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				throw new Error("No token found in localStorage");
			}

			// Upload the image if a file is selected
			let imageUrl = editedStoreInfo?.image_url;
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

			// Update the store with the new image URL
			const updatedStoreInfo = { ...editedStoreInfo, image_url: imageUrl };

			// Log the updatedStoreInfo object to ensure it has all required fields
			console.log("Updated store data:", updatedStoreInfo);

			const response = await fetch("http://127.0.0.1:5000/stores/me", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedStoreInfo),
			});

			// Log the response status and data
			console.log("Response status:", response.status);
			const responseData = await response.json();
			console.log("Response data:", responseData);

			if (response.ok) {
				onUpdateStoreInfo(responseData);
				setIsEditing(false);
				setError(null); // Clear any previous errors
			} else {
				console.error("Failed to update store:", responseData);
				setError(
					"An error occurred while updating the store data. Please try again."
				);
			}
		} catch (error) {
			console.error("Error:", error);
			setError(
				"An error occurred while updating the store data. Please try again."
			);
		}
	};

	return (
		<div className="bg-slate-950 text-gray-300 p-4 rounded space-y-4">
			{isEditing ? (
				<form onSubmit={handleFormSubmit}>
					{error && <p className="text-red-500">{error}</p>}
					<div className="flex flex-col space-y-4">
						<div>
							<label className="text-lime-300">Store Name:</label>
							<input
								type="text"
								name="store_name"
								value={editedStoreInfo?.store_name || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">Username:</label>
							<input
								type="text"
								name="username"
								value={editedStoreInfo?.username || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">Email:</label>
							<input
								type="text"
								name="email"
								value={editedStoreInfo?.email || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">Bank Account:</label>
							<input
								type="text"
								name="bank_account"
								value={editedStoreInfo?.bank_account || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">Full Name:</label>
							<input
								type="text"
								name="seller_full_name"
								value={editedStoreInfo?.seller_full_name || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">Description:</label>
							<textarea
								name="description"
								value={editedStoreInfo?.description || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full h-40"
							/>
						</div>
						<div>
							<label className="text-lime-300">Contact Number:</label>
							<input
								type="text"
								name="contact_number"
								value={editedStoreInfo?.contact_number || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">Address:</label>
							<input
								type="text"
								name="address"
								value={editedStoreInfo?.address || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">City:</label>
							<input
								type="text"
								name="city"
								value={editedStoreInfo?.city || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">State:</label>
							<input
								type="text"
								name="state"
								value={editedStoreInfo?.state || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">Zip Code:</label>
							<input
								type="text"
								name="zip_code"
								value={editedStoreInfo?.zip_code || ""}
								onChange={handleInputChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
						<div>
							<label className="text-lime-300">Image URL:</label>
							<input
								type="file"
								name="image_url"
								onChange={handleFileChange}
								className="bg-slate-800 text-white p-2 rounded w-full"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="bg-lime-500 w-1/6 text-black p-2 rounded mt-4 hover:bg-lime-600 hover:text-gray-300"
					>
						Save
					</button>
					<button
						type="button"
						onClick={handleCancelClick}
						className="bg-orange-500 w-1/6 text-white p-2 rounded mt-4 ml-2 hover:bg-orange-600"
					>
						Cancel
					</button>
				</form>
			) : (
				<>
					{storeInfo.image_url && (
						<div className="flex justify-center items-center">
							<div className="flex flex-col place-items-center justify-center w-2/3 bg-gradient-to-b from-amber-800 via-amber-500 to-amber-300 opacity-80 p-6 rounded-3xl">
								<img
									src={storeInfo.image_url}
									alt={`${storeInfo.store_name}`}
									className="w-32 h-32 rounded-full object-cover object-top shadow-white shadow-2xl mb-4"
								/>
								<h2 className="text-slate-800 text-xs text-center">
									Registered since: <br />{storeInfo.created_at}
								</h2>
							</div>
						</div>
					)}
					<p>
						<strong className="text-amber-400">Store Name:</strong>{" "}
						{storeInfo.store_name}
					</p>
					<p>
						<strong className="text-amber-400">Full Name:</strong>{" "}
						{storeInfo.seller_full_name}
					</p>
					<p>
						<strong className="text-amber-400">Description:</strong>{" "}
						{storeInfo.description}
					</p>
					<p>
						<strong className="text-amber-4000">Contact Number:</strong>{" "}
						{storeInfo.contact_number}
					</p>
					<p>
						<strong className="text-amber-400">Address:</strong>{" "}
						{storeInfo.address}, {storeInfo.city}, {storeInfo.state} -{" "}
						{storeInfo.zip_code}
					</p>
					<div className="flex justify-center">
						<button
							onClick={handleEditClick}
							className="bg-amber-400 w-1/3 text-slate-800 p-2 rounded mt-2 hover:bg-amber-500 hover:text-white transition duration-300 ease-in-out"
						>
							Edit
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default StoreInfo;
