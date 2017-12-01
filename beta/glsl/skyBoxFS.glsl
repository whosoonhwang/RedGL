precision lowp float;
varying vec3 vCubeCoord;
uniform samplerCube uSkybox;
void main() {
    gl_FragColor = textureCube(uSkybox, vCubeCoord);
}