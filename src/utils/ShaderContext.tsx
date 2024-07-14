import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "./Shader";

interface IShaderContext {
    shader: Shader | null;
    setShader: (shader: Shader) => void;
    shaderChangeEvent: number;
    triggerShaderEvent: () => void;
}

const ShaderContext = createContext<IShaderContext | undefined>(undefined);

interface ShaderContextProps {
    children: ReactNode;
}

const ShaderContextProvider: React.FC<ShaderContextProps> = ({children}) => {
    const [shaderChangeEvent, setEvent] = useState(0);
    const [shader, setShader] = useState<Shader | null>(null);

    const triggerShaderEvent = () => {
        setEvent(prev => prev + 1); // Increment to trigger the event
    };
   
    return (
        <ShaderContext.Provider value={{shader, setShader, shaderChangeEvent, triggerShaderEvent}}>
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