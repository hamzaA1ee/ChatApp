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

// Generic T Type use case
/**

  const user: IUser<{ isAdmin: boolean }> = {
    email: 'admin@example.com',
    // ... other properties ...
    extendedProperties: { isAdmin: true },
  };

 */
