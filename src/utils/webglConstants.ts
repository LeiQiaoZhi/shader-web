export const defaultVertexShaderSource = `
  attribute vec4 a_position;
  void main() {
      gl_Position = a_position;
  }
`;

export const defaultFragmentShaderSource = `
  precision mediump float;
  void main() {
      gl_FragColor = vec4(0.0, 0.0, 0.2, 1.0); // Red color
  }
`;
