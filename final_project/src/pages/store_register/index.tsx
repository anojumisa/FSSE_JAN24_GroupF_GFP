import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import router from "next/router";
import Modal from "@/components/fragments/Modal/store_modal";
import Link from "next/link";

interface RegisterForm {
	seller_full_name: string;
	username: string;
	email: string;
	password_hash: string;
	store_name: string;
	description: string;
	contact_number: string;
	bank_account: string;

	address: string;
	city: string;
	state: string;
	zip_code: string;
}

const personalInfoSchema = Yup.object().shape({
	seller_full_name: Yup.string()
		.min(2, "Name is too short!")
		.required("Full name required"),
	username: Yup.string()
		.min(2, "Username is too short!")
		.required("Username required"),
	email: Yup.string().email("Invalid email format").required("Email required"),
	password_hash: Yup.string()
		.required("Password required")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
			"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
		),
});

const storeInfoSchema = Yup.object().shape({
	store_name: Yup.string().required("Store name required"),
	description: Yup.string().required("Store description required"),
	contact_number: Yup.string().required("Contact number required"),
	bank_account: Yup.string().required("Bank account required"),
});

const locationInfoSchema = Yup.object().shape({
	address: Yup.string().required("Street address required"),
	city: Yup.string().required("City required"),
	state: Yup.string().required("State required"),
	zip_code: Yup.string()
		.matches(/^\d{5}$/, "Invalid Zip Code")
		.required("Zip code required"),
});

