import React, {useEffect, useState} from "react";
import "./UniformsPanel.css"
import FileSelect from "../common/FileSelect";
import UniformComponent from "./UniformComponent";
import PanelHeader from "../common/PanelHeader";
import {FaEdit, FaFileDownload} from "react-icons/fa";
import {loadData, saveDataWithKey} from "../../utils/browser/browserLocalStorage";
import {UniformPanelMode, useUniformContext} from "../../utils/contexts/UniformsContext";
import {UniformConfigData} from "./UniformsSpecification";
import UniformEditAddButton from "./UniformEditAddButton";
import {Tooltip} from "react-tooltip";
import IconButton from "../common/IconButton";
import {exportStringForDownload} from "../../utils/browser/download";

interface UniformsPanelProps {
}

const UniformsPanel: React.FC<UniformsPanelProps> = () => {
    const savedData = loadData();
    const [isVisible, setIsVisible] = useState(savedData.uniformsVisible);
    const {mode, setMode, configManager, configDataState} = useUniformContext();

    useEffect(() => {
        console.log("Config Changed, from manager:", configDataState);
    }, [configDataState])

    const onConfigFileSelect = async (file: File) => {
        try {
            await configManager.loadFile(file);
        } catch (error) {
            console.error('Error loading config file:', error);
        }
    }

    const handleExportConfig = (event: React.MouseEvent<any>) => {
        const configAsString = configManager.getConfigAsString();
        const fileName = configManager.getFileName().replace(".toml", ".json");
        exportStringForDownload(configAsString, fileName);
    }

    return (
        <div className="uniforms-panel" data-visible={isVisible}>
            <PanelHeader title={mode === UniformPanelMode.Normal ? "Uniforms" : "Uniforms (Edit)"}
                         isVisible={isVisible} setVisible={setIsVisible}>
                <IconButton tooltip={"Edit Uniforms Widgets"} padding='0' size='normal'
                            bg='none' border='0' color="var(--secondary-text-color)"
                            onClick={e => setMode(
                                mode === UniformPanelMode.Normal ? UniformPanelMode.Edit : UniformPanelMode.Normal
                            )}>
                    <FaEdit/>
                </IconButton>
                <IconButton tooltip={"Export Config"} padding='0' size='normal'
                            bg='none' border='0' color="var(--secondary-text-color)"
                            onClick={handleExportConfig}>
                    <FaFileDownload/>
                </IconButton>
            </PanelHeader>

            {/*<FileSelect onFileSelect={onConfigFileSelect} accept=".toml, .json" id="config select" title="Config"/>*/}

            <div className="uniforms-components-container" style={mode === UniformPanelMode.Edit ? {gap: 0} : {}}
                 onChange={e => {
                     saveDataWithKey("configData", configManager.getConfigData())
                 }}>
                {
                    configDataState.uniforms.map((uniformConfig: UniformConfigData, i: number) => {
                        return (
                            <div>
                                <UniformEditAddButton index={[i]}/>
                                <UniformComponent key={uniformConfig.name} index={[i]} uniformConfig={uniformConfig}/>
                            </div>
                        );
                    })
                }
                <UniformEditAddButton index={[configDataState.uniforms.length]}/>
            </div>
        </div>
    )
}

export default UniformsPanel;