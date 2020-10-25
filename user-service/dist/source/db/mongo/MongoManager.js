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
exports.MongoManager = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Config_1 = require("../../config/Config");
const ConfigSource_1 = require("../../config/ConfigSource");
const UserSchema_1 = require("./user/UserSchema");
class MongoManager {
    constructor(enforce) {
        this.getConfig = Config_1.Config.getInstance().configsFromSource(ConfigSource_1.ConfigSource.MONGO);
        this.connected = false;
        if (enforce !== Enforce) {
            throw new Error("MongoManager is singletone");
        }
    }
    get userModel() {
        return this._userModel;
    }
    static getInstance() {
        if (MongoManager.instance == null) {
            MongoManager.instance = new MongoManager(Enforce);
        }
        return MongoManager.instance;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mongoConnection == null) {
                mongoose.set("useNewUrlParser", true);
                mongoose.set("useUnifiedTopology", true);
                mongoose.set("useCreateIndex", true);
                mongoose.set("useFindAndModify", true);
                this.mongoConnection = yield mongoose_1.createConnection(this.getConfig("mongo:dockerUri"));
                if (this.mongoConnection) {
                    this._userModel = this.mongoConnection.model("User", UserSchema_1.userSchema);
                    this.connected = true;
                    console.log('MongoDB: connected');
                }
            }
            else {
                throw new Error("MongoManager: You can 'start' function only once");
            }
        });
    }
}
exports.MongoManager = MongoManager;
function Enforce() {
}
