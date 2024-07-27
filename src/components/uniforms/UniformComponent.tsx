import React, {useId} from "react";
import {ConfigData} from "../../utils/ConfigManager";
import TooltipLabel from "../common/TooltipLabel";
import {FaEdit} from "react-icons/fa";
import "./UniformComponent.css"
import EditUniformModalWindow from "./edito_modal/EditUniformModalWindow";
import {UNIFORMS_UI_TYPE_TO_COMPONENT_MAP} from "./UniformsSpecification";


interface UniformsComponentProps {
    uniformConfig: ConfigData;
}

const UniformComponent: React.FC<UniformsComponentProps> = ({uniformConfig}) => {
    const type: string = uniformConfig.ui.type;
    const id = useId();
    const [onHover, setHover] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    // console.log("create uniform component of type: " + type);

    const getUniformCoreComponent = () => {
        if (type in UNIFORMS_UI_TYPE_TO_COMPONENT_MAP) {
            const Component = UNIFORMS_UI_TYPE_TO_COMPONENT_MAP[type];
            return <Component config={uniformConfig}/>;
        }
        return <TooltipLabel label={uniformConfig.name} tooltip={uniformConfig.gl?.name}/>;
    }

    return (
        <div id={id} className={`uniform-component ${type}`}
             onMouseEnter={e => setHover(true)}
             onMouseLeave={e => setHover(false)}
        >
            {
                onHover &&
                <div className="uniform-edit-button"
                     onClick={e => {
                         setShowModal(true);
                     }}
                >
                    <FaEdit/>
                </div>
            }
            {
                getUniformCoreComponent()
            }
            {
                showModal &&
                <EditUniformModalWindow uniformConfig={uniformConfig} setShowModal={setShowModal} setHover={setHover}/>
            }
        </div>
    );
}

export default UniformComponent