import * as TOML from "toml";

export interface ConfigData {
    [key: string]: any; // This allows for dynamic keys
}

class ConfigManager {
    private configData: ConfigData;
    private fileName: string;

    constructor() {
        this.configData = {};
        this.fileName = "unknown";
    }

    async loadFile(file: File): Promise<void> {
        const fileContents = await this.readFile(file);
        if (file.name.endsWith(".toml")) {
            this.configData = TOML.parse(fileContents);
        } else if (file.name.endsWith(".json")) {
            this.configData = JSON.parse(fileContents);
        } else {
            throw new Error(`Unknown file "${file.name}", only support TOML and JSON configs`);
        }
        
        this.fileName = file.name;
        console.log(this.configData);
    }

    private readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reject(new Error("Failed to read file"));
            };
            reader.readAsText(file);
        });
    }

    getConfigData(): any {
        return this.configData;
    }

    get(key: string): any {
        return this.configData[key];
    }

    set(key: string, value: any): void {
        this.configData[key] = value;
    }

    getConfigAsString() {
        const str = JSON.stringify(this.configData);
        console.log(this.configData);
        console.log(str);
        return str;
    }

    getFileName() {
        return this.fileName;
    }
}

export default ConfigManager;