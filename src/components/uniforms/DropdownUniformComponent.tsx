import React, {useEffect, useId, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "./DropdownUniformComponent.css"
import TooltipLabel from "../common/TooltipLabel";
import {useShaderContext} from "../../utils/contexts/ShaderContext";

const DropdownUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const [selected, setSelected] = useState(0);
    const {shader} = useShaderContext();

    // initialize
    useEffect(() => {
        shader?.setUniform(config);
        setSelected(config.ui.value);
    }, [config, shader]);


    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        config.ui.value = Number(event.target.value);
        setSelected(config.ui.value);
        shader?.setUniform(config);
    }

    return (
        <div className="dropdown-component-container">
            <select onChange={handleDropdownChange} value={selected}>
                {
                    config.ui.options.map(
                        (option: string, i: number) => {
                            return <option key={i} value={i}>{option}</option>;
                        }
                    )
                }
            </select>
            <TooltipLabel label={config.name} tooltip={config.gl.name}/>
        </div>
    );
}

export default DropdownUniformComponent;