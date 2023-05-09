import mongoose from "mongoose";
import IUserDoc from "../interfaces/IUserDoc";
import bcrypt from "bcrypt";
import writeToJSON from "../common/writeToJson";
const userSchema = new mongoose.Schema<IUserDoc>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    role: { type: String, enum: ["admin", "user"] },
  },
  { timestamps: true }
);
userSchema.pre<IUserDoc>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(14);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post<IUserDoc>("save", async function (doc: IUserDoc, next) {
  const packet = { email: doc.email, _id: doc._id };
  writeToJSON<{ email: string; _id: string }>(packet, "usersIdMap.json");
  next();
});
// Add method to compare user password with hashed password
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model<IUserDoc>("User", userSchema);
export default User;
