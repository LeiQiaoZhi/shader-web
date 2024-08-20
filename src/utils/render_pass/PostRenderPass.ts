import {Shader} from "../Shader";
import {IShaderStatus} from "../contexts/ShaderContext";
import {createShader} from "../webglUtils";
import {defaultVertexShaderSource} from "../webglConstants";
import {Texture} from "../Texture";
import {BufferRenderPass} from "./BufferRenderPass";

export class PostRenderPass {
    shader?: Shader;
    previousFrameTexture: Texture;
    private readonly gl: WebGLRenderingContext;
    private readonly width: number;
    private readonly height: number;

    constructor(
        gl: WebGLRenderingContext,
        fragSource: string,
        setStatus: (key: string, status: IShaderStatus | undefined) => void
    ) {
        this.gl = gl;
        this.width = gl.canvas.width;
        this.height = gl.canvas.height;

        this.previousFrameTexture = new Texture(gl, this.width, this.height);
        this.previousFrameTexture.unbind();

        // init shader
        const {shader: vertexShader} = createShader(gl, gl.VERTEX_SHADER, defaultVertexShaderSource);
        const {shader: fragShader, status: shaderStatus} = createShader(gl, gl.FRAGMENT_SHADER, fragSource);
        setStatus("post", shaderStatus);
        if (!fragShader || !vertexShader) {
            console.error("Post shader is null", shaderStatus);
            return;
        }
        this.shader = new Shader(gl, vertexShader, fragShader);
    }

    public draw(
        buffersRenderPasses: BufferRenderPass[],
        initialColorTexture: Texture,
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
        shader.setUniformVec2I("iResolution", [this.width, this.height]);
        this.previousFrameTexture.passToShader(shader, "iPreviousFrame", 0);
        initialColorTexture.passToShader(shader, "iColorTexture", 1);
        buffersRenderPasses.forEach((bufferRenderPass, index) => {
            bufferRenderPass.previousFrameTexture.passToShader(shader, bufferRenderPass.uniformName, index + 2);
        });

        // render
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.width, this.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // copy 
        this.previousFrameTexture.bind();
        gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, gl.canvas.width, gl.canvas.height);
        this.previousFrameTexture.unbind();
    }

    public delete() {
        this.shader?.delete();
    }
}