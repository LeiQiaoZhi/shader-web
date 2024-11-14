import React, {useId, useState} from 'react';
import IconButton from "../../common/IconButton";
import {MdCancel} from "react-icons/md";
import {useEditorContext} from "../../../utils/contexts/EditorContext";
import Select from "../../common/Select";
import JSZip from "jszip";
import FileSelect from "../../common/FileSelect";
import {EditorSources} from "../../../utils/browser/browserLocalStorage";
import {ShaderFileType} from "../../../utils/webglConstants";
import {FaFileImport} from "react-icons/fa";
import WarningText from "../../common/WarningText";
import configManager from "../../../utils/ConfigManager";
import {useUniformContext} from "../../../utils/contexts/UniformsContext";
import {useShaderContext} from "../../../utils/contexts/ShaderContext";
import {preprocessShaderSource} from "../../../utils/shaderPreprocessor";

interface EditorImportModalProps {
}

const EditorImportModal: React.FC<EditorImportModalProps> = () => {
    const [warning, setWarning] = useState<string>("");
    const [options, setOptions] = useState<string>("Overwrite");
    const {setEditorSources, setShowImportModal, setActiveTab} = useEditorContext();
    const {setShaderSources} = useShaderContext();
    const {configManager} = useUniformContext();

    const [filesContent, setFilesContent] = useState<{ [key: string]: string }>({});

    const id = useId();

    const handleZipUpload = async (file: File) => {
        if (file) {
            try {
                const zip = new JSZip();
                const zipContent = await zip.loadAsync(file);
                const filesObject: { [key: string]: string } = {};

                // Process each file in the ZIP
                for (const relativePath in zipContent.files) {
                    const zipEntry = zipContent.files[relativePath];

                    // Skip folders
                    if (!zipEntry.dir) {
                        filesObject[relativePath] = await zipEntry.async('text');
                    }
                }

                setFilesContent(filesObject);
            } catch (error) {
                console.error('Error reading ZIP file:', error);
            }
        }
    };

    // TODO: file extension options
    // TODO: option to add boilerplate code
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Import Files</h2>
                    <IconButton
                        tooltip="Close"
                        onClick={e => setShowImportModal(false)}
                    ><MdCancel/></IconButton>
                </div>
                <div className="modal-body">
                    <FileSelect title="Upload Zip" accept=".zip" onFileSelect={handleZipUpload} id={id}/>
                    {Object.keys(filesContent).length > 0 && (
                        <div className="modal-file-list">
                            {Object.keys(filesContent).map((name, index) => (
                                <label key={index}>{name}</label>
                            ))}
                        </div>
                    )}
                    <div>
                        <span>Import Options: </span>
                        <Select value={options}
                            // TODO: "Append"
                                values={["Overwrite"]}
                                onChange={e => {
                                    setOptions(e.target.value);
                                }}/>
                    </div>
                    <IconButton onClick={e => {
                        // check main and post exist
                        if (!filesContent["main.buffer.glsl"] || !filesContent["post.buffer.glsl"]) {
                            setWarning("there must be a main and post file");
                            return;
                        }

                        const newSources: EditorSources = {
                            main: {source: filesContent["main.buffer.glsl"], type: ShaderFileType.Buffer},
                            post: {source: filesContent["post.buffer.glsl"], type: ShaderFileType.Buffer},
                        };

                        // if the zip contains a uniformsConfig.json file, remove it from the sources and set it
                        const config = filesContent["uniformsConfig.json"];
                        if (config !== undefined) {
                            console.log("Importing uniforms config", config);
                            delete filesContent["uniformsConfig.json"];
                            configManager.setConfigFromString(config);
                        }

                        Object.keys(filesContent).forEach((fileName) => {
                            if (fileName === "main.buffer.glsl" || fileName === "post.buffer.glsl") {
                                return;
                            }

                            const shaderType = fileName.endsWith(".buffer.glsl") ? ShaderFileType.Buffer : ShaderFileType.Common;
                            const shaderName = fileName.replace(".buffer.glsl", "").replace(".common.glsl", "");

                            // if the shader is a buffer, extract the width and height from the filename
                            if (shaderType === ShaderFileType.Buffer) {
                                const match = shaderName.match(/\.([0-9]+)x([0-9]+)$/);

                                if (match) {
                                    const width = parseInt(match[1], 10);
                                    const height = parseInt(match[2], 10);
                                    const newName = shaderName.replace(`.${width}x${height}`, "");
                                    newSources[newName] = {
                                        source: filesContent[fileName],
                                        type: shaderType,
                                        width: width,
                                        height: height
                                    };
                                }
                                else {
                                    newSources[shaderName] = {source: filesContent[fileName], type: shaderType};
                                }
                            } else {
                                newSources[shaderName] = {source: filesContent[fileName], type: shaderType};
                            }
                        });


                        console.log("Importing sources", newSources);

                        // make editor show the new sources
                        setEditorSources(newSources);
                        // compile the new sources
                        setShaderSources(preprocessShaderSource(newSources));

                        setActiveTab("main");
                        setShowImportModal(false);
                    }}>
                        <FaFileImport/> Import
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

export default EditorImportModal;