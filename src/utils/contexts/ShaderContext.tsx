import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "../Shader";
import {loadData, saveDataWithKey} from "../browser/browserLocalStorage";

export interface IShaderStatuses {
    main?: IShaderStatus | undefined;
    post?: IShaderStatus | undefined;

    [key: string]: IShaderStatus | undefined;
}

export interface IShaderStatus {
    success: boolean;
    messages: IShaderMessage[] | null;
}

export interface IShaderMessage {
    message: string;
    neighbourLines: string;
    startLineNumber?: number;
    errorLineNumber?: number;
}


export interface BufferSource {
    source: string,
    width?: number,
    height?: number
}

export interface ShaderSources {
    main: string;
    post: string;
    buffers: { [name: string]: BufferSource; };
}

interface IShaderContext {
    mainShader: Shader | null;
    setMainShader: (shader: Shader) => void;
    statuses: IShaderStatuses | null;
    setStatus: (key: string, status: IShaderStatus | undefined) => void;
    shaderSources: ShaderSources;
    setShaderSources: (shaderSources: ShaderSources) => void;
    allShaders: Shader[];
    setAllShaders: (shaders: Shader[]) => void;
}

const ShaderContext = createContext<IShaderContext | undefined>(undefined);

interface ShaderContextProps {
    children: ReactNode;
}

const ShaderContextProvider: React.FC<ShaderContextProps> = ({children}) => {
    const savedData = loadData();
    const [mainShader, setMainShader] = useState<Shader | null>(null);
    const [allShaders, setAllShaders] = useState<Shader[]>([]);
    const [shaderStatuses, setShaderStatuses] = useState<IShaderStatuses>({});
    const [shaderSources, setShaderSources] = useState<ShaderSources>(savedData.shaderSources);

    const setShaderSourceWithSave = (newSources: ShaderSources) => {
        setShaderSources({...newSources});
        saveDataWithKey("shaderSources", newSources);
    }

    const setShaderStatusForceUpdate = (key: string, status: IShaderStatus | undefined) => {
        shaderStatuses[key] = status;
        setShaderStatuses({...shaderStatuses});
    }

    return (
        <ShaderContext.Provider value={{
            mainShader: mainShader,
            setMainShader: setMainShader,
            statuses: shaderStatuses,
            setStatus: setShaderStatusForceUpdate,
            shaderSources: shaderSources,
            setShaderSources: setShaderSourceWithSave,
            allShaders: allShaders,
            setAllShaders: setAllShaders
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