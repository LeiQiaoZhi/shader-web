import React from "react";
import AceEditor from "react-ace";
import "./EditorShaderInputs.css"
import {VscTriangleDown, VscTriangleRight} from "react-icons/vsc";

interface EditorShaderInputsProps {
    theme: string,
    isVisible: boolean,
    fontSize: string,
    showLineNumbers: boolean,
    showGutter: boolean,
    showFolds: boolean,
    wrap: boolean,
    source?: string
}

export const EditorShaderInputs: React.FC<EditorShaderInputsProps> = (
    {
        theme,
        isVisible,
        fontSize,
        showLineNumbers,
        showGutter,
        showFolds,
        wrap,
        source
    }
) => {
    const [showCode, setShowCode] = React.useState(false);

    return (
        <div className="editor-shader-inputs">
            <div className="editor-shader-inputs-header"
                 onClick={
                     () => setShowCode(!showCode)
                 }>
                {showCode
                    ? <VscTriangleDown/>
                    : <VscTriangleRight/>}
                Shader Inputs & Others
            </div>
            <AceEditor
                value={source}
                mode="glsl"
                readOnly={true}
                theme={theme}
                focus={false}
                width={isVisible ? "100%" : "0"}
                maxLines={Infinity}
                fontSize={fontSize}
                setOptions={{
                    showLineNumbers: showLineNumbers,
                    showGutter: showGutter,
                    showFoldWidgets: showFolds,
                    highlightActiveLine: false, highlightGutterLine: false
                }}
                wrapEnabled={wrap}
                style={showCode ? {} : {display: "none"}}
            />
        </div>

    );
};