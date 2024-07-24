import React from 'react';
import {ConfigData} from "../../utils/ConfigManager";
import IconButton from "../common/IconButton";
import {CgClose} from "react-icons/cg";
import "./EditUniformModalWindow.css"
import {RxReset} from "react-icons/rx";
import {GrPowerReset} from "react-icons/gr";

interface EditUniformModalWindowProps {
    uniformConfig: ConfigData,
    setShowModal: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setHover: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const EditUniformModalWindow: React.FC<EditUniformModalWindowProps> = (
    {uniformConfig, setShowModal, setHover}
) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <IconButton
                        onClick={e => {
                            setShowModal(false);
                            setHover(false);
                        }}
                    ><CgClose/></IconButton>
                    <h2>Edit {uniformConfig.ui.type}</h2>
                    <IconButton>
                        <GrPowerReset/>
                    </IconButton>
                </div>
                <div className="modal-body">
                    <label>GLSL Type: {uniformConfig.gl?.type}</label>
                    <label>GLSL Name: {uniformConfig.gl?.name}</label>
                    <label>Name: {uniformConfig.name}</label>
                    <label>Value: {uniformConfig.ui?.value}</label>
                </div>
            </div>
        </div>
    );
};

export default EditUniformModalWindow;