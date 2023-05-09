import faker from "faker";
import { IShoppingList } from "../interfaces/shoppingList.interfaces";
import * as fs from "fs/promises";
import User from "../models/user.model";
import List from "../models/shoppingList.model";
import empty from "is-empty";
const getRandomUser = async () => {
  const count = await User.countDocuments();
  const random = Math.floor(Math.random() * count);
  const randomUser = await User.findOne({}, { email: 1, _id: 1 }).skip(random);
  return randomUser?._id;
};
export const generateShoppingList = async (
  noOfIterations: number
): Promise<Boolean> => {
  if (!empty(await List.find())) {
    throw new Error("lists already exists");
  }
  const lists: IShoppingList[] = [];
  for (let i = 0; i < noOfIterations; i++) {
    const createdBy = await getRandomUser();
    const items = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];
    const list: IShoppingList = { createdBy, items };
    console.log({ list });
    lists.push(list);
  }
  // try {
  //   const data = JSON.stringify(lists, null, 2);
  //   await fs.writeFile("./data/shopping.json", data);
  // } catch (error) {
  //   console.log("error writing users to the file", error);
  //   throw new Error("error writing users to the file");
  // }
  try {
    console.log("data", lists);
    for (let list of lists) {
      await new List(list).save();
    }
    return true;
  } catch (error) {
    console.log("error while generating fake users", error);
    throw new Error("error writing users to the file");
  }
};
