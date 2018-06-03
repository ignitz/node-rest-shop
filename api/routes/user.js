import express from "express";
import { user_signup, user_login, user_delete } from "../controllers/user";

const router = express.Router();

router.post("/signup", user_signup);

router.post("/login", user_login);

router.delete("/:userId", user_delete);

export default router;
