import React from 'react';
import "./IconText.css"
import {IoWarning} from "react-icons/io5";
import {FaCircleInfo} from "react-icons/fa6";

interface IconTextProps {
    icon?: React.ReactNode;
    text: string;
    preset?: "warn" | "info";
}

const PRESET_STYLES = {
    "warn": {
        color: "var(--background-color)",
        background: "var(--contrast-color)"
    },
    "info": {
        color: "var(--text-color)",
        background: "var(--background-color)"
    }
}

const PRESET_ICONS = {
    "warn": <IoWarning/>,
    "info": <FaCircleInfo/>
}

const IconText: React.FC<IconTextProps> = (
    {icon, text, preset}
) => {
    icon = icon ? icon : preset ? PRESET_ICONS[preset] : null;
    return (
        <div className="text-container" style={preset ? PRESET_STYLES[preset] : {}}>
            <div className="icon">
                {icon}
            </div>
            <p>
                {text}
            </p>
        </div>
    );
};

export default IconText;