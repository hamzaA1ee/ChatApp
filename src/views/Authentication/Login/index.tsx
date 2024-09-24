'use client';

// React Imports
import { FC, Fragment, useState } from 'react';

// Custom Component Imports
import { Button } from '@/components/ui/button';
import { FormikProvider, useFormik } from 'formik';

//schema imports
import { loginSchema } from '@/schema/login.schema';
import axios from 'axios';

//next imports
import { useRouter } from 'next/navigation';
import { setCookieClientSideFn } from '@/utils/storage.util';

interface ISignInViewProps {}

const SignInView: FC<ISignInViewProps> = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async () => {
      setDisabled(true);
      const errors = await formik.validateForm();
      if (Object.keys(errors).length === 0) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
              email: formik.values.email,
              password: formik.values.password,
            },
          );
          if (res.status === 201) {
            setCookieClientSideFn('accessToken', res.data?.accessToken);
            setCookieClientSideFn('user', res.data?.currentUser);
            router.push('/chat');
          }
        } catch (error) {
          setError('login failed');
          console.log(error);
        }
      }
      setDisabled(false);
    },
  });
  return (
    <Fragment>
      <FormikProvider value={formik}>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign in to your account
            </h2>
            <p className='text-red-500 text-[12px] font-inter font-medium text-center'>
              {error}
            </p>
          </div>

          <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
                <p className='text-red-500 text-[12px] font-inter font-medium'>
                  {formik.errors.email}
                </p>
              </div>

              <div>
                <div className='mt-2 flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                </div>
                <div className='mt-1'>
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
                <Button
                  type='submit'
                  disabled={disabled}
                  className={`mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:cursor-pointer ${disabled && 'bg-gray-400 text-white cursor-not-allowed opacity-50'}`}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </FormikProvider>
    </Fragment>
  );
};

export default SignInView;
