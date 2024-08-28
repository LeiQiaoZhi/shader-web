import {COLORS_TEMPLATE} from "./colorsTemplate";
import { KEYCODES_MACROS } from "./keycodesMacros";

export const defaultVertexShaderSource = `#version 300 es

layout(location = 0) in vec4 a_position;

void main() {
    gl_Position = a_position;
}
`;

export const defaultFragmentShaderSource =
    `#version 300 es
precision mediump float;

// built-in uniforms
uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iPreviousFrame;
uniform sampler2D iKeyboard;

out vec4 fragColor;

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec2 uv = gl_FragCoord.xy / min(iResolution.x, iResolution.y);
    vec3 color = vec3(uv, 0.5 * sin(iTime) + 0.5);
    fragColor = vec4(color, 1.0);
}
`;

export const defaultPostFragmentShaderSource =
    `#version 300 es
precision mediump float;

// built-in uniforms
uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iColorBuffer;
uniform sampler2D iPreviousFrame;
uniform sampler2D iKeyboard;

out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    fragColor = texture(iColorBuffer, uv);
}
`;

export const SHADER_SOURCE_TEMPLATE_MAP: { [key: string]: string } = {
    "Empty": "",
    "Default Shader": defaultFragmentShaderSource,
    "Colors": COLORS_TEMPLATE,
    "Keycodes": KEYCODES_MACROS,
}

export enum ShaderFileType {
    Common = "Common",
    Buffer = "Buffer",
}