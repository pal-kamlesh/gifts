import { Router } from "express";

import { ifAdmin, verifyToken } from "../middleware/verifyUser.js";
import {
  deleteUser,
  login,
  logout,
  register,
  users,
} from "../controllers/userController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", verifyToken, logout);
router.get("/", verifyToken, users);
router.delete("/:id", verifyToken, deleteUser);
export default router;
