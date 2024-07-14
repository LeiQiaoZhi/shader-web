import React, {useEffect, useId, useRef, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "../styles/SliderUniformComponent.css"
import TooltipLabel from "./TooltipLabel";
import {useShaderContext} from "../utils/ShaderContext";

const SliderUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const uniqueId = useId();
    const [value, setValue] = useState(0);
    const {shader} = useShaderContext();

    // initialize
    useEffect(() => {
        console.log("Init Slider Uniform Component");
        shader?.set_uniform_float(config.gl.name, config.ui.value);
        setValue(config.ui.value);
    }, [config, shader]);

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        shader?.set_uniform_float(config.gl.name, event.target.valueAsNumber);
        config.ui.value = event.target.valueAsNumber;
        setValue(config.ui.value);
    }

    return (
        <div className="slider-component-container">
            <div className="slider-label-and-input-field">
                <TooltipLabel label={config.name} tooltip={config.gl.name}/>
                <input type="number" value={value} onChange={handleValueChange}/>
            </div>
            <input type="range" id={uniqueId} className="uniform-slider"
                   min={config.ui.min} max={config.ui.max} step={config.ui.step}
                   value={value}
                   onChange={handleValueChange}
            />
        </div>
    );
}

export default SliderUniformComponent;