import User from "../models/user.model";
import IUserDoc from "../interfaces/IUserDoc";
import { IJwtPayload } from "../interfaces/auth.interfaces";
import empty from "is-empty";
import Jwt from "../services/jwt.service";
namespace UserService {
  export const signIn = async (
    email: string,
    password: string
  ): Promise<{ token: string; refreshToken: string }> => {
    const user: IUserDoc | null = await User.findOne({ email });
    if (user) {
      if (empty(user)) {
        throw new Error("Invalid Credentials!`");
      }
      const { _id: userId } = user;
      const isMatch = user.comparePassword(password);
      if (!isMatch) {
        throw new Error(`Invalid Credentials!`);
      }
      try {
        const token = Jwt.generateJwtToken<IJwtPayload>({ userId });
        const refreshToken = Jwt.generateRefreshToken<IJwtPayload>({ userId });
        return { token, refreshToken };
      } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
      }
    } else {
      throw new Error("Invalid Credentials!`");
    }
  };
  export const getUserIdFromEmail = async (email: string) => {
    const { _id: userId } = await User.findOne({ email }, { _id: 1 });
    return userId;
  };
}

export default UserService;
