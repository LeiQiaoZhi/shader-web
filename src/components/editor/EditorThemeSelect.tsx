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
import Select from "../common/Select";

const EDITOR_THEMES = [
    ["", "Follow website"],
    ["github_dark", "Github Dark"],
    ["chrome", "Chrome"],
    ["dracula", "Dracula"],
    ["clouds", "Clouds"],
    ["nord_dark", "Nord Dark"],
    ["dawn", "Dawn"],
    ["solarized_light", "Solarized Light"],
    ["monokai", "Monokai"],
    ["ambiance", "Ambiance"],
    ["chaos", "Chaos"],
    ["github", "Github"],
];

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
            <Select value={selectedTheme}
                    values={EDITOR_THEMES.map((pair, _) => pair[0])}
                    optionNames={EDITOR_THEMES.map((pair, _) => pair[1])}
                    onChange={
                        (e) => {
                            setSelectedTheme(e.target.value);
                            setEditorTheme(getEditorTheme(e.target.value));
                            saveDataWithKey("editorTheme", e.target.value);
                            console.log(editorTheme);
                        }
                    }/>
        </div>
    );
};

export default EditorThemeSelect;