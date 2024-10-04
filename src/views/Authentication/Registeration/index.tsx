'use client';
// React Imports
import { Fragment, useState } from 'react';

//next imports
import { useRouter } from 'next/navigation';

//formik imports
import { useFormik, FormikProvider } from 'formik';
//schema imports
import { registerationSchema } from '../../../schema/user.schema';

//axios
import axios from 'axios';
import Link from 'next/link';

const RegistrationView = () => {
  const [errors, setErros] = useState('');
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: registerationSchema,

    onSubmit: values => {
      console.log('values being submitted');
    },
  });
  return (
    <Fragment>
      <FormikProvider value={formik}>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign Up
            </h2>
          </div>

          <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form
              onSubmit={formik.handleSubmit}
              className='space-y-6'
            >
              <div>
                <label
                  htmlFor='first'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    id='first'
                    name='firstName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type='text'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
                <p className='text-red-500 text-[12px] font-inter font-medium'>
                  {formik.errors.firstName}
                </p>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='last'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Last name
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='last'
                    name='lastName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type='text'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
                <p className='text-red-500 text-[12px] font-inter font-medium'>
                  {formik.errors.lastName}
                </p>
              </div>
              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Email
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
                <p className='text-red-500 text-[12px] font-inter font-medium'>
                  {formik.errors.email}
                </p>
              </div>
              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='current-password'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
                <p className='text-red-500 text-[12px] font-inter font-medium'>
                  {formik.errors.password}
                </p>
              </div>

              <div>
                <button
                  type='submit'
                  disabled={disabled}
                  onClick={() => {
                    (async () => {
                      setDisabled(true);
                      const errors = await formik.validateForm();
                      if (Object.keys(errors).length == 0) {
                        try {
                          const res = await axios.post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
                            {
                              firstName: formik.values.firstName,
                              lastName: formik.values.lastName,
                              email: formik.values.email,
                              password: formik.values.password,
                            },
                          );
                          if (res.status == 201) {
                            router.push('/auth/login');
                            formik.resetForm();
                          } else {
                            setErros('Registeration failed');
                          }
                        } catch (error) {
                          console.log(error);
                        }
                        setDisabled(false);
                      }
                    })();

                    console.log(formik.errors);
                  }}
                  className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:cursor-pointer ${disabled && 'bg-gray-400 text-white cursor-not-allowed opacity-50'}`}
                >
                  Sign up
                </button>
                <p className='text-red-500 text-[12px] font-inter font-medium'>
                  {errors}
                </p>
              </div>
              <div className='flex items-center justify-end mt-2'>
                <Link
                  className='text-center'
                  href={'/auth/login'}
                >
                  Sign in?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </FormikProvider>
    </Fragment>
  );
};

export default RegistrationView;
