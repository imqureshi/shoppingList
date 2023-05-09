import List from "../models/shoppingList.model";
import IShoppingListDoc from "../interfaces/IShoppingListDoc";
import mongoose, { Types } from "mongoose";
import empty from "is-empty";
import { model } from "mongoose";
namespace ShoppingList {
  export const shareList = async (
    listId: string,
    permission: "read" | "write" | "all",
    sharedWith: string,
    userEmail: string,
    userId: string
  ): Promise<IShoppingListDoc> => {
    const packet = {
      user: sharedWith,
      permission: permission,
    };
    if (userEmail === sharedWith) {
      throw new Error("Cant share list with youself");
    }
    if (
      !empty(
        await List.findOne({
          _id: listId,
          "sharedWith.user": { $in: [sharedWith] },
        })
      )
    ) {
      throw new Error("list already shared");
    }
    try {
      const updatedDoc = await List.findOneAndUpdate(
        { _id: listId, createdBy: userId },
        { $addToSet: { sharedWith: packet } },
        { new: true }
      );
      if (empty(updatedDoc)) {
        throw new Error("list removed or forbidden");
      } else {
        return updatedDoc;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };
  export const readSharedLists = async (
    userId: string
  ): Promise<IShoppingListDoc[]> => {
    const listOFSharedLists = await List.find({
      createdBy: userId,
      sharedWith: { $ne: [] },
    });
    return listOFSharedLists;
  };
}

export default ShoppingList;
