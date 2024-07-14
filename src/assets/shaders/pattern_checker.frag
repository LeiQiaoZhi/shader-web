precision mediump float;

#define WHITE (vec3(1))
#define BLACK (vec3(0))

uniform float iTime;
uniform ivec2 iResolution;

uniform int iNumCheckers;
uniform vec3 iColor1;
uniform vec3 iColor2;


vec3 color_from_uv(in ivec2 _checker_uv) {
    return (mod(float(_checker_uv.x + _checker_uv.y), 2.0) > 0.0) ? iColor1 : iColor2;
}

void main() {
    // 1. unify coords
    vec2 uv = gl_FragCoord.xy / min(float(iResolution.x), float(iResolution.y));

    float num_checkers = float(iNumCheckers);
    ivec2 checker_uv = ivec2(floor(uv * num_checkers));
    vec2 inside_uv = uv * num_checkers - vec2(checker_uv);

    vec3 color = color_from_uv(checker_uv);
    gl_FragColor = vec4(color, 1.0);
}