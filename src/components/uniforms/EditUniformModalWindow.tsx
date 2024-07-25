import React, {useState} from 'react';
import {ConfigData} from "../../utils/ConfigManager";
import IconButton from "../common/IconButton";
import "./EditUniformModalWindow.css"
import {GrPowerReset} from "react-icons/gr";
import {GiConfirmed} from "react-icons/gi";

interface EditUniformModalWindowProps {
    uniformConfig: ConfigData,
    setShowModal: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setHover: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

interface EditUniformModalInputFieldProps {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    defaultValue: string | number,
    type?: string
}

const EditUniformModalInputField: React.FC<EditUniformModalInputFieldProps> = (
    {onChange, label, defaultValue, type = "text"}
) => {
    return (
        <div style={(defaultValue !== undefined) ? {} : {display: 'none'}}>
            <label>{label}</label>
            <input type={type} defaultValue={defaultValue} onChange={onChange}/>
        </div>
    );
}

const EditUniformModalWindow: React.FC<EditUniformModalWindowProps> = (
    {uniformConfig, setShowModal, setHover}
) => {

    const [name, setName] = useState<string>(uniformConfig.name);

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <IconButton
                        onClick={e => {
                            setShowModal(false);
                            setHover(false);
                        }}
                    ><GiConfirmed/></IconButton>
                    <h2>Edit Widget</h2>
                    <IconButton>
                        <GrPowerReset/>
                    </IconButton>
                </div>
                <div className="modal-body">
                    <EditUniformModalInputField
                        label="Name: " defaultValue={uniformConfig.name}
                        onChange={e => uniformConfig.name = e.target.value}
                    />
                    <EditUniformModalInputField
                        label="Type: " defaultValue={uniformConfig.ui?.type}
                        onChange={e => uniformConfig.name = e.target.value}
                    />
                    <EditUniformModalInputField
                        label="Min: " defaultValue={uniformConfig.ui?.min} type="number"
                        onChange={e => uniformConfig.ui.min = e.target.valueAsNumber}
                    />
                    <EditUniformModalInputField
                        label="Max: " defaultValue={uniformConfig.ui?.max} type="number"
                        onChange={e => uniformConfig.ui.max = e.target.valueAsNumber}
                    />
                    <EditUniformModalInputField
                        label="Step: " defaultValue={uniformConfig.ui?.step} type="number"
                        onChange={e => uniformConfig.ui.step = e.target.valueAsNumber}
                    />
                    <EditUniformModalInputField
                        label="Options: " defaultValue={uniformConfig.ui?.options}
                        onChange={e => uniformConfig.ui.options = e.target.value.split(',')}
                    />
                    <EditUniformModalInputField
                        label="Uniform Type: " defaultValue={uniformConfig.gl?.type}
                        onChange={e => uniformConfig.gl.type = e.target.value}
                    />
                    <EditUniformModalInputField
                        label="Uniform Name: " defaultValue={uniformConfig.gl?.name}
                        onChange={e => uniformConfig.gl.name = e.target.value}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditUniformModalWindow;