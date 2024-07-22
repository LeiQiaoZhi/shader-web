import {defaultFragmentShaderSource} from "./webglConstants";
import {ThemeStringType} from "./contexts/ThemeContext";

export const exportStringForDownload = (content: string, fileName: string) => {
    const blob = new Blob([content]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}

export interface SavedData {
    theme: ThemeStringType,
    editorTheme: string,
    editorFontSize: string,
    editorKeybinding: string,
    shaderSource: string,
    configSource: string,
    uniformsVisible: boolean,
    shaderVisible: boolean,
    codeVisible: boolean,
    width: number,
    height: number,

    [key: string]: any
}

const isSavedData = (obj: any): boolean => {
    return "theme" in obj && "editorTheme" in obj && "editorFontSize" in obj
        && "editorKeybinding" in obj && "shaderSource" in obj && "configSource" in obj
        && "uniformsVisible" in obj && "shaderVisible" in obj && "codeVisible" in obj
        && "width" in obj && "height" in obj
}

const SAVED_DATA_KEY = "saved_data_key";
const VIEWPORT_WIDTH = 400;
const VIEWPORT_HEIGHT = 400;
export const DEFAULT_SAVED_DATA: SavedData = {
    theme: "light",
    editorTheme: "",
    editorFontSize: "medium",
    editorKeybinding: "vim",
    shaderSource: defaultFragmentShaderSource, // todo
    configSource: "", // todo
    uniformsVisible: true,
    shaderVisible: true,
    codeVisible: true,
    width: VIEWPORT_WIDTH, // todo
    height: VIEWPORT_HEIGHT, // todo
};

export const saveData = (data: SavedData) => {
    localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(data));
}

export const loadData = (): SavedData => {
    const data = localStorage.getItem(SAVED_DATA_KEY);
    if (data === null) {
        return DEFAULT_SAVED_DATA;
    }
    const json = JSON.parse(data);
    return isSavedData(json) ? json : DEFAULT_SAVED_DATA;
}

export const saveDataWithKey = (key: string, value: any) => {
    console.log("saveDataWithKey", key, value);
    const data = loadData();
    data[key] = value;
    saveData(data);
}

