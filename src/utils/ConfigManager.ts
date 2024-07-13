import toml from 'toml';
import * as fs from "node:fs";
import path from "node:path";

class ConfigManager {
    private config: any;
    constructor(configFilePath: string) {
        const configString = fs.readFileSync(path.resolve(configFilePath), 'utf-8');
        this.config = toml.parse(configString);
        console.log(this.config);
    }
}

export default ConfigManager;