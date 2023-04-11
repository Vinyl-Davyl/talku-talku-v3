"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.setAvatar = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = yield userModel_1.default.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false });
        }
        const emailCheck = yield userModel_1.default.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield userModel_1.default.create({
            email,
            username,
            password: hashedPassword,
        });
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userModel_1.default.findOne({ username });
        if (!user) {
            return res.json({ msg: "Not Email! Incorrect username or password", status: false });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "Not Email! Incorrect username or password", status: false });
        }
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
});
exports.login = login;
const setAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = yield userModel_1.default.findByIdAndUpdate(userId, {
            isAvatarSet: true,
            avatarImage,
        }, { new: true });
        if (userData) {
            return res.json({
                isSet: userData.isAvatarSet,
                image: userData.avatarImage,
            });
        }
    }
    catch (ex) {
        next(ex);
    }
});
exports.setAvatar = setAvatar;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    }
    catch (ex) {
        next(ex);
    }
});
exports.getAllUsers = getAllUsers;
