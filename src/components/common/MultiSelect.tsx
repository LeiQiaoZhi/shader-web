import React from 'react';
import "./MultiSelect.css"
import IconButton from "./IconButton";
import {IoIosSettings} from "react-icons/io";

interface MultiSelectProps {
    tooltip: string,
    children: React.ReactNode;
}

const MultiSelect: React.FC<MultiSelectProps> = ({tooltip, children}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className={`multiselect ${isOpen ? "" : "muted"}`}>
            {isOpen && (
                <div>
                    <div className="multiselect-click-outside" onClick={e => setIsOpen(false)}></div>
                    <div className="multiselect-children-container">
                        <div className="multiselect-children">
                            {children}
                        </div>
                    </div>
                </div>
            )}
            <IconButton 
                onClick={e => setIsOpen(!isOpen)}
                size="large" padding="normal"
                tooltip={tooltip}>
                <IoIosSettings/>
            </IconButton>
        </div>
    );
};

export default MultiSelect;