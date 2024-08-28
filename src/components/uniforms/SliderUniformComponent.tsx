import React, {useEffect, useId, useRef, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "./SliderUniformComponent.css"
import TooltipLabel from "../common/TooltipLabel";
import {useShaderContext} from "../../utils/contexts/ShaderContext";

const SliderUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const uniqueId = useId();
    const [value, setValue] = useState(0);
    const {mainShader} = useShaderContext();

    // initialize
    useEffect(() => {
        mainShader?.setUniformFromConfig(config);
        setValue(config.ui.value);
    }, [config, mainShader]);

    const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
        let timeoutId: number | undefined;

        return function (...args: Parameters<T>) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = window.setTimeout(() => {
                func(...args);
            }, delay);
        } as T;
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        config.ui.value = event.target.valueAsNumber;
        setValue(config.ui.value);
        mainShader?.setUniformFromConfig(config);
    }

    return (
        <div className="slider-component-container">
            <div className="slider-label-and-input-field">
                <input type="number" value={value}
                       onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e), 200)}/>
                <TooltipLabel label={config.name} tooltip={config.gl?.name ?? "Undefined Name"}/>
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