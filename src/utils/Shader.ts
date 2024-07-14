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
    
    public set_uniform_float(name: string, value: number): void {
        const uniform_location = this.gl.getUniformLocation(this.program, name);
        this.gl.uniform1f(uniform_location, value);
    }

}