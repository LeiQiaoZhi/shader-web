import React, {useId} from "react";
import TooltipLabel from "../common/TooltipLabel";
import {FaEdit} from "react-icons/fa";
import "./UniformComponent.css"
import EditUniformModalWindow from "./edit_modal/EditUniformModalWindow";
import {UniformConfigData, UNIFORMS_UI_TYPE_TO_COMPONENT_MAP} from "./UniformsSpecification";
import {UniformPanelMode, useUniformContext} from "../../utils/contexts/UniformsContext";
import {MdDeleteOutline} from "react-icons/md";


interface UniformsComponentProps {
    index: number[];
    uniformConfig: UniformConfigData;
}

const UniformComponent: React.FC<UniformsComponentProps> = (
    {index, uniformConfig}
) => {
    const type: string = uniformConfig.ui.type;
    const id = useId();
    const [onHover, setHover] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const {mode, configManager, configDataState} = useUniformContext();

    const getUniformCoreComponent = () => {
        if (type in UNIFORMS_UI_TYPE_TO_COMPONENT_MAP) {
            const Component = UNIFORMS_UI_TYPE_TO_COMPONENT_MAP[type];
            return <Component index={index} config={uniformConfig}/>;
        }
        return <TooltipLabel label={uniformConfig.name ?? "Undefined Name"}
                             tooltip={uniformConfig.gl?.name ?? "Undefined Name"}/>;
    }

    return (
        <div className="uniform-component-outer-container" key={index[0]}>
            <div id={id} className={`uniform-component ${type}`}
                 onMouseEnter={e => setHover(true)}
                 onMouseLeave={e => setHover(false)}
            >
                {
                    (mode === UniformPanelMode.Edit) &&
                    <div className="uniform-edit-button"
                         onClick={e => {
                             setShowModal(true);
                         }}
                    >
                        <FaEdit/>
                    </div>
                }
                {getUniformCoreComponent()}
                {
                    showModal &&
                    <EditUniformModalWindow uniformConfig={uniformConfig} setShowModal={setShowModal}
                                            setHover={setHover}/>
                }
                {
                    (mode === UniformPanelMode.Edit) &&
                    <div className="uniform-delete-button"
                         onClick={e => {
                             configManager.deleteAtPosition(index);
                         }}
                    >
                        <MdDeleteOutline/>
                    </div>
                }
            </div>
        </div>
    );
}

export default UniformComponent