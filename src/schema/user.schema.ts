import { object, string, ref } from 'yup';

export const registerationSchema = object({
  firstName: string().required('first name is required'),
  lastName: string().required('last name is required'),
  email: string().email('incorrect email format').required('email is required'),
  password: string()
    .min(6, 'atleast 6 characters are requried')
    .required('password is required'),
});

export const loginSchema = object({
  email: string().email('incorrect email format').required('email is required'),
  password: string()
    .min(6, 'min 6 characters are required')
    .required('password is required'),
});

export const forgotEmailSchema = object({
  forgotEmail: object({
    email: string()
      .email('incorrect email format')
      .required('email is required'),
  }),
});

export const forgotOtpSchema = object({
  forgotOtp: object({
    code: string()
      .min(4, 'otp code is of 4 digits')
      .required('otp code is required'),
  }),
});

export const forgotPassSchema = object({
  forgotPass: object({
    password: string()
      .min(6, 'password is of atleast 6 characters')
      .required('password is required'),
    confirmPassword: string()
      .oneOf([ref('password'), ''], 'Passwords must match')
      .required('Confirm password is required'),
  }),
});
