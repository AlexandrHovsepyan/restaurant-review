import * as nconf from "nconf";
import * as path from "path";
import { ConfigSource } from "./ConfigSource";

export class Config {
    private static instance: Config;

    constructor(enforce: () => void) {
        if (enforce !== Enforce) {
            throw new Error('Config is singletone');
        }
        let configFolder: string = path.join(__dirname, "..", "..", "configs");

        nconf.file(ConfigSource.APP, { file: path.join(configFolder, "app.json") });
        nconf.file(ConfigSource.MONGO, { file: path.join(configFolder, "mongo.json") });
    }

    public static getInstance(): Config {
        if (Config.instance == null) {
            Config.instance = new Config(Enforce);
        }

        return Config.instance;
    }

    public static getConfigFromSource(source: string, key: string): any {
        let value: any;
        if (nconf.stores[source]) {
            value = nconf.stores[source].get(key);
        } else {
            value = nconf.get(key);
        }

        return value;
    }

    public configsFromSource(source: string): (key: string) => any {
        return (key: string): any => {
            return Config.getConfigFromSource(source, key);
        }
    }
}

function Enforce() {}