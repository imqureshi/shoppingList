import { Request, Response, CookieOptions } from "express";
export interface ISignInBody {
  email: string;
  password: string;
}
export interface IJwtPayload {
  userId: string;
}
export interface IUser {
  email: string;
  password: string;
  confirmed?: boolean;
  role: "admin" | "user";
}
export interface ISignInResponse extends Response {
  cookie(name: string, value: string, options?: CookieOptions): this;
  status: (code: number) => any;
}
export interface ISignInRequest extends Request {
  body: ISignInBody;
}
