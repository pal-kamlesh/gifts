import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addMember,
  archiveMember,
  getMember,
  selectMember,
  unArchive,
  unSelectMember,
  updateDelivery,
  updateMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/add", verifyToken, addMember);
router.get("/get", verifyToken, getMember);
router.post("/:id/edit", verifyToken, updateMember);
router.post("/:id/select", verifyToken, selectMember);
router.post("/:id/unselect", verifyToken, unSelectMember);
router.post("/:id/archive", verifyToken, archiveMember);
router.post("/:id/unarchive", verifyToken, unArchive);
router.post("/:id/deliveryStatus", verifyToken, updateDelivery);
export default router;
