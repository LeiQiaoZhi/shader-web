import {COLORS_TEMPLATE} from "./colorsTemplate";

export const defaultVertexShaderSource = `
  attribute vec4 a_position;
  void main() {
      gl_Position = a_position;
  }
`;

export const defaultFragmentShaderSource =
    `precision mediump float;

// built-in uniforms
uniform float iTime;
uniform ivec2 iResolution;

void main() {
    float speed = 0.1;
    vec3 color = vec3(0.5 * sin(iTime * speed) + 0.5, 0.5 * cos(iTime * speed) + 0.5, 0.5);
    gl_FragColor = vec4(color, 1.0);
}
`;

export const SHADER_SOURCE_TEMPLATE_MAP: { [key: string]: string } = {
    "Empty": "",
    "Template": defaultFragmentShaderSource,
    "Colors": COLORS_TEMPLATE
}