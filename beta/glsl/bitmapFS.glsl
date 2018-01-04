precision lowp float;
varying vec2 vTexcoord;
uniform sampler2D uDiffuseTexture;
uniform int uUseDiffuseTexture; // 노말텍스쳐 사용여부
vec4 finalColor;
void main(void) {
     if(uUseDiffuseTexture == 1) finalColor = texture2D(uDiffuseTexture, vTexcoord);;    
    gl_FragColor = finalColor;
}