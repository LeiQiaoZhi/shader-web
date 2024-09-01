import React from 'react';
import "./EditorTabModalBufferDimensionInput.css"

interface EditorTabModalBufferDimensionInputProps {
    width: number | undefined,
    setWidth: (value: number | undefined) => void,
    setHeight: (value: number | undefined) => void,
    height: number | undefined
}

const EditorTabModalBufferDimensionInput: React.FC<EditorTabModalBufferDimensionInputProps> = (
    {width, setWidth, setHeight, height}
) => {
    return (
        <div className="buffer-dimension-input-container">
            <div><label>Width: </label>
                <input type="number" value={width}
                       onChange={e => {
                           setWidth(e.target.valueAsNumber);
                       }}/>
            </div>
            <div><label>Height: </label>
                <input type="number" value={height}
                       onChange={e => {
                           setHeight(e.target.valueAsNumber);
                       }}/>
            </div>
            <label style={{color: "var(--secondary-text-color)"}}>
                Set to 0 or below 0 for canvas size
            </label>
        </div>
    );
};

export default EditorTabModalBufferDimensionInput;