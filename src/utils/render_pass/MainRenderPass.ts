import {Shader} from "../Shader";
import {IShaderStatus} from "../contexts/ShaderContext";
import {createShader} from "../webglUtils";
import {defaultVertexShaderSource} from "../webglConstants";
import {Texture} from "../Texture";
import {BufferRenderPass} from "./BufferRenderPass";

export class MainRenderPass {
    shader?: Shader;
    colorTexture: Texture;
    private readonly gl: WebGLRenderingContext;
    private readonly frameBuffer: WebGLFramebuffer;
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
        fragSource = fragSource;

        // init framebuffer
        const frameBuffer = gl.createFramebuffer();
        if (!frameBuffer) throw new Error("Framebuffer is null");
        this.frameBuffer = frameBuffer;
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        this.colorTexture = new Texture(gl, this.width, this.height);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTexture.texture, 0);
        this.colorTexture.unbind();
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            throw new Error('Framebuffer not complete');
        }

        // init shader
        const {shader: vertexShader} = createShader(gl, gl.VERTEX_SHADER, defaultVertexShaderSource);
        const {shader: fragShader, status: shaderStatus} = createShader(gl, gl.FRAGMENT_SHADER, fragSource);
        setStatus("main", shaderStatus);
        if (!fragShader || !vertexShader) {
            console.error("Main shader is null", shaderStatus);
            return;
        }
        this.shader = new Shader(gl, vertexShader, fragShader);

        console.log(`Main Render Pass created, ${this.width}x${this.height}`);

    }

    public draw(
        buffersRenderPasses: BufferRenderPass[],
        previousFrameTexture: Texture | undefined,
        keyboardEventsTexture: Texture | null,
        vertexBuffer: WebGLBuffer | null,
        uniforms: [string, string, any][],
    ): void {
        const gl = this.gl;
        const shader = this.shader;
        if (!shader || !previousFrameTexture) return;

        shader.activate();
        shader.setUpScreenQuad(vertexBuffer);

        // uniforms
        uniforms.forEach(([name, type, value]) => {
            shader.setUniform(name, type, value);
        });
        shader.setUniformVec2("iResolution", [this.width, this.height]);
        previousFrameTexture.passToShader(shader, "iPreviousFrame", 0);
        if (!keyboardEventsTexture) {
            console.error("Keyboard texture is null");
        } else {
            keyboardEventsTexture.passToShader(shader, "iKeyboard", 1);
        }
        buffersRenderPasses.forEach((bufferRenderPass, index) => {
            bufferRenderPass.previousFrameTexture.passToShader(shader, bufferRenderPass.uniformName, index + 2);
        });

        // render
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.width, this.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    public delete() {
        this.shader?.delete();
    }
}