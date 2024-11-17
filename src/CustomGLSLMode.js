import TextMode from 'ace-builds/src-noconflict/mode-glsl';
import Mode from 'ace-builds/src-noconflict/mode-c_cpp';

export class CustomHighlightRules extends new TextMode.Mode().HighlightRules {
    constructor() {
        super();
        var keywords = ("attribute|const|uniform|varying|break|continue|do|for|while|" +
            "if|else|in|out|inout|float|int|void|bool|true|false|" +
            "lowp|mediump|highp|precision|invariant|discard|return|mat2|mat3|" +
            "mat4|vec2|vec3|vec4|ivec2|ivec3|ivec4|bvec2|bvec3|bvec4|sampler2D|" +
            "samplerCube|struct|" + // #version 100 keywords
            "layout|centroid|flat|smooth|noperspective|patch|sample|" +
            "switch|case|default|subroutine|mat2x2|mat2x3|mat2x4|mat3x2|" +
            "mat3x3|mat3x4|mat4x2|mat4x3|mat4x4|uvec2|uvec3|uvec4|sampler3D|" +
            "sampler2DShadow|samplerCubeShadow|sampler2DArray|" +
            "sampler2DArrayShadow|isampler2D|isampler3D|isamplerCube|" +
            "isampler2DArray|usampler2D|usampler3D|usamplerCube|" +
            "usampler2DArray|image2D|image3D|imageCube|image2DArray|" +
            "iimage2D|iimage3D|iimageCube|iimage2DArray|uimage2D|uimage3D|" +
            "uimageCube|uimage2DArray|coherent|volatile|restrict|readonly|" +
            "writeonly|atomic_uint|samplerBuffer|imageBuffer|" +
            "isamplerBuffer|usamplerBuffer|iimageBuffer|uimageBuffer|" +
            "sampler2DMS|isampler2DMS|usampler2DMS|image2DMS|iimage2DMS|" +
            "uimage2DMS|sampler2DMSArray|isampler2DMSArray|usampler2DMSArray|" +
            "image2DMSArray|iimage2DMSArray|uimage2DMSArray)");
        var buildinConstants = ("radians|degrees|sin|cos|tan|asin|acos|atan|pow|" +
            "exp|log|exp2|log2|sqrt|inversesqrt|abs|sign|floor|ceil|fract|mod|" +
            "min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|" +
            "normalize|faceforward|reflect|refract|matrixCompMult|lessThan|" +
            "lessThanEqual|greaterThan|greaterThanEqual|equal|notEqual|any|all|" +
            "not|dFdx|dFdy|fwidth|texture2D|texture2DProj|texture2DLod|" +
            "texture2DProjLod|textureCube|textureCubeLod|" +
            "gl_MaxVertexAttribs|gl_MaxVertexUniformVectors|gl_MaxVaryingVectors|" +
            "gl_MaxVertexTextureImageUnits|gl_MaxCombinedTextureImageUnits|" +
            "gl_MaxTextureImageUnits|gl_MaxFragmentUniformVectors|gl_MaxDrawBuffers|" +
            "gl_DepthRangeParameters|gl_DepthRange|" +
            "gl_Position|gl_PointSize|" +
            "gl_FragCoord|gl_FrontFacing|gl_PointCoord|gl_FragColor|gl_FragData|" + // GLSL 100 constants
            "texture|textureProj|textureLod|textureProjLod|textureOffset|" +
            "textureProjOffset|textureLodOffset|textureProjLodOffset|textureGrad|" +
            "textureGradOffset|textureProjGrad|textureProjGradOffset|" +
            "texelFetch|texelFetchOffset|textureSize|" + // Added functions
            "atomicCounterIncrement|atomicCounterDecrement|atomicCounter|" +
            "barrier|" + // Atomic operations and barriers
            "uvec2|uvec3|uvec4|" + // Unsigned vector types
            "mat2x2|mat2x3|mat2x4|mat3x2|mat3x3|mat3x4|mat4x2|mat4x3|mat4x4|" + // Non-square matrix types
            "outerProduct|transpose|determinant|inverse|" + // Matrix operations
            "gl_VertexID|gl_InstanceID|" + // Vertex attributes
            "gl_MaxVertexOutputVectors|gl_MaxFragmentInputVectors|" +
            "gl_MinProgramTexelOffset|gl_MaxProgramTexelOffset|" + // Texel offset limits
            "gl_NumSamples|gl_SampleID|gl_SamplePosition|gl_SampleMaskIn|gl_SampleMask|" + // Multisample variables
            "gl_ClipDistance|gl_PrimitiveID|gl_Layer|gl_ViewportIndex|" + // Geometry shader variables
            "gl_WorkGroupSize|gl_WorkGroupID|gl_LocalInvocationID|" +
            "gl_GlobalInvocationID|gl_LocalInvocationIndex"); // Compute shader variables
        var keywordMapper = this.createKeywordMapper({
            "variable.language": "this",
            "keyword": keywords,
            "constant.language": buildinConstants,
        }, "identifier");
        this.$rules.start.forEach(function (rule) {
            if (typeof rule.token == "function")
                rule.token = keywordMapper;
        });

        this.$rules["start"].unshift(
            {
                token: "support.constant",
                regex: "\\b[A-Z]+\\b"
            },
            {
                token: "variable.parameter",
                regex: "(?<![a-zA-Z])i[A-Z][a-zA-Z0-9]*"
            },
            {
                token: "support.type",
                regex: "\\b[A-Z][a-zA-Z]*[a-z][a-zA-Z]*\\b"
            }
        );

    }
}
