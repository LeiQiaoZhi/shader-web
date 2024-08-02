import {UniformPanelMode, useUniformContext} from "../../utils/contexts/UniformsContext";
import React from "react";

interface UniformEditAddButtonProps {
    index: number[];
}

const UniformEditAddButton: React.FC<UniformEditAddButtonProps> = (
    {index}
) => {
    const {mode, configManager} = useUniformContext();
    return (
        mode === UniformPanelMode.Edit ?
            (<div className="uniform-component-edit-add-button"
                  onClick={() => {
                      console.log("Add at", index);
                      configManager.insertSingleUniform(index);
                  }}
            >+</div>) : null
    );
};

export default UniformEditAddButton;
