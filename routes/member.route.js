import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addMember, getMember, update } from "../controllers/member.js";

const router = express.Router();

router.post("/add", verifyToken, addMember);
router.get("/get", verifyToken, getMember);
// router.delete("/deletemeal/:mealId/:userId", verifyToken, deleteMeal);
router.put(`/:id/edit`, verifyToken, update);

export default router;
