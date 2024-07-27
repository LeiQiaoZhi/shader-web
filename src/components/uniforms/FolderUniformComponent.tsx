import React, {useEffect, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "./FolderUniformComponent.css"
import {ConfigData} from "../../utils/ConfigManager";
import UniformComponent from "./UniformComponent";

const FolderUniformComponent: React.FC<IUniformComponentProps> = ({config}) => {
    const [value, setValue] = useState(false);

    // initialize
    useEffect(() => {
        setValue(config.ui.value);
    }, [config]);


    return (
        <div className="folder-component-container">
            <div className="folder-component-header"
                 onClick={e => setValue(!value)}
                 data-expanded={value}
            >
                <label>{config.name}</label>
            </div>
            <div className="folder-children-container"
                 data-expanded={value}
            >
                {config.children &&
                    config.children.map((uniformConfig: ConfigData, i: number) => {
                        return (
                            <div key={i}>
                                <UniformComponent uniformConfig={uniformConfig}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default FolderUniformComponent;