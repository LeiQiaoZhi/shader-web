import React, {useEffect} from "react";
import {useThemeContext} from "../../utils/contexts/ThemeContext";

const ThemeSwitch : React.FC = () => {
    const { theme, setTheme } = useThemeContext();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as 'light' | 'dark';
        const defaultTheme = savedTheme || theme;
        setTheme(defaultTheme);
        document.documentElement.setAttribute('data-theme', defaultTheme);
    }, [setTheme, theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem("theme", newTheme);
    }

    return (
     <button onClick={toggleTheme}>{theme}</button>     
    );
}

export default ThemeSwitch;