import dotenv from "dotenv";
import Ikeys from "../interfaces/IKeys";
dotenv.config();
const Keys: Ikeys = {
  port: process.env.PORT ? process.env.PORT : "",
  host: process.env.HOST ? process.env.HOST : "",
  mongoUri: process.env.MONGO_URI ? process.env.MONGO_URI : "",
  secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
  refreshSecret: process.env.REFRESH_SECRET ? process.env.REFRESH_SECRET : "",
  expireTimeJWT: process.env.TOKEN_TTL ? process.env.TOKEN_TTL : "",
  expireTimeRefreshToken: process.env.RT_TOKEN_TTL
    ? process.env.RT_TOKEN_TTL
    : "",
};
export default Keys;
