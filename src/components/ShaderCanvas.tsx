import React, {useRef, useEffect, useState} from 'react';
import {createShader, createProgram} from "../utils/webglUtils";
import {defaultVertexShaderSource, defaultFragmentShaderSource} from "../utils/webglConstants";
import '../styles/ShaderCanvas.css'
import FileSelect from "./FileSelect";
import {Shader} from "../utils/Shader";
import {useShaderContext} from "../utils/ShaderContext";

interface ShaderCanvasProps {
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = () => {
    // create a mutable canvas object that lives for the lifetime of this component
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pausedRef = useRef<boolean>(false);
    const previousFrameTime = useRef<number>(0);
    const elapsedTime = useRef<number>(0);
    const [fragmentShaderSource, setFragmentShaderSource] = useState(defaultFragmentShaderSource);
    const [pausedState, setPausedState] = useState(pausedRef.current);
    const { setShader } = useShaderContext();
    
    // contains side effect, runs after the component is rendered
    useEffect(() => {
        console.log("Starting WebGL")
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, defaultVertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
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
            }
            gl.clear(gl.COLOR_BUFFER_BIT);
            shader.activate();

            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

            // animation
            const deltaTime = time - previousFrameTime.current;
            if (!pausedRef.current) {
                elapsedTime.current += deltaTime;
                shader.set_uniform_float("iTime", elapsedTime.current * 0.001);
            }

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

    }, [fragmentShaderSource]);

    const loadFragShaderFromFile = (file: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (text) {
                console.log(`Set frag source from ${file.name}`);
                if (text === fragmentShaderSource){
                    setFragmentShaderSource(text + "\n") // ensure difference to trigger effect
                } else {
                    setFragmentShaderSource(text);
                }
            }
        };
        reader.readAsText(file);
    }

    const handlePauseToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        pausedRef.current = !pausedRef.current;
        setPausedState(pausedRef.current);
    }

    return (
        <div className='shader-canvas-container'>
            <h2>Shader Output</h2>
            <div className='shader-canvas-file-selector-header'>
                <FileSelect onFileSelect={loadFragShaderFromFile} accept=".frag" id="shader select"/>
            </div>
            <canvas ref={canvasRef} width={600} height={600}/>
            <div className='shader-canvas-time-control-header'>
                <button onClick={handlePauseToggle}>
                    {pausedState ? 'Resume' : 'Pause'}
                </button>
            </div>
        </div>
    );
};

export default ShaderCanvas;