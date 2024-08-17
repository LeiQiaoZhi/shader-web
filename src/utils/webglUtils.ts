import {IShaderStatus, ShaderSources} from "./contexts/ShaderContext";
import {EditorSources} from "./browserUtils";
import {ShaderFileType} from "./webglConstants";

interface ICreateShaderReturn {
    shader: WebGLShader | null;
    status: IShaderStatus;
}

export const createShader = (gl: WebGLRenderingContext, type: number, source: string): ICreateShaderReturn | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const errorMessage = gl.getShaderInfoLog(shader);
        console.error(errorMessage);
        gl.deleteShader(shader);
        return {
            shader: null,
            status: {
                success: false,
                message: errorMessage
            }
        };
    }
    return {shader: shader, status: {success: true, message: "Compile Success"}}
};

export const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
};

export const hexToRgba = (hex: string, alpha: number = 1): [number, number, number, number] => {
    if (typeof hex !== 'string') {
        console.warn(`${hex} isn't a string`);
        return [0, 0, 0, 0];
    }
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r / 255, g / 255, b / 255, alpha];
}

export const preprocessShaderSource = (editorSources: EditorSources): ShaderSources => {
    const preprocessedMain = preprocessSingleShaderSource(editorSources.main.source, new Set<string>(["main"]), editorSources);

    const postNames = Object.keys(editorSources).filter(fileName => editorSources[fileName].type === ShaderFileType.Post);
    const preprocessedPosts = postNames.map(postName => {
            return {
                [postName]:
                    preprocessSingleShaderSource(editorSources[postName].source, new Set<string>(postName), editorSources)
            } as Record<string, string>;
        }
    )

    const bufferNames = Object.keys(editorSources).filter(fileName => editorSources[fileName].type === ShaderFileType.Buffer);
    const preprocessedBuffers = bufferNames.map(postName => {
            return {
                [postName]:
                    preprocessSingleShaderSource(editorSources[postName].source, new Set<string>(postName), editorSources)
            } as Record<string, string>;
        }
    )

    const sources: ShaderSources = {
        main: preprocessedMain,
        posts: preprocessedPosts,
        buffers: preprocessedBuffers,
    };
    console.log(sources);
    return sources;
}

export const preprocessSingleShaderSource = (source: string, included: Set<string>, editorSources: EditorSources) => {
    console.log(included);
    const regex = /^#include\s+["]([\w.\-]+)["].*$/gm;
    let match;
    let preprocessed = source;
    while ((match = regex.exec(source)) !== null) {
        const fileToInclude: string = match[1];
        console.log(`preprocessing ${fileToInclude}`);
        if (!included.has(fileToInclude) && fileToInclude in editorSources) {
            included.add(fileToInclude);
            const sourceToInclude = preprocessSingleShaderSource(editorSources[fileToInclude].source, included, editorSources);
            preprocessed = preprocessed.replace(match[0], sourceToInclude);
        } else {
            console.log(fileToInclude + " already included or not an existing file name");
            preprocessed = preprocessed.replace(match[0], "");
        }
    }
    return preprocessed;
}