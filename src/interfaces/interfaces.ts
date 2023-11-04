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
