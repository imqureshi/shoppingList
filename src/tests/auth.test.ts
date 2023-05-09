import axios from "axios";
import { describe, expect, it } from "@jest/globals";
import * as userData from "../data/users.json";
import * as cookie from "cookie";
import empty from "is-empty";

const base_url = "http://localhost:3000";
export const getAdminUser = () => {
  for (let user of Object.values(userData)) {
    if (user?.role === "admin") {
      const { email, password } = user;
      return { email, password };
    }
  }
  throw new Error("admin not found");
};
export const getCredentials = (admin = false): any => {
  let credentials = {};
  if (admin) {
    credentials = getAdminUser();
    return credentials;
  } else {
    const { email, password } = userData[0];
    credentials = { email, password };
    return credentials;
  }
};
export const getToken = async (admin = false) => {
  const credentials = getCredentials(admin);
  const { email } = credentials;
  if (!empty(credentials)) {
    const response = await axios.post(`${base_url}/signin`, credentials);
    const setCookieHeader = response.headers["set-cookie"];

    if (!setCookieHeader) {
      throw new Error("Set-Cookie header not found in response");
    }

    const parsedCookie = cookie.parse(setCookieHeader[0]);

    if (!parsedCookie?.jwt) {
      throw new Error("Cookie value not found in Set-Cookie header");
    }
    return { email, token: `Bearer ${parsedCookie?.jwt}` };
  }
  throw new Error("credentials not found");
};
describe("Authentication", () => {
  it("should authenticate a user and return a token", async () => {
    const credentials = getCredentials();
    console.log({ credentials });
    try {
      const response = await axios.post(`${base_url}/signin`, credentials);
      console.log({ response: response.data });
      expect(response.status).toBe(200);
      expect(response.data?.success).toBeTruthy();
    } catch (error) {
      console.log({ error: JSON.stringify(error) });
    }
  });

  it("should fail to authenticate with an incorrect password", async () => {
    try {
      const credentials = getCredentials();
      if (!empty(credentials)) {
        const { email } = credentials;
        await axios.post(`${base_url}/signin`, {
          email,
          password: "wrongpassword",
        });
      }
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data?.success).toBeFalsy();
    }
  });

  it("should fail to authenticate with an invalid email", async () => {
    try {
      const credentials = getCredentials();
      const { password } = credentials;
      await axios.post(`${base_url}/signin`, {
        email: "invalidemail",
        password,
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data?.success).toBeFalsy();
    }
  });
});
