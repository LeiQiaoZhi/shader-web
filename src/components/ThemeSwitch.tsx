import React, {useEffect} from "react";

const ThemeSwitch : React.FC = () => {
    const [theme, setTheme] = React.useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as 'light' | 'dark';
        const defaultTheme = savedTheme || 'light';
        setTheme(defaultTheme);
        document.documentElement.setAttribute('data-theme', theme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }

    return (
     <button onClick={toggleTheme}>{theme}</button>     
    );
}

export default ThemeSwitch;