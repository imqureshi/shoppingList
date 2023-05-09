import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import {
  ISharedListBody,
  ISharedListReadUserValidation,
} from "../interfaces/shoppingList.interfaces";
import { errorHandler } from "../common/responseHandlers";
export const sharedListValidation = (req, res, next: NextFunction) => {
  const { listId } = req.params;
  const { sharedWith, permission } = req.body;
  const dataToValidate = {
    listId,
    sharedWith,
    permission,
  };
  const schema = Joi.object({
    listId: Joi.string().required(),
    sharedWith: Joi.string().email().required(),
    permission: Joi.string().valid("read", "write", "all").required(),
  });
  try {
    const { error } = schema.validate(dataToValidate);
    if (error) {
      return errorHandler(400, error, res);
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return;
  }
};

export const sharedListReadUserValidation = (req, res, next: NextFunction) => {
  const { userId } = req.params;
  const dataToValidate = { userId };
  const schema = Joi.object<ISharedListReadUserValidation>({
    userId: Joi.string().required(),
  });
  try {
    const { error } = schema.validate(dataToValidate);
    if (error) {
      return errorHandler(400, error, res);
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return;
  }
};
