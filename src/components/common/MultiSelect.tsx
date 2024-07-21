import React from 'react';
import "./MultiSelect.css"

interface MultiSelectProps {
    title: string,
    children: React.ReactNode;
}

const MultiSelect: React.FC<MultiSelectProps> = ({title, children}) => {
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
            <button onClick={e => setIsOpen(!isOpen)}>{title}</button>
        </div>
    );
};

export default MultiSelect;