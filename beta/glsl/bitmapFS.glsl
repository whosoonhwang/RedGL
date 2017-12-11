precision lowp float;
varying vec2 vTexcoord;
uniform sampler2D uTexture;
vec4 finalColor;
void main(void) {
    finalColor = texture2D(uTexture, vTexcoord);
    gl_FragColor = finalColor;
}