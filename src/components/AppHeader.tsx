import React from "react";
import "../styles/AppHeader.css"
import ThemeSwitch from "./ThemeSwitch";

const AppHeader: React.FC = () => {
    return (
        <div className="app-header">
            <div className="app-header-left"></div>
            <div className="app-header-center">
                <h2> Shader Web</h2>
            </div>
            <div className="app-header-right">
                <ThemeSwitch/>
            </div>
        </div>
    );
}

export default AppHeader;