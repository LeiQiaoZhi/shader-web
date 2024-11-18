import {UniformPanelMode, useUniformContext} from "../../utils/contexts/UniformsContext";
import React from "react";
import {useDrop} from "react-dnd";

interface UniformEditAddButtonProps {
    index: number[];
}

const UniformEditAddButton: React.FC<UniformEditAddButtonProps> = (
    {index}
) => {
    const onDrop = (item: any) => {
        const {droppedConfig, droppedIndex} = item;
        console.log("Dropped", droppedConfig, "at", droppedIndex, "to", index);
        configManager.moveUniform(droppedIndex, index);
    }

    const [{isOver}, dropRef] = useDrop(() => ({
        accept: "UNIFORM", // Accept items of this type
        drop: (item) => onDrop(item), // Handle the drop event
        collect: (monitor) => ({
            isOver: monitor.isOver(), // Track whether an item is being dragged over
        }),
    }));

    const {mode, configManager} = useUniformContext();
    return (
        mode === UniformPanelMode.Edit ?
            (<div className={"uniform-component-edit-add-button " + (isOver ? 'over' : '')}
                  ref={dropRef}
                  onClick={() => {
                      console.log("Add at", index);
                      configManager.insertDefaultSingleUniform(index);
                  }}
            >+
                {/*{index.join(".")}*/}
            </div>) : null
    );
};

export default UniformEditAddButton;
