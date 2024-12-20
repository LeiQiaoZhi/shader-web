import {IShaderMessage, IShaderStatus, ShaderSources} from "./contexts/ShaderContext";

export const createGl = (canvas: HTMLCanvasElement) => {
    // Try to get a WebGL 2.0 context
    let gl: WebGL2RenderingContext | null = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    // let gl: WebGLRenderingContext | null = canvas.getContext('webgl') as WebGLRenderingContext | null;

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

interface ShaderError {
    lineNumber: string;
    message: string;
}

function parseShaderErrors(errorLog: string): ShaderError[] {
    const errors: ShaderError[] = errorLog
        .split('ERROR:')
        .slice(1) // Skip the first element as it will be before the first 'ERROR:'
        .map(error => {
            const [location, ...messageParts] = error.trim().split(': ');
            const lineNumber = location.split(':')[1]; // Extract the line number
            const message = messageParts.join(': '); // Reconstruct the error message
            return {lineNumber, message};
        });

    return errors;
}

function getLinesWithNeighbours(
    source: string,
    lineNumber: number,
    neighbouringLines: number = 3
) {
    // Split the source into lines
    const sourceLines = source.split('\n');

    // Calculate the start and end indices for the slice
    const start = Math.max(0, lineNumber - neighbouringLines - 1);
    const end = Math.min(sourceLines.length, lineNumber + neighbouringLines);

    // Get the relevant lines and join them into a single string
    const resultLines = sourceLines.slice(start, end);
    const lines = resultLines.join('\n');

    return {
        lines, start
    };
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
        const errors = parseShaderErrors(errorMessage ?? '');
        const logs = errors.map(error => {
            const {lines, start} = getLinesWithNeighbours(source, parseInt(error.lineNumber));
            return {
                message: error.message,
                neighbourLines: lines,
                startLineNumber: start,
                errorLineNumber: parseInt(error.lineNumber),
            } as IShaderMessage;
        });
        console.log(logs);
        gl.deleteShader(shader);
        return {
            shader: null,
            status: {
                success: false,
                messages: logs
            }
        };
    }
    return {shader: shader, status: {success: true, messages: null}};
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
    console.log("hex", hex);
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r / 255, g / 255, b / 255, alpha];
}