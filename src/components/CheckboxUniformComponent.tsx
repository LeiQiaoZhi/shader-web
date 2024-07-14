import React, {useId} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "../styles/UniformsComponents.css"
import TooltipLabel from "./TooltipLabel";

const CheckboxUniformComponent: React.FC<IUniformComponentProps> = ({config, shaderRef}) => {
    const uniqueId = useId();

    return (
        <div className="checkbox-component-container">
            <input type="checkbox" id={uniqueId} style={{"display": 'none'}} className="uniform-checkbox-hidden"
                   onChange={
                       (e) =>
                           shaderRef.current?.set_uniform_bool(config.gl.name, e.target.checked)
                   }
            />
            <label htmlFor={uniqueId} className="uniform-checkbox"></label>
            <TooltipLabel label={config.name} tooltip={config.gl.name}/>
        </div>
    );
}

export default CheckboxUniformComponent;