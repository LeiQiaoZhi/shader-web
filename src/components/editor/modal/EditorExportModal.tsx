import React, {useEffect} from 'react';
import IconButton from "../../common/IconButton";
import {MdCancel} from "react-icons/md";
import {useEditorContext} from "../../../utils/contexts/EditorContext";
import IconText from "../../common/IconText";
import Select from "../../common/Select";
import {FaDownload, FaInfo} from "react-icons/fa";
import {downloadStringsAsZip} from "../../../utils/browser/download";
import {useUniformContext} from "../../../utils/contexts/UniformsContext";
import {IoWarning} from "react-icons/io5";
import {FaCircleInfo} from "react-icons/fa6";

interface EditorExportModalProps {
}

const EditorExportModal: React.FC<EditorExportModalProps> = () => {
    const [warning] = React.useState<string>("");
    const [options, setOptions] = React.useState<string>("All");
    const [filNamesWithExtensions, setFilNamesWithExtensions] = React.useState<string[]>([]);
    const [sources, setSources] = React.useState<string[]>([]);
    const {editorSources, setShowExportModal} = useEditorContext();
    const {configManager} = useUniformContext();

    const prepareSourcesAndFileNames = (option: string) => {
        setOptions(option);
        const fileNames = Object.keys(editorSources);
        const sources = fileNames.map((fileName) => editorSources[fileName].source);

        const uniformConfigString = configManager.getConfigAsString();

        const filNamesWithExtensions = fileNames.map((fileName) => fileName
            + (editorSources[fileName].width && editorSources[fileName].height ? `.${editorSources[fileName].width}x${editorSources[fileName].height}` : "")
            + (editorSources[fileName].type === "Buffer" ? ".buffer.glsl" : ".common.glsl"));
        if (option === "All") {
            // Add uniforms config to the zip
            filNamesWithExtensions.push("uniformsConfig.json");
            sources.push(uniformConfigString);
        }
        setSources(sources);
        setFilNamesWithExtensions(filNamesWithExtensions);
    }

    useEffect(() => {
        prepareSourcesAndFileNames("All");
    }, []);

    // TODO: file extension options
    // TODO: option to add boilerplate code
    // TODO: preview
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Export Files</h2>
                    <IconButton
                        tooltip="Close"
                        onClick={e => setShowExportModal(false)}
                    ><MdCancel/></IconButton>
                </div>
                <div className="modal-body">
                    <div>
                        <span>Download: </span>
                        <Select value={options}
                            // TODO: "Active Tab", "Active Tab with includes"
                                values={["All", "Sources Only"]}
                                onChange={e => {
                                    prepareSourcesAndFileNames(e.target.value);
                                }}/>
                    </div>
                    {Object.keys(filNamesWithExtensions).length > 0 && (
                        <div className="modal-file-list">
                            {filNamesWithExtensions.map((name, index) => (
                                <label key={index}>{name}</label>
                            ))}
                        </div>
                    )}
                    <IconButton onClick={e => {
                        const zipName = "shader-sources.zip";
                        downloadStringsAsZip(sources, filNamesWithExtensions, zipName);
                        setShowExportModal(false);
                    }}>
                        <FaDownload/> Download
                    </IconButton>
                    {
                        warning !== "" &&
                        <IconText preset={"warn"} text={warning}/>                }
                    <IconText
                        preset={"info"}
                        text={`To enable the "Save As" dialog in Chrome:
1. Go to Settings > Downloads.
2. Enable "Ask where to save each file before downloading".`}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditorExportModal;