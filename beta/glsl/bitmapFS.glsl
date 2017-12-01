precision lowp float;
varying vec2 vTexcoord;
uniform sampler2D uTexture;
void main(void) {
    vec4 texelColor = texture2D(uTexture, vTexcoord);
    if(texelColor.a==0.0) discard;
    gl_FragColor = texelColor;
}