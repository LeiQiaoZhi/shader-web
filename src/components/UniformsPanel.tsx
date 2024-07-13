import React, {useRef} from "react";
import "./UniformsPanel.css"
import ConfigManager from "../utils/ConfigManager";
import CheckboxUniformComponent from "./CheckboxUniformComponent";

const UniformsPanel: React.FC = () => {

    const configManagerRef = useRef<ConfigManager | null>(null);

    const onConfigFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // TODO: create config manager from file
        }
    }

    return (
        <div className="uniforms-panel-container">
            <div className="uniforms-panel">
                <strong>Uniforms</strong> 
                <input type="file" accept=".toml" onChange={onConfigFileChange}/>
                <div className="uniforms-components-container">
                    <CheckboxUniformComponent/>
                    <CheckboxUniformComponent/>
                    <input type="color"/>
                    <input type="range" min="1" max="10" step="1" defaultValue="1" onChange={onConfigFileChange}/>
                    <input type="number"/>
                    <input type="button"/>
                </div>
            </div>
        </div>
    )
}

export default UniformsPanel;