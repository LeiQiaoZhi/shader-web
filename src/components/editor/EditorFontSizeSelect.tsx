import React from "react";

interface EditorFontSizeSelectProps {
    fontSize: string,
    setFontSize: (fontSize: string) => void,
}

const EditorFontSizeSelect: React.FC<EditorFontSizeSelectProps> = ({setFontSize, fontSize}) => {
    return (
        <div className="editor-settings-select">
            <label>
                Font Size
            </label>
            <select value={fontSize} onChange={e => setFontSize(e.target.value)}>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
            </select>
        </div>
    );
};

export default EditorFontSizeSelect;