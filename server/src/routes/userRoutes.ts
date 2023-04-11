import {
  getAllUsers,
  login,
  register,
  setAvatar,
} from "../controllers/usersController";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);

export default router;
