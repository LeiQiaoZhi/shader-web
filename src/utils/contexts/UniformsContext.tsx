import React, {createContext, ReactNode, useContext, useState} from 'react';

export enum UniformPanelMode {
    Normal,
    Edit
}

interface IUniformContext {
    mode: UniformPanelMode;
    setMode: (mode: UniformPanelMode) => void;
}

const UniformsContext = createContext<IUniformContext | undefined>(undefined);

interface UniformContextProps {
    children: ReactNode;
}

const UniformContextProvider: React.FC<UniformContextProps> = ({children}) => {
    const [mode, setMode] = useState<UniformPanelMode>(UniformPanelMode.Normal);

    return (
        <UniformsContext.Provider value={{mode, setMode}}>
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