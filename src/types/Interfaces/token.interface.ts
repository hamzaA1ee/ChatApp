import { IUser } from './user.interface';

export interface IToken {
  currentUser: IUser;
  accessToken: string;
}
