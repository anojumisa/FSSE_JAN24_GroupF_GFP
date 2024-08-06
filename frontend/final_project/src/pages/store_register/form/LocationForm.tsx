import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import router from "next/router";

export default function LocationForm ({ formData, onNext, onPrevious, initialData ={} }:any) {
  
  const initialValues = {
    address: initialData.address || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zip_code: initialData.zip_code || '',
  };
   
  const locationInfoSchema = Yup.object().shape({
    address: Yup.string().required('Street address required'),
    city: Yup.string().required('City required'),
    state: Yup.string().required('State required'),
    zip_code: Yup.string().matches(/^\d{5}$/, 'Invalid Zip Code').required('Zip code required')
  }); 

  // async function onSubmit(values:any) {
  //   console.log('Form submitted with values:', values);
  //   alert(JSON.stringify({...formData, ...values}));
  // }

  // function handleSubmit(values:any) {
  //   onNext(values);
  // }  

  async function handleSubmit (values: any) {
    try {
        const finalData = { ...formData, ...values };
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store_register`, {
          method: 'POST',
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
        router.push('/store_login'); 
    } catch (err:any) {
        console.log("Register failed:", err)
    }
}; 

  function handlePrevious(values: any) {
    onPrevious(values);
  }  

  return(
    <Formik 
    initialValues={initialValues} 
    validationSchema={locationInfoSchema} 
    onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
            <h2 className="text-base font-semibold">Store Location</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="col-span-full">
                <label>Street Address</label>
                <div className="mt-2">
                <Field name="address" type="text" placeholder="Enter your store address"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="address" name="address" component="div" />
                </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
                <label>City</label>
                <div className="mt-2">
                <Field name="city" type="text" placeholder="Enter your store city"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="city" name="city" component="div" /> 
                </div>
            </div>

            <div className="sm:col-span-2">
                <label>State / Province</label>
                <div className="mt-2">
                <Field name="state" type="text" placeholder="Enter your store state"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="state" name="state" component="div" />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label>ZIP / Postal code</label>
                <div className="mt-2">
                <Field name="zip_code" type="text" placeholder="Enter your zip code"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="zip_code" name="zip_code" component="div" />
                </div>
            </div>
            </div>
            
            <div className="flex items-center">
            <button type="button" onClick={() => handlePrevious(values)} className="rounded-md px-3 py-2">Previous</button>
            <button type="submit" className="rounded-md px-3 py-2">Submit</button>
            </div>                
        </Form>      
      )}
    </Formik>
  );

}  
    
