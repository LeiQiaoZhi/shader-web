import React from "react";
import {ConfigData} from "../../utils/ConfigManager";
import CheckboxUniformComponent from "./CheckboxUniformComponent";
import SliderUniformComponent from "./SliderUniformComponent";
import ColorUniformComponent from "./ColorUniformComponent";
import TooltipLabel from "../common/TooltipLabel";
import FolderUniformComponent from "./FolderUniformComponent";
import DropdownUniformComponent from "./DropdownUniformComponent";

interface UniformsComponentProps {
    uniformConfig: ConfigData;
}

const UniformComponent: React.FC<UniformsComponentProps> = ({uniformConfig}) => {
    const type = uniformConfig.ui.type;
    console.log("create uniform component of type: " + type);
    return (
        type === "checkbox" ? (<CheckboxUniformComponent config={uniformConfig}/>) :
            type === "slider" ? (<SliderUniformComponent config={uniformConfig}/>) :
                type === "color" ? (<ColorUniformComponent config={uniformConfig}/>) :
                    type === "folder" ? (<FolderUniformComponent config={uniformConfig}/>) :
                        type === "dropdown" ? (<DropdownUniformComponent config={uniformConfig}/>) :
                            (<TooltipLabel label={uniformConfig.name} tooltip={uniformConfig.gl.name}/>)
    );
}

export default UniformComponent