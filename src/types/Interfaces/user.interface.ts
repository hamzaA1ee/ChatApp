// Purpose: User interface defines the properties of a user.

// Types Imports

export interface IUser {
  /**
   * Email: User's email address.
   */
  email: string;

  /**
   * First Name: User's first name.
   */
  firstName: string;

  /**
   * Last Name: User's last name.
   */
  lastName: string;

  /**
   * id: User's id.
   */

  id: string;
}

export interface IUserRegister {
  /**
   * Email: User's email address.
   */
  email: string;

  /**
   * First Name: User's first name.
   */
  firstName: string;

  /**
   * Last Name: User's last name.
   */
  lastName: string;

  /**
   * id: User's id.
   */

  id: string;
  /**
   * password: User's password.
   */

  password: string;
  /**
   * verificationStatus: User's status.
   */

  verificationStatus: boolean;
  /**
   * code: User's otp code.
   */
  code: string;
  /**
   * time: User's otp's expiry.
   */
  time: Date;
}

export interface IUpdateUser {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IForgot {
  email: string;
}
export interface IForgotVerify {
  email: string;
  code: string;
}

export const IUserRegisterUpdateType = (body: any): body is IUserRegister => {
  return (
    ((body as IUserRegister).firstName !== undefined ||
      (body as IUserRegister).lastName !== undefined ||
      (body as IUserRegister).password !== undefined) &&
    (body as IUserRegister).email !== undefined
  );
};

export const isUserRegisterType = (body: any): body is IUserRegister => {
  return (
    (body as IUserRegister).email !== undefined &&
    (body as IUserRegister).password !== undefined &&
    (body as IUserRegister).firstName !== undefined &&
    (body as IUserRegister).lastName !== undefined
  );
};

export const isUserLoginType = (body: any): body is IUserLogin => {
  return (
    (body as IUserLogin).email !== undefined &&
    (body as IUserLogin).password !== undefined
  );
};

export const isForgotType = (body: any): body is IForgot => {
  return (body as IForgot).email !== undefined;
};

export const isForgotVerifyType = (body: any): body is IForgotVerify => {
  return (
    (body as IForgotVerify).email !== undefined &&
    (body as IForgotVerify).code !== undefined
  );
};

// Generic T Type use case
/**

  const user: IUser<{ isAdmin: boolean }> = {
    email: 'admin@example.com',
    // ... other properties ...
    extendedProperties: { isAdmin: true },
  };

 */
