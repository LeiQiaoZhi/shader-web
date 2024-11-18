import * as TOML from "toml";
import {saveDataWithKey} from "./browser/browserLocalStorage";
import {TopLevelConfigData, UniformConfigData} from "../components/uniforms/UniformsSpecification";


class ConfigManager {
    private configData: TopLevelConfigData;
    private setConfigData: (config: TopLevelConfigData) => void;
    private fileName: string;

    constructor(configData: TopLevelConfigData, setConfigData: (value: TopLevelConfigData) => void) {
        this.configData = configData;
        this.fileName = "unknown";
        this.setConfigData = setConfigData;
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
        this.setConfigData(this.configData);
        saveDataWithKey("configData", this.configData);
    }

    setConfigFromString(config: string) {
        this.configData = JSON.parse(config);
        this.setConfigData(this.configData);
        saveDataWithKey("configData", this.configData);
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

    getUniforms(): UniformConfigData[] {
        return this.configData.uniforms;
    }

    set(key: string, value: any): void {
        this.configData[key] = value;
        saveDataWithKey("configData", this.configData);
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

    insertSingleUniform(index: number[], uniformToInsert: UniformConfigData): void {
        let currentLevelConfig: any[] = this.configData.uniforms;
        console.log("Before add", currentLevelConfig);
        for (const i of index.slice(0, -1)) {
            currentLevelConfig = currentLevelConfig[i].children;
        }
        const indexToInsert = index.slice(-1)[0];
        console.log("Current level before add", currentLevelConfig);
        currentLevelConfig.splice(indexToInsert, 0, uniformToInsert);
        console.log(this.getUniforms());
        this.setConfigData({...this.configData});
    }

    insertDefaultSingleUniform(index: number[]): void {
        const defaultUniform: UniformConfigData = {
            name: "New Uniform",
            ui: {type: "checkbox", value: false},
            gl: {type: "bool", name: "iUniformName"}
        };
        this.insertSingleUniform(index, defaultUniform);
    }

    deleteAtPosition(index: number[]) {
        let currentLevelConfig: UniformConfigData[] = this.configData.uniforms;
        console.log("Before delete", currentLevelConfig);
        for (const i of index.slice(0, -1)) {
            currentLevelConfig = currentLevelConfig[i].children;
        }
        const indexToDelete = index.slice(-1)[0];
        currentLevelConfig.splice(indexToDelete, 1);
        this.setConfigData({...this.configData});
    }

    moveUniform(fromIndex: number[], toIndex: number[]) {
        const fromCompare = Number(fromIndex.join(""));
        const toCompare = Number(toIndex.join(""));

        const fromInFront = fromCompare < toCompare;
        console.log(`Moving from ${fromIndex} to ${toIndex}, fromInFront: ${fromInFront}`);

        let currentLevelConfig: UniformConfigData[] = this.configData.uniforms;
        console.log("Before add", currentLevelConfig);
        for (const i of fromIndex.slice(0, -1)) {
            currentLevelConfig = currentLevelConfig[i].children;
        }
        const uniformToMove = currentLevelConfig[fromIndex.slice(-1)[0]];
        console.log("Uniform to move", uniformToMove);

        if (fromInFront) {
            // insert, then delete
            this.insertSingleUniform(toIndex, uniformToMove);
            this.deleteAtPosition(fromIndex);
        }
        else {
            // delete, then insert
            this.deleteAtPosition(fromIndex);
            this.insertSingleUniform(toIndex, uniformToMove);
        }

    }

}

export default ConfigManager;