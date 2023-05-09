import express from "express";
import { signIn } from "../controllers/auth.controller";
import { signInValidation } from "../validators/auth.validators";
const router = express.Router();

router.post("/signIn", signInValidation, signIn);

export default router;
