import React, {useEffect, useRef, useState} from "react";
import "./UniformsPanel.css"
import ConfigManager from "../../utils/ConfigManager";
import FileSelect from "../common/FileSelect";
import UniformComponent from "./UniformComponent";
import PanelHeader from "../common/PanelHeader";
import {FaEdit, FaFileDownload} from "react-icons/fa";
import {exportStringForDownload, loadData, saveDataWithKey} from "../../utils/browserUtils";
import {UniformPanelMode, useUniformContext} from "../../utils/contexts/UniformsContext";
import {UniformConfigData} from "./UniformsSpecification";

interface UniformsPanelProps {
}

const UniformsPanel: React.FC<UniformsPanelProps> = () => {
    const savedData = loadData();
    const configManagerRef = useRef<ConfigManager>(new ConfigManager(savedData.configData));
    const [uniformsObject, setUniformsObject] = useState<UniformConfigData[]>(configManagerRef.current.getUniforms());
    const [isVisible, setIsVisible] = useState(savedData.uniformsVisible);
    const {mode, setMode} = useUniformContext();

    useEffect(() => {
        console.log("Config Changed");
    }, [uniformsObject]);

    const onConfigFileSelect = async (file: File) => {
        try {
            await configManagerRef.current.loadFile(file);
            setUniformsObject(configManagerRef.current.getUniforms());
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
            <PanelHeader title={mode === UniformPanelMode.Normal ? "Uniforms" : "Uniforms (Edit)"}
                         isVisible={isVisible} setVisible={setIsVisible}>
                <div onClick={e => setMode(
                    mode === UniformPanelMode.Normal ? UniformPanelMode.Edit : UniformPanelMode.Normal
                )}>
                    <FaEdit/>
                </div>
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
                    uniformsObject.map((uniformConfig: UniformConfigData, _: number) => {
                        return (
                            <UniformComponent uniformConfig={uniformConfig}/>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default UniformsPanel;