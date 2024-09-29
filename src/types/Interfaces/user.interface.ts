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

export interface IUserServer {
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
}

export const isUserType = (body: any): body is IUserServer => {
  return (
    (body as IUserServer).email !== undefined &&
    (body as IUserServer).password !== undefined &&
    (body as IUserServer).firstName !== undefined &&
    (body as IUserServer).lastName !== undefined
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
