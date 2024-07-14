import React, {useEffect, useId, useRef, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "../styles/CheckboxUniformComponent.css"
import TooltipLabel from "./TooltipLabel";
import {useShaderContext} from "../utils/ShaderContext";

const CheckboxUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const uniqueId = useId();
    const {shader} = useShaderContext();
    const [checked, setChecked] = useState(false);

    // Initialize
    useEffect(() => {
        shader?.set_uniform_bool(config.gl.name, config.ui.value);
        setChecked(config.ui.value);
    }, [config, shader]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        shader?.set_uniform_bool(config.gl.name, event.target.checked)
        config.ui.value = event.target.checked;
        setChecked(event.target.checked);
    }

    return (
        <div className="checkbox-component-container">
            <input type="checkbox" id={uniqueId} style={{"display": 'none'}} className="uniform-checkbox-hidden"
                   onChange={handleCheckboxChange} checked={checked}
            />
            <label htmlFor={uniqueId} className="uniform-checkbox"></label>
            <TooltipLabel label={config.name} tooltip={config.gl.name}/>
        </div>
    );
}

export default CheckboxUniformComponent;