import faker from "faker";
import IUserDoc from "../interfaces/IUserDoc";
import { IUser } from "../interfaces/auth.interfaces";
import empty from "is-empty";
import * as fs from "fs/promises";
import User from "../models/user.model";
export const generateFakeUsers = async (
  noOfIterations: number
): Promise<Boolean> => {
  if (!empty(await User.find())) {
    throw new Error("Users already exists");
  }
  const users: IUser[] = [];
  for (let i = 0; i < noOfIterations; i++) {
    const email = faker.internet.email();
    const randomRole = faker.random.arrayElement(["admin", "user"]);
    const password = faker.internet.password(15, false);
    const user: IUser = {
      email,
      password: password,
      confirmed: true,
      role: randomRole as "admin" | "user",
    };

    users.push(user);
  }
  try {
    const data = JSON.stringify(users, null, 2);
    await fs.writeFile("./data/users.json", data);
  } catch (error) {
    console.log("error writing users to the file", error);
    throw new Error("error writing users to the file");
  }
  try {
    console.log("data", users);
    for (let user of users) {
      await new User(user).save();
    }
    return true;
  } catch (error) {
    console.log("error while generating fake users", error);
    throw new Error("error writing users to the file");
  }
};
