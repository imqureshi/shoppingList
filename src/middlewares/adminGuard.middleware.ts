import { NextFunction } from "express";
import { errorHandler } from "../common/responseHandlers";
export const checkAdmin = (req: any, res: any, next: any) => {
  const { role } = req.user;
  if (role === "admin") {
    next();
  } else {
    return errorHandler(403, "forbidden, not allowed", res);
  }
};