export default function MultiStepForm() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<RegisterForm>({
		seller_full_name: "",
		username: "",
		email: "",
		password_hash: "",
		store_name: "",
		description: "",
		contact_number: "",
		bank_account: "",

		address: "",
		city: "",
		state: "",
		zip_code: "",
	});

	const onNext = (values: any) => {
		setFormData((prev) => ({
			...prev,
			...(step === 1 ? values : step === 2 ? values : values),
		}));
		setStep(step + 1);
		console.log("Form submitted with values:", values);
	};

	const onPrevious = () => {
		setStep(step - 1);
	};
	const [isModalOpen, setIsModalOpen] = useState(false);

	async function handleSubmit(values: any) {
		try {
			const finalData = { ...formData, ...values };

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/store_register`,
				{
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(finalData),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Registration failed: ${errorText}`);
			}

			const responseData = await response.json();
			console.log("User registered:", responseData);
			setIsModalOpen(true);
			// router.push("/store_login");
		} catch (err: any) {
			console.log("Register failed:", err);
		}
	}
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const renderStepContent = () => {
		switch (step) {
			case 1:
				return (
					<Formik
						initialValues={formData}
						validationSchema={personalInfoSchema}
						onSubmit={onNext}
					>
						<Form>
							<div className="py-40">
								<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
									<div
										className="hidden lg:block lg:w-11/12 bg-cover bg-center"
										style={{ backgroundImage: `url(login_page.png)` }}
									/>
									<div className="w-full p-8 lg:w-1/2">
										<Link href={"/"}>
										<img
											src="localbites_logo.png"
											alt="localbites logo"
											className="w-16 mx-auto"
										/>
										</Link>
										
										<p className="text-xl text-gray-600 text-center">
											Let's Build Your Store
										</p>
										<div className="mt-4 flex justify-center">
											<Link
												href="/store_login"
												className="text-xs font-extrabold text-slate-950 "
											>
												Already have an account?{" "}
												<span className="text-amber-600 underline">Login</span>
											</Link>
										</div>
										<p className="text-xm text-gray-600 text-center">
											Personal Information
										</p>
										<p className="text-xs text-gray-600 text-center">
											Step 1 of 3
										</p>

										<div className="mt-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="email"
											>
												Full Name
											</label>
											<Field
												name="seller_full_name"
												type="text"
												placeholder="Enter your full name"
												className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
											/>
											<ErrorMessage
												className="text-red-500 text-xs italic"
												id="seller_full_name"
												name="seller_full_name"
												component="div"
											/>
										</div>

										<div className="mt-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="email"
											>
												Username
											</label>
											<Field
												name="username"
												type="text"
												placeholder="Enter your username"
												className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
											/>
											<ErrorMessage
												className="text-red-500 text-xs italic"
												id="username"
												name="username"
												component="div"
											/>
										</div>

										<div className="mt-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="email"
											>
												Email
											</label>
											<Field
												name="email"
												type="email"
												placeholder="Enter your email"
												className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
											/>
											<ErrorMessage
												className="text-red-500 text-xs italic"
												id="email"
												name="email"
												component="div"
											/>
										</div>

										<div className="mt-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="email"
											>
												Password
											</label>
											<Field
												name="password_hash"
												type="password"
												placeholder="Enter your password"
												className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
											/>
											<ErrorMessage
												className="text-red-500 text-xs italic"
												id="password_hash"
												name="password_hash"
												component="div"
											/>
										</div>

										<div className="mt-8">
											<button
												type="submit"
												className="bg-lime-400 text-black font-bold py-2 px-4 w-full rounded hover:bg-lime-500"
											>
												Next
											</button>
										</div>
									</div>
								</div>
							</div>
						</Form>
					</Formik>
				);

			case 2:
				return (
					<Formik
						initialValues={formData}
						validationSchema={storeInfoSchema}
						onSubmit={onNext}
					>
						<Form>
							<div className="py-40">
								<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
									<div
										className="hidden lg:block lg:w-11/12 bg-cover bg-center"
										style={{ backgroundImage: `url(login_page2.png)` }}
									/>
									<div className="w-full p-8 lg:w-1/2">
										<img
											src="localbites_logo.png"
											alt="localbites logo"
											className="w-16 mx-auto"
										/>
										<p className="text-xl text-gray-600 text-center">
											Spill the tea on your store
										</p>
										<p className="text-xm text-gray-600 text-center">
											Store Information
										</p>
										<p className="text-xs text-gray-600 text-center">
											Step 2 of 3
										</p>

										<div className="mt-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="store_name"
											>
												Store Name
											</label>
											<Field
												name="store_name"
												type="text"
												placeholder="Enter your store name"
												className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
											/>
											<ErrorMessage
												className="text-red-500 text-xs italic"
												id="store_name"
												name="store_name"
												component="div"
											/>
										</div>

										<div className="mt-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="description"
											>
												Store Description
											</label>
											<Field
												name="description"
												type="text"
												placeholder="Enter your store description"
												className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
											/>
											<ErrorMessage
												className="text-red-500 text-xs italic"
												id="description"
												name="description"
												component="div"
											/>
										</div>

										<div className="mt-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="contact_number"
											>
												Contact Number
											</label>
											<Field
												name="contact_number"
												type="text"
												placeholder="Enter your contact number"
												className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
											/>
											<ErrorMessage
												className="text-red-500 text-xs italic"
												id="contact_number"
												name="contact_number"
												component="div"
											/>
										</div>

										<div className="mt-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="bank_account"
											>
												Bank Account
											</label>
											<Field
												name="bank_account"
												type="text"
												placeholder="Enter your bank account"
												className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
											/>
											<ErrorMessage
												className="text-red-500 text-xs italic"
												id="bank_account"
												name="bank_account"
												component="div"
											/>
										</div>

										<div className="mt-4">
											{/* <label className="block text-gray-700 text-sm font-bold mb-2">
												Store Image
											</label>
											<div className="mt-2">
												<input type="file" id="input" accept="image/*" />
											</div> */}
										</div>

										<div className="mt-4 flex items-center">
											<button
												type="button"
												className="mr-2 bg-amber-400 text-black font-bold py-2 px-4 w-full rounded hover:bg-amber-500"
												onClick={onPrevious}
											>
												Previous
											</button>
											<button
												type="submit"
												className="ml-2 bg-lime-400 text-black font-bold py-2 px-4 w-full rounded hover:bg-lime-500"
											>
												Next
											</button>
										</div>
									</div>
								</div>
							</div>
						</Form>
					</Formik>
				);

			case 3:
				return (
					<Formik
						initialValues={formData}
						validationSchema={locationInfoSchema}
						onSubmit={handleSubmit}
					>
						<Form>
							<div className="py-40">
								<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
									<div
										className="hidden lg:block lg:w-11/12 bg-cover bg-center"
										style={{ backgroundImage: `url(login_page3.png)` }}
									/>
									<div className="w-full p-8 lg:w-1/2">
										<img
											src="localbites_logo.png"
											alt="localbites logo"
											className="w-16 mx-auto"
										/>
										<p className="text-xl text-gray-600 text-center">
											Let's find you on the map
										</p>
										<p className="text-xm text-gray-600 text-center">
											Store Location
										</p>
										<p className="text-xs text-gray-600 text-center">
											Step 3 of 3
										</p>

										<div className="mt-4">
											<label className="block text-gray-700 text-sm font-bold mb-2">
												Street Address
											</label>
											<div className="mt-2">
												<Field
													name="address"
													type="text"
													placeholder="Enter your store address"
													className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
												/>
												<ErrorMessage
													className="text-red-500 text-xs italic"
													id="address"
													name="address"
													component="div"
												/>
											</div>
										</div>

										<div className="mt-4">
											<label className="block text-gray-700 text-sm font-bold mb-2">
												City
											</label>
											<div className="mt-2">
												<Field
													name="city"
													type="text"
													placeholder="Enter your store city"
													className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
												/>
												<ErrorMessage
													className="text-red-500 text-xs italic"
													id="city"
													name="city"
													component="div"
												/>
											</div>
										</div>

										<div className="mt-4">
											<label className="block text-gray-700 text-sm font-bold mb-2">
												State / Province
											</label>
											<div className="mt-2">
												<Field
													name="state"
													type="text"
													placeholder="Enter your store state"
													className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
												/>
												<ErrorMessage
													className="text-red-500 text-xs italic"
													id="state"
													name="state"
													component="div"
												/>
											</div>
										</div>

										<div className="mt-4">
											<label className="block text-gray-700 text-sm font-bold mb-2">
												ZIP / Postal code
											</label>
											<div className="mt-2">
												<Field
													name="zip_code"
													type="text"
													placeholder="Enter your zip code"
													className="bg-amber-200 text-gray-700 focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
												/>
												<ErrorMessage
													className="text-red-500 text-xs italic"
													id="zip_code"
													name="zip_code"
													component="div"
												/>
											</div>
										</div>

										<div className="mt-4 flex items-center">
											<button
												className="mr-2 bg-amber-400 text-black font-bold py-2 px-4 w-full rounded hover:bg-amber-500"
												type="button"
												onClick={onPrevious}
											>
												Previous
											</button>
											<button
												className="mr-2 bg-lime-400 text-black font-bold py-2 px-4 w-full rounded hover:bg-lime-500"
												type="submit"
											>
												Submit
											</button>
										</div>
										<Modal
											isOpen={isModalOpen}
											onClose={handleCloseModal}
											title="Registration Successful"
										>
											<p>Hooray! Your store is on its way!</p>
										</Modal>
									</div>
								</div>
							</div>
						</Form>
					</Formik>
				);
			default:
				return null;
		}
	};

	return <div className="container mx-auto px-4">{renderStepContent()}</div>;
}
