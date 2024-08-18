import {Shader} from "./Shader";

export class Texture {
    get texture(): WebGLTexture {
        return this._texture;
    }
    private gl: WebGLRenderingContext;
    private _texture: WebGLTexture;

    constructor(gl: WebGLRenderingContext, width?: number, height?: number, pixels?: Uint8Array) {
        this.gl = gl;
        const texture = gl.createTexture();
        if (texture === null) {
            throw new Error("Create texture failed");
        }
        this._texture = texture;
        this.bind();
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, width ?? gl.canvas.width, height ?? gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels ?? null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        // Tiling -- clamp when uv is beyond edge (default is repeat)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    public bind(): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._texture);
    }

    public unbind(): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    public passToShader(shader: Shader, name: string, unit: number): void {
        this.gl.activeTexture(this.gl.TEXTURE0 + unit);
        this.bind();
        shader.setUniformInt(name, unit);
    }

    public colorPixelsArray(width: number, height: number, r: number, g: number, b: number, a: number): Uint8Array {
        const colorArray = new Uint8Array(width * height * 4); // 4 components per pixel (RGBA)
        for (let i = 0; i < colorArray.length; i += 4) {
            colorArray[i] = r;     // R
            colorArray[i + 1] = g;   // G
            colorArray[i + 2] = b;   // B
            colorArray[i + 3] = a; // A
        }
        return colorArray;
    }
}