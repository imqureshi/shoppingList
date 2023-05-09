import jwt from "jsonwebtoken";
import Keys from "../keys";
import { promisify } from "util";
const { secret, refreshSecret, expireTimeJWT, expireTimeRefreshToken } = Keys;
promisify(jwt.sign);
namespace JwtService {
  export const generateJwtToken = <T extends object>(payload: T): string => {
    try {
      const token = jwt.sign(payload, secret, {
        expiresIn: expireTimeRefreshToken,
      });
      return token;
    } catch (error) {
      console.error("error while generating jwt token", error);
      throw new Error("error while generating jwt token");
    }
  };

  export const generateRefreshToken = <T extends object>(
    payload: T
  ): string => {
    try {
      const token = jwt.sign(payload, refreshSecret, {
        expiresIn: expireTimeRefreshToken,
      });
      return token;
    } catch (error) {
      console.error("error while generating refresh token", error);
      throw new Error("error while generating refresh token");
    }
  };

  export const verifyJwtToken = async <T>(token: string): Promise<T> => {
    try {
      const decoded = jwt.verify(token, secret) as T;
      return decoded;
    } catch (error) {
      console.error("error verifying token", error);
      throw new Error("error verifying token");
    }
  };

  export const verifyRefreshToken = async <T>(token: string): Promise<T> => {
    try {
      const decoded = jwt.verify(token, refreshSecret) as T;
      return decoded;
    } catch (error) {
      console.error("error verifying refresh token", error);
      throw new Error("error verifying refresh token");
    }
  };
}

export default JwtService;
