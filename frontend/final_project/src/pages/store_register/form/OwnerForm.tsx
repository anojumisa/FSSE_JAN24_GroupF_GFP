import React from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';

export default function PersonalInfoForm({ onNext, initialData }: any) {
  
  const initialValues = {
    seller_full_name: initialData.seller_full_name || '',
    username: initialData.username || '',
    email: initialData.email || '',
    password_hash: initialData.password_hash || ''
  };

  const personalInfoSchema = Yup.object().shape({
    seller_full_name: Yup.string().min(2, 'Name is too short!').required('Full name required'),
    username: Yup.string().min(2, 'Username is too short!').required('Username required'),
    email: Yup.string().email('Invalid email format').required('Email required'),
    password_hash: Yup.string().required('Password required').
    matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number')
  })  

  function onSubmit (values: any) {
    console.log('Form submitted with values:', values);  // Log form values to check submission
    onNext(values);
  }

  return (
    <Formik
    initialValues={initialValues} 
    validationSchema={personalInfoSchema}
    onSubmit={onSubmit}>
        <Form>
            <h2 className="text-base font-semibold">Owner Information</h2>

            <div className="col-span-full">
            <label htmlFor="seller_full_name">Full Name</label>
                <Field name="seller_full_name" type="text" placeholder="Enter your full name"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="seller_full_name" name="seller_full_name" component="div" />
            </div>

            <div className="col-span-full">
            <label htmlFor="username">Username</label>
                <Field name="username" type="text" placeholder="Enter your username"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="username" name="username" component="div" />
            </div>

            <div className="col-span-full">
            <label htmlFor="email">Email</label>
                <Field name="email" type="email" placeholder="Enter your email"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="email" name="email" component="div" />
            </div>

            <div className="col-span-full">
            <label htmlFor="password_hash">Password</label>
                <Field name="password_hash" type="password" placeholder="Enter your password"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="password_hash" name="password_hash" component="div" />
            </div>

            <div className="border-black">
                <button type="submit" className="rounded-md px-3 py-2">Next</button>
            </div>                
        </Form>
    </Formik>
  );
}
