precision lowp float;
varying vec2 vTexcoord;
uniform sampler2D uDiffuseTexture;
vec4 finalColor;
void main(void) {
    finalColor = texture2D(uDiffuseTexture, vTexcoord);
    gl_FragColor = finalColor;
}