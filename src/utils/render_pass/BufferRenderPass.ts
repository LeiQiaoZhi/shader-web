import { Shader } from "../Shader";
import { BufferSource, IShaderStatus } from "../contexts/ShaderContext";
import { createShader } from "../webglUtils";
import { defaultVertexShaderSource } from "../webglConstants";
import { Texture } from "../Texture";
import { toPascalCase } from "../browser/browserLocalStorage";

export class BufferRenderPass {
    shader?: Shader;
    previousFrameTexture: Texture;
    uniformName: string;
    private readonly framebuffer: WebGLFramebuffer;
    private colorTexture: Texture;
    private readonly gl: WebGLRenderingContext;
    private readonly width: number;
    private readonly height: number;

    constructor(
        gl: WebGLRenderingContext,
        name: string,
        bufferSource: BufferSource,
        setStatus: (key: string, status: IShaderStatus | undefined) => void
    ) {
        this.gl = gl;
        this.width = bufferSource.width ?? gl.canvas.width;
        if (this.width <= 0) {
            console.warn(`Buffer ${name} width <= 0, setting to canvas width`);
            this.width = gl.canvas.width;
        }
        this.height = bufferSource.height ?? gl.canvas.height;
        if (this.height <= 0) {
            console.warn(`Buffer ${name} height <= 0, setting to canvas height`);
            this.height = gl.canvas.height;
        }
        this.uniformName = "i" + toPascalCase(name);
        console.log(this.uniformName, this.width, this.height);

        this.previousFrameTexture = new Texture(gl, this.width, this.height);
        this.previousFrameTexture.unbind();

        this.framebuffer = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        this.colorTexture = new Texture(gl, this.width, this.height);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTexture.texture, 0);
        this.colorTexture.unbind();
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            throw new Error('Framebuffer not complete');
        }

        // init shader
        const { shader: vertexShader } = createShader(gl, gl.VERTEX_SHADER, defaultVertexShaderSource);
        const { shader: fragShader, status: shaderStatus } = createShader(gl, gl.FRAGMENT_SHADER, bufferSource.source);
        setStatus(name, shaderStatus);
        if (!fragShader || !vertexShader) {
            console.error(`Buffer ${name} shader is null`, shaderStatus);
            return;
        }
        this.shader = new Shader(gl, vertexShader, fragShader);
    }

    public draw(
        buffersRenderPasses: BufferRenderPass[],
        keyboardEventsTexture: Texture | null,
        vertexBuffer: WebGLBuffer | null,
        uniforms: [string, string, any][],
    ): void {
        const gl = this.gl;
        const shader = this.shader;
        if (!shader) return;

        shader.activate();
        shader.setUpScreenQuad(vertexBuffer);

        // uniforms
        uniforms.forEach(([name, type, value]) => {
            shader.setUniform(name, type, value);
        });
        shader.setUniformVec2("iResolution", [this.width, this.height]);
        keyboardEventsTexture?.passToShader(shader, "iKeyboard", 0);
        buffersRenderPasses.forEach((bufferRenderPass, index) => {
            bufferRenderPass.previousFrameTexture.passToShader(shader, bufferRenderPass.uniformName, index + 1);
        });

        // render
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.width, this.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // copy 
        this.previousFrameTexture.bind();
        gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, this.width, this.height);
        this.previousFrameTexture.unbind();
    }

    public delete() {
        this.shader?.delete();
    }
}