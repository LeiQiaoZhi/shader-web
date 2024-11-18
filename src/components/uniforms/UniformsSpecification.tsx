import React from "react";
import {IUniformComponentProps} from "./IUniformComponentProps";
import CheckboxUniformComponent from "./CheckboxUniformComponent";
import SliderUniformComponent from "./SliderUniformComponent";
import ColorUniformComponent from "./ColorUniformComponent";
import FolderUniformComponent from "./FolderUniformComponent";
import DropdownUniformComponent from "./DropdownUniformComponent";

export interface TopLevelConfigData{
    title?: string;
    uniforms: UniformConfigData[];
    [key: string]: any; // This allows for dynamic keys
}

interface UIConfigData {
    type: string;
    value: any;
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
    // [key: string]: any; // This allows for dynamic keys
}

interface GLConfigData {
    name?: string;
    type?: string;
    // [key: string]: any; // This allows for dynamic keys
}

export interface UniformConfigData {
    ui: UIConfigData;
    gl?: GLConfigData;

    [key: string]: any; // This allows for dynamic keys
}

export const UNIFORMS_UI_TYPE_TO_COMPONENT_MAP: { [key: string]: React.FC<IUniformComponentProps>; } = {
    checkbox: CheckboxUniformComponent,
    slider: SliderUniformComponent,
    color: ColorUniformComponent,
    folder: FolderUniformComponent,
    dropdown: DropdownUniformComponent,
};

export const UNIFORMS_UI_TYPE_TO_DEFAULT_VALUE: { [key: string]: any; } = {
    checkbox: false,
    slider: 0,
    color: "#ffffff",
    folder: true,
    dropdown: 0,
};

export const UNIFORMS_GL_TYPES = [
    "float",
    "bool",
    "int",
    "color4",
    "color3",
]

export const UNIFORMS_UI_TYPES_TO_FIELDS_MAP: { [key: string]: string[]; } = {
    checkbox: [],
    slider: ["min", "max", "step"],
    color: [],
    folder: [],
    dropdown: ["options"],
}

export const UNIFORMS_UI_TYPES_TO_GL_TYPES_MAP: { [key: string]: string[]; } = {
    checkbox: ["bool"],
    slider: ["float", "int"],
    color: ["color4", "color3"],
    folder: [],
    dropdown: ["int"],
}

export const UNIFORMS_FIELDS_TO_DEFAULT_VALUES: { [key: string]: string | number; } = {
    min: 0,
    max: 1,
    step: 0.01,
    options: "option1, option2"
}
