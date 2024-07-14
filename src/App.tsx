import React from 'react';
import ShaderCanvas from "./components/ShaderCanvas";
import UniformsPanel from "./components/UniformsPanel";
import './styles/App.css';
import AppHeader from "./components/AppHeader";
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
