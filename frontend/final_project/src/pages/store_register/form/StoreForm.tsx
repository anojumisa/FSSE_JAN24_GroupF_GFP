import React from "react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function StoreForm ({ onNext, onPrevious, initialData = {}}: any) {
  
  const initialValues = {
    store_name: initialData.store_name || '',
    description: initialData.description || '',
    contact_number: initialData.contact_number || '',
    bank_account: initialData.bank_account || '',
    image_url: initialData.image_url || '',
  };

  const storeInfoSchema = Yup.object().shape({
    store_name: Yup.string().required('Store name required'),
    description: Yup.string().required('Store description required'),
    contact_number: Yup.string().required('Contact number required'),
    bank_account: Yup.string().required('Bank account required'),
  });   
      
  function onSubmit (values:any) {
    console.log('Form submitted with values:', values);  // Log form values to check submission
    onNext(values);
  }

  return(
    <Formik
    initialValues={initialValues} 
    validationSchema={storeInfoSchema}
    onSubmit={onSubmit}>
        <Form>
            <h2 className="text-base font-semibold">Store Information</h2>

            <div className="col-span-full">
            <label htmlFor="store_name">Store Name</label>
                <Field name="store_name" type="text" placeholder="Enter your store name"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="store_name" name="store_name" component="div" />
            </div>

            <div className="col-span-full">
            <label htmlFor="description">Store Description</label>
                <Field name="description" type="text" placeholder="Enter your store description"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="description" name="description" component="div" />
            </div>

            <div className="col-span-full">
            <label htmlFor="contact_number">Contact Number</label>
                <Field name="contact_number" type="text" placeholder="Enter your contact number"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="contact_number" name="contact_number" component="div" />
            </div>

            <div className="col-span-full">
            <label htmlFor="bank_account">Bank Account</label>
                <Field name="bank_account" type="text" placeholder="Enter your bank account"
                className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <ErrorMessage className="text-red-500 text-xs italic" id="bank_account" name="bank_account" component="div" />
            </div>

            <div className="col-span-full">
            <label>Store Image</label>
            <div className="mt-2">
                <input type="file" id="input" accept="image/*" />
            </div>
            </div>

            <div className="flex items-center">
            <button type="button" className="rounded-md px-3 py-2" onClick={onPrevious}>Previous</button>          
            <button type="submit" className="rounded-md px-3 py-2">Next</button>
            </div>                
        </Form>      
    </Formik>
  );

}