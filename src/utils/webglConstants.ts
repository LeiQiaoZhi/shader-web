import {COLORS_TEMPLATE} from "./colorsTemplate";
import { KEYCODES_MACROS } from "./keycodesMacros";

export const defaultVertexShaderSource = `
  attribute vec4 a_position;
  void main() {
      gl_Position = a_position;
  }
`;

export const defaultFragmentShaderSource =
    `// Default shader for the main pass
precision mediump float;

// built-in uniforms
uniform float iTime;
uniform ivec2 iResolution;
uniform sampler2D iPreviousFrame;
uniform sampler2D iKeyboard;

void main() {
    vec2 uv = gl_FragCoord.xy / min(float(iResolution.x), float(iResolution.y));
    vec3 color = vec3(uv, 0.5 * sin(iTime) + 0.5);
    gl_FragColor = vec4(color, 1.0);
}
`;

export const defaultPostFragmentShaderSource =
    `// Default shader for the post-processing pass
precision mediump float;

// built-in uniforms
uniform float iTime;
uniform ivec2 iResolution;
uniform sampler2D iColorTexture;
uniform sampler2D iPreviousFrame;
uniform sampler2D iKeyboard;

void main() {
    vec2 uv = gl_FragCoord.xy / min(float(iResolution.x), float(iResolution.y));
    gl_FragColor = texture2D(iColorTexture, uv);
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