import { ISignInRequest, ISignInResponse } from "../interfaces/auth.interfaces";
export const errorHandler = (
  code: number,
  message: string | object,
  res: ISignInResponse
): ISignInResponse => {
  return res.status(code).send({ success: false, message: message });
};
export const responseHandler = (
  code: number,
  message: string | object,
  res: ISignInResponse,
  payload: object = {}
): ISignInResponse => {
  return res
    .status(code)
    .send({ success: true, message: message, payload: payload });
};
