import React, {useRef, useState} from "react";
import "../styles/UniformsPanel.css"
import ConfigManager, {TomlData} from "../utils/ConfigManager";
import FileSelect from "./FileSelect";
import CheckboxUniformComponent from "./CheckboxUniformComponent";
import TooltipLabel from "./TooltipLabel";
import SliderUniformComponent from "./SliderUniformComponent";
import ColorUniformComponent from "./ColorUniformComponent";

interface UniformsPanelProps {
}

const UniformsPanel: React.FC<UniformsPanelProps> = () => {

    const configManagerRef = useRef<ConfigManager>(new ConfigManager());
    const [uniformsObject, setUniformsObject] = useState<TomlData[]>([]);

    const onConfigFileSelect = async (file: File) => {
        try {
            await configManagerRef.current.loadFile(file);
            setUniformsObject(configManagerRef.current.get("uniforms"));
        } catch (error) {
            console.error('Error loading config file:', error);
        }
    }

    const createUniformComponentFromConfig = (uniformConfig: TomlData): JSX.Element => {
        const type = uniformConfig.ui.type;
        console.log("create uniform component of type: " + type);
        return type === "checkbox" ? (<CheckboxUniformComponent config={uniformConfig}/>) :
            type === "slider" ? (<SliderUniformComponent config={uniformConfig}/>) :
                type === "color4" ? (<ColorUniformComponent config={uniformConfig}/>) :
                    (<TooltipLabel label={uniformConfig.name} tooltip={uniformConfig.gl.name}/>);
    }

    return (
        <div className="uniforms-panel">
            <h2>Uniforms</h2>
            <FileSelect onFileSelect={onConfigFileSelect} accept=".toml" id="config select"/>
            <div className="uniforms-components-container">
                {
                    uniformsObject.map((uniformConfig: TomlData, i: number) => {
                        return (
                            <div key={i}>
                                {createUniformComponentFromConfig(uniformConfig)}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default UniformsPanel;