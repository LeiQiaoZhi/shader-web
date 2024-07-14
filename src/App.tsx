import React from 'react';
import ShaderCanvas from "./components/ShaderCanvas";
import UniformsPanel from "./components/UniformsPanel";
import './styles/App.css';
import AppHeader from "./components/AppHeader";

function App() {
    return (
        <div className="app">
            <AppHeader/>
            <div className="app-body">
                <UniformsPanel/>
                <ShaderCanvas/>
            </div>
        </div>
    );
}

export default App;
