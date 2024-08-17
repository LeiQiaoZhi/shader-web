import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "../Shader";
import {defaultFragmentShaderSource} from "../webglConstants";
import {loadData, saveDataWithKey} from "../browserUtils";

export interface IShaderStatus {
    success: boolean;
    message: string | null;
}

export interface ShaderSources {
    main: string;
    post: string;
    buffers: Record<string, string>[];
}

interface IShaderContext {
    mainShader: Shader | null;
    setMainShader: (shader: Shader) => void;
    status: IShaderStatus | null;
    setStatus: (status: IShaderStatus) => void;
    shaderSources: ShaderSources;
    setShaderSources: (shaderSources: ShaderSources) => void;
}

const ShaderContext = createContext<IShaderContext | undefined>(undefined);

interface ShaderContextProps {
    children: ReactNode;
}

const ShaderContextProvider: React.FC<ShaderContextProps> = ({children}) => {
    const savedData = loadData();
    const [mainShader, setMainShader] = useState<Shader | null>(null);
    const [shaderStatus, setShaderStatus] = useState<IShaderStatus | null>(null);
    const [shaderSources, setShaderSources] = useState<ShaderSources>(savedData.shaderSources);

    const setShaderSourceWithSave = (newSources: ShaderSources) => {
        setShaderSources({...newSources});
        saveDataWithKey("shaderSource", newSources);
    }

    const setShaderStatusForceUpdate = (status: IShaderStatus) => {
        setShaderStatus({...status});
    }

    return (
        <ShaderContext.Provider value={{
            mainShader: mainShader,
            setMainShader: setMainShader,
            status: shaderStatus,
            setStatus: setShaderStatusForceUpdate,
            shaderSources: shaderSources,
            setShaderSources: setShaderSourceWithSave,
        }}>
            {children}
        </ShaderContext.Provider>
    );
};

const useShaderContext = (): IShaderContext => {
    const context = useContext(ShaderContext);
    if (!context) {
        throw new Error("useShaderChangeEvent must be a used within a ShaderContextProvider");
    }
    return context;
};

export {ShaderContextProvider, ShaderContext, useShaderContext};