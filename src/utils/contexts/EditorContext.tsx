import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "../Shader";
import {defaultFragmentShaderSource} from "../webglConstants";
import {EditorSources, loadData, saveDataWithKey} from "../browserUtils";

interface IEditorContext {
    editorSources: EditorSources;
    setEditorSources: (sources: EditorSources) => void;
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
    showAddModal: boolean;
    setShowAddModal: (showAddModal: boolean) => void;
    showEditModal: boolean;
    setShowEditModal: (showEditModal: boolean) => void;
    tabNameToEdit: string;
    setTabNameToEdit: (tabNameToEdit: string) => void;
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
    const [tabNameToEdit, setTabNameToEdit] = useState("");

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
            tabNameToEdit, setTabNameToEdit,
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