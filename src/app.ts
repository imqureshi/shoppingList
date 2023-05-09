import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import helmet from "helmet";
import Keys from "./keys";
import auth from "./routes/auth.routes";
import shopping from "./routes/shopping.routes";
import mongoose, { ConnectOptions } from "mongoose";
import { generateFakeUsers } from "./seeders/user.seed";
import { generateShoppingList } from "./seeders/shopping.seed";
import morgan from "morgan";

const logFormat =
  ":method :url :status :response-time ms - :res[content-length] :req-body :res-body";
const { port, mongoUri } = Keys;
// console.log("🚀 ~ file: app.ts:12 ~ mongoUri:", mongoUri);
const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(helmet());
// app.use(morgan(logFormat));
app.use("/", auth);
app.use("/shoppingList", shopping);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("DB connection established");
  } catch (error) {
    console.error("error connecting to the database", error);
  }

  try {
    await generateFakeUsers(5);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
  try {
    await generateShoppingList(25);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
});
