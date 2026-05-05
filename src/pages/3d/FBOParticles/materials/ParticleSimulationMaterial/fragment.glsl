#define PI 3.1415926535897932384626433832795

uniform vec2 uResolution;
uniform float uTime;
uniform float uStartTime;
uniform float uEndTime;
uniform vec3 uStartCorePosition;
uniform vec3 uEndCorePosition;

uniform sampler2D uLatestFboTexture;
uniform sampler2D uStartFboTexture;
uniform sampler2D uEndFboTexture;

float easeInOutQuad(float x) {
  return x < 0.5 ? 2.0 * x * x : 1.0 - pow(-2.0 * x + 2.0, 2.0) / 2.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  vec3 startPosition = texture2D(uStartFboTexture, vec2(uv.x, 0.0)).xyz;
  vec3 startNormal   = texture2D(uStartFboTexture, vec2(uv.x, 0.5)).xyz;
  vec3 endPosition   = texture2D(uEndFboTexture, vec2(uv.x, 0.0)).xyz;
  vec3 endNormal     = texture2D(uEndFboTexture, vec2(uv.x, 0.5)).xyz;

  float progress = uTime >= uEndTime ? 1.0 : (uTime - uStartTime) / (uEndTime - uStartTime);
  float easedProgress = easeInOutQuad(progress);

  vec3 nextValues = vec3(0.0);
  if (uv.y < 0.5) {
    // row 0: positions (morphed)
    nextValues = mix(startPosition, endPosition, easedProgress);
  } else {
    // row 1: normals (morphed linearly)
    nextValues = mix(startNormal, endNormal, progress);
  }

  gl_FragColor = vec4(nextValues, 1.0);
}
