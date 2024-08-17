import {COLORS_TEMPLATE} from "./colorsTemplate";

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

void main() {
    float speed = 0.1;
    vec3 color = vec3(0.5 * sin(iTime * speed) + 0.5, 0.5 * cos(iTime * speed) + 0.5, 0.5);
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

void main() {
    gl_FragColor = texture2D(iColorTexture, vec2(0.0));
}
`;

export const SHADER_SOURCE_TEMPLATE_MAP: { [key: string]: string } = {
    "Empty": "",
    "Template": defaultFragmentShaderSource,
    "Colors": COLORS_TEMPLATE
}

export enum ShaderFileType {
    Common = "Common",
    Buffer = "Buffer",
}