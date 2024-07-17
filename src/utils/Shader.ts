import {hexToRgba} from "./webglUtils";
import {ConfigData} from "./ConfigManager";

export class Shader {
    private gl: WebGLRenderingContext;
    private program: WebGLProgram;

    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this.gl = gl;
        this.program = program;
    }

    public activate(): void {
        this.gl.useProgram(this.program);
    }

    public setUniformBool(name: string, value: boolean): void {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform1i(uniformLocation, value ? 1 : 0);
    }

    public setUniformInt(name: string, value: number): void {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform1i(uniformLocation, value);
    }

    public setUniformColor4(name: string, hex: string): void {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        const rgba = hexToRgba(hex);
        this.gl.uniform4f(uniformLocation, rgba[0], rgba[1], rgba[2], rgba[3]);
    }

    public setUniformColor3(name: string, hex: string): void {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        const rgba = hexToRgba(hex);
        this.gl.uniform3f(uniformLocation, rgba[0], rgba[1], rgba[2]);
    }

    public setUniformFloat(name: string, value: number, log: boolean = false): void {
        if (log) {
            console.log(`set shader ${name} to ${value}`)
        }
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform1f(uniformLocation, value);
    }

    public setUniformVec2(name: string, value1: number, value2: number) {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform2f(uniformLocation, value1, value2);
    }

    public setUniformVec2I(name: string, value1: number, value2: number) {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform2i(uniformLocation, value1, value2);
    }

    public setUniform(config: ConfigData) {
        const name = config.gl.name;
        const value = config.ui.value;
        switch (config.gl.type) {
            case "float":
                this.setUniformFloat(name, value);
                break;
            case "bool":
                this.setUniformBool(name, value);
                break;
            case "int":
                this.setUniformInt(name, value);
                break;
            case "color4":
                this.setUniformColor4(name, value);
                break;
            case "color3":
                this.setUniformColor3(name, value);
                break;
            default:
                throw new Error(`Unsupported type ${config.gl.type}`);
        }
    }
}