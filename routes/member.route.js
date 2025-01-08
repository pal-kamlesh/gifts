import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addMember,
  getMember,
  selectMember,
  update,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/add", verifyToken, addMember);
router.get("/get", verifyToken, getMember);
// router.delete("/deletemeal/:mealId/:userId", verifyToken, deleteMeal);
router.put(`/:id/edit`, verifyToken, update);
router.post(`/:id/select`, verifyToken, selectMember);

export default router;
