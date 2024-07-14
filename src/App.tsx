import React, {useRef} from 'react';
import ShaderCanvas from "./components/ShaderCanvas";
import UniformsPanel from "./components/UniformsPanel";
import './styles/App.css';
import AppHeader from "./components/AppHeader";
import {Shader} from "./utils/Shader";

function App() {
    const shaderRef = useRef<Shader | null>(null);
    return (
        <div className="app">
            <AppHeader/>
            <div className="app-body">
                <UniformsPanel shaderRef={shaderRef}/>
                <ShaderCanvas shaderRef={shaderRef}/>
            </div>
        </div>
    );
}

export default App;
