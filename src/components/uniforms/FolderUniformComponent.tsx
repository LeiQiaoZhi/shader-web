import React, {useEffect, useState} from 'react';
import {IUniformComponentProps} from "./IUniformComponentProps";
import "./FolderUniformComponent.css"
import UniformComponent from "./UniformComponent";
import {UniformConfigData} from "./UniformsSpecification";
import UniformEditAddButton from "./UniformEditAddButton";
import {UniformPanelMode, useUniformContext} from "../../utils/contexts/UniformsContext";

const FolderUniformComponent: React.FC<IUniformComponentProps> = ({index, config}) => {
    const [value, setValue] = useState(false);
    const {mode} = useUniformContext();

    // initialize
    useEffect(() => {
        setValue(config.ui.value);
        if (config.children === undefined) {
            config.children = [];
        }
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
                 style={mode === UniformPanelMode.Edit ? {gap: 0} : {}}
            >
                {config.children &&
                    config.children.map((uniformConfig: UniformConfigData, i: number) => {
                        return (
                            <div key={i}>
                                <UniformEditAddButton index={[...index, i]} key={uniformConfig.name + i + "add"}/>
                                <UniformComponent index={[...index, i]} uniformConfig={uniformConfig}
                                                  key={uniformConfig.name + i}/>
                            </div>
                        );
                    })
                }
                <UniformEditAddButton index={[...index, config.children ? config.children.length : 0]}/>
            </div>
        </div>
    );
}

export default FolderUniformComponent;