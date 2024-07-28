import React, {useEffect, useId, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "./ColorUniformComponent.css"
import TooltipLabel from "../common/TooltipLabel";
import {useShaderContext} from "../../utils/contexts/ShaderContext";

const ColorUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const uniqueId = useId();
    const [color, setColor] = useState("#000");
    const {shader} = useShaderContext();

    // initialize
    useEffect(() => {
        shader?.setUniform(config);
        if (config.ui.value[0] !== "#") {
            config.ui.value = "#" + config.ui.value;
        }
        setColor(config.ui.value);
    }, [config, shader]);
    

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        config.ui.value = event.target.value;
        setColor(config.ui.value);
        shader?.setUniform(config);
    }

    return (
        <div className="color-component-container">
            <input type="color" id={uniqueId}  className="uniform-color-picker"
                   onChange={handleColorChange} value={color}
            />
            <TooltipLabel label={config.name} tooltip={config.gl?.name ?? "Undefined Name"}/>
        </div>
    );
}

export default ColorUniformComponent;