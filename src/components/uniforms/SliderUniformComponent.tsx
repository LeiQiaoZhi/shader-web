import React, {useEffect, useId, useRef, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "./SliderUniformComponent.css"
import TooltipLabel from "../common/TooltipLabel";
import {useShaderContext} from "../../utils/contexts/ShaderContext";

const SliderUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const uniqueId = useId();
    const [value, setValue] = useState(0);
    const {shader} = useShaderContext();

    // initialize
    useEffect(() => {
        console.log("Init Slider Uniform Component");
        shader?.setUniform(config);
        setValue(config.ui.value);
    }, [config, shader]);

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        config.ui.value = event.target.valueAsNumber;
        setValue(config.ui.value);
        shader?.setUniform(config);
    }

    return (
        <div className="slider-component-container">
            <div className="slider-label-and-input-field">
                <input type="number" value={value} onChange={handleValueChange}/>
                <TooltipLabel label={config.name} tooltip={config.gl.name}/>

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