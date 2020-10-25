"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require("async");
const HttpServer_1 = require("./source/service/HttpServer");
const MongoManager_1 = require("./source/db/mongo/MongoManager");
async.eachSeries([
    MongoManager_1.MongoManager.getInstance(),
    HttpServer_1.HttpServer.getInstance()
], (item, callback) => {
    try {
        item.start();
        callback(null);
    }
    catch (error) {
        callback(error);
    }
}, (error) => {
    if (error) {
        console.error("Service could not be started: ", error);
    }
    else {
        console.log(`Service running on port ${HttpServer_1.HttpServer.getInstance().port}`);
    }
});
