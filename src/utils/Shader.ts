import {hexToRgba} from "./webglUtils";

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

    public set_uniform_bool(name: string, value: boolean): void {
        const uniform_location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform1i(uniform_location, value ? 1 : 0);
    }

    public set_uniform_color4(name: string, hex: string): void {
        const uniform_location = this.gl.getUniformLocation(this.program, name);
        const rgba = hexToRgba(hex);
        this.gl.uniform4f(uniform_location, rgba[0], rgba[1], rgba[2], rgba[3]);
    }

    public set_uniform_color3(name: string, hex: string): void {
        const uniform_location = this.gl.getUniformLocation(this.program, name);
        const rgba = hexToRgba(hex);
        this.gl.uniform3f(uniform_location, rgba[0], rgba[1], rgba[2]);
    }

    public set_uniform_float(name: string, value: number, log: boolean = false): void {
        if (log) {
            console.log(`set shader ${name} to ${value}`)
        }
        const uniform_location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform1f(uniform_location, value);
    }

}