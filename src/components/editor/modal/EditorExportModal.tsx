import React from 'react';
import IconButton from "../../common/IconButton";
import {MdCancel} from "react-icons/md";
import {useEditorContext} from "../../../utils/contexts/EditorContext";
import WarningText from "../../common/WarningText";
import Select from "../../common/Select";
import {FaDownload} from "react-icons/fa";
import {downloadStringsAsZip} from "../../../utils/browser/download";

interface EditorExportModalProps {
}

const EditorExportModal: React.FC<EditorExportModalProps> = () => {
    const [warning] = React.useState<string>("");
    const [options, setOptions] = React.useState<string>("All");
    const {editorSources, setShowExportModal} = useEditorContext();

    // TODO: file extension options
    // TODO: option to add boilerplate code
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
                                values={["All"]}
                                onChange={e => {
                                    setOptions(e.target.value);
                                }}/>
                    </div>
                    <IconButton onClick={e => {
                        const fileNames = Object.keys(editorSources);
                        const sources = fileNames.map((fileName) => editorSources[fileName].source);
                        const zipName = "shader-sources.zip";

                        const filNamesWithExtensions = fileNames.map((fileName) => fileName +
                            (editorSources[fileName].type === "Buffer" ? ".buffer" : ".common"));
                        downloadStringsAsZip(sources, filNamesWithExtensions, zipName);
                        
                        setShowExportModal(false);
                    }}>
                        <FaDownload/> Download
                    </IconButton>
                    {
                        warning !== "" &&
                        <WarningText warningText={warning}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default EditorExportModal;