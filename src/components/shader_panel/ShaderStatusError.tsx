import {IShaderMessage} from "../../utils/contexts/ShaderContext";
import React from "react";
import {Expander} from "../common/Expander";
import AceEditor from "react-ace";
import {useEditorContext} from "../../utils/contexts/EditorContext";

interface ShaderStatusErrorProps {
    messageObj: IShaderMessage
}

export const ShaderStatusError: React.FC<ShaderStatusErrorProps> = (
    {
        messageObj
    }
) => {
    const {editorTheme} = useEditorContext();
    return (
        <Expander title={messageObj.message} headerClassName="readonly">
            <div style={{
                paddingLeft: 'var(--small-gap)',
                paddingTop: 'var(--small-gap)',
            }}
                 className="readonly"
            >
                <AceEditor
                    value={messageObj.neighbourLines}
                    mode="glsl"
                    readOnly={true}
                    theme={editorTheme}
                    focus={false}
                    width={"100%"}
                    maxLines={Infinity}
                    fontSize={"small"}
                    setOptions={{
                        showLineNumbers: true,
                        showGutter: true,
                        showFoldWidgets: false,
                        highlightActiveLine: false,
                        highlightGutterLine: false,
                        firstLineNumber: messageObj.startLineNumber ?? 1,
                    }}
                    showPrintMargin={true}
                    wrapEnabled={false}
                    style={{
                        transition: 'none',
                        borderRadius: 'var(--small-radius)',
                    }}
                    annotations={
                        [{
                            row: (messageObj.errorLineNumber ?? 0) - (messageObj.startLineNumber ?? 0) - 1,
                            column: 0,
                            type: 'error',
                            text: messageObj.message
                        }]
                    }
                />
            </div>
        </Expander>
    );
}