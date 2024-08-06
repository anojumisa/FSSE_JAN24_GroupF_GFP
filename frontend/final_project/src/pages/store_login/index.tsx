import React from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import router from "next/router";

export default function LoginSeller() {

  interface LoginForm {
    email: string;
    password_hash: string;
  }  
  
  const initialValues:LoginForm = {
      email: '',
      password_hash: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email required'),
    password_hash: Yup.string().required('Password required').
    matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number')
  });  

  async function handleSubmit(values: LoginForm, { setSubmitting, setFieldError }: any) {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFieldError('general', errorData.message || 'Failed to login');
        return;
      }
      alert('Login Successful');
      router.push('/');
    } catch (error) {
      setFieldError('general', (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}>
      <Form>
        <h2>Sign In</h2>

        <div>
            <label htmlFor="email">Email Address</label>
            <Field 
            name="email" type="email" placeholder="Enter your email address"
            className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <ErrorMessage className="text-red-500 text-xs italic" id="email" name="email" component="div" />
        </div>

        <div>
            <label htmlFor="password_hash">Password</label>
            <Field 
            name="password_hash" type="password" placeholder="Enter your password"
            className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <ErrorMessage className="text-red-500 text-xs italic" id="password_hash" name="password_hash" component="div" />
        </div>

        <button type="submit" className="rounded-md px-3 py-2">Login</button>

      </Form>
    </Formik>
    );
}
