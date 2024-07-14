precision mediump float;
uniform float iTime;
uniform bool iBool;

void main() {

    if (iBool) {
        gl_FragColor = vec4(0, 0, 1, 1);
        return;
    }

    vec3 color = vec3(0.5 * sin(iTime) + 0.5, 0.5 * cos(iTime) + 0.5, 0.5);
    gl_FragColor = vec4(color, 1.0);
}