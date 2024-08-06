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
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={step === 1 ? validationSchema1 : validationSchema2}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isValid }) => (
          <Form>
            {step === 1 && (
              <>
                <div>
                  <label htmlFor="username">Username</label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <Field type="text" id="firstName" name="firstName" />
                  <ErrorMessage name="firstName" component="div" />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <Field type="text" id="lastName" name="lastName" />
                  <ErrorMessage name="lastName" component="div" />
                </div>
                <button type="button" onClick={handleNext} disabled={!isValid}>
                  Next
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="address">Address</label>
                  <Field type="text" id="address" name="address" />
                  <ErrorMessage name="address" component="div" />
                </div>
                <div>
                  <label htmlFor="city">City</label>
                  <Field type="text" id="city" name="city" />
                  <ErrorMessage name="city" component="div" />
                </div>
                <div>
                  <label htmlFor="state">State</label>
                  <Field type="text" id="state" name="state" />
                  <ErrorMessage name="state" component="div" />
                </div>
                <div>
                  <label htmlFor="zipCode">Zip Code</label>
                  <Field type="text" id="zipCode" name="zipCode" />
                  <ErrorMessage name="zipCode" component="div" />
                </div>
                <div>
                  <label htmlFor="imageFile">Image Upload</label>
                  <input
                    id="imageFile"
                    name="imageFile"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                      setFieldValue("imageFile", file);
                    }}
                  />
                  <ErrorMessage name="imageFile" component="div" />
                </div>
                <button type="button" onClick={handlePrevious}>
                  Previous
                </button>
                <button type="submit" disabled={!isValid}>
                  Submit
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
