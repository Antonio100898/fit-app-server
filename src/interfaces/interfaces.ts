import { ObjectId } from "mongodb";

export interface AppResponse {
  data?: any;
  msg: string;
  error: boolean;
}
export interface IModuleResponse<T> {
  payload?: T;
  error: boolean;
}

export enum UserType {
  ADMIN = 1,
  USER = 2,
}

export interface IUser {
  _id?: ObjectId
  userType: UserType;
  email: string;
  username: string;
  password: string;
  createdAt?: number;
}

export type ResponseUser = Omit<IUser, "password">;

export interface AuthResponseUser extends ResponseUser {
  token: string
}