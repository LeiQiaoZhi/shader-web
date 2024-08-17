import React, {useEffect, useState} from 'react';
import AceEditor from "react-ace";
import "./CodeEditor.css"
import "ace-builds/src-noconflict/mode-glsl"
import EditorThemeSelect from "./EditorThemeSelect";
import EditorFontSizeSelect from "./EditorFontSizeSelect";
import EditorKeybindingSelect from "./EditorKeybindingSelect";
import MultiSelect from "../common/MultiSelect";
import EditorSettingCheckbox from "./EditorSettingCheckbox";
import {useShaderContext} from "../../utils/contexts/ShaderContext";
import {FaEdit, FaFileDownload, FaPlay} from "react-icons/fa";
import PanelHeader from "../common/PanelHeader";
import IconButton from "../common/IconButton";
import {exportStringForDownload, loadData} from "../../utils/browserUtils";
import {GrAddCircle} from "react-icons/gr";
import EditorAddTabModal from "./EditorAddTabModal";
import EditorEditTabModal from "./EditorEditTabModal";
import {useEditorContext} from "../../utils/contexts/EditorContext";
import {preprocessShaderSource} from "../../utils/webglUtils";
import {ShaderFileType} from "../../utils/webglConstants";
import {FaBuffer, FaFileCode} from "react-icons/fa6";
import {IoColorFilter} from "react-icons/io5";


const CodeEditor = () => {
    const savedData = loadData();
    const {shaderSources, setShaderSources} = useShaderContext();
    const {
        editorSources, setEditorSources,
        activeTab, setActiveTab,
        showAddModal, setShowAddModal,
        showEditModal, setShowEditModal,
        tabNameToEdit, setTabNameToEdit,
    } = useEditorContext();

    // editor settings
    const [editorTheme, setEditorTheme] = useState(savedData.editorTheme);
    const [editorFontSize, setEditorFontSize] = useState(savedData.editorFontSize);
    const [keybinding, setKeybinding] = useState(savedData.editorKeybinding);
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [showGutter, setShowGutter] = useState(false);
    const [showFolds, setShowFolds] = useState(false);
    const [wrap, setWrap] = useState(false);
    const [highlightLine, setHighlightLine] = useState(true);

    const [isVisible, setIsVisible] = useState(savedData.codeVisible);

    useEffect(() => {
        console.log("Shader source changed");
        // TODO: remove upload shader button from shader panel
    }, [shaderSources]);

    const handleExportCode = (e: React.MouseEvent<HTMLDivElement>) => {
        // TODO: more options, download in a zip, in a single file...
        exportStringForDownload(editorSources[activeTab].source, activeTab + ".frag");
    }

    return (
        <div className="editor" data-visible={isVisible}>
            <PanelHeader title={"Code"} isVisible={isVisible} setVisible={setIsVisible}>
                <div onClick={handleExportCode}>
                    <FaFileDownload/>
                </div>
            </PanelHeader>

            <div className="editor-tabs-outer-container">
                <GrAddCircle onClick={e => setShowAddModal(true)}/>
                <div className="editor-tabs-container">
                    {
                        Object.keys(editorSources).map((tabName, i: number) =>
                            <div key={tabName} className={`editor-tab ${tabName === activeTab ? "active" : ""}`}
                                 onClick={() => setActiveTab(tabName)}
                            >

                                {
                                    (editorSources[tabName].type === ShaderFileType.Buffer && tabName === "main")
                                        ? <FaBuffer/>
                                        : editorSources[tabName].type === ShaderFileType.Buffer && tabName === "post"
                                            ? <IoColorFilter/>
                                            : <FaFileCode/>
                                }
                                <label>{tabName}</label>
                                {tabName !== "main" && (
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

            <AceEditor
                value={editorSources[activeTab].source}
                onChange={newSource => setEditorSources({
                    ...editorSources,
                    [activeTab]: {source: newSource, type: editorSources[activeTab].type}
                })}
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
            />

            <div className="editor-bottom-control" data-visible={isVisible}>
                <IconButton
                    size="large" padding="normal"
                    onClick={e =>
                        setShaderSources(preprocessShaderSource(editorSources))}>
                    <FaPlay/>
                </IconButton>
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