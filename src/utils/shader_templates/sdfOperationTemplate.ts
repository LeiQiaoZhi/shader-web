export const SDF_OPERATIONS_TEMPLATE = `
// make ROUNDED -- subtract a constant value

// ANNULAR (Ring, Onion) -- Abs, then subtract a constant value

/////// 2D => 3D

// EXTRUDE, substitute in a 2D SDF function
// extrude along the Z axis
// h is HALF the extrusion length
// float opExtrusion(in vec3 p, in sdf2d sdf, in float h)
// {
//     float d = sdf(p.xy);
//     vec2 w = vec2(d, abs(p.z) - h);
//     return 
//         // for points INSIDE the shape
//         min(max(w.x,w.y),0.0) 
//         // for points OUTSIDE the shape
//         + length(max(w,0.0));
// }

// REVOLUTION, substitute in a 2D SDF function
// O is offset that shifts the 2D shape outward
// revolve along the Y axis
// float opRevolution( in vec3 p, in sdf2d sdf, float o )
// {
//     vec2 q = vec2( length(p.xz) - o, p.y );
//     return sdf(q);
// }

/////// SMOOTH MIN/MAX OPERATIONS

struct SResult {
    float value;
    bool aDominate;
    float h;
    float minus;
};

SResult smoothmin(in float a, in float b, in float k)
{
    SResult result;
    k *= 6.0;
    float h = (k > 0.) ? max( k-abs(a-b), 0.0 )/k : 0.;
    result.h = h;
    result.minus = h*h*h*k*(1.0/6.0);
    result.value = min(a,b) - result.minus;
    result.aDominate = a < b;
    return result;
}

SResult smoothmax(in float a, in float b, in float k)
{
    SResult result = smoothmin(-a, -b, k);
    result.value *= -1.;
    return result;
}
`