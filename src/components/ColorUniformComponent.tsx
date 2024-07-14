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
        setUniform();
        setColor(config.ui.value);
    }, [config, shader]);
    
    const setUniform = () => {
        if (shader == null) {
            console.log("shader is null")
        } else if (config.ui.type === "color3"){
            shader.set_uniform_color3(config.gl.name, config.ui.value);
        } else if (config.ui.type === "color4"){
            shader.set_uniform_color4(config.gl.name, config.ui.value);
        } else {
            throw new Error(`config.ui.name should be either color3 or color4, instead it is ${config.ui.type}`);
        }
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUniform();
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