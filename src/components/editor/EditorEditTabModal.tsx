import React from 'react';
import IconButton from "../common/IconButton";
import {GiConfirmed} from "react-icons/gi";
import {GrPowerReset} from "react-icons/gr";
import {EditorSources} from "../../utils/browserUtils";
import {tab} from "@testing-library/user-event/dist/tab";
import {MdCancel, MdDelete} from "react-icons/md";
import {useEditorContext} from "../../utils/contexts/EditorContext";
import WarningText from "../common/WarningText";

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

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <IconButton
                        onClick={e => {
                            if (newTabName === "") {
                                setWarning("File name cannot be empty")
                                return;
                            } else if (newTabName in editorSources) {
                                setWarning("File name already exists")
                                return;
                            } else if (tabNameToEdit === "main") {
                                setWarning("The main file cannot be renamed")
                                return;
                            } else {
                                setWarning("")
                            }

                            if (activeTab === tabNameToEdit) {
                                setActiveTab(newTabName);
                            }

                            const newSources: EditorSources = {main: editorSources.main};
                            Object.keys(editorSources).forEach((key) => {
                                if (key === tabNameToEdit) {
                                    newSources[newTabName] = editorSources[key];
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
                    <IconButton size="small" background="var(--contrast-color)" color="var(--background-color)"
                                onClick={e => {
                        const {[tabNameToEdit]: source, main: mainSource, ...rest} = editorSources;
                        setEditorSources({main: mainSource, ...rest});
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