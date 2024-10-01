import {
  IForgot,
  IForgotVerify,
  IUpdateUser,
} from '@/types/Interfaces/user.interface';

export const forgotInitialValues: IForgot = {
  email: '',
};

export const forgotVerifyInitialValues: IForgotVerify = {
  code: '',
  email: '',
};

export const updateUserInitialValues: IUpdateUser = {
  email: '',
  password: '',
  confirmPassword: '',
};
