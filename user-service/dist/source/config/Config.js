"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const nconf = require("nconf");
const path = require("path");
const ConfigSource_1 = require("./ConfigSource");
class Config {
    constructor(enforce) {
        if (enforce !== Enforce) {
            throw new Error('Config is singletone');
        }
        let configFolder = path.join(__dirname, "..", "..", "configs");
        nconf.env();
        nconf.file(ConfigSource_1.ConfigSource.APP, { file: path.join(configFolder, "app.json") });
        nconf.file(ConfigSource_1.ConfigSource.MONGO, { file: path.join(configFolder, "mongo.json") });
    }
    static getInstance() {
        if (Config.instance == null) {
            Config.instance = new Config(Enforce);
        }
        return Config.instance;
    }
    static getConfigFromSource(source, key) {
        let value;
        if (nconf.stores[source]) {
            value = nconf.stores[source].get(key);
        }
        else {
            value = nconf.get(key);
        }
        return value;
    }
    configsFromSource(source) {
        return (key) => {
            return Config.getConfigFromSource(source, key);
        };
    }
}
exports.Config = Config;
function Enforce() { }
