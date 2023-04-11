"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersController_1 = require("../controllers/usersController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/register", usersController_1.register);
router.post("/login", usersController_1.login);
router.post("/setAvatar/:id", usersController_1.setAvatar);
router.get("/allUsers/:id", usersController_1.getAllUsers);
exports.default = router;
