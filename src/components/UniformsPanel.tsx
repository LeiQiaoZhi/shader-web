import React, {useRef, useState} from "react";
import "../styles/UniformsPanel.css"
import ConfigManager, {TomlData} from "../utils/ConfigManager";
import FileSelect from "./FileSelect";

const UniformsPanel: React.FC = () => {

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
                    uniformsObject.map((item: TomlData, i: number) => {
                        return (<div key={i}>
                            <span>{item['name']}</span>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default UniformsPanel;