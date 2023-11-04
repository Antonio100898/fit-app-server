import { AppResponse } from "../interfaces/interfaces";

export const jsonResponse = <T>(error: boolean, msg: string, data?: T) => {
  return { error, msg, data } as AppResponse;
};
