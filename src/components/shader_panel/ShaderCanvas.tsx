import React, {useEffect, useRef, useState} from 'react';
import {createGl, createProgram, createScreenQuadBuffer, createShader} from "../../utils/webglUtils";
import {
    defaultFragmentShaderSource,
    defaultPostFragmentShaderSource,
    defaultVertexShaderSource
} from "../../utils/webglConstants";
import './ShaderCanvas.css'
import FileSelect from "../common/FileSelect";
import {Shader} from "../../utils/Shader";
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import ShaderStatusBar from "./ShaderStatusBar";
import ShaderAnimationControl from "./ShaderAnimationControl";
import {ShaderDimensionControl} from "./ShaderDimensionControl";
import PanelHeader from "../common/PanelHeader";
import {loadData} from "../../utils/browserUtils";
import {MainRenderPass} from "../../utils/MainRenderPass";
import {PostRenderPass} from "../../utils/PostRenderPass";


interface ShaderCanvasProps {
}


const ShaderCanvas: React.FC<ShaderCanvasProps> = () => {
    const savedData = loadData();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pausedRef = useRef<boolean>(savedData.isPaused);
    const speedRef = useRef<number>(savedData.speed);
    const previousFrameTime = useRef<number>(0);
    const elapsedTimeRef = useRef<number>(0);
    const [pausedState, setPausedState] = useState(pausedRef.current);
    const [viewportDimension, setViewportDimension] = useState([savedData.width, savedData.height]);
    const [isVisible, setIsVisible] = useState(savedData.shaderVisible);
    const {setMainShader, status, setStatus, shaderSources} = useShaderContext();

    // contains side effect, runs after the component is rendered
    useEffect(() => {
        console.log("Starting WebGL")
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = createGl(canvas);

        console.log(shaderSources);
        const mainRenderPass = new MainRenderPass(gl, shaderSources.main, setStatus);
        const postRenderPass = new PostRenderPass(gl, shaderSources.post, setStatus);

        let firstRenderLoop = true;
        const vertexBuffer = createScreenQuadBuffer(gl);
        gl.clearColor(0, 0, 0, 0);

        const render = (time: number) => {
            if (firstRenderLoop) {
                console.log("Setting new shader")
                if (mainRenderPass.shader) {
                    setMainShader(mainRenderPass.shader);
                }
                firstRenderLoop = false;
                elapsedTimeRef.current = 0;
            }

            // pass uniforms
            const deltaTime = time - previousFrameTime.current;
            if (!pausedRef.current) {
                elapsedTimeRef.current += deltaTime * speedRef.current;
            }

            mainRenderPass.draw(
                postRenderPass.previousFrameTexture,
                vertexBuffer, [
                    ["iTime", "float", elapsedTimeRef.current * 0.01],
                ]);

            postRenderPass.draw(
                mainRenderPass.colorTexture,
                vertexBuffer, [
                    ["iTime", "float", elapsedTimeRef.current * 0.01],
                ]);

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
        </div>
    );
};

export default ShaderCanvas;