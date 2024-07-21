import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Shader} from "../Shader";

type ThemeStringType = "light" | "dark";

interface IThemeContext {
    theme: ThemeStringType;
    setTheme: (theme: ThemeStringType) => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

interface ShaderContextProps {
    children: ReactNode;
}

const ThemeContextProvider: React.FC<ShaderContextProps> = ({children}) => {
    const [theme, setTheme] = useState<ThemeStringType>("light");

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
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