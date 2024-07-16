import React from 'react';
import ShaderCanvas from "./components/shader_panel/ShaderCanvas";
import UniformsPanel from "./components/uniforms/UniformsPanel";
import './styles/App.css';
import AppHeader from "./components/app_header/AppHeader";
import {ShaderContextProvider} from "./utils/ShaderContext";

function App() {
    return (
        <ShaderContextProvider>
            <div className="app">
                <AppHeader/>
                <div className="app-body">
                    <UniformsPanel/>
                    <ShaderCanvas/>
                </div>
            </div>
        </ShaderContextProvider>
    );
}

export default App;
