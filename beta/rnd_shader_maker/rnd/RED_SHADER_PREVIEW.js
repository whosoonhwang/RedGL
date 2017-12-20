'use strict';
var testGL
Recard.static('RED_SHADER_PREVIEW', (function () {
    var result;
    var rootBox
    var testCvs
    var testScene, testCamera
    var testMat, tMesh
    var setTest
    setTest = (function () {
        var index;
        index = 1
        return function (v, f,textureInfo) {
            console.log('실행')
            var tName = 'testShader' + index
            index++

            v = `attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTexcoord;
// 기본유니폼
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
uniform mat4 uCameraMatrix;            
uniform mat4 uPMatrix;
uniform vec4 uAtlascoord;
uniform sampler2D uDisplacementTexture; // DisplacementTexture
uniform int uUseDisplacementTexture; // DisplacementTexture 사용여부


// 베어링들
varying vec2 vTexcoord;  

varying vec3 vEyeVec;
varying vec3 vNormal;
vec4 vertexPositionEye4;
void main(void) {
    vertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
    vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
    vNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
    vEyeVec = -vertexPositionEye4.xyz;
    if(uUseDisplacementTexture == 1) {
        vertexPositionEye4.xyz += normalize(vNormal) * texture2D(uDisplacementTexture,vTexcoord).x * vec3(uMVMatrix[0][0],uMVMatrix[1][1],uMVMatrix[2][2]);
    }
    // 포지션 결정
    gl_Position = uPMatrix * uCameraMatrix *  vertexPositionEye4;
}
`
            console.log('~~~~~~~~~~~')
            f = 'precision lowp float;\n' + f
            console.log(v)
            console.log(f);
            (function () {
                var tTextureDiffuse
                var tTextureNormal
                var tTextureSpecular
                var tTextureDisplacement
                var tEtc1,tEtc2,tEtc3,tEtc4
                try {
                testGL.createShaderInfo(tName, RedShaderInfo.VERTEX_SHADER, v)
                testGL.createShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER, f)
                testGL.createProgramInfo(
                    tName,
                    testGL.getShaderInfo(tName, RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER),
                    function (target) {
                        target.uniforms.uDisplacementTexture = target['displacementInfo']
                        target.uniforms.uUseNormalTexture = 1
                        target.uniforms.uUseSpecularTexture = 1
                        target.uniforms.uUseDisplacementTexture = 1
                        target.uniforms.uShininess = 8
                        target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])

                        console.log('결과가', target)
                    }
                );
                for (var k in textureInfo) {
                    console.log('뭐가오냐', textureInfo[k])
                    console.log(textureInfo[k]['src'])
                    var tStc = textureInfo[k]['src']
                    switch (textureInfo[k]['textureIndex']) {
                        case RedTextureIndex.DIFFUSE:
                            tTextureDiffuse = testGL.createTextureInfo(tStc)
                            break
                        case RedTextureIndex.NORMAL:
                            tTextureNormal = testGL.createTextureInfo(tStc, RedTextureIndex.NORMAL)
                            break
                        case RedTextureIndex.SPECULAR:
                            tTextureSpecular = testGL.createTextureInfo(tStc, RedTextureIndex.SPECULAR)
                            break
                        case RedTextureIndex.DISPLACEMENT:
                            tTextureDisplacement = testGL.createTextureInfo(tStc, RedTextureIndex.DISPLACEMENT)
                            break
                        case RedTextureIndex.ETC1:
                            tEtc1 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC1)
                            break
                        case RedTextureIndex.ETC2:
                            tEtc2 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC2)
                            break
                        case RedTextureIndex.ETC3:
                            tEtc3 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC3)
                            break
                        case RedTextureIndex.ETC4:
                            tEtc4 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC4)
                            break
                    }
                }

                //     if (Recard.query('[nodeType="Final"] [key="DISPLACEMENT"]')['info']['from']) {
                //         tTextureDisplacement = testGL.createTextureInfo('../../asset/displacement.jpg', RedTextureIndex.DISPLACEMENT)
                //     }

                console.log(tTextureDiffuse, tTextureNormal, tTextureDisplacement, tTextureSpecular)
                
                    testGL.createMaterialDefine(testGL.getProgramInfo(tName))
                    var t2 = testGL.createMaterialInfo(tName)
                    for (var k in textureInfo) {
                        switch (textureInfo[k]['textureIndex']) {
                            case RedTextureIndex.DIFFUSE:
                                t2['diffuseInfo'] = tTextureDiffuse
                                t2.uniforms[textureInfo[k]['textureUniformKey']] = t2['diffuseInfo']
                                break
                            case RedTextureIndex.NORMAL:
                                t2['normalInfo'] = tTextureNormal
                                t2.uniforms[textureInfo[k]['textureUniformKey']] = t2['normalInfo']
                                break
                            case RedTextureIndex.SPECULAR:
                                t2['specularInfo'] = tTextureSpecular
                                t2.uniforms[textureInfo[k]['textureUniformKey']] = t2['specularInfo']
                                break
                            case RedTextureIndex.DISPLACEMENT:
                                t2['displacementInfo'] = tTextureDisplacement
                                break
                            case RedTextureIndex.ETC1:
                                t2[textureInfo[k]['textureUniformKey']] = tEtc1
                                t2.uniforms[textureInfo[k]['textureUniformKey']] = t2[textureInfo[k]['textureUniformKey']]
                                break
                            case RedTextureIndex.ETC2:
                                t2[textureInfo[k]['textureUniformKey']] = tEtc2
                                t2.uniforms[textureInfo[k]['textureUniformKey']] =t2[textureInfo[k]['textureUniformKey']]
                                break
                            case RedTextureIndex.ETC3:
                                t2[textureInfo[k]['textureUniformKey']] = tEtc3
                                t2.uniforms[textureInfo[k]['textureUniformKey']] =t2[textureInfo[k]['textureUniformKey']]
                                break
                            case RedTextureIndex.ETC4:
                                t2[textureInfo[k]['textureUniformKey']] = tEtc4
                                t2.uniforms[textureInfo[k]['textureUniformKey']] =t2[textureInfo[k]['textureUniformKey']]
                                break
                        }
                    }
                    console.log('결과가2', t2)
                    t2['needUniformList'] = true
                    tMesh.materialInfo = t2    
                } catch (error) {
                    console.log('재질생성실패!',error)
                }
                
            })()
        }
    })()
    result = {
        setTest: setTest,
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'top', 0,
                'left', 0,
                'width', 400,
                'height', 400,
                'overflow', 'hidden',
                'background', '#222',
                '>', testCvs = Recard.Dom('canvas').S(
                    '@width', 400,
                    '@height', 400
                ),
                '<', 'body'
            )
            testGL = RedGL(testCvs.__dom__, function () {
                testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('colorVS'))
                testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('colorFS'))
                testGL.createShaderInfo('skybox', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('skyBoxVS'))
                testGL.createShaderInfo('skybox', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('skyBoxFS'))
                testGL.createProgramInfo(
                    'color',
                    testGL.getShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
                    function (target) {
                        target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random(), 255])
                    }
                )
                testGL.createProgramInfo(
                    'skybox',
                    testGL.getShaderInfo('skybox', RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo('skybox', RedShaderInfo.FRAGMENT_SHADER),
                    function (target) {
                        target.uniforms.uSkybox = target['diffuseInfo']

                    }
                )
                testGL.createMaterialDefine(testGL.getProgramInfo('color'))
                testGL.createMaterialDefine(testGL.getProgramInfo('skybox'))
                // 카메라생성
                testCamera = testGL.createBaseCameraInfo('testCamera')
                // Scene 생성
                testScene = testGL.createSceneInfo('testScene', testCamera)
                // 스카이박스 생성
                testScene.setSkyBox(
                    testGL.createSkyBoxInfo([
                        '../../asset/cubemap/posx.jpg',
                        '../../asset/cubemap/negx.jpg',
                        '../../asset/cubemap/posy.jpg',
                        '../../asset/cubemap/negy.jpg',
                        '../../asset/cubemap/posz.jpg',
                        '../../asset/cubemap/negz.jpg'
                    ])
                )
                testMat = testGL.createMaterialInfo('color')
                tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.sphere(testGL, 10, 32, 32, 32), testMat)
                // tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.cube(testGL, 15,15,15, 32, 32, 32), testMat)

                testScene.children.push(tMesh)
                var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
                    testCamera.setPosition(Math.sin(time / 3000) * 60, 60, Math.cos(time / 5000) * 40)
                    testCamera.lookAt([0, 0, 0])
                    var i = testScene['lights']['directional'].length
                    while (i--) {
                        testScene['lights']['directional'][i].direction[0] = Math.sin(time / 1700 + Math.PI*2/2*i) * 30
                        testScene['lights']['directional'][i].direction[1] = Math.cos(time / 4400 + Math.PI*2/2*i) * 20 + Math.sin(time / 2700 + Math.PI*2/2*i) * 50
                        testScene['lights']['directional'][i].direction[2] = Math.sin(time / 2200 + Math.PI*2/2*i) * 30
                    }
                })
                // 엠비언트 라이트 테스트
                var testLight = testGL.createAmbientLight(testGL)
             
                console.log(testLight)
                testScene.addLight(testLight)

                // 디렉셔널 라이트 테스트
                var i = 1
                while (i--) {
                    var testLight = testGL.createDirectionalLight(testGL)
                    testLight.direction[0] = -1
                    testLight.direction[1] = -1
                    testLight.direction[2] = 0
                    // testLight.color[0] = Math.random()
                    // testLight.color[1] = Math.random()
                    // testLight.color[2] = Math.random()
                    testScene.addLight(testLight)

                }
                renderer.start()
                // Recard.WIN_RESIZER.add('testGL',function(){
                //     testGL.setSize(400,document.body.clientHeight)
                // })
                // testGL.setSize(400,document.body.clientHeight)
            }, false, [
                    { id: 'colorVS', src: '../../glsl/colorVS.glsl' },
                    { id: 'colorFS', src: '../../glsl/colorFS.glsl' },
                    { id: 'skyBoxVS', src: '../../glsl/skyBoxVS.glsl' },
                    { id: 'skyBoxFS', src: '../../glsl/skyBoxFS.glsl' }
                ])

        }
    }

    return result
})())