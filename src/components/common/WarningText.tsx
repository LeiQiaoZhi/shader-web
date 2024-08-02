import React from 'react';
import "./WarningText.css"
import {IoWarning} from "react-icons/io5";

interface WarningTextProps {
    warningText: string;
}

const WarningText: React.FC<WarningTextProps> = (
    {warningText}
) => {
    return (
        <div className="warning-text-container">
            <IoWarning/>
            {warningText}
        </div>
    );
};

export default WarningText;