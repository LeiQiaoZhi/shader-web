import React, {useId} from "react";
import TooltipLabel from "../common/TooltipLabel";
import {FaEdit} from "react-icons/fa";
import "./UniformComponent.css"
import EditUniformModalWindow from "./edito_modal/EditUniformModalWindow";
import {UniformConfigData, UNIFORMS_UI_TYPE_TO_COMPONENT_MAP} from "./UniformsSpecification";
import {UniformPanelMode, useUniformContext} from "../../utils/contexts/UniformsContext";
import {MdDeleteOutline} from "react-icons/md";


interface UniformsComponentProps {
    uniformConfig: UniformConfigData;
}

const UniformComponent: React.FC<UniformsComponentProps> = ({uniformConfig}) => {
    const type: string = uniformConfig.ui.type;
    const id = useId();
    const [onHover, setHover] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const {mode, setMode} = useUniformContext();

    const getUniformCoreComponent = () => {
        if (type in UNIFORMS_UI_TYPE_TO_COMPONENT_MAP) {
            const Component = UNIFORMS_UI_TYPE_TO_COMPONENT_MAP[type];
            return <Component config={uniformConfig}/>;
        }
        return <TooltipLabel label={uniformConfig.name ?? "Undefined Name"}
                             tooltip={uniformConfig.gl?.name ?? "Undefined Name"}/>;
    }

    return (
        <div className="uniform-component-outer-container">
            {
                (mode === UniformPanelMode.Edit) &&
                <div className="uniform-component-edit-add-button">+</div>
            }
            <div id={id} className={`uniform-component ${type}`}
                 onMouseEnter={e => setHover(true)}
                 onMouseLeave={e => setHover(false)}
            >
                {
                    (onHover || mode === UniformPanelMode.Edit) &&
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
                    (onHover || mode === UniformPanelMode.Edit) &&
                    <div className="uniform-delete-button"
                         onClick={e => {
                             setShowModal(true);
                         }}
                    >
                        <MdDeleteOutline/>
                    </div>
                }
            </div>
            {
                (mode === UniformPanelMode.Edit) &&
                <div className="uniform-component-edit-add-button">+</div>
            }
        </div>
    );
}

export default UniformComponent