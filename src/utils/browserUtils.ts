import {defaultFragmentShaderSource, defaultPostFragmentShaderSource, ShaderFileType} from "./webglConstants";
import {ThemeStringType} from "./contexts/ThemeContext";
import {TopLevelConfigData} from "../components/uniforms/UniformsSpecification";
import {ShaderSources} from "./contexts/ShaderContext";

export const exportStringForDownload = (content: string, fileName: string) => {
    const blob = new Blob([content]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}

export interface EditorSources {
    main: { source: string, type: ShaderFileType.Buffer };
    post: { source: string, type: ShaderFileType.Buffer };

    [key: string]: { source: string, type: ShaderFileType, width?: number, height?: number };
}

export interface SavedData {
    theme: ThemeStringType,
    // editor settings
    editorTheme: string,
    editorFontSize: string,
    editorKeybinding: string,
    // source
    shaderSources: ShaderSources,
    configData: TopLevelConfigData,
    editorSources: EditorSources,
    activeTab: string;
    // panel visibilities
    uniformsVisible: boolean,
    shaderVisible: boolean,
    codeVisible: boolean,
    // dimension
    width: number,
    height: number,
    // animation
    speed: number,
    isPaused: boolean,
}

const isSavedData = (obj: any): boolean => {
    return "theme" in obj && "editorTheme" in obj && "editorFontSize" in obj
        && "editorKeybinding" in obj && "shaderSources" in obj && "configData" in obj
        && "uniformsVisible" in obj && "shaderVisible" in obj && "codeVisible" in obj
        && "width" in obj && "height" in obj
        && "speed" in obj && "isPaused" in obj
}

const SAVED_DATA_KEY = "saved_data_key";
const VIEWPORT_WIDTH = 400;
const VIEWPORT_HEIGHT = 400;
export const DEFAULT_SAVED_DATA: SavedData = {
    theme: "light",
    editorTheme: "",
    editorFontSize: "medium",
    editorKeybinding: "vim",
    shaderSources: {main: defaultFragmentShaderSource, buffers: {}, post: defaultPostFragmentShaderSource},
    editorSources: {
        main: {source: defaultFragmentShaderSource, type: ShaderFileType.Buffer},
        post: {source: defaultPostFragmentShaderSource, type: ShaderFileType.Buffer},
    },
    activeTab: "main",
    configData: {"uniforms": []},
    uniformsVisible: true,
    shaderVisible: true,
    codeVisible: true,
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    speed: 1.0,
    isPaused: false,
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
    if (!(key in DEFAULT_SAVED_DATA)) {
        return;
    }
    const data = loadData();
    (data as any)[key] = value;
    saveData(data);
}


export const resetAllSavedData = () => {
    saveData(DEFAULT_SAVED_DATA);
}