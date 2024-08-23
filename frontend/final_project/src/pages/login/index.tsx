import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

interface LoginValues {
	email: string;
	password: string;
}

const validationSchema = Yup.object({
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Required"),
});

const Login = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const initialValues: LoginValues = {
		email: "",
		password: "",
	};

	const handleLogin = async (values: LoginValues) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/login`, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: values.email,
					password: values.password,
				}),
			});

			const data = await response.json();

			if (response.ok && data.access_token) {
				localStorage.setItem("access_token", data.access_token);
				console.log("Stored Token:", localStorage.getItem("access_token"));
				toast.success("Login successful!");
				router.push("/Dashboard_User");
			} else {
				console.error("Login failed:", data.message);
				toast.error("Error: " + data.message);
			}
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div className="py-16">
			<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
				<div
					className="hidden lg:block lg:w-11/12 bg-cover bg-center"
					style={{ backgroundImage: `url(login_page4.png)` }}
				/>
				<div className="w-full p-8 lg:w-1/2">
					<Link href={"/"}>
						<img
							src="localbites_logo.png"
							alt="localbites logo"
							className="w-16 mx-auto"
						/>
					</Link>
					<p className="text-xl text-gray-600 text-center">Let's eat</p>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => {
							handleLogin(values);
							setSubmitting(false);
						}}
					>
						{({ isValid }) => (
							<Form>
								<div className="mt-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="email"
									>
										Email
									</label>
									<Field
										type="email"
										id="email"
										name="email"
										placeholder="Enter your email address"
										className="bg-amber-200 text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
									/>
									<ErrorMessage
										className="text-red-500 text-xs italic"
										name="email"
										component="div"
									/>
								</div>
								<div className="mt-4 relative">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="password"
									>
										Password
									</label>
									<div className="relative">
										<Field
											type={showPassword ? "text" : "password"}
											id="password"
											name="password"
											placeholder="Enter your password"
											className="bg-amber-200 text-black focus:outline-none focus:shadow-outline border border-black rounded py-2 px-4 block w-full appearance-none"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full text-sm leading-5"
										>
											<FontAwesomeIcon
												icon={showPassword ? faEyeSlash : faEye}
											/>
										</button>
									</div>
									<ErrorMessage
										className="text-red-500 text-xs italic"
										name="password"
										component="div"
									/>
								</div>
								<div className="mt-8">
									<button
										type="submit"
										className="bg-black text-white font-bold py-2 px-4 w-full rounded hover:bg-lime-900"
										disabled={!isValid}
									>
										Login
									</button>
								</div>
								<div className="mt-4 flex items-center justify-between">
									<span className="border-b w-1/5 md:w-1/4"></span>
									<a
										href="/register"
										className="text-xs text-gray-500 uppercase"
									>
										or sign up
									</a>
									<span className="border-b w-1/5 md:w-1/4"></span>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Login;
