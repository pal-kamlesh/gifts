import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addMember,
  archiveMember,
  getMember,
  selectMember,
  unArchive,
  unSelectMember,
  updateMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/add", verifyToken, addMember);
router.get("/get", verifyToken, getMember);
// router.delete("/deletemeal/:mealId/:userId", verifyToken, deleteMeal);
router.post(`/:id/edit`, verifyToken, updateMember);
router.post(`/:id/select`, verifyToken, selectMember);
router.post("/:id/unselect", verifyToken, unSelectMember);
router.post("/:id/archive", verifyToken, archiveMember);
router.post("/:id/unarchive", verifyToken, unArchive);
export default router;
