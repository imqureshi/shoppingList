import { errorHandler, responseHandler } from "../common/responseHandlers";
import ShoppingList from "../services/shoppingList.service";
export const shareList = async (req: any, res: any) => {
  try {
    const { listId } = req.params;
    const { email: userEmail, _id: userId } = req.user;
    const { permission, sharedWith } = req.body;
    const updatedList = await ShoppingList.shareList(
      listId,
      permission,
      sharedWith,
      userEmail,
      userId
    );
    return responseHandler(200, "Updated Successfully", res, updatedList);
  } catch (error) {
    console.error(error);
    return errorHandler(400, error.message, res);
  }
};
export const readSharedLists = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const shoppingLists = await ShoppingList.readSharedLists(userId);
    return responseHandler(200, "Updated Successfully", res, shoppingLists);
  } catch (error) {
    console.error(error);
    return errorHandler(400, error, res);
  }
};
