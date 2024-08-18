import {IShaderStatus, ShaderSources} from "./contexts/ShaderContext";
import {EditorSources} from "./browserUtils";
import {ShaderFileType} from "./webglConstants";

export const createGl = (canvas: HTMLCanvasElement) => {
    // Try to get a WebGL 2.0 context
    let gl: WebGL2RenderingContext | null = canvas.getContext('webgl2') as WebGL2RenderingContext | null;

    if (gl) {
        console.log('Using WebGL 2.0');
    } else {
        // If WebGL 2.0 context is not available, fall back to WebGL 1.0
        // gl = canvas.getContext('webgl') as WebGLRenderingContext | null;

        // if (gl) {
        //     console.log('Using WebGL 1.0');
        // } else {
        throw new Error('WebGL is not supported');
        // }
    }
    return gl;
}

export const createScreenQuadBuffer = (gl: WebGLRenderingContext) => {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
}

interface ICreateShaderReturn {
    shader: WebGLShader | null;
    status: IShaderStatus;
}

export const createShader = (gl: WebGLRenderingContext, type: number, source: string): ICreateShaderReturn => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Create shader failed");
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
                message: errorMessage?.replace(/[\n\u0000]+$/g, '') ?? null
            }
        };
    }
    return {shader: shader, status: {success: true, message: "Compile Success"}}
};

export const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram => {
    const program = gl.createProgram();
    if (!program) throw new Error("Fail to create shader program");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        throw new Error("Fail to link shader program");
    }
    return program;
};

export const hexToRgba = (hex: string, alpha: number = 1): [number, number, number, number] => {
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
    const preprocessedPost = preprocessSingleShaderSource(editorSources.post.source, new Set<string>(["post"]), editorSources);

    const bufferNames = Object.keys(editorSources).filter(fileName =>
        editorSources[fileName].type === ShaderFileType.Buffer
        && fileName !== 'main'
        && fileName !== 'post'
    )
    const preprocessedBuffers = bufferNames.map(postName => {
            return {
                [postName]:
                    preprocessSingleShaderSource(editorSources[postName].source, new Set<string>(postName), editorSources)
            } as Record<string, string>;
        }
    )

    const sources: ShaderSources = {
        main: preprocessedMain,
        post: preprocessedPost,
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