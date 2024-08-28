import React, { useEffect, useState } from 'react'
import { useShaderContext } from '../../utils/contexts/ShaderContext';
import { FaMouse } from 'react-icons/fa';
import { Texture } from '../../utils/Texture';

type Props = {
    keyboardEventsTextureRef: React.MutableRefObject<Texture | null>;
}

const KeyboardHandler: React.FC<Props> = (
    { keyboardEventsTextureRef }
) => {
    const { mainShader } = useShaderContext();
    const [keyCode, setKeyCode] = useState<number | null>(null);
    const [keyPressed, setKeyPressed] = useState<string | null>(null);
    const [keysBeingPressed, setKeysBeingPressed] = useState<Set<{ code: string, keycode: number }>>(new Set());

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.repeat) return; // Ignore repeated keydown events

        const keyCode = event.keyCode ?? event.key.charCodeAt(0);
        setKeyCode(keyCode);
        setKeyPressed(event.code);
        setKeysBeingPressed(prevKeys => {
            const newKeys = new Set(prevKeys);
            newKeys.add({ code: event.code, keycode: keyCode });
            return newKeys;
        });
        console.log('Key pressed:', event.code, 'KeyCode:', keyCode);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.repeat) return; // Ignore repeated keydown events

        setKeysBeingPressed(prevKeys => {
            const newKeys = new Set(
                Array.from(prevKeys).filter(item => item.code !== event.code)
            );
            return newKeys;
        });
        console.log('Key released:', event.code);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
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
            <div><FaMouse /> Input Events </div>
            {keyCode && <div>Key last pressed: {keyPressed}({keyCode})</div>}
            <div>Keys being pressed: {Array.from(keysBeingPressed).map(key => key.code).join(', ')}</div>
        </div>
    )
}

export default KeyboardHandler;