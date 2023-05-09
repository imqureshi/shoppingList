import { Request, Response, CookieOptions } from "express";
import UserService from "../services/user.service";
import { responseHandler, errorHandler } from "../common/responseHandlers";
import {
  ISignInBody,
  ISignInResponse,
  ISignInRequest,
} from "../interfaces/auth.interfaces";
// import { CookieOptions } from "cookie-parser";
export const signIn = async (req: ISignInRequest, res: ISignInResponse) => {
  const { email, password } = req.body;
  try {
    const { token, refreshToken } = await UserService.signIn(email, password);
    res.cookie("jwt", token, {
      httpOnly: true,
      //   secure: true,
      //   sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //   secure: true,
      //   sameSite: "strict",
    });
    return responseHandler(200, "login successful", res);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};
