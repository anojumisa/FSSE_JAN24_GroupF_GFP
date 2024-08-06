import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  imageFile: File | null;
}

const validationSchema1 = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
});

const validationSchema2 = Yup.object({
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  imageFile: Yup.mixed().required('Required'),
});

const Register = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const initialValues: FormValues = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    imageFile: null,
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values: FormValues) => {
    console.log('Form data', values);
    router.push('/');
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}
        />
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
          <p className="text-xl text-gray-600 text-center">Create your account</p>

          <Formik
            initialValues={initialValues}
            validationSchema={step === 1 ? validationSchema1 : validationSchema2}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isValid }) => (
              <Form>
                {step === 1 && (
                  <>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="username" component="div" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="email" component="div" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="password" component="div" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="firstName" component="div" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="lastName" component="div" />
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                      <button
                        type="button"
                        className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                        onClick={handleNext}
                        disabled={!isValid}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                      <Field
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="address" component="div" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter your city"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="city" component="div" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">State</label>
                      <Field
                        type="text"
                        id="state"
                        name="state"
                        placeholder="Enter your state"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="state" component="div" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">Zip Code</label>
                      <Field
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        placeholder="Enter your zip code"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="zipCode" component="div" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageFile">Image Upload</label>
                      <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        onChange={(event) => {
                          const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                          setFieldValue("imageFile", file);
                        }}
                      />
                      <ErrorMessage className="text-red-500 text-xs italic" name="imageFile" component="div" />
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                      <button
                        type="button"
                        className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                        onClick={handlePrevious}
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                        disabled={!isValid}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
