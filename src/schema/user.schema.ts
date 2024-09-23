import { object, string } from 'yup';

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
