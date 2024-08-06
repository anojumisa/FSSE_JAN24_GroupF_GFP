import React, { useState } from "react";
import * as Yup from 'yup';
import FormProgress from "./form/FormProgress";
import PersonalInfoForm from "./form/OwnerForm";
import StoreForm from "./form/StoreForm";
import LocationForm from "./form/LocationForm";
import { ErrorMessage, Field, Form, Formik } from "formik";
import router from "next/router";

interface RegisterForm {
    seller_full_name: string;
    username: string;
    email: string;
    password_hash: string;
    store_name: string;
    description: string;
    contact_number: string;
    bank_account: string;
    image_url: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}
export default function MultiStepForm() {
      
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        personalInfo: {},
        storeInfo: {},
        locationInfo: {}
    }); 

    const onNext = (values: any) => {
        if (step === 1) {
            setFormData({...formData, personalInfo: values});
        } else if (step === 2) {
            setFormData({...formData, storeInfo: values});
        } else if (step === 3) {
            setFormData({...formData, locationInfo: values});
        }
        setStep(step + 1);
    };

    const onPrevious = (values: any) => {
        if (step === 3) {
            setFormData({...formData, locationInfo: values});
        }        
        setStep(step - 1);
    }  

    // async function handleSubmit (values: any) {
    //     try {
    //         const finalData = { ...formData, ...values };
      
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store_register`, {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(finalData)
    //         });
            
    //         if (!response.ok) {
    //             const errorText = await response.text();
    //             throw new Error(`Registration failed: ${errorText}`);
    //         }

    //         const responseData = await response.json();
    //         console.log('User registered:', responseData);
    //         router.push('/store_login'); 
    //     } catch (err:any) {
    //         console.log("Register failed:", err)
    //     }
    // };            

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Multistep Registration Form</h1>
            <FormProgress step = {step}/>
            {step === 1 && <PersonalInfoForm onNext={onNext} initialData={formData.personalInfo} />}
            {step === 2 && <StoreForm onNext={onNext} onPrevious={() => setStep(step - 1)} initialData={formData.storeInfo} />}
            {step === 3 && <LocationForm onNext={onNext} onPrevious={() => onPrevious(formData.locationInfo)} initialData={formData.locationInfo} />}        
        </div>
    )
}    
    // const handleSubmit = (values:any) => {
    //     alert(JSON.stringify(values, null, 2));
    // };

    // interface RegisterForm {
    //     seller_full_name: string;
    //     username: string;
    //     email: string;
    //     password_hash: string;
    //     store_name: string;
    //     description: string;
    //     contact_number: string;
    //     bank_account: string;
    //     image_url: string;
    //     address: string;
    //     city: string;
    //     state: string;
    //     zip_code: string;
    //     country: string;
    // }


    // const initialValues: FormData = {
    //     personalInfo: initialData.personalInfo || '',
    //     storeInfo: initialData.storeInfo || '',
    //     locationInfo: initialData.locationInfo || ''
    //   };

    //   const personalInfoSchema = Yup.object().shape({
    //     seller_full_name: Yup.string().min(2, 'Name is too short!').required('Full name required'),
    //     username: Yup.string().min(2, 'Username is too short!').required('Username required'),
    //     email: Yup.string().email('Invalid email format').required('Email required'),
    //     password_hash: Yup.string().required('Password required').
    //     matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number')
    //   });
    
    //   const storeInfoSchema = Yup.object().shape({
    //     store_name: Yup.string().required('Store name required'),
    //     description: Yup.string().required('Store description required'),
    //     contact_number: Yup.string().required('Contact number required'),
    //     bank_account: Yup.string().required('Bank account required'),
    //   });  
    
    //   const locationInfoSchema = Yup.object().shape({
    //     address: Yup.string().required('Street address required'),
    //     city: Yup.string().required('City required'),
    //     state: Yup.string().required('State required'),
    //     zip_code: Yup.string().matches(/^\d{5}$/, 'Invalid Zip Code').required('Zip code required')
    //   }); 
      
    
    //   const router = useRouter();    

    // const submitForm = async (data: any) => {
    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store_register`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });

        //     if (!response.ok) {
        //         const errorText = await response.text();
        //         throw new Error(`Registration failed: ${errorText}`);
        //     }

        //     const responseData = await response.json();
        //     console.log('User registered:', responseData);
        //     router.push('/store_login'); 
        // } catch (err:any) {
        //     setError(err.message);
        // }
    // };  
    
    // const renderStepContent = () => {
    //     switch (step) {
    //         case 1:
    //             return(
    //                 <Formik
    //                 initialValues={formData.personalInfo} 
    //                 validationSchema={personalInfoSchema}
    //                 onSubmit={onNext}>
    //                     <Form>
    //                         <h2 className="text-base font-semibold">Owner Information</h2>

    //                         <div className="col-span-full">
    //                         <label htmlFor="seller_full_name">Full Name</label>
    //                             <Field name="seller_full_name" type="text" placeholder="Enter your full name"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="seller_full_name" name="seller_full_name" component="div" />
    //                         </div>

    //                         <div className="col-span-full">
    //                         <label htmlFor="username">Username</label>
    //                             <Field name="username" type="text" placeholder="Enter your username"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="username" name="username" component="div" />
    //                         </div>

    //                         <div className="col-span-full">
    //                         <label htmlFor="email">Email</label>
    //                             <Field name="email" type="email" placeholder="Enter your email"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="email" name="email" component="div" />
    //                         </div>

    //                         <div className="col-span-full">
    //                         <label htmlFor="password_hash">Password</label>
    //                             <Field name="password_hash" type="password" placeholder="Enter your password"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="password_hash" name="password_hash" component="div" />
    //                         </div>

    //                         <div className="border-black">
    //                             <button type="submit" className="rounded-md px-3 py-2">Next</button>
    //                         </div>                
    //                     </Form>
    //                 </Formik>
    //             );

    //         case 2:
    //             return(
    //                 <Formik
    //                 initialValues={formData.storeInfo} 
    //                 validationSchema={storeInfoSchema}
    //                 onSubmit={onNext}>
    //                     <Form>
    //                         <h2 className="text-base font-semibold">Store Information</h2>

    //                         <div className="col-span-full">
    //                         <label htmlFor="store_name">Store Name</label>
    //                             <Field name="store_name" type="text" placeholder="Enter your store name"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="store_name" name="store_name" component="div" />
    //                         </div>

    //                         <div className="col-span-full">
    //                         <label htmlFor="description">Store Description</label>
    //                             <Field name="description" type="text" placeholder="Enter your store description"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="description" name="description" component="div" />
    //                         </div>

    //                         <div className="col-span-full">
    //                         <label htmlFor="contact_number">Contact Number</label>
    //                             <Field name="contact_number" type="text" placeholder="Enter your contact number"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="contact_number" name="contact_number" component="div" />
    //                         </div>

    //                         <div className="col-span-full">
    //                         <label htmlFor="bank_account">Bank Account</label>
    //                             <Field name="bank_account" type="text" placeholder="Enter your bank account"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="bank_account" name="bank_account" component="div" />
    //                         </div>

    //                         <div className="col-span-full">
    //                         <label>Store Image</label>
    //                         <div className="mt-2">
    //                             <input type="file" id="input" accept="image/*" />
    //                         </div>
    //                         </div>

    //                         <div className="flex items-center">
    //                         <button type="button" className="rounded-md px-3 py-2" onClick={onPrevious}>Previous</button>          
    //                         <button type="submit" className="rounded-md px-3 py-2">Next</button>
    //                         </div>                
    //                     </Form>      
    //                 </Formik>
    //             );

    //         case 3:
    //             return(
    //                 <Formik 
    //                 initialValues={formData.locationInfo} 
    //                 validationSchema={locationInfoSchema} 
    //                 onSubmit={handleSubmit}>

    //                     <Form>
    //                         <h2 className="text-base font-semibold">Store Location</h2>
    //                         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            
    //                         <div className="col-span-full">
    //                             <label>Street Address</label>
    //                             <div className="mt-2">
    //                             <Field name="address" type="text" placeholder="Enter your store address"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="address" name="address" component="div" />
    //                             </div>
    //                         </div>

    //                         <div className="sm:col-span-2 sm:col-start-1">
    //                             <label>City</label>
    //                             <div className="mt-2">
    //                             <Field name="city" type="text" placeholder="Enter your store city"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="city" name="city" component="div" /> 
    //                             </div>
    //                         </div>

    //                         <div className="sm:col-span-2">
    //                             <label>State / Province</label>
    //                             <div className="mt-2">
    //                             <Field name="state" type="text" placeholder="Enter your store state"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="state" name="state" component="div" />
    //                             </div>
    //                         </div>

    //                         <div className="sm:col-span-2">
    //                             <label>ZIP / Postal code</label>
    //                             <div className="mt-2">
    //                             <Field name="zip_code" type="text" placeholder="Enter your zip code"
    //                             className="p-3 block w-full rounded-md border-0 bg-transparent py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    //                             <ErrorMessage className="text-red-500 text-xs italic" id="zip_code" name="zip_code" component="div" />
    //                             </div>
    //                         </div>
    //                         </div>
                            
    //                         <div className="flex items-center">
    //                         <button type="button" onClick={onPrevious} className="rounded-md px-3 py-2">Previous</button>
    //                         <button type="submit" className="rounded-md px-3 py-2">Submit</button>
    //                         </div>                
    //                     </Form>      

    //                 </Formik>
    //             );
    //             default:
    //                 return null;                
    //     }
    // };

//     return (
//         <div className="container mx-auto px-4">
//             <h1 className="text-3xl font-bold mb-8">Multistep Registration Form</h1>
//             {renderStepContent()}
//         </div>
//     );
// }