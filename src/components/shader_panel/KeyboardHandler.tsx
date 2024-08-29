import React, {useEffect, useState} from 'react'
import {useShaderContext} from '../../utils/contexts/ShaderContext';
import {FaMouse} from 'react-icons/fa';
import {Texture} from '../../utils/Texture';
import {VscTriangleDown, VscTriangleRight} from "react-icons/vsc";

type Props = {
    keyboardEventsTextureRef: React.MutableRefObject<Texture | null>;
}

const KeyboardHandler: React.FC<Props> = (
    {keyboardEventsTextureRef}
) => {
    const {mainShader} = useShaderContext();
    const [keyCode, setKeyCode] = useState<number | null>(null);
    const [keyPressed, setKeyPressed] = useState<string | null>(null);
    const [keysBeingPressed, setKeysBeingPressed] = useState<{ code: string, keycode: number }[]>([]);
    const [showInfo, setShowInfo] = useState(false);

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
        console.log('Key pressed:', event.code, 'KeyCode:', keyCode);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        setKeysBeingPressed(prevKeys => {
            const newKeys =
                Array.from(prevKeys).filter(item => item.code !== event.code);
            return newKeys;
        });
        console.log('Key released:', event.code);
    };

    const handleLoseFocus = () => {
        // Handle tab losing focus, e.g., assume keys were released
        console.log('Tab lost focus');
        setKeysBeingPressed([]);
    };

    const handleGainFocus = () => {
        // Handle tab regaining focus
        console.log('Tab gained focus');
        setKeysBeingPressed([]);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleLoseFocus);
        window.addEventListener('focus', handleGainFocus);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleLoseFocus);
            window.removeEventListener('focus', handleGainFocus);
        };
    }, []);

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
            {showInfo && <div>Key last pressed: {keyPressed}({keyCode})</div>}
            {showInfo &&
                <div>
                    Keys being pressed: <br/>{Array.from(keysBeingPressed).map(
                        key => key.code).join('\n')}
                </div>
            }
        </div>
    )
}

export default KeyboardHandler;