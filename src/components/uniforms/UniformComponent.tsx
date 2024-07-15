import React from "react";
import {TomlData} from "../../utils/ConfigManager";
import CheckboxUniformComponent from "./CheckboxUniformComponent";
import SliderUniformComponent from "./SliderUniformComponent";
import ColorUniformComponent from "./ColorUniformComponent";
import TooltipLabel from "../TooltipLabel";
import FolderUniformComponent from "./FolderUniformComponent";

interface UniformsComponentProps {
    uniformConfig: TomlData;
}

const UniformComponent: React.FC<UniformsComponentProps> = ({uniformConfig}) => {
    const type = uniformConfig.ui.type;
    console.log("create uniform component of type: " + type);
    return (
        type === "checkbox" ? (<CheckboxUniformComponent config={uniformConfig}/>) :
            type === "slider" ? (<SliderUniformComponent config={uniformConfig}/>) :
                type === "color" ? (<ColorUniformComponent config={uniformConfig}/>) :
                    type === "folder" ? (<FolderUniformComponent config={uniformConfig}/>) :
                    (<TooltipLabel label={uniformConfig.name} tooltip={uniformConfig.gl.name}/>)
    );
}

export default UniformComponent