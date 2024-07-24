import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "../Shader";
import {defaultFragmentShaderSource} from "../webglConstants";
import {loadData, saveDataWithKey} from "../browserUtils";

export interface IShaderStatus {
    success: boolean;
    message: string | null;
}

interface IShaderContext {
    shader: Shader | null;
    setShader: (shader: Shader) => void;
    status: IShaderStatus | null;
    setStatus: (status: IShaderStatus) => void;
    shaderSource: string;
    setShaderSource: (shaderSource: string) => void;
}

const ShaderContext = createContext<IShaderContext | undefined>(undefined);

interface ShaderContextProps {
    children: ReactNode;
}

const ShaderContextProvider: React.FC<ShaderContextProps> = ({children}) => {
    const savedData = loadData();
    const [shader, setShader] = useState<Shader | null>(null);
    const [shaderStatus, setShaderStatus] = useState<IShaderStatus | null>(null);
    const [shaderSource, setShaderSource] = useState(savedData.shaderSource);

    const setShaderSourceWithSave = (newSource: string) => {
        setShaderSource(newSource+' '); // force update
        saveDataWithKey("shaderSource", newSource);
    }

    const setShaderStatusForceUpdate = (status: IShaderStatus) => {
        setShaderStatus({...status});
    }

    return (
        <ShaderContext.Provider value={{
            shader,
            setShader,
            status: shaderStatus,
            setStatus: setShaderStatusForceUpdate,
            shaderSource,
            setShaderSource: setShaderSourceWithSave,
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