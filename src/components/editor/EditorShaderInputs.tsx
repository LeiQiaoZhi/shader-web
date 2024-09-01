import React from "react";
import AceEditor from "react-ace";
import "./EditorShaderInputs.css"
import {Expander} from "../common/Expander";
import {useEditorContext} from "../../utils/contexts/EditorContext";

interface EditorShaderInputsProps {
    isVisible: boolean,
    showLineNumbers: boolean,
    showGutter: boolean,
    showFolds: boolean,
    wrap: boolean,
    source?: string
}

export const EditorShaderInputs: React.FC<EditorShaderInputsProps> = (
    {
        isVisible,
        showLineNumbers,
        showGutter,
        showFolds,
        wrap,
        source
    }
) => {
    const {editorTheme, editorFontSize} = useEditorContext();
    return (
        <div className="editor-shader-inputs">
            <Expander title="Shader Inputs" headerClassName="editor-shader-inputs readonly">
                <AceEditor
                    value={source}
                    mode="glsl"
                    readOnly={true}
                    theme={editorTheme}
                    focus={false}
                    width={isVisible ? "100%" : "0"}
                    maxLines={Infinity}
                    fontSize={editorFontSize}
                    setOptions={{
                        showLineNumbers: showLineNumbers,
                        showGutter: showGutter,
                        showFoldWidgets: showFolds,
                        highlightActiveLine: false, highlightGutterLine: false
                    }}
                    wrapEnabled={wrap}
                    style={{transition: 'none'}}
                />
            </Expander>
        </div>

    );
};