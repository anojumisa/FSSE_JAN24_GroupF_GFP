import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

interface LoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const Login = () => {
  const router = useRouter();
  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  async function handleSubmit(values: LoginValues, { setSubmitting, setFieldError }: any) {
    try {
      console.log('Sending request to backend with values:', values);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from backend:', errorData);
        setFieldError('general', errorData.message || 'Failed to login');
        return;
      }

      alert('Login Successful');
      router.push('/dashboard_user');
    } catch (error) {
      console.error('Error during fetch:', error);
      setFieldError('general', (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}
        />
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form>
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
                <div className="mt-8">
                  <button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" disabled={!isValid}>
                    Login
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 md:w-1/4"></span>
                  <a href="#" className="text-xs text-gray-500 uppercase">or sign up</a>
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