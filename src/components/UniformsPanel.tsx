import React, {useRef, useState} from "react";
import "./UniformsPanel.css"
import ConfigManager, {TomlData} from "../utils/ConfigManager";
import FileSelect from "./FileSelect";

const UniformsPanel: React.FC = () => {

    const configManagerRef = useRef<ConfigManager>(new ConfigManager());
    const [uniformsObject, setUniformsObject] = useState<TomlData[]>([]);

    const onConfigFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            try {
                await configManagerRef.current.loadFile(file);
                setUniformsObject(configManagerRef.current.get("uniforms"));
            } catch (error) {
                console.error('Error loading config file:', error);
            }
        }
    }

    return (
        <div className="uniforms-panel-container">
            <div className="uniforms-panel">
                <strong>Uniforms</strong>
                <input type="file" accept=".toml" onChange={onConfigFileChange}/>
                <FileSelect/>
                <div className="uniforms-components-container">
                    {
                        uniformsObject.map((item: TomlData, i: number) => {
                            return (<div>
                                <span>{item['name']}</span>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UniformsPanel;