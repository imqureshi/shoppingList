import User from "../models/user.model";
import { IJwtPayload } from "../interfaces/auth.interfaces";
import Jwt from "../services/jwt.service";
import { errorHandler } from "../common/responseHandlers";
export const authMiddleware = async (req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  const tokenArray = authorization.split(" ");
  const token = tokenArray[1];
  try {
    const payload = await Jwt.verifyJwtToken<IJwtPayload>(token);
    const { userId } = payload;
    console.log(
      "🚀 ~ file: auth.middleware.ts:12 ~ authMiddleware ~ userId:",
      userId
    );
    try {
      const user = await User.findOne({ _id: userId }, { password: 0 });
      if (user) {
        req.user = user;
        next();
      } else {
        return errorHandler(401, "Unauthorized!", res);
      }
    } catch (error) {
      console.error(error);
      return errorHandler(401, "Unauthorized!", res);
    }
  } catch (error) {
    console.error(error);
    return errorHandler(401, "Unauthorized Invalid Token!", res);
  }
};
