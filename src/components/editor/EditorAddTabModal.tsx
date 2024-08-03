import React from 'react';
import IconButton from "../common/IconButton";
import {GiConfirmed} from "react-icons/gi";
import {MdCancel} from "react-icons/md";
import {useEditorContext} from "../../utils/contexts/EditorContext";
import WarningText from "../common/WarningText";
import Select from "../common/Select";
import {SHADER_SOURCE_TEMPLATE_MAP} from "../../utils/webglConstants";

interface EditorAddTabModalProps {
}

const EditorAddTabModal: React.FC<EditorAddTabModalProps> = () => {
    const [tabName, setTabName] = React.useState<string>("newTab");
    const [template, setTemplate] = React.useState<string>("Empty");
    const [warning, setWarning] = React.useState<string>("");
    const {editorSources, setShowAddModal, setEditorSources, setActiveTab} = useEditorContext();

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <IconButton
                        onClick={e => {
                            if (tabName === "") {
                                setWarning("File name cannot be empty")
                                return;
                            } else if (tabName in editorSources) {
                                setWarning("File name already exists")
                                return;
                            } else {
                                setWarning("")
                            }
                            setEditorSources({...editorSources, [tabName]: SHADER_SOURCE_TEMPLATE_MAP[template]});
                            setActiveTab(tabName);
                            setShowAddModal(false);
                        }}
                    ><GiConfirmed/></IconButton>
                    <h2>Add File</h2>
                    <IconButton
                        onClick={e => setShowAddModal(false)}
                    ><MdCancel/></IconButton>
                </div>
                <div className="modal-body">
                    <div><label>Name: </label>
                        <input type="text" placeholder="New tab name" value={tabName}
                               onChange={e => {
                                   setTabName(e.target.value);
                               }}/>
                    </div>
                    {
                        warning !== "" &&
                        <WarningText warningText={warning}/>
                    }
                    <div>
                        <span>Template: </span>
                        <Select value={template}
                                values={Object.keys(SHADER_SOURCE_TEMPLATE_MAP)}
                                onChange={e => {
                                    setTemplate(e.target.value);
                                }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorAddTabModal;