import React from 'react';
import ShaderCanvas from "./components/ShaderCanvas";
import UniformsPanel from "./components/UniformsPanel";
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <UniformsPanel/>
            <ShaderCanvas/>
        </div>
    );
}

export default App;
