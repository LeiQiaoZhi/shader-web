import * as TOML from "toml";

export interface TomlData {
    [key: string]: any; // This allows for dynamic keys
}

class ConfigManager {
    private configData: any;

    constructor() {
        this.configData = {};
    }

    async loadFile(file: File): Promise<void> {
        const fileContents = await this.readFile(file);
        this.configData = TOML.parse(fileContents);
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

}

export default ConfigManager;