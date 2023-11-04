export interface AppResponse {
  data?: any;
  msg?: string;
  error: boolean;
}
export interface IModuleResponse<T> {
  payload?: T;
  error: boolean;
}
export interface IResponseUser {
  name: string;
  email: string;
  createdAt?: Date | undefined;
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
  createdAt?: Date | undefined;
}
