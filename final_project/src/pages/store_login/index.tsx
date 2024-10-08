import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import router from "next/router";
import Link from "next/link";

export default function LoginSeller() {
	interface LoginForm {
		email: string;
		password_hash: string;
	}

	const initialValues: LoginForm = {
		email: "",
		password_hash: "",
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email format")
			.required("Email required"),
		password_hash: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Required"),
	});

	async function handleSubmit(
		values: LoginForm,
		{ setSubmitting, setFieldError }: any
	) {
		try {
			console.log("Sending request to backend with values:", values);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/store_login`,
				{
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
					credentials: "include",
				}
			);

			console.log("Backend response:", response);

			const data = await response.json();

			if (!response.ok) {
				setFieldError("general", data.message || "Failed to login");
				return;
			}

			const token = data.access_token;

			console.log("Token:", token);

			// Store token in localStorage
			localStorage.setItem("token", data.token);

			if (token) {
				localStorage.setItem("token", token);
				console.log("Redirecting to Dashboard_Seller...");
				router.push("/Dashboard_Seller");
			} else {
				setFieldError("general", "Token is missing in response");
			}
		} catch (error) {
			setFieldError("general", (error as Error).message);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
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
								Let's make some magic happen today!
							</p>

							<div className="mt-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="email"
								>
									Email Address
								</label>
								<Field
									name="email"
									type="email"
									placeholder="Enter your email address"
									className="bg-amber-200 text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
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
									htmlFor="password_hash"
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
									className="bg-black text-white font-bold py-2 px-4 w-full rounded hover:bg-lime-900"
								>
									Login
								</button>
							</div>
							<div className="mt-4 flex items-center justify-between">
								<span className="border-b w-1/5 md:w-1/4"></span>
								<a
									href="/store_register"
									className="text-xs text-gray-500 uppercase"
								>
									or sign up
								</a>
								<span className="border-b w-1/5 md:w-1/4"></span>
							</div>

							{/* General error message */}
							<ErrorMessage
								name="general"
								component="div"
								className="text-red-500 text-xs italic mt-4"
							/>
						</div>
					</div>
				</div>
			</Form>
		</Formik>
	);
}
