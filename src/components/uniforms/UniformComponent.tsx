import React, {useId} from "react";
import {ConfigData} from "../../utils/ConfigManager";
import CheckboxUniformComponent from "./CheckboxUniformComponent";
import SliderUniformComponent from "./SliderUniformComponent";
import ColorUniformComponent from "./ColorUniformComponent";
import TooltipLabel from "../common/TooltipLabel";
import FolderUniformComponent from "./FolderUniformComponent";
import DropdownUniformComponent from "./DropdownUniformComponent";
import {FaEdit} from "react-icons/fa";
import "./UniformComponent.css"
import EditUniformModalWindow from "./EditUniformModalWindow";

interface UniformsComponentProps {
    uniformConfig: ConfigData;
}

const UniformComponent: React.FC<UniformsComponentProps> = ({uniformConfig}) => {
    const type = uniformConfig.ui.type;
    const id = useId();
    const [onHover, setHover] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    // console.log("create uniform component of type: " + type);

    const getUniformCoreComponent = () => {
        return (
            type === "checkbox" ? (<CheckboxUniformComponent config={uniformConfig}/>) :
                type === "slider" ? (<SliderUniformComponent config={uniformConfig}/>) :
                    type === "color" ? (<ColorUniformComponent config={uniformConfig}/>) :
                        type === "folder" ? (<FolderUniformComponent config={uniformConfig}/>) :
                            type === "dropdown" ? (<DropdownUniformComponent config={uniformConfig}/>) :
                                (<TooltipLabel label={uniformConfig.name} tooltip={uniformConfig.gl.name}/>)
        );
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
                <EditUniformModalWindow uniformConfig={uniformConfig} setShowModal={setShowModal} setHover={setHover} />
            }
        </div>
    );
}

export default UniformComponent