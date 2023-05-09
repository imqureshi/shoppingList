import { Request, Response } from "express";
export interface ISharedListBody {
  listId: string;
  sharedWith: [
    {
      user: string;
      permission: "read" | "write" | "all";
    }
  ];
}
export interface IShoppingList {
  createdBy: string;
  items: string[];
  sharedWith?: [
    {
      user: string;
      permission: "read" | "write" | "all";
    }
  ];
}
export interface ISharedListReadUserValidation {
  userId: string;
}
export interface IUser {
  email: string;
  password: string;
  confirmed?: boolean;
  role: "admin" | "user";
}
export interface ISharedListResponse extends Response {
  status: (code: number) => any;
}
export interface ISharedListRequest extends Request {
  body: ISharedListBody;
}
