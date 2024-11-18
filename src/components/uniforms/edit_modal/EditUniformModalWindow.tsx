import React, {useEffect, useState} from 'react';
import IconButton from "../../common/IconButton";
import "./EditUniformModalWindow.css"
import {GrPowerReset} from "react-icons/gr";
import {GiConfirmed} from "react-icons/gi";
import Select from "../../common/Select";
import {
    UniformConfigData,
    UNIFORMS_FIELDS_TO_DEFAULT_VALUES,
    UNIFORMS_UI_TYPE_TO_COMPONENT_MAP, UNIFORMS_UI_TYPE_TO_DEFAULT_VALUE,
    UNIFORMS_UI_TYPES_TO_FIELDS_MAP, UNIFORMS_UI_TYPES_TO_GL_TYPES_MAP
} from "../UniformsSpecification";


interface EditUniformModalInputFieldProps {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    defaultValue?: string | number,
    inputType?: string,
    width?: number
}

const EditUniformModalInputField: React.FC<EditUniformModalInputFieldProps> = (
    {onChange, label, defaultValue, inputType = "text", width}
) => {

    const style: any = {};
    if (width !== undefined) {
        style["width"] = `calc(var(--small-font-size) * ${width})`
    }

    useEffect(() => {
        const event = {
            target: {
                value: defaultValue,
                valueAsNumber: defaultValue
            }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
    }, []);

    return (
        <div>
            <label>{label}</label>
            <input type={inputType} defaultValue={defaultValue} onChange={onChange} list={label} style={style}/>
        </div>
    );
}

interface EditUniformModalWindowProps {
    uniformConfig: UniformConfigData,
    setShowModal: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setHover: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const EditUniformModalWindow: React.FC<EditUniformModalWindowProps> = (
    {uniformConfig, setShowModal, setHover}
) => {

    const [type, setType] = useState<string>(uniformConfig.ui.type);
    const [glType, setGLType] = useState<string | undefined>(uniformConfig.gl?.type);
    const originalConfig = JSON.parse(JSON.stringify(uniformConfig));

    useEffect(() => {
        const suitableGlTypes = UNIFORMS_UI_TYPES_TO_GL_TYPES_MAP[type];
        if (suitableGlTypes.length > 0 && !suitableGlTypes.includes(glType ?? "")) {
            console.log("Setting GL type", suitableGlTypes[0]);
            uniformConfig.gl = uniformConfig.gl || {};
            uniformConfig.gl.type = suitableGlTypes[0];
            setGLType(suitableGlTypes[0]);
        }
    }, [type]);

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
                    <IconButton onClick={e => {
                        console.log("Resetting config to original", originalConfig);
                        uniformConfig = {...originalConfig};
                        console.log("Uniform Config", uniformConfig);
                        setShowModal(false);
                        setHover(false);
                    }}><GrPowerReset/></IconButton>
                </div>
                <div className="modal-body">
                    <EditUniformModalInputField
                        label="Name: " defaultValue={uniformConfig.name} width={15}
                        onChange={e => uniformConfig.name = e.target.value}
                    />
                    <div><label>Type: </label>
                        <Select value={type} values={Object.keys(UNIFORMS_UI_TYPE_TO_COMPONENT_MAP)}
                                onChange={e => {
                                    console.log("Setting type", e.target.value);
                                    uniformConfig.ui.type = e.target.value;
                                    uniformConfig.ui.value = UNIFORMS_UI_TYPE_TO_DEFAULT_VALUE[e.target.value];
                                    setType(e.target.value);
                                }}/>
                    </div>
                    {UNIFORMS_UI_TYPES_TO_FIELDS_MAP[type].includes("min") &&
                        <EditUniformModalInputField
                            label="Min: "
                            defaultValue={uniformConfig.ui?.min ?? UNIFORMS_FIELDS_TO_DEFAULT_VALUES["min"]}
                            inputType="number"
                            onChange={e => uniformConfig.ui.min = e.target.valueAsNumber}
                        />
                    }
                    {UNIFORMS_UI_TYPES_TO_FIELDS_MAP[type].includes("max") &&
                        <EditUniformModalInputField
                            label="Max: "
                            defaultValue={uniformConfig.ui?.max ?? UNIFORMS_FIELDS_TO_DEFAULT_VALUES["max"]}
                            inputType="number"
                            onChange={e => uniformConfig.ui.max = e.target.valueAsNumber}
                        />
                    }
                    {UNIFORMS_UI_TYPES_TO_FIELDS_MAP[type].includes("step") &&
                        <EditUniformModalInputField
                            label="Step: "
                            defaultValue={uniformConfig.ui?.step ?? UNIFORMS_FIELDS_TO_DEFAULT_VALUES["step"]}
                            inputType="number"
                            onChange={e => uniformConfig.ui.step = e.target.valueAsNumber}
                        />
                    }
                    {UNIFORMS_UI_TYPES_TO_FIELDS_MAP[type].includes("options") && (
                        <EditUniformModalInputField
                            label="Options: "
                            defaultValue={uniformConfig.ui?.options ? uniformConfig.ui?.options.join(',') : UNIFORMS_FIELDS_TO_DEFAULT_VALUES["options"]}
                            width={20}
                            onChange={e => {
                                console.log("Options target value", e.target.value);
                                uniformConfig.ui.options = e.target.value.split(',');
                            }}
                        />)}
                    {glType && uniformConfig.ui.type !== "folder" &&
                        <div><label>Uniform Type: </label>
                        <Select value={glType} values={UNIFORMS_UI_TYPES_TO_GL_TYPES_MAP[type]}
                                onChange={e => {
                                    console.log("Setting GL type", e.target.value);
                                    uniformConfig.gl = uniformConfig.gl || {};
                                    uniformConfig.gl.type = e.target.value;
                                    setGLType(e.target.value);
                                }}/>
                    </div>}
                    {uniformConfig.gl && uniformConfig.ui.type !== "folder" &&
                        <EditUniformModalInputField
                            label="Uniform Name: " defaultValue={uniformConfig.gl?.name} width={15}
                            onChange={e => {
                                if (uniformConfig.gl) {
                                    uniformConfig.gl.name = e.target.value
                                }
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default EditUniformModalWindow;