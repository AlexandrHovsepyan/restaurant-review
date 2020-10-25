"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: true
    }
}, { timestamps: true });
exports.userSchema = userSchema;
