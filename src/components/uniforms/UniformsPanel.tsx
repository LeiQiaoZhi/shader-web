import React, {useRef, useState} from "react";
import "./UniformsPanel.css"
import ConfigManager, {ConfigData} from "../../utils/ConfigManager";
import FileSelect from "../common/FileSelect";
import UniformComponent from "./UniformComponent";

interface UniformsPanelProps {
}

const UniformsPanel: React.FC<UniformsPanelProps> = () => {

    const configManagerRef = useRef<ConfigManager>(new ConfigManager());
    const [uniformsObject, setUniformsObject] = useState<ConfigData[]>([]);

    const onConfigFileSelect = async (file: File) => {
        try {
            await configManagerRef.current.loadFile(file);
            setUniformsObject(configManagerRef.current.get("uniforms"));
        } catch (error) {
            console.error('Error loading config file:', error);
        }
    }

    const handleExportConfig = (event: React.MouseEvent<HTMLButtonElement>) => {
        const configAsString = configManagerRef.current.getConfigAsString();
        const blob = new Blob([configAsString], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = configManagerRef.current.getFileName().replace(".toml", ".json");
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="uniforms-panel">
            <h2>Uniforms</h2>
            <FileSelect onFileSelect={onConfigFileSelect} accept=".toml, .json" id="config select"/>
            <div className="uniforms-components-container">
                {
                    uniformsObject.map((uniformConfig: ConfigData, i: number) => {
                        return (
                            <div key={i}>
                                <UniformComponent uniformConfig={uniformConfig}/>
                            </div>
                        );
                    })
                }
            </div>
            <button className="muted" onClick={handleExportConfig}>
                Export Config
            </button>
        </div>
    )
}

export default UniformsPanel;