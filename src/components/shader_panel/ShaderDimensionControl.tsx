import React, {useEffect, useState} from "react";
import {VIEWPORT_HEIGHT, VIEWPORT_WIDTH} from "./ShaderCanvas";
import "./ShaderDimensionControl.css"


interface ShaderDimensionControlProps {
    viewportDimension: number[],
    setViewportDimension: React.Dispatch<React.SetStateAction<number[]>>
}

export const ShaderDimensionControl: React.FC<ShaderDimensionControlProps> = (
    {viewportDimension, setViewportDimension}
) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setWidth(viewportDimension[0]);
        setHeight(viewportDimension[1]);
    }, [viewportDimension]);

    return (
        <div className="shader-row-control-container shader-dimension-control muted">
            <button
                onClick={() => setViewportDimension([width, height])}
            >Set Dimension
            </button>
            <label>
                Width
                <input type="number" value={width} onChange={
                    e => setWidth(e.target.valueAsNumber)
                }/>
            </label>
            <label>
                Height
                <input type="number" value={height} onChange={
                    e => setHeight(e.target.valueAsNumber)
                }/>
            </label>
            <button
                onClick={() => setViewportDimension([VIEWPORT_WIDTH, VIEWPORT_HEIGHT])}
            >
                Reset
            </button>
        </div>
    );
}