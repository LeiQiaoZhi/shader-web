import {COLORS_TEMPLATE} from "./shader_templates/colorsTemplate";
import {KEYCODES_MACROS} from "./shader_templates/keycodesMacros";
import {SDFS_TEMPLATE} from "./shader_templates/sdfsTemplate";
import {CONVOLUTION_TEMPLATE} from "./shader_templates/convolutionTemplate";

export const bufferPrefix: string = `#version 300 es // version
precision mediump float; // precision

// built-in uniforms
uniform float     iTime;           // time in seconds
uniform int       iFrame;          // shader playback frame
uniform vec2      iResolution;     // resolution in pixels
uniform sampler2D iPreviousFrame;  // previous frame
uniform sampler2D iKeyboard;       // key press states
uniform vec4      iMouse;          // xy: current position, zw: click position

out vec4 fragColor; // output
`

export const shaderPrefixMap: { [key: string]: string } = {
    main: bufferPrefix,
    post: `#version 300 es
precision mediump float;

// built-in uniforms
uniform float     iTime;           // time in seconds
uniform int       iFrame;          // shader playback frame
uniform vec2      iResolution;     // resolution in pixels
uniform sampler2D iPreviousFrame;  // previous frame
uniform sampler2D iColorBuffer;    // output from the "main" shader in this frame
uniform sampler2D iKeyboard;       // key press states
uniform vec4      iMouse;          // xy: current position, zw: click position

out vec4 fragColor; // output
`,
}

export const mainShaderSuffix = `
void main() {
    vec4 color;
    mainImage(color, gl_FragCoord.xy);
    fragColor = color;
}`;

export const defaultVertexShaderSource = `#version 300 es

layout(location = 0) in vec4 a_position;

void main() {
    gl_Position = a_position;
}
`;

export const defaultFragmentShaderSource =
    `void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec2 uv = gl_FragCoord.xy / min(iResolution.x, iResolution.y);
    vec3 color = vec3(uv, 0.5 * sin(iTime) + 0.5);
    fragColor = vec4(color, 1.0);
}
`;

export const defaultPostFragmentShaderSource =
    `void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    fragColor = texture(iColorBuffer, uv);
}
`;

export const SHADER_SOURCE_TEMPLATE_MAP: { [key: string]: string } = {
    "Empty": "",
    "Default Shader": defaultFragmentShaderSource,
    "Colors": COLORS_TEMPLATE,
    "Keycodes": KEYCODES_MACROS,
    "SDFs": SDFS_TEMPLATE,
    "Convolution": CONVOLUTION_TEMPLATE,
}

export enum ShaderFileType {
    Common = "Common",
    Buffer = "Buffer",
}