import React, {useEffect, useState} from "react";
import "./ShaderDimensionControl.css"
import {GiResize} from "react-icons/gi";
import {GrPowerReset} from "react-icons/gr";
import IconButton from "../common/IconButton";
import {DEFAULT_SAVED_DATA, saveDataWithKey} from "../../utils/browser/browserLocalStorage";


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
            <IconButton tooltip="Set Dimension"
                onClick={() => {
                    setViewportDimension([width, height]);
                    saveDataWithKey("width", width);
                    saveDataWithKey("height", height);
                }}
            >
                <GiResize/>
            </IconButton>
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
            <IconButton tooltip="Reset Dimension"
                onClick={() => {
                    setViewportDimension([DEFAULT_SAVED_DATA.width, DEFAULT_SAVED_DATA.height]);
                    saveDataWithKey("width", DEFAULT_SAVED_DATA.width);
                    saveDataWithKey("height", DEFAULT_SAVED_DATA.height);
                }}
            >
                <GrPowerReset/>
            </IconButton>
        </div>
    );
}