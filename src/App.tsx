import React from 'react';
import ShaderCanvas from "./components/shader_panel/ShaderCanvas";
import UniformsPanel from "./components/uniforms/UniformsPanel";
import './styles/App.css';
import AppHeader from "./components/app_header/AppHeader";
import {ShaderContextProvider} from "./utils/contexts/ShaderContext";

import CodeEditor from "./components/editor/CodeEditor";
import {ThemeContextProvider} from "./utils/contexts/ThemeContext";
import {UniformContextProvider} from "./utils/contexts/UniformsContext";
import {EditorContextProvider} from "./utils/contexts/EditorContext";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <ShaderContextProvider>
                <ThemeContextProvider>
                    <UniformContextProvider>
                        <EditorContextProvider>

                            <div className="app">
                                <AppHeader/>
                                <div className="app-body">
                                    <UniformsPanel/>
                                    <ShaderCanvas/>
                                    <CodeEditor/>

                                </div>
                            </div>

                        </EditorContextProvider>
                    </UniformContextProvider>
                </ThemeContextProvider>
            </ShaderContextProvider>
        </DndProvider>
    );
}

export default App;
