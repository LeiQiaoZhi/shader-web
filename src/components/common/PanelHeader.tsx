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
    const onMinMaxClick = (e: React.MouseEvent<SVGElement>) => {
        setVisible(!isVisible);
        saveDataWithKey(`${title.toLowerCase()}Visible`, !isVisible);
    }
    return (
        <div className="panel-header" data-visible={isVisible}>
            <div style={{"flex": "1 auto", width: "min-content"}}>
                {isVisible
                    ? <LuMinimize2 onClick={onMinMaxClick}/>
                    : <FaExpandArrowsAlt onClick={onMinMaxClick}/>}
            </div>
            <h2>
                {title}
            </h2>
            {isVisible && children}
        </div>
    );
};

export default PanelHeader;