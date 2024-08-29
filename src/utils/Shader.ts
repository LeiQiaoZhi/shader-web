import {createProgram, hexToRgba} from "./webglUtils";
import {UniformConfigData} from "../components/uniforms/UniformsSpecification";

export class Shader {
    private gl: WebGLRenderingContext;
    program: WebGLProgram;
    positionAttributeLocation: number;
    private vertexShader: WebGLShader;
    private fragShader: WebGLShader;

    constructor(gl: WebGLRenderingContext, vertex: WebGLShader, fragment: WebGLShader) {
        this.gl = gl;
        this.program = createProgram(gl, vertex, fragment);
        this.vertexShader = vertex;
        this.fragShader = fragment;

        this.positionAttributeLocation = gl.getAttribLocation(this.program, 'a_position');
    }

    public activate(): void {
        this.gl.useProgram(this.program);
    }

    public setUpScreenQuad(positionBuffer: WebGLBuffer | null): void {
        // set up the screen quad
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.vertexAttribPointer(this.positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

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

    public setUniformVec2(name: string, values: [number, number]) {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform2f(uniformLocation, values[0], values[1]);
    }

    public setUniformVec2I(name: string, values: [number, number]) {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform2i(uniformLocation, values[0], values[1]);
    }
    
    public setUniformVec4(name: string, values: Float32Array | [number, number, number, number]) {
        const uniformLocation = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform4f(uniformLocation, values[0], values[1], values[2], values[3]);
    }

    public setUniformFromConfig(config: UniformConfigData) {
        const name = config.gl?.name;
        const type = config.gl?.type;
        if (!name || !type) {
            console.error("Uniform config is missing name or type", config);
            return;
        }
        const value = config.ui?.value;
        // console.log(`setting uniform ${name} of type ${type} to ${value}`);
        this.setUniform(name, type, value);
    }

    public setUniform(name: string, type: string, value: any): void {
        this.activate();
        switch (type) {
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
            case "vec2":
                this.setUniformVec2(name, value);
                break;
            case "vec4":
                this.setUniformVec4(name, value);
                break;
            default:
                console.warn(`Unsupported type ${type}`);
        }
    }

    public delete() {
        this.gl.deleteProgram(this.program);
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragShader);
    }
}