export const CONVOLUTION_TEMPLATE = `
float sobel3[9] = float[9](
    -1.0,  0.0,  1.0,
    -2.0,  0.0,  2.0,
    -1.0,  0.0,  1.0
);

float sobel5[25] = float[25](
    -2.0, -1.0,  0.0,  1.0,  2.0,
    -3.0, -2.0,  0.0,  2.0,  3.0,
    -4.0, -3.0,  0.0,  3.0,  4.0,
    -3.0, -2.0,  0.0,  2.0,  3.0,
    -2.0, -1.0,  0.0,  1.0,  2.0
);

float gaussian3[9] = float[9](
    1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0,
    2.0 / 16.0, 4.0 / 16.0, 2.0 / 16.0,
    1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0
);

float gaussian5[25] = float[25](
    1.0 / 273.0,  4.0 / 273.0,  7.0 / 273.0,  4.0 / 273.0,  1.0 / 273.0,
    4.0 / 273.0, 16.0 / 273.0, 26.0 / 273.0, 16.0 / 273.0,  4.0 / 273.0,
    7.0 / 273.0, 26.0 / 273.0, 41.0 / 273.0, 26.0 / 273.0,  7.0 / 273.0,
    4.0 / 273.0, 16.0 / 273.0, 26.0 / 273.0, 16.0 / 273.0,  4.0 / 273.0,
    1.0 / 273.0,  4.0 / 273.0,  7.0 / 273.0,  4.0 / 273.0,  1.0 / 273.0
);


// dim = 1 -- 3 by 3 matrix
// dim = 2 -- 5 by 5 matrix...
#define CONVOLVE(result, image, pos, kernel, dim)   {              \
    vec2 texelSize = 1.0 / iResolution.xy;                         \
    int side = 2 * dim + 1;                                        \
    int size = side * side;                                        \
    vec3 finalColor = vec3(0.0);                                   \
    for (int i = 0; i < size; i++) {                               \
        int row = i / side;                                        \
        int col = i - row * side;                                  \
        vec3 color = texture(image, pos + vec2(                    \
            float(col - dim) * texelSize.x,                        \
            float(row - dim) * texelSize.y)).rgb * kernel[i];      \
        finalColor += color;                                       \
    }                                                              \
    result = finalColor;                                           \
}                       

#define CONVOLVET(result, image, pos, kernel, dim)   {              \
    vec2 texelSize = 1.0 / iResolution.xy;                         \
    int side = 2 * dim + 1;                                        \
    int size = side * side;                                        \
    vec3 finalColor = vec3(0.0);                                   \
    for (int i = 0; i < size; i++) {                               \
        int row = i / side;                                        \
        int col = i - row * side;                                  \
        vec3 color = texture(image, pos + vec2(                    \
            float(row - dim) * texelSize.x,                        \
            float(col - dim) * texelSize.y)).rgb * kernel[i];      \
        finalColor += color;                                       \
    }                                                              \
    result = finalColor;                                           \
}    
`;