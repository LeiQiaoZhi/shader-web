import React from 'react';
import IconButton from "../../common/IconButton";
import {GiConfirmed} from "react-icons/gi";
import {EditorSources, toPascalCase} from "../../../utils/browserUtils";
import {MdCancel, MdDelete} from "react-icons/md";
import {useEditorContext} from "../../../utils/contexts/EditorContext";
import WarningText from "../../common/WarningText";
import {ShaderFileType} from "../../../utils/webglConstants";
import EditorTabModalBufferDimensionInput from "./EditorTabModalBufferDimensionInput";
import {tab} from "@testing-library/user-event/dist/tab";

interface EditorEditTabModalProps {
}

const EditorEditTabModal: React.FC<EditorEditTabModalProps> = () => {
    const {
        setShowEditModal,
        editorSources,
        setEditorSources,
        tabNameToEdit,
        activeTab,
        setActiveTab
    } = useEditorContext();
    const [newTabName, setNewTabName] = React.useState<string>(tabNameToEdit);
    const [warning, setWarning] = React.useState<string>("");
    const [width, setWidth] = React.useState<number | undefined>(editorSources[tabNameToEdit].width);
    const [height, setHeight] = React.useState<number | undefined>(editorSources[tabNameToEdit].height);

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <IconButton
                        onClick={e => {
                            if (newTabName === "") {
                                setWarning("File name cannot be empty")
                                return;
                            } else if (newTabName in editorSources && newTabName !== tabNameToEdit) {
                                setWarning("File name already exists")
                                return;
                            } else if (tabNameToEdit === "main") {
                                setWarning("The main file cannot be renamed")
                                return;
                            } else if (tabNameToEdit === "post") {
                                setWarning("The post file cannot be renamed")
                                return;
                            } else {
                                setWarning("")
                            }

                            if (activeTab === tabNameToEdit) {
                                setActiveTab(newTabName);
                            }

                            const newSources: EditorSources = {main: editorSources.main, post: editorSources.post};
                            Object.keys(editorSources).forEach((key) => {
                                if (key === tabNameToEdit) {
                                    newSources[newTabName] = editorSources[key];
                                    newSources[newTabName].width = width;
                                    newSources[newTabName].height = height;
                                } else {
                                    newSources[key] = editorSources[key];
                                }
                            })
                            setEditorSources(newSources);
                            setShowEditModal(false);
                        }}
                    ><GiConfirmed/></IconButton>
                    <h2>Edit File</h2>
                    <IconButton
                        onClick={e => setShowEditModal(false)}
                    ><MdCancel/></IconButton>
                </div>
                <div className="modal-body">
                    <label>Type: {editorSources[tabNameToEdit].type}</label>
                    {
                        editorSources[tabNameToEdit].type === ShaderFileType.Buffer &&
                        <label>Uniform: {"i" + toPascalCase(tabNameToEdit)}</label>
                    }
                    <div><label>Name: </label>
                        <input type="text" placeholder="New tab name" value={newTabName}
                               onChange={e => {
                                   setNewTabName(e.target.value);
                               }}/>
                    </div>
                    {
                        warning !== "" &&
                        <WarningText warningText={warning}/>
                    }
                    {
                        editorSources[tabNameToEdit].type === ShaderFileType.Buffer &&
                        <EditorTabModalBufferDimensionInput width={width} setWidth={setWidth}
                                                            setHeight={setHeight} height={height}/>
                    }
                    <IconButton size="small" bg="var(--contrast-color)" color="var(--background-color)"
                                onClick={e => {
                                    const {
                                        [tabNameToEdit]: source,
                                        main: mainSource,
                                        post: postSource,
                                        ...rest
                                    } = editorSources;
                                    setEditorSources({main: mainSource, post: postSource, ...rest});
                                    setActiveTab("main");
                                    setShowEditModal(false);
                                }}>
                        <MdDelete/>
                        Delete
                    </IconButton>
                </div>

            </div>
        </div>
    );
};

export default EditorEditTabModal;