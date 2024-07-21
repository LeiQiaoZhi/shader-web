import React from "react";
import "ace-builds/src-noconflict/keybinding-vim"
import "ace-builds/src-noconflict/keybinding-emacs"
import "ace-builds/src-noconflict/keybinding-vscode"
import "ace-builds/src-noconflict/keybinding-sublime"

interface EditorKeybindingSelectProps {
    keybinding: string,
    setKeybinding: (keybinding: string) => void,
}

const EditorKeybindingSelect: React.FC<EditorKeybindingSelectProps> = ({setKeybinding, keybinding}) => {
    return (
        <div className="editor-settings-select">
            <label>
                Keybinding
            </label>
            <select value={keybinding} onChange={e => setKeybinding(e.target.value)}>
                <option value="vscode">VS Code</option>
                <option value="vim">Vim</option>
                <option value="sublime">Sublime</option>
                <option value="emacs">Emacs</option>
            </select>
        </div>
    );
};

export default EditorKeybindingSelect;