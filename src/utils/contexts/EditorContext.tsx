import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "../Shader";
import {defaultFragmentShaderSource} from "../webglConstants";
import {EditorSources, loadData, saveDataWithKey} from "../browser/browserLocalStorage";

interface IEditorContext {
    editorSources: EditorSources;
    setEditorSources: (sources: EditorSources) => void;
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
    showAddModal: boolean;
    setShowAddModal: (showAddModal: boolean) => void;
    showEditModal: boolean;
    setShowEditModal: (showEditModal: boolean) => void;
    showExportModal: boolean;
    setShowExportModal: (showEditModal: boolean) => void;
    showImportModal: boolean;
    setShowImportModal: (showEditModal: boolean) => void;
    tabNameToEdit: string;
    setTabNameToEdit: (tabNameToEdit: string) => void;
    
    // editor settings
    editorTheme: string;
    setEditorTheme: (theme: string) => void;
    editorFontSize: string;
    setEditorFontSize: (fontSize: string) => void;
    keybinding: string;
    setKeybinding: (keybinding: string) => void;
    showLineNumbers: boolean;
    setShowLineNumbers: (showLineNumbers: boolean) => void;
    showGutter: boolean;
    setShowGutter: (showGutter: boolean) => void;
    showFolds: boolean;
    setShowFolds: (showFolds: boolean) => void;
    wrap: boolean;
    setWrap: (wrap: boolean) => void;
    highlightLine: boolean;
    setHighlightLine: (highlightLine: boolean) => void;
}

const EditorContext = createContext<IEditorContext | undefined>(undefined);

interface EditorContextProps {
    children: ReactNode;
}

const EditorContextProvider: React.FC<EditorContextProps> = ({children}) => {
    const savedData = loadData();
    const [editorSources, setEditorSources] = useState<EditorSources>(savedData.editorSources);
    const [activeTab, setActiveTab] = useState(savedData.activeTab);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [tabNameToEdit, setTabNameToEdit] = useState("");

    // editor settings
    const [editorTheme, setEditorTheme] = useState(savedData.editorTheme);
    const [editorFontSize, setEditorFontSize] = useState(savedData.editorFontSize);
    const [keybinding, setKeybinding] = useState(savedData.editorKeybinding);
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [showGutter, setShowGutter] = useState(false);
    const [showFolds, setShowFolds] = useState(false);
    const [wrap, setWrap] = useState(false);
    const [highlightLine, setHighlightLine] = useState(true);

    const setEditorSourcesWithSave = (newSources: EditorSources) => {
        setEditorSources(newSources);
        saveDataWithKey("editorSources", newSources);
    }
    const setActiveTabWithSave = (newTab: string) => {
        setActiveTab(newTab);
        saveDataWithKey("activeTab", newTab);
    }

    return (
        <EditorContext.Provider value={{
            editorSources, setEditorSources: setEditorSourcesWithSave,
            activeTab, setActiveTab: setActiveTabWithSave,
            showAddModal, setShowAddModal,
            showEditModal, setShowEditModal,
            showExportModal, setShowExportModal,
            showImportModal, setShowImportModal,
            tabNameToEdit, setTabNameToEdit,
            editorTheme, setEditorTheme,
            editorFontSize, setEditorFontSize,
            keybinding, setKeybinding,
            showLineNumbers, setShowLineNumbers,
            showGutter, setShowGutter,
            showFolds, setShowFolds,
            wrap, setWrap,
            highlightLine, setHighlightLine
        }}>
            {children}
        </EditorContext.Provider>
    );
};

const useEditorContext = (): IEditorContext => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditorContext must be a used within a EditorContextProvider");
    }
    return context;
};

export {EditorContextProvider, EditorContext, useEditorContext};