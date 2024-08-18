import React from 'react';

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
        <div>
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
        </div>
    );
};

export default EditorTabModalBufferDimensionInput;