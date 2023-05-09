import express from "express";
import { shareList, readSharedLists } from "../controllers/shopping.controller";
import {
  sharedListValidation,
  sharedListReadUserValidation,
} from "../validators/shopping.validators";
import { tokenValidation } from "../validators/auth.validators";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkAdmin } from "../middlewares/adminGuard.middleware";
const router = express.Router();

router.put(
  "/sharedLists/:listId",
  tokenValidation,
  authMiddleware,
  sharedListValidation,
  shareList
);
// its like an admin route because you can view anyone else shopping list without being shared it with you
router.get(
  "/sharedLists/:userId",
  tokenValidation,
  authMiddleware,
  checkAdmin,
  sharedListReadUserValidation,
  readSharedLists
);

export default router;
