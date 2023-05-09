import { model, Schema } from "mongoose";
import IShoppingListDoc from "../interfaces/IShoppingListDoc";
import writeToJSON from "../common/writeToJson";
const shoppingSchema = new Schema<IShoppingListDoc>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [{ type: String, required: true }],
    sharedWith: [
      {
        user: { type: String, ref: "User", required: true },
        permission: {
          type: String,
          enum: ["read", "write", "all"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
shoppingSchema.post<IShoppingListDoc>(
  "save",
  async function (doc: IShoppingListDoc, next) {
    writeToJSON<IShoppingListDoc>(doc, "shopping.json");
    next();
  }
);
const List = model<IShoppingListDoc>("List", shoppingSchema);
export default List;
