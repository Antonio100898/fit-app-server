export interface AppResponse {
  data?: any;
  msg?: string;
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
  userType: UserType;
  email: string;
  username: string;
  password: string;
  createdAt?: number
}

export type IResponseUser = Omit<IUser, "password">