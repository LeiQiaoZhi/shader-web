precision mediump float;

uniform float iTime;
uniform float iFloat;
uniform bool iBool;
uniform vec4 iColor;

void main() {
    
    if (iBool) {
        gl_FragColor = iColor * iFloat;
        return;
    }

    vec3 color = vec3(0.5 * sin(iTime) + 0.5, 0.5 * cos(iTime) + 0.5, 0.5);
    gl_FragColor = vec4(color * iFloat, 1.0);
}