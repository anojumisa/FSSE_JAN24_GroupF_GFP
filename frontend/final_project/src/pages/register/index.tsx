import React, { useState } from 'react';
import router from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  image_url: File | null;
}

const validationSchema1 = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
});

const validationSchema2 = Yup.object().shape({
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip_code: Yup.string().required('Required'),
});

export default function Register() {
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    image_url: '' || null
  })

  const onNext = (values: any) => {
    setFormData((prev) => ({
        ...prev,
        ...(step === 1 ? values : step === 2 ? values : values) // Add specific logic for each step if needed
      }));
    setStep(step + 1);
    console.log('Form submitted with values:', values);
  };

  const onPrevious = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {        
    e.preventDefault();
    setStep(step - 1);
  };

  async function handleSubmit (values: any) {
    try {
      const finalData = { ...values };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData)
      });
      
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Registration failed: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('User registered:', responseData);
      router.push('/login'); 
    } catch (err:any) {
      console.log("Register failed:", err)
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return(
        <Formik
          initialValues={formData}
          validationSchema={validationSchema1}
          onSubmit={onNext}
          >
          <Form>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">First Name</label>
              <Field
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter your first name"
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
              <ErrorMessage className="text-red-500 text-xs italic" name="first_name" component="div" />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">Last Name</label>
              <Field
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter your last name"
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
              <ErrorMessage className="text-red-500 text-xs italic" name="last_name" component="div" />
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          </Form>          
        </Formik>          
      );
        
      case 2:
        return (
          <Formik
          initialValues={formData}
          validationSchema={validationSchema2}
          onSubmit={handleSubmit}>
            <Form>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip_code">Zip Code</label>
                <Field
                  type="text"
                  id="zip_code"
                  name="zip_code"
                  placeholder="Enter your zip code"
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
                <ErrorMessage className="text-red-500 text-xs italic" name="zip_code" component="div" />
              </div>
              <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Store Image</label>
              <div className="mt-2">
                  <input type="file" id="input" accept="image/*" />
              </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  type="button"
                  className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                  onClick={onPrevious}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">
                  Submit
                </button>
              </div> 
            </Form>
          </Formik>              
        );
        default:
          return null;
    }
  }

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}/>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
          <p className="text-xl text-gray-600 text-center">Create your account</p>                  

          {renderStepContent()}

        </div>
      </div>
    </div>
  );
};