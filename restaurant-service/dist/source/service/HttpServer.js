"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = void 0;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Config_1 = require("../config/Config");
const ConfigSource_1 = require("../config/ConfigSource");
const restaurantRouter_1 = require("../routes/restaurantRouter");
class HttpServer {
    constructor(enforce) {
        this.getConfig = Config_1.Config.getInstance().configsFromSource(ConfigSource_1.ConfigSource.APP);
        if (enforce !== Enforce) {
            throw new Error("HttpServer is singletone");
        }
        this._port = this.getConfig("app:port") || process.env.PORT;
    }
    static getInstance() {
        if (HttpServer.instance == null) {
            HttpServer.instance = new HttpServer(Enforce);
        }
        return HttpServer.instance;
    }
    get port() {
        return this._port;
    }
    get expressApp() {
        return this.app;
    }
    start() {
        if (!this.app) {
            this.app = express();
            this.app.use(morgan("dev"));
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(cors());
            this.app.use('/restaurant', new restaurantRouter_1.RestaurantRouter().router);
            this.app.use((error, req, res, next) => {
                //must improved
                res.status(error.status || 500).json({
                    message: "Something went wrong",
                    error
                });
            });
            this.app.listen(this.port, () => {
                console.log(`Server is running in http://localhost:${this.port}`);
            });
        }
        else {
            throw new Error("HttpServer: You can call 'start' function only once");
        }
    }
}
exports.HttpServer = HttpServer;
function Enforce() { }
