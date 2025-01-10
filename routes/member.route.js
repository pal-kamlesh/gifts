import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addMember,
  getMember,
  selectMember,
  updateMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/add", verifyToken, addMember);
router.get("/get", verifyToken, getMember);
// router.delete("/deletemeal/:mealId/:userId", verifyToken, deleteMeal);
router.post(`/:id/edit`, verifyToken, updateMember);
router.post(`/:id/select`, verifyToken, selectMember);

export default router;
