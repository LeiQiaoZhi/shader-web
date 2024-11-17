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
import "ace-builds/src-noconflict/theme-dreamweaver"
import "ace-builds/src-noconflict/theme-gruvbox"
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard"
import "ace-builds/src-noconflict/theme-gruvbox_light_hard"
import "ace-builds/src-noconflict/theme-one_dark"
import "ace-builds/src-noconflict/theme-xcode"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/theme-tomorrow_night"
import "ace-builds/src-noconflict/theme-iplastic"
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-clouds_midnight"
import "ace-builds/src-noconflict/theme-gob"
import "ace-builds/src-noconflict/theme-crimson_editor"
import "ace-builds/src-noconflict/theme-idle_fingers"
import "ace-builds/src-noconflict/theme-merbivore"
import "ace-builds/src-noconflict/theme-terminal"
import "ace-builds/src-noconflict/theme-vibrant_ink"

import {useThemeContext} from "../../../utils/contexts/ThemeContext";
import {saveDataWithKey} from "../../../utils/browser/browserLocalStorage";
import Select from "../../common/Select";

const DARK_THEMES = [
    ["github_dark", "Github Dark"],
    ["dracula", "Dracula"],
    ["nord_dark", "Nord Dark"],
    ["gruvbox", "Gruvbox"],
    ["gruvbox_dark_hard", "Gruvbox Dark Hard"],
    ["one_dark", "One Dark"],
    ["twilight", "Twilight"],
    ["tomorrow_night", "Tomorrow Night"],
    ["solarized_dark", "Solarized Dark"],
    ["clouds_midnight", "Clouds Midnight"],
    ["gob", "Gob"],
    ["idle_fingers", "Idle Fingers"],
    ["merbivore", "Merbivore"],
    ["terminal", "Terminal"],
    ["vibrant_ink", "Vibrant Ink"],
];

const LIGHT_THEMES = [
    ["solarized_light", "Solarized Light"],
    ["iplastic", "IPlastic"],
    ["xcode", "Xcode"],
    ["chrome", "Chrome"],
    ["clouds", "Clouds"],
    ["crimson_editor", "Crimson Editor"],
    ["dawn", "Dawn"],
    ["monokai", "Monokai"],
    ["ambiance", "Ambiance"],
    ["chaos", "Chaos"],
    ["github", "Github"],
    ["dreamweaver", "Dreamweaver"],
    ["gruvbox_light_hard", "Gruvbox Light Hard"],
];

const EDITOR_THEMES = DARK_THEMES.concat(LIGHT_THEMES);
EDITOR_THEMES.unshift(
    ["", "Follow website"],
);

interface EditorThemeSelectProps {
    editorTheme: string,
    setEditorTheme: (editorTheme: string) => void,
}

const EditorThemeSelect: React.FC<EditorThemeSelectProps> = ({setEditorTheme, editorTheme}) => {
    const {theme} = useThemeContext();
    const defaultDarkTheme = "dracula";
    const defaultLightTheme = "solarized_light";
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
                    groups={{
                        "Dark": 1,
                        "Light": DARK_THEMES.length + 1,
                    }}
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