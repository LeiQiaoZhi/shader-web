import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "../Shader";
import {loadData, saveDataWithKey} from "../browser/browserLocalStorage";

export type ThemeStringType = "light" | "dark";

interface IThemeContext {
    theme: ThemeStringType;
    setTheme: (theme: ThemeStringType) => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

interface ShaderContextProps {
    children: ReactNode;
}

const ThemeContextProvider: React.FC<ShaderContextProps> = ({children}) => {
    const savedData = loadData();
    const [theme, setTheme] = useState<ThemeStringType>(savedData.theme);

    const setThemeWithSave = (newTheme: ThemeStringType) => {
        setTheme(newTheme);
        saveDataWithKey("theme", newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme: setThemeWithSave}}>
            {children}
        </ThemeContext.Provider>
    );
};

const useThemeContext = (): IThemeContext => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useShaderChangeEvent must be a used within a ShaderContextProvider");
    }
    return context;
};

export {ThemeContextProvider, ThemeContext, useThemeContext};