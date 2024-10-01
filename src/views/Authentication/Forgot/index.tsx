'use client';
import {
  forgotInitialValues,
  forgotVerifyInitialValues,
  updateUserInitialValues,
} from '@/mock/forgot';
import {
  forgotEmailSchema,
  forgotOtpSchema,
  forgotPassSchema,
} from '@/schema/user.schema';
import axios from 'axios';

import { Field, Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';

export const ForgotView = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const handleSchema = () => {
    if (step == 1) {
      return forgotEmailSchema;
    } else if (step == 2) {
      return forgotOtpSchema;
    } else if (step == 3) {
      return forgotPassSchema;
    }
  };

  const formik = useFormik({
    initialValues: {
      forgotEmail: {
        email: '',
      },
      forgotOtp: forgotVerifyInitialValues,
      forgotPass: updateUserInitialValues,
    },
    validationSchema: handleSchema,
    onSubmit: () => {
      console.log('submitting');
    },
  });

  const sendOtp = async () => {
    try {
      const user = await axios.post(`http://localhost:3000/api/auth/forgot`, {
        email: formik.values.forgotEmail.email,
      });

      if (user.status != 200) {
        {
          return toast('user not found');
        }
      }
      toast('otp sent');
      setStep(step => step + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth/forgot/verify`,
        {
          email: formik.values.forgotEmail.email,
          code: formik.values.forgotOtp.code,
        },
      );
      if (res.status != 200) {
        return toast(res.data.error);
      }
      toast('otp verified');
      setStep(step => step + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const updated = await axios.put(`http://localhost:3000/api/user/update`, {
        email: formik.values.forgotEmail.email,
        password: formik.values.forgotPass.password,
      });

      if (updated.status != 200) {
        return toast(updated.data.error);
      }
      toast('user password updated successfully');
      router.push('/auth/login');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formik.errors, formik.values);
  return (
    <Fragment>
      <FormikProvider value={formik}>
        <div className='flex justify-center items-center w-full h-full'>
          <Form
            className='max-w-sm mx-auto p-4  shadow-gray-700  rounded-lg shadow-lg  w-full '
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-5 '>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium  dark:text-white'
              >
                Forgot Password
              </label>
              {/* step 1 starts */}
              {step == 1 && (
                <Fragment>
                  <Field
                    type='email'
                    name='forgotEmail.email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='enter your email'
                  />

                  <p className='text-red-500 text-[12px] font-inter font-medium'>
                    {formik.errors?.forgotEmail?.email}
                  </p>
                </Fragment>
              )}

              {/* step 1 ends */}
              {/* step 2 starts */}
              {step == 2 && (
                <Fragment>
                  <Field
                    type='text'
                    id='email'
                    name='forgotOtp.code'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='enter otp'
                  />

                  <p className='text-red-500 text-[12px] font-inter font-medium'>
                    {formik.errors?.forgotOtp?.code}
                  </p>
                </Fragment>
              )}
              {/* step 2 ends */}
              {/* step 3 starts */}

              {step == 3 && (
                <Fragment>
                  <Field
                    type='text'
                    id='email'
                    name='forgotPass.password'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='enter new password'
                  />
                  <Field
                    type='text'
                    id='email'
                    name='forgotPass.confirmPassword'
                    className='bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='confirm new password'
                  />

                  <p className='text-red-500 text-[12px] font-inter font-medium'>
                    {formik.errors?.forgotPass?.password ||
                      formik.errors.forgotPass?.confirmPassword}
                  </p>
                </Fragment>
              )}
            </div>

            {/* step 3 ends */}

            <div
              className={`flex items-center ${step > 1 ? 'justify-between' : 'justify-center'}`}
            >
              {step > 1 && (
                <button
                  type='button'
                  onClick={() => {
                    setStep(step => step - 1);
                  }}
                  className={`text-white ${loading ? 'bg-blue-400 cursor-not-allowed opacity-50' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  Back
                </button>
              )}

              <button
                type='button'
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  const errors = await formik.validateForm();
                  console.log(errors);
                  if (Object.keys(errors).length == 0) {
                    console.log(formik.values);
                    step == 1 && (await sendOtp());
                    step == 2 && (await verifyOtp());
                    step == 3 && (await updateUser());
                    setLoading(false);
                  } else {
                    setLoading(false);
                  }
                }}
                className={`text-white ${loading ? 'bg-blue-400 cursor-not-allowed opacity-50' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </FormikProvider>
    </Fragment>
  );
};
