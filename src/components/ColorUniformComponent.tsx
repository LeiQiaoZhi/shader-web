import React, {useEffect, useId, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "../styles/ColorUniformComponent.css"
import TooltipLabel from "./TooltipLabel";
import {useShaderContext} from "../utils/ShaderContext";

const ColorUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const uniqueId = useId();
    const [color, setColor] = useState("#000");
    const {shader} = useShaderContext();

    // initialize
    useEffect(() => {
        shader?.setUniform(config);
        setColor(config.ui.value);
    }, [config, shader]);
    

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        shader?.setUniform(config);
        config.ui.value = event.target.value;
        setColor(config.ui.value);
    }

    return (
        <div className="color-component-container">
            <input type="color" id={uniqueId}  className="uniform-color-picker"
                   onChange={handleColorChange} value={color}
            />
            <TooltipLabel label={config.name} tooltip={config.gl.name}/>
        </div>
    );
}

export default ColorUniformComponent;