import React, {useEffect, useState} from 'react'
import {Texture} from '../../utils/Texture';
import {VscTriangleDown, VscTriangleRight} from "react-icons/vsc";

type Props = {
    keyboardEventsTextureRef: React.MutableRefObject<Texture | null>,
    mouseRef: React.MutableRefObject<Float32Array>,
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

const IOHandler: React.FC<Props> = (
    {keyboardEventsTextureRef, mouseRef, canvasRef}
) => {
    const [keyCode, setKeyCode] = useState<number | null>(null);
    const [keyPressed, setKeyPressed] = useState<string | null>(null);
    const [keysBeingPressed, setKeysBeingPressed] = useState<{ code: string, keycode: number }[]>([]);
    const [showInfo, setShowInfo] = useState(false);
    const [mouseState, setMouseState] = useState<Float32Array>(new Float32Array(4));

    const mouseMoveHandler = (event: MouseEvent, canvas: HTMLCanvasElement | null) => {
        console.log('Mouse move event');
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = canvas.height - (event.clientY - rect.top); // Flip Y coordinate
            mouseRef.current[0] = mouseX;
            mouseRef.current[1] = mouseY;
            setMouseState(new Float32Array([mouseX, mouseY, mouseState[2], mouseState[3]]));
        }
    };

    const mouseDownHandler = (event: MouseEvent, canvas: HTMLCanvasElement | null) => {
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = canvas.height - (event.clientY - rect.top); // Flip Y coordinate
            mouseRef.current[2] = mouseX;
            mouseRef.current[3] = mouseY;
            setMouseState(new Float32Array([mouseState[0], mouseState[1], mouseX, mouseY]));
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const keyCode = event.keyCode ?? event.key.charCodeAt(0);
        setKeyCode(keyCode);
        setKeyPressed(event.code);
        setKeysBeingPressed(prevKeys => {
            const newKey = {code: event.code, keycode: keyCode};
            if (!prevKeys.some(key => key.code === newKey.code && key.keycode === newKey.keycode)) {
                return [...prevKeys, newKey];
            }
            return prevKeys;
        });
        // console.log('Key pressed:', event.code, 'KeyCode:', keyCode);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        setKeysBeingPressed(prevKeys => {
            return Array.from(prevKeys).filter(item => item.code !== event.code);
        });
        // console.log('Key released:', event.code);
    };

    const handleLoseFocus = () => {
        // console.log('Tab lost focus');
        setKeysBeingPressed([]);
    };

    const handleGainFocus = () => {
        // console.log('Tab gained focus');
        setKeysBeingPressed([]);
    };

    // Add event listeners
    useEffect(() => {
        // keyboard events
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleLoseFocus);
        window.addEventListener('focus', handleGainFocus);

        // mouse events
        if (canvasRef.current) {
            canvasRef.current.addEventListener('mousemove', event => mouseMoveHandler(event, canvasRef.current));
            canvasRef.current.addEventListener('mousedown', event => mouseDownHandler(event, canvasRef.current));
        } else {
            console.error('Canvas not found');
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleLoseFocus);
            window.removeEventListener('focus', handleGainFocus);

            if (canvasRef.current) {
                canvasRef.current.removeEventListener('mousemove', event => mouseMoveHandler(event, canvasRef.current));
                canvasRef.current.removeEventListener('mousedown', event => mouseDownHandler(event, canvasRef.current));
            }
        };
    }, [canvasRef]);

    // create a texture to store keyboard events
    useEffect(() => {
        const keyboardArray = new Uint8Array(256);
        keyboardArray.fill(0);
        keysBeingPressed.forEach(key => {
            keyboardArray[key.keycode] = 255;
        });
        keyboardEventsTextureRef.current?.changePixels(keyboardArray);
        console.log('Color array has one at:', keyboardArray.indexOf(255));
    }, [keysBeingPressed]);

    return (
        <div className="shader-row-control-container shader-keyboard-events muted">
            <div className="shader-keyboard-events-header"
                 onClick={
                     () => setShowInfo(!showInfo)
                 }>
                {showInfo
                    ? <VscTriangleDown/>
                    : <VscTriangleRight/>}
                Input Events
            </div>
            <div className="shader-keyboard-events-body">
                {showInfo && <div>Key last pressed: {keyPressed}({keyCode})</div>}
                {showInfo &&
                    <div>
                        Keys being pressed: <br/>{Array.from(keysBeingPressed).map(
                        key => key.code).join('\n')}
                    </div>
                }
                {showInfo &&
                    <div
                    >Mouse Position: {mouseState[0].toFixed(2)}, {mouseState[1].toFixed(2)}
                    </div>
                }
                {showInfo &&
                    <div>
                        Mouse Down Position: {mouseState[2].toFixed(2)}, {mouseState[3].toFixed(2)}
                    </div>
                }
            </div>
        </div>
    )
}

export default IOHandler;