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
exports.User = void 0;
const bcrypt = require("bcrypt");
const MongoManager_1 = require("../db/mongo/MongoManager");
const userValidator_1 = require("../validators/userValidator");
class User {
    constructor() {
        this.userModel = MongoManager_1.MongoManager.getInstance().userModel;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = userValidator_1.userValidatorSchema.validate(user);
                if (error)
                    throw error;
                value.email = value.email.toLowerCase();
                value.password = yield bcrypt.hash(value.password, 10);
                const newUser = new this.userModel(value);
                return yield newUser.save();
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.User = User;
