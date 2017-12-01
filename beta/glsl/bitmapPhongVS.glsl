attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTexcoord;
// 기본유니폼
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
uniform mat4 uCameraMatrix;            
uniform mat4 uPMatrix;
uniform vec4 uAtlascoord;
// 베어링들
varying vec2 vTexcoord;  

varying vec3 vEyeVec;
varying vec3 vNormal;


void main(void) {
    vec4 vectexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
    vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
    vNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
    vEyeVec = -vectexPositionEye4.xyz;
    
    // 포지션 결정
    gl_Position = uPMatrix * uCameraMatrix *  vectexPositionEye4;
}