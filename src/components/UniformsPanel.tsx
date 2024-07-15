import React, {useRef, useState} from "react";
import "../styles/UniformsPanel.css"
import ConfigManager, {TomlData} from "../utils/ConfigManager";
import FileSelect from "./FileSelect";
import CheckboxUniformComponent from "./uniforms/CheckboxUniformComponent";
import TooltipLabel from "./TooltipLabel";
import SliderUniformComponent from "./uniforms/SliderUniformComponent";
import ColorUniformComponent from "./uniforms/ColorUniformComponent";
import UniformComponent from "./uniforms/UniformComponent";

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


    return (
        <div className="uniforms-panel">
            <h2>Uniforms</h2>
            <FileSelect onFileSelect={onConfigFileSelect} accept=".toml" id="config select"/>
            <div className="uniforms-components-container">
                {
                    uniformsObject.map((uniformConfig: TomlData, i: number) => {
                        return (
                            <div key={i}>
                                <UniformComponent uniformConfig={uniformConfig}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default UniformsPanel;