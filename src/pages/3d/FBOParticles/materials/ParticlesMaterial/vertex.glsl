attribute float index;
attribute float random;

varying float vIntensity;

// static uniforms
uniform vec2 uResolution;
uniform vec3 uLightSource;
uniform float uPointSize;
uniform float uMinPointSize;

// uniforms from FBO simulation
uniform sampler2D uFboTexture;

void main() {
  // the FBO has 2 rows (row 0: positions, row 1: normals)
  // +0.5 offsets on both axes to target texel centers — boundary values produce architecture-dependent results with NearestFilter.
  vec4 position = texture2D(uFboTexture, vec2((index + 0.5) / uResolution.x, 0.5 / uResolution.y));
  vec4 normal   = texture2D(uFboTexture, vec2((index + 0.5) / uResolution.x, 1.5 / uResolution.y));

  /* positioning */
  gl_Position = projectionMatrix * modelViewMatrix * position;

  /* sizing */
  float intensity = dot(normalize(uLightSource), normal.xyz);
  vIntensity = intensity;

  float size = max(uPointSize * intensity, uMinPointSize);
  gl_PointSize = size;
}
