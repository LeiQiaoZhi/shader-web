import React, {createContext, ReactNode, useContext, useState} from 'react';
import ConfigManager from "../ConfigManager";
import {loadData, saveDataWithKey} from "../browser/browserLocalStorage";
import {TopLevelConfigData, UniformConfigData} from "../../components/uniforms/UniformsSpecification";

export enum UniformPanelMode {
    Normal,
    Edit
}

interface IUniformContext {
    mode: UniformPanelMode;
    setMode: (mode: UniformPanelMode) => void;
    configManager: ConfigManager;
    configDataState: TopLevelConfigData;
}

const UniformsContext = createContext<IUniformContext | undefined>(undefined);

interface UniformContextProps {
    children: ReactNode;
}

const UniformContextProvider: React.FC<UniformContextProps> = ({children}) => {
    const savedData = loadData();
    const [mode, setMode] = useState<UniformPanelMode>(UniformPanelMode.Normal);
    const [configDataState, setConfigDataState] = useState<TopLevelConfigData>(savedData.configData);
    const setConfigDataWithSave = (data:TopLevelConfigData) => {
        setConfigDataState(data);
        saveDataWithKey("configData", data);
    }
    const configManager = new ConfigManager(configDataState, setConfigDataWithSave);

    return (
        <UniformsContext.Provider value={{mode, setMode, configManager, configDataState}}>
            {children}
        </UniformsContext.Provider>
    );
};

const useUniformContext = (): IUniformContext => {
    const context = useContext(UniformsContext);
    if (!context) {
        throw new Error("useUniformContext must be a used within a UniformContextProvider");
    }
    return context;
};

export {UniformContextProvider, UniformsContext, useUniformContext};