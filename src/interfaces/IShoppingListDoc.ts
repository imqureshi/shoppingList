import mongoose, { Types } from "mongoose";

interface IShoppingListDoc extends mongoose.Document {
  createdBy: Types.ObjectId;
  items: Array<string>;
  sharedWith?: Array<{
    user: string;
    permission: "read" | "write" | "all";
  }>;
}

export default IShoppingListDoc;
