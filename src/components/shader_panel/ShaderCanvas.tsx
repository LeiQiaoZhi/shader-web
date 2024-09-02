import React, {useEffect, useRef, useState} from 'react';
import {createGl, createScreenQuadBuffer} from "../../utils/webglUtils";
import './ShaderCanvas.css'
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import ShaderStatusBar from "./ShaderStatusBar";
import ShaderAnimationControl from "./ShaderAnimationControl";
import {ShaderDimensionControl} from "./ShaderDimensionControl";
import PanelHeader from "../common/PanelHeader";
import {loadData} from "../../utils/browser/browserLocalStorage";
import {MainRenderPass} from "../../utils/render_pass/MainRenderPass";
import {PostRenderPass} from "../../utils/render_pass/PostRenderPass";
import {BufferRenderPass} from "../../utils/render_pass/BufferRenderPass";
import IOHandler from './IOHandler';
import {Texture} from '../../utils/Texture';
import {Shader} from "../../utils/Shader";

interface ShaderCanvasProps {
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = () => {
    const savedData = loadData();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pausedRef = useRef<boolean>(savedData.isPaused);
    const speedRef = useRef<number>(savedData.speed);
    const mouseRef = useRef<Float32Array>(new Float32Array(4));
    const keyboardStatesTextureRef = useRef<Texture | null>(null);
    const previousFrameTime = useRef<number>(0);
    const elapsedTimeRef = useRef<number>(0);
    const [pausedState, setPausedState] = useState(pausedRef.current);
    const [viewportDimension, setViewportDimension] = useState([savedData.width, savedData.height]);
    const [isVisible, setIsVisible] = useState(savedData.shaderVisible);
    const {setMainShader, setStatus, shaderSources, setAllShaders} = useShaderContext();


    // contains side effect, runs after the component is rendered
    useEffect(() => {
        console.log("Starting WebGL")
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = createGl(canvas);
        keyboardStatesTextureRef.current = new Texture(gl, 256, 1, gl.LUMINANCE);

        console.log("Shader Sources", shaderSources);
        const mainRenderPass = new MainRenderPass(gl, shaderSources.main, setStatus);
        const postRenderPass = new PostRenderPass(gl, shaderSources.post, setStatus);
        const bufferRenderPasses = Object.keys(shaderSources.buffers).map((bufferName) =>
            new BufferRenderPass(gl, bufferName, shaderSources.buffers[bufferName], setStatus)
        );
        if (mainRenderPass.shader) {
            setMainShader(mainRenderPass.shader);
        }
        const allShaders = [mainRenderPass.shader, postRenderPass.shader, ...bufferRenderPasses.map((bufferRenderPass) => bufferRenderPass.shader)]
            .filter((shader) => shader !== undefined && shader !== null) as Shader[];
        console.log("All Shaders", allShaders);
        setAllShaders(allShaders);


        let frameNumber = 0;
        elapsedTimeRef.current = 0;
        const vertexBuffer = createScreenQuadBuffer(gl);
        gl.clearColor(0, 0, 0, 0);

        const render = (time: number) => {
            if (elapsedTimeRef.current <= 0) {
                elapsedTimeRef.current = 0;
                console.log("Setting new shader", frameNumber);
                frameNumber = 1;
            }

            const deltaTime = time - previousFrameTime.current;
            if (!pausedRef.current || frameNumber === 1) {
                elapsedTimeRef.current += deltaTime * speedRef.current;
                frameNumber++;

                const uniforms = [
                    ["iTime", "float", elapsedTimeRef.current * 0.001],
                    ["iFrame", "int", frameNumber],
                    ["iMouse", "vec4", mouseRef.current],
                ] as [string, string, any][];

                bufferRenderPasses.forEach((bufferRenderPass) => {
                    bufferRenderPass.draw(bufferRenderPasses,
                        keyboardStatesTextureRef.current,
                        vertexBuffer, uniforms
                    );
                });

                mainRenderPass.draw(
                    bufferRenderPasses,
                    postRenderPass.previousFrameTexture,
                    keyboardStatesTextureRef.current,
                    vertexBuffer, uniforms
                );

                postRenderPass.draw(
                    bufferRenderPasses,
                    mainRenderPass.colorTexture,
                    keyboardStatesTextureRef.current,
                    vertexBuffer, uniforms
                );
            }

            previousFrameTime.current = time;
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);

        // Cleanup on unmount
        return () => {
            if (gl) {
                mainRenderPass.delete();
                postRenderPass.delete();
                gl.deleteBuffer(vertexBuffer);
            }
        };

    }, [shaderSources, viewportDimension]);

    return (
        <div className='shader-canvas-container' style={{width: `${viewportDimension}`}} data-visible={isVisible}>
            <PanelHeader title="Shader" isVisible={isVisible} setVisible={setIsVisible}/>
            <ShaderStatusBar width={viewportDimension[0]}/>
            <canvas ref={canvasRef} width={viewportDimension[0]} height={viewportDimension[1]}/>
            <ShaderAnimationControl pausedRef={pausedRef} pausedState={pausedState} speedRef={speedRef}
                                    elapsedTimeRef={elapsedTimeRef} setPausedState={setPausedState}/>
            <ShaderDimensionControl viewportDimension={viewportDimension} setViewportDimension={setViewportDimension}/>
            <IOHandler keyboardEventsTextureRef={keyboardStatesTextureRef}
                       mouseRef={mouseRef} canvasRef={canvasRef}/>
        </div>
    );
};

export default ShaderCanvas;