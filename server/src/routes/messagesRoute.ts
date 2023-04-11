import express from "express";
import { addMessage, getAllMessages } from "../controllers/messageController";

const router = express.Router();

router.post("/addMessage", addMessage);
router.post("/getMessages", getAllMessages);

export default router;
