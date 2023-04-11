"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, max: 50 },
    isAvatarSet: {
        default: false,
    },
    avatarImage: { type: String, default: "" },
});
exports.default = (0, mongoose_1.model)("ChatUser", userSchema);
