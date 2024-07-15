import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "./Shader";

export interface IShaderStatus {
    success: boolean;
    message: string | null;
}

interface IShaderContext {
    shader: Shader | null;
    setShader: (shader: Shader) => void;
    status: IShaderStatus | null;
    setStatus: (status: IShaderStatus) => void;
}

const ShaderContext = createContext<IShaderContext | undefined>(undefined);

interface ShaderContextProps {
    children: ReactNode;
}

const ShaderContextProvider: React.FC<ShaderContextProps> = ({children}) => {
    const [shader, setShader] = useState<Shader | null>(null);
    const [shaderStatus, setShaderStatus] = useState<IShaderStatus | null>(null);

    return (
        <ShaderContext.Provider value={{shader, setShader, status: shaderStatus, setStatus: setShaderStatus}}>
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