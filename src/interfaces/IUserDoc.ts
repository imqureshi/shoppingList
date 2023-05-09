import mongoose from "mongoose";

interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
  confirmed: boolean;
  role: "admin" | "user";
  comparePassword: (password: string) => boolean;
}

export default IUserDoc;
