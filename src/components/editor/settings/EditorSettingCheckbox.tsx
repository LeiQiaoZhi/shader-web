import React from "react";

interface Props {
    label: string,
    state: boolean,
    setter: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const EditorSettingCheckbox: React.FC<Props> = ({label, state, setter}) => {
        return (
            <div style={{display: "flex", alignItems: "center"}}>
                <input type="checkbox" checked={state}
                       onChange={e => setter(e.target.checked)}/>
                <label>{label}</label>
            </div>
        );
    }
;

export default EditorSettingCheckbox;