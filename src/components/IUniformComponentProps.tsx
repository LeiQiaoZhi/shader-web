import {TomlData} from "../utils/ConfigManager";
import React from "react";
import {Shader} from "../utils/Shader";

export interface IUniformComponentProps {
    config: TomlData,
    shaderRef: React.MutableRefObject<Shader | null>
}