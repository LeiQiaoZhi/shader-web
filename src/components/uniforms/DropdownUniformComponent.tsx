import React, {useEffect, useId, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "./DropdownUniformComponent.css"
import TooltipLabel from "../common/TooltipLabel";
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import Select from "../common/Select";

const DropdownUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const [selected, setSelected] = useState(0);
    const {mainShader} = useShaderContext();

    // initialize
    useEffect(() => {
        mainShader?.setUniformFromConfig(config);
        setSelected(config.ui.value);
    }, [config, mainShader]);


    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        config.ui.value = Number(event.target.value);
        setSelected(config.ui.value);
        mainShader?.setUniformFromConfig(config);
    }

    return (
        <div className="dropdown-component-container">
            {config.ui.options &&
                <Select value={selected} optionNames={config.ui.options}
                        values={config.ui.options.map((_: string, i: number) => i.toString())}
                        onChange={handleDropdownChange}/>
            }
            <TooltipLabel label={config.name} tooltip={config.gl?.name ?? "Undefined Name"}/>
        </div>
    );
}

export default DropdownUniformComponent;