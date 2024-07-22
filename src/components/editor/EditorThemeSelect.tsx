import React, {useEffect, useState} from "react";
import "ace-builds/src-noconflict/theme-github_dark"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-clouds"
import "ace-builds/src-noconflict/theme-nord_dark"
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/theme-ambiance"
import "ace-builds/src-noconflict/theme-dawn"
import "ace-builds/src-noconflict/theme-chaos"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/theme-chrome"
import "ace-builds/src-noconflict/theme-solarized_light"
import {useThemeContext} from "../../utils/contexts/ThemeContext";
import {saveDataWithKey} from "../../utils/browserUtils";

interface EditorThemeSelectProps {
    editorTheme: string,
    setEditorTheme: (editorTheme: string) => void,
}

const EditorThemeSelect: React.FC<EditorThemeSelectProps> = ({setEditorTheme, editorTheme}) => {
    const {theme} = useThemeContext();
    const defaultDarkTheme = "dracula";
    const defaultLightTheme = "chrome";
    const [selectedTheme, setSelectedTheme] = useState(editorTheme);

    useEffect(() => {
        setEditorTheme(getEditorTheme(selectedTheme));
    }, [theme]);

    const getEditorTheme = (selected: string) => {
        if (selected === "") {
            return (theme === 'dark') ? defaultDarkTheme : defaultLightTheme
        }
        return selected;
    }

    return (
        <div className="editor-settings-select">
            <label>
                Theme
            </label>
            <select value={selectedTheme}
                    onChange={
                        (e) => {
                            setSelectedTheme(e.target.value);
                            setEditorTheme(getEditorTheme(e.target.value));
                            saveDataWithKey("editorTheme", e.target.value);
                            console.log(editorTheme);
                        }
                    }>
                <option value={""}>Follow website</option>
                <option value="github_dark">Github Dark</option>
                <option value="chrome">Chrome</option>
                <option value="dracula">Dracula</option>
                <option value="clouds">Clouds</option>
                <option value="nord_dark">Nord Dark</option>
                <option value="dawn">Dawn</option>
                <option value="solarized_light">Solarized Light</option>
                <option value="monokai">Monokai</option>
                <option value="ambiance">Ambiance</option>
                <option value="chaos">Chaos</option>
                <option value="github">Github</option>
            </select>
        </div>
    );
};

export default EditorThemeSelect;