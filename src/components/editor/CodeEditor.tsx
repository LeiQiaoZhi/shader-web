import React, {useEffect, useState} from 'react';
import AceEditor from "react-ace";
import "./CodeEditor.css"
import TextMode from 'ace-builds/src-noconflict/mode-glsl';
import "ace-builds/src-noconflict/ext-searchbox"
import EditorThemeSelect from "./settings/EditorThemeSelect";
import EditorFontSizeSelect from "./settings/EditorFontSizeSelect";
import EditorKeybindingSelect from "./settings/EditorKeybindingSelect";
import MultiSelect from "../common/MultiSelect";
import EditorSettingCheckbox from "./settings/EditorSettingCheckbox";
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import {FaEdit, FaFileDownload, FaFileImport, FaPlay} from "react-icons/fa";
import PanelHeader from "../common/PanelHeader";
import IconButton from "../common/IconButton";
import {loadData} from "../../utils/browser/browserLocalStorage";
import {GrAddCircle} from "react-icons/gr";
import EditorAddTabModal from "./modal/EditorAddTabModal";
import EditorEditTabModal from "./modal/EditorEditTabModal";
import {useEditorContext} from "../../utils/contexts/EditorContext";
import {bufferPrefix, ShaderFileType, shaderPrefixMap} from "../../utils/webglConstants";
import {FaBuffer, FaFileCode} from "react-icons/fa6";
import {IoColorFilter} from "react-icons/io5";
import {useKeyboardShortcut} from "../../utils/browser/keyboard";
import {preprocessShaderSource} from "../../utils/shaderPreprocessor";
import {Tooltip} from "react-tooltip";
import {EditorShaderInputs} from "./EditorShaderInputs";
import EditorExportModal from "./modal/EditorExportModal";
import EditorImportModal from "./modal/EditorImportModal";
import {CustomHighlightRules} from "../../CustomGLSLMode";

const CodeEditor = () => {
    const savedData = loadData();
    const {shaderSources, setShaderSources} = useShaderContext();
    const {
        editorSources, setEditorSources,
        activeTab, setActiveTab,
        showAddModal, setShowAddModal,
        showEditModal, setShowEditModal,
        showExportModal, setShowExportModal,
        showImportModal, setShowImportModal,
        setTabNameToEdit,
    } = useEditorContext();

    // editor settings
    const {
        editorTheme, setEditorTheme,
        editorFontSize, setEditorFontSize,
    } = useEditorContext();
    const [keybinding, setKeybinding] = useState(savedData.editorKeybinding);
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [showGutter, setShowGutter] = useState(false);
    const [showFolds, setShowFolds] = useState(false);
    const [wrap, setWrap] = useState(false);
    const [highlightLine, setHighlightLine] = useState(true);

    const [isVisible, setIsVisible] = useState(savedData.codeVisible);

    useKeyboardShortcut('Enter', {ctrl: true}, () => {
        compileShader("event not needed");
    });

    useEffect(() => {
        console.log("Shader source changed");
    }, [shaderSources]);

    const compileShader = (e: any) => {
        console.log("(settings shaders sources) Editor sources", editorSources);
        setShaderSources(preprocessShaderSource(editorSources))
    }

    return (
        <div className="editor" data-visible={isVisible}>
            <PanelHeader title={"Code"} isVisible={isVisible} setVisible={setIsVisible}>
                <IconButton
                    onClick={e => setShowImportModal(true)}
                    tooltip="Import Code" padding='0' size='normal'
                    bg="none" border='0' color="var(--secondary-text-color)"
                >
                    <FaFileImport/>
                </IconButton>
                <IconButton
                    onClick={e => setShowExportModal(true)}
                    tooltip="Export Code" padding='0' size='normal'
                    bg="none" border='0' color="var(--secondary-text-color)"
                >
                    <FaFileDownload/>
                </IconButton>
            </PanelHeader>

            <div className="editor-tabs-outer-container">
                <GrAddCircle onClick={e => setShowAddModal(true)}
                             data-tooltip-id={"editor-add-tooltip"} data-tooltip-content={"Add Tab"}/>
                <Tooltip id={"editor-add-tooltip"} content={"Add File"} place={"left"}/>
                <div className="editor-tabs-container">
                    {
                        Object.keys(editorSources).map((tabName, i: number) =>
                            <div key={tabName} className={`editor-tab ${tabName === activeTab ? "active" : ""}`}
                                 onClick={() => setActiveTab(tabName)}
                            >

                                {
                                    editorSources[tabName].type === ShaderFileType.Buffer && tabName === "post"
                                        ? <IoColorFilter/>
                                        : (editorSources[tabName].type === ShaderFileType.Buffer || tabName === "main")
                                            ? <FaBuffer/>
                                            : <FaFileCode/>
                                }
                                <label>{tabName}</label>
                                {(tabName !== "main" && tabName !== "post") && (
                                    <FaEdit className="editor-tab-edit-button"
                                            onClick={e => {
                                                setShowEditModal(true);
                                                setTabNameToEdit(tabName);
                                            }}/>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>

            {showAddModal && <EditorAddTabModal/>}
            {showEditModal && <EditorEditTabModal/>}
            {showExportModal && <EditorExportModal/>}
            {showImportModal && <EditorImportModal/>}

            {
                editorSources[activeTab].type === ShaderFileType.Buffer &&
                <EditorShaderInputs
                    source={shaderPrefixMap[activeTab] ?? bufferPrefix}
                    isVisible={isVisible}
                    showLineNumbers={showLineNumbers} showGutter={showGutter} showFolds={showFolds} wrap={wrap}
                />
            }

            <AceEditor
                value={editorSources[activeTab].source}
                onChange={newSource => {
                    let sources = editorSources;
                    sources[activeTab].source = newSource;
                    setEditorSources({...sources});
                }}
                mode="glsl"
                theme={editorTheme}
                focus={true}
                width={isVisible ? "100%" : "0"}
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
                onLoad={
                    editor => {
                        const customMode = new TextMode.Mode();
                        customMode.HighlightRules = CustomHighlightRules;
                        editor.getSession().setMode(customMode);
                    }
                }
            />

            <div className="editor-bottom-control" data-visible={isVisible}>
                <IconButton tooltip="Compile (Ctrl + Enter)"
                            size="large" padding="normal"
                            onClick={compileShader}>
                    <FaPlay/>
                </IconButton>
                <EditorFontSizeSelect fontSize={editorFontSize} setFontSize={setEditorFontSize}/>
                <EditorThemeSelect editorTheme={editorTheme} setEditorTheme={setEditorTheme}/>
                <EditorKeybindingSelect keybinding={keybinding} setKeybinding={setKeybinding}/>
                <MultiSelect tooltip={"More Settings"}>
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
    )
        ;
};

export default CodeEditor;