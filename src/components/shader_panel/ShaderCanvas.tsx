import React, {useEffect, useRef, useState} from 'react';
import {createProgram, createShader} from "../../utils/webglUtils";
import {defaultVertexShaderSource} from "../../utils/webglConstants";
import './ShaderCanvas.css'
import FileSelect from "../common/FileSelect";
import {Shader} from "../../utils/Shader";
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import ShaderStatusBar from "./ShaderStatusBar";
import ShaderAnimationControl from "./ShaderAnimationControl";
import {ShaderDimensionControl} from "./ShaderDimensionControl";
import PanelHeader from "../common/PanelHeader";
import {loadData} from "../../utils/browserUtils";


interface ShaderCanvasProps {
}


const ShaderCanvas: React.FC<ShaderCanvasProps> = () => {
    const savedData = loadData();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pausedRef = useRef<boolean>(false);
    const speedRef = useRef<number>(1.0);
    const previousFrameTime = useRef<number>(0);
    const elapsedTimeRef = useRef<number>(0);
    const [pausedState, setPausedState] = useState(pausedRef.current);
    const [viewportDimension, setViewportDimension] = useState([savedData.width, savedData.height]);
    const [isVisible, setIsVisible] = useState(savedData.shaderVisible);
    const {setShader, setStatus, shaderSource, setShaderSource} = useShaderContext();

    // contains side effect, runs after the component is rendered
    useEffect(() => {
        console.log("Starting WebGL")
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl', {'antialias': true});
        if (!gl) return;

        const vertexShaderResult = createShader(gl, gl.VERTEX_SHADER, defaultVertexShaderSource);
        const fragmentShaderResult = createShader(gl, gl.FRAGMENT_SHADER, shaderSource);
        if (!vertexShaderResult || !fragmentShaderResult) return;
        const {shader: vertexShader} = vertexShaderResult;
        const {shader: fragmentShader, status: shaderStatus} = fragmentShaderResult;
        setStatus(shaderStatus);

        if (!vertexShader || !fragmentShader) return;
        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;
        const shader = new Shader(gl, program);
        let firstRenderLoop = true;

        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);

        const render = (time: number) => {
            if (firstRenderLoop) {
                console.log("Setting new shader")
                setShader(shader);
                firstRenderLoop = false;
                elapsedTimeRef.current = 0;
            }
            gl.clear(gl.COLOR_BUFFER_BIT);
            shader.activate();

            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

            // animation and resolution uniforms
            const deltaTime = time - previousFrameTime.current;
            if (!pausedRef.current) {
                elapsedTimeRef.current += deltaTime * speedRef.current;
                shader.setUniformFloat("iTime", elapsedTimeRef.current * 0.01);
            }
            shader.setUniformVec2I("iResolution", gl.canvas.width, gl.canvas.height);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            previousFrameTime.current = time;
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);

        // Cleanup on unmount
        return () => {
            if (gl) {
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                gl.deleteProgram(program);
            }
        };

    }, [shaderSource, viewportDimension]);

    const loadFragShaderFromFile = (file: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (text) {
                console.log(`Set frag source from ${file.name}`);
                if (text === shaderSource) {
                    setShaderSource(text + "\n"); // ensure difference to trigger effect
                } else {
                    setShaderSource(text);
                }
            }
        };
        reader.readAsText(file);
    }


    return (
        <div className='shader-canvas-container' style={{width: `${viewportDimension}`}} data-visible={isVisible}>
            <PanelHeader title="Shader" isVisible={isVisible} setVisible={setIsVisible}/>
            <div className='shader-canvas-file-selector-header'>
                <FileSelect onFileSelect={loadFragShaderFromFile} accept=".frag" id="shader select" title="Shader"/>
            </div>
            <ShaderStatusBar width={viewportDimension[0]}/>
            <canvas ref={canvasRef} width={viewportDimension[0]} height={viewportDimension[1]}/>
            <ShaderAnimationControl pausedRef={pausedRef} pausedState={pausedState} speedRef={speedRef}
                                    elapsedTimeRef={elapsedTimeRef} setPausedState={setPausedState}/>
            <ShaderDimensionControl viewportDimension={viewportDimension} setViewportDimension={setViewportDimension}/>
        </div>
    );
};

export default ShaderCanvas;