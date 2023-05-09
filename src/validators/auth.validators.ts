import Joi from "joi";
import { NextFunction } from "express";
import {
  ISignInBody,
  ISignInRequest,
  ISignInResponse,
} from "../interfaces/auth.interfaces";
import { errorHandler } from "../common/responseHandlers";
export const signInValidation = (
  req: ISignInRequest,
  res: ISignInResponse,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const dataToValidate = { email, password };
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;\"'<>,.?/|\\~-]+$/;
  const schema = Joi.object<ISignInBody>({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(pattern)
      .message(
        "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number,"
      )
      .required(),
  });
  try {
    const { error } = schema.validate(dataToValidate);
    if (error) {
      return errorHandler(401, error, res);
    }
    next();
  } catch (err) {
    console.error(err);
    return;
  }
};

export const tokenValidation = (req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  const dataToValidate = { authorization };
  const schema = Joi.object<{ authorization: String }>({
    authorization: Joi.string().required(),
  });
  try {
    const { error } = schema.validate(dataToValidate);
    if (error) {
      return errorHandler(401, error, res);
    }
    next();
  } catch (err) {
    console.error(err);
    return;
  }
};
