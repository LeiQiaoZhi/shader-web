import React, {useEffect} from "react";
import {useThemeContext} from "../../utils/contexts/ThemeContext";
import IconButton from "../common/IconButton";
import {IoMoon, IoSunny} from "react-icons/io5";
import {IoMdSunny} from "react-icons/io";

const ThemeSwitch: React.FC = () => {
    const {theme, setTheme} = useThemeContext();

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
        <IconButton onClick={toggleTheme} size="small" padding="small">
            {
                theme === 'light' ? (<IoMdSunny/>) : (<IoMoon/>)
            }
        </IconButton>
    );
}

export default ThemeSwitch;