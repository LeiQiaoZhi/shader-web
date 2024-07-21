precision mediump float;

// default uniforms
uniform float iTime;
uniform ivec2 iResolution;

// custom uniforms
uniform int iShape;
#define SHAPE_SQUARE (0)
#define SHAPE_CIRCLE (1)
#define SHAPE_DIAMOND (2)
uniform vec4 iBackgroundColor;
uniform vec4 iOutlineColor;
uniform float iOutlineThickness;

uniform int iNumCheckers;
uniform vec3 iColor1;
uniform vec3 iColor2;

uniform int iNumStripes;
uniform vec3 iStripeColor1;
uniform vec3 iStripeColor2;

uniform float iAntiAliasAmount;

float sdf_circle(in vec2 _uv, in vec2 _center, in float _radius) {
    return distance(_uv, _center) - _radius;
}


vec4 color_from_shape(in vec3 _color, in vec2 _uv) {
    vec4 color = vec4(_color, 1.0);
    if (iShape == SHAPE_SQUARE) {
        return color;
    }
    if (iShape == SHAPE_CIRCLE) {
        float radius = 0.45;
        const vec2 center = vec2(0.5, 0.5);
        float toCircle = sdf_circle(_uv, center, radius);
        bool inCircle = toCircle <= 0.0;
        float toOutline = toCircle - iOutlineThickness / 2.0;
        bool inOutline = !inCircle && (toOutline <= 0.0);
        // anti-alias using smoothstep
        float threshold = 0.001 * iAntiAliasAmount;
        float circleWeight = smoothstep(threshold, -threshold, toCircle);
        float outlineWeight = smoothstep(threshold, 0.0, max(0.0, abs(toOutline) - iOutlineThickness * 0.5));
        float backgroundWeight = smoothstep(-threshold, threshold, toOutline - iOutlineThickness * 0.5);
        vec3 weights = vec3(circleWeight, outlineWeight, backgroundWeight);
        weights /= weights.x + weights.y + weights.z;
        vec4 result = weights.x * color + weights.y * iOutlineColor + weights.z * iBackgroundColor;
        return vec4(result.xyz, 1.0);
    }
    if (iShape == SHAPE_DIAMOND) {
        return vec4(0, 1, 0, 1);
    }
}

vec3 color_pattern_checker(in vec2 _uv) {
    float num_checkers = float(iNumCheckers);
    ivec2 checker_uv = ivec2(floor(_uv * num_checkers));
    vec2 inside_uv = _uv * num_checkers - vec2(checker_uv); // unused now
    return (mod(float(checker_uv.x + checker_uv.y), 2.0) > 0.0) ? iColor1 : iColor2;
}

vec3 color_pattern_vertical_stripe(in vec2 _uv) {
    float num_stripes = float(iNumStripes);
    int stripe_id = int(floor(_uv.x * num_stripes));
    return (mod(float(stripe_id), 2.0) > 0.0) ? iStripeColor1 : iStripeColor2;
}

void main() {
    // 1. unify coords
    vec2 uv = gl_FragCoord.xy / min(float(iResolution.x), float(iResolution.y));
    uv = (uv - vec2(0.5)) * (1.0 + 0.02 * sin(iTime)) + vec2(0.5);

    vec3 pattern_color = color_pattern_checker(uv);
    vec3 stripe_color = color_pattern_vertical_stripe(uv);
    vec3 color = (uv.x < 0.5) ? pattern_color : stripe_color;
    gl_FragColor = color_from_shape(color, uv);
}