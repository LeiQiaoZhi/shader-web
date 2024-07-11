precision mediump float;
uniform float iTime;

void main() {
    vec3 color = vec3(0.5 * sin(iTime) + 0.5, 0.5 * cos(iTime) + 0.5, 0.5);
    gl_FragColor = vec4(color, 1.0);
}