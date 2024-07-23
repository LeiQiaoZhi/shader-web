import React, {useEffect, useRef, useState} from "react";
import "./UniformsPanel.css"
import ConfigManager, {ConfigData} from "../../utils/ConfigManager";
import FileSelect from "../common/FileSelect";
import UniformComponent from "./UniformComponent";
import PanelHeader from "../common/PanelHeader";
import {FaFileDownload} from "react-icons/fa";
import {exportStringForDownload, loadData, saveDataWithKey} from "../../utils/browserUtils";

interface UniformsPanelProps {
}

const UniformsPanel: React.FC<UniformsPanelProps> = () => {
    const savedData = loadData();
    const configManagerRef = useRef<ConfigManager>(new ConfigManager(savedData.configData));
    const [uniformsObject, setUniformsObject] = useState<ConfigData[]>(configManagerRef.current.get("uniforms"));
    const [isVisible, setIsVisible] = useState(savedData.uniformsVisible);

    useEffect(() => {
        console.log("Config Changed");
    }, [uniformsObject]);

    const onConfigFileSelect = async (file: File) => {
        try {
            await configManagerRef.current.loadFile(file);
            setUniformsObject(configManagerRef.current.get("uniforms"));
        } catch (error) {
            console.error('Error loading config file:', error);
        }
    }

    const handleExportConfig = (event: React.MouseEvent<any>) => {
        const configAsString = configManagerRef.current.getConfigAsString();
        const fileName = configManagerRef.current.getFileName().replace(".toml", ".json");
        exportStringForDownload(configAsString, fileName);
    }

    return (
        <div className="uniforms-panel" data-visible={isVisible}>
            <PanelHeader title="Uniforms" isVisible={isVisible} setVisible={setIsVisible}>
                <div onClick={handleExportConfig}>
                    <FaFileDownload/>
                </div>
            </PanelHeader>
            <FileSelect onFileSelect={onConfigFileSelect} accept=".toml, .json" id="config select" title="Config"/>
            <div className="uniforms-components-container" onChange={
                e =>
                    saveDataWithKey("configData", configManagerRef.current.getConfigData())
            }>
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
        </div>
    )
}

export default UniformsPanel;