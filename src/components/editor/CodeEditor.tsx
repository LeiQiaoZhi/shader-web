import React, {useState} from 'react';
import AceEditor from "react-ace";
import "./CodeEditor.css"
import "ace-builds/src-noconflict/mode-glsl"
import {useThemeContext} from "../../utils/contexts/ThemeContext";
import EditorThemeSelect from "./EditorThemeSelect";
import EditorFontSizeSelect from "./EditorFontSizeSelect";
import EditorKeybindingSelect from "./EditorKeybindingSelect";
import MultiSelect from "../common/MultiSelect";
import EditorSettingCheckbox from "./EditorSettingCheckbox";

const CodeEditor = () => {
    const {theme} = useThemeContext();
    const [editorTheme, setEditorTheme] = useState("Follow");
    const [editorFontSize, setEditorFontSize] = useState("medium");
    const [keybinding, setKeybinding] = useState("vim");
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [showGutter, setShowGutter] = useState(false);
    const [showFolds, setShowFolds] = useState(false);
    const [wrap, setWrap] = useState(false);
    const [highlightLine, setHighlightLine] = useState(true);

    return (
        <div className="editor">
            <div className="editor-header">
                <h2>Code</h2>
            </div>
            <AceEditor
                mode="glsl"
                theme={
                    editorTheme === "Follow"
                        ? (theme === "light" ? "clouds" : "github_dark")
                        : editorTheme
                }
                width="100%"
                fontSize={editorFontSize}
                editorProps={{$blockScrolling: true}}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: showLineNumbers,
                    showGutter: showGutter,
                    showFoldWidgets: showFolds,
                    showInvisibles: false,
                }}
                wrapEnabled={wrap}
                highlightActiveLine={highlightLine}
                keyboardHandler={keybinding}
            />
            <div className="editor-bottom-control">
                <button>Compile</button>
                <EditorFontSizeSelect fontSize={editorFontSize} setFontSize={setEditorFontSize}/>
                <EditorThemeSelect editorTheme={editorTheme} setEditorTheme={setEditorTheme}/>
                <EditorKeybindingSelect keybinding={keybinding} setKeybinding={setKeybinding}/>
                <MultiSelect title={"More"}>
                    <EditorSettingCheckbox label={"Show fold widgets"} state={showFolds} setter={setShowFolds}/>
                    <EditorSettingCheckbox label={"Show gutter"} state={showGutter} setter={setShowGutter}/>
                    <EditorSettingCheckbox label={"Show line numbers"} state={showLineNumbers}
                                           setter={value => {
                                               setShowLineNumbers(value);
                                               if (value) {
                                                   setShowGutter(true);
                                               }
                                           }}/>
                    <EditorSettingCheckbox label={"Wrap"} state={wrap} setter={setWrap}/>
                    <EditorSettingCheckbox label={"Highlight active line"} state={highlightLine}
                                           setter={setHighlightLine}/>
                </MultiSelect>
            </div>
        </div>
    );
};

export default CodeEditor;