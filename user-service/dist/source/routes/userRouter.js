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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const jwt = require("jsonwebtoken");
const express = require("express");
const user_1 = require("../controllers/user");
class UserRouter {
    constructor() {
        this.router = express.Router();
        this.router
            .post("/signup", this.createUser)
            .post("/signin", this.signIn);
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userItem = new user_1.User();
                let newUser = yield userItem.create(req.body);
                if (newUser) {
                    const token = jwt.sign({ userId: newUser._id }, 'someSecret', { expiresIn: 86400 });
                    return res.status(201).json({
                        token,
                        success: true
                    });
                }
                res.status(400).json({
                    success: false
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TODO
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserRouter = UserRouter;
