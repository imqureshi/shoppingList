import { describe, expect, it } from "@jest/globals";
import { getToken } from "./auth.test";
import * as shoppingList from "../data/shopping.json";
import * as userIdMapList from "../data/usersIdMap.json";
import * as users from "../data/users.json";
import axios from "axios";
let token: string;
let adminToken: string;
let email: string;
let adminEmail: string;
let shareUserAgain: string;
const base_url = "http://localhost:3000";
const getShoppingList = (userId: string, exclude = false) => {
  for (let list of Object.values(shoppingList)) {
    if (list?.createdBy === userId) {
      return list;
    } else {
      if (exclude) {
        return list;
      }
    }
  }
};
const getUserId = (email: string) => {
  for (let userPacket of Object.values(userIdMapList)) {
    if (userPacket?.email === email) {
      console.log(userPacket);
      return userPacket?._id;
    }
  }
};
const getRandomUser = (excludeEmail: string, role = "user") => {
  for (let user of Object.values(users)) {
    if (user?.email !== excludeEmail && user?.role !== role) {
      return user?.email;
    }
  }
};
(async () => {
  const result = await getToken(false);
  const adminResult = await getToken(true);
  token = result?.token;
  email = result?.email;
  adminToken = adminResult?.token;
  adminEmail = adminResult?.email;
})();
describe("ShoppingList", () => {
  describe("shareList", () => {
    it("write wrong list Id", async () => {
      try {
        const listId = "da123das1dqs1sdas123";
        console.log({ token });
        await axios.put(
          `${base_url}/shoppingList/sharedLists/${listId}`,
          { sharedWith: ["user2@example.com"], permission: "read" },
          { headers: { Authorization: token } }
        );
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data?.success).toBeFalsy();
      }
    });
    it("try to edit someone else list", async () => {
      try {
        const userId = getUserId(email);
        const list = getShoppingList(userId, true);
        const sharedWith = getRandomUser(email);
        const { _id: listId } = list;
        await axios.put(
          `${base_url}/shoppingList/sharedLists/${listId}`,
          { sharedWith, permission: "read" },
          { headers: { Authorization: token } }
        );
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data?.success).toBeFalsy();
      }
    });
    it("try to share list with yourself", async () => {
      try {
        const userId = getUserId(email);
        const list = getShoppingList(userId);
        const sharedWith = email;
        const { _id: listId } = list;
        await axios.put(
          `${base_url}/shoppingList/sharedLists/${listId}`,
          { sharedWith, permission: "read" },
          { headers: { Authorization: token } }
        );
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data?.success).toBeFalsy();
      }
    });
    it("share list", async () => {
      try {
        const userId = getUserId(email);
        const list = getShoppingList(userId);
        console.log("🚀 ~ file: shoppingList.test.ts:98 ~ it ~ list:", list);
        const sharedWith = getRandomUser(email);
        shareUserAgain = sharedWith;
        const { _id: listId } = list;
        const response = await axios.put(
          `${base_url}/shoppingList/sharedLists/${listId}`,
          { sharedWith, permission: "read" },
          { headers: { Authorization: token } }
        );
        expect(response.status).toBe(200);
        expect(response.data?.success).toBeTruthy();
      } catch (error) {
        console.log(error.response.data);
        throw new Error("throw error if already shared");
      }
    });
    it("share with the same user again", async () => {
      try {
        const userId = getUserId(email);
        const list = getShoppingList(userId);
        const sharedWith = shareUserAgain;
        const { _id: listId } = list;
        await axios.put(
          `${base_url}/shoppingList/sharedLists/${listId}`,
          { sharedWith, permission: "read" },
          { headers: { Authorization: token } }
        );
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data?.success).toBeFalsy();
      }
    });
  });
  describe("readList", () => {
    it("try to access this route without root permissions", async () => {
      try {
        const userId = getRandomUser(email);
        await axios.get(`${base_url}/shoppingList/sharedLists/${userId}`, {
          headers: { Authorization: adminToken },
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data?.success).toBeFalsy();
      }
    });
    it("get list", async () => {
      try {
        const userEmail = getRandomUser(email);
        const userId = getUserId(userEmail);
        console.log(
          "🚀 ~ file: shoppingList.test.ts:145 ~ it ~ userId:",
          userId
        );
        const response = await axios.get(
          `${base_url}/shoppingList/sharedLists/${userId}`,
          {
            headers: { Authorization: adminToken },
          }
        );
        expect(response.status).toBe(200);
        expect(response.data?.success).toBeTruthy();
      } catch (error) {
        console.error(error.message);
      }
    });
  });
});
