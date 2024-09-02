import {Expander} from "../common/Expander";
import React from "react";

interface ShaderPerformanceProps {
    deltaTimes: number[]
}

export const ShaderPerformance: React.FC<ShaderPerformanceProps> = (
    {
        deltaTimes
    }) => {
    const average = deltaTimes.reduce((a, b) => a + b, 0) / deltaTimes.length;
    return (
        <div className="shader-row-control-container shader-keyboard-events muted">
            <Expander title="Performance" headerClassName="shader-keyboard-events-header">
                <div className="shader-keyboard-events-body">
                    <div>Average Frame Time: {average.toFixed(2)} ms</div>
                    <div>Frame Rate: {(1000 / average).toFixed(2)} fps</div>
                </div>
            </Expander>
        </div>
    );
}