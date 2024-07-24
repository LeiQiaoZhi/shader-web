import React from 'react';
import {FaExpandArrowsAlt} from "react-icons/fa";
import "./PanelHeader.css"
import {LuMinimize2} from "react-icons/lu";
import {saveDataWithKey} from "../../utils/browserUtils";

interface PanelHeaderProps {
    title: string,
    isVisible: boolean,
    setVisible: (isVisible: boolean) => void
    children?: React.ReactNode,
}

const PanelHeader: React.FC<PanelHeaderProps> = (
    {
        title,
        isVisible,
        setVisible,
        children,
    }
) => {
    return (
        <div className="panel-header" data-visible={isVisible}>
            <div onClick={
                e => {
                    setVisible(!isVisible);
                    saveDataWithKey(`${title.toLowerCase()}Visible`, !isVisible);
                }
            }>
                {isVisible ? <LuMinimize2/> : <FaExpandArrowsAlt/>}
            </div>
            <h2>
                {title}
            </h2>
            {isVisible && children}
        </div>
    );
};

export default PanelHeader;