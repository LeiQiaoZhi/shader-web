import React from 'react';
import IconButton from "../../common/IconButton";
import {GiConfirmed} from "react-icons/gi";
import {MdCancel} from "react-icons/md";
import {useEditorContext} from "../../../utils/contexts/EditorContext";
import IconText from "../../common/IconText";
import Select from "../../common/Select";
import {SHADER_SOURCE_TEMPLATE_MAP, ShaderFileType} from "../../../utils/webglConstants";
import EditorTabModalBufferDimensionInput from "./EditorTabModalBufferDimensionInput";
import {IoWarning} from "react-icons/io5";

interface EditorAddTabModalProps {
}

const EditorAddTabModal: React.FC<EditorAddTabModalProps> = () => {
    const [tabName, setTabName] = React.useState<string>("newTab");
    const [width, setWidth] = React.useState<number | undefined>(32);
    const [height, setHeight] = React.useState<number | undefined>(32);
    const [template, setTemplate] = React.useState<string>("Empty");
    const [fileType, setFileType] = React.useState<ShaderFileType>(ShaderFileType.Common);
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
                            setEditorSources({
                                ...editorSources,
                                [tabName]: {
                                    source: SHADER_SOURCE_TEMPLATE_MAP[template],
                                    type: fileType,
                                    width: fileType === ShaderFileType.Buffer ? width : undefined,
                                    height: fileType === ShaderFileType.Buffer ? height : undefined,
                                }
                            });
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
                        <IconText preset={"warn"} text={warning}/>                    }
                    <div>
                        <span>Type: </span>
                        <Select value={fileType}
                                values={Object.keys(ShaderFileType)}
                                onChange={e => {
                                    setFileType(e.target.value as ShaderFileType);
                                }}/>
                    </div>
                    <div>
                        <span>Template: </span>
                        <Select value={template}
                                values={Object.keys(SHADER_SOURCE_TEMPLATE_MAP)}
                                onChange={e => {
                                    setTemplate(e.target.value);
                                }}/>
                    </div>
                    {
                        fileType === ShaderFileType.Buffer &&
                        <EditorTabModalBufferDimensionInput
                            width={width} setWidth={setWidth}
                            height={height} setHeight={setHeight}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default EditorAddTabModal;