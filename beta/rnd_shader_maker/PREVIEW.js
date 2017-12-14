
'use strict';
var testGL
Recard.static('PREVIEW', (function () {
    var result;
    var rootBox
    var testCvs
    var testScene, testCamera
    var testMat, tMesh
    var setTest
    setTest = (function(){
        var index;
        index = 1
        return function(v,f,unifromInfo){
            console.log('실행')
            var tName = 'testShader' + index
            index++
            v = `attribute vec3 aVertexPosition;
attribute vec2 aTexcoord;
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;   
uniform mat4 uPMatrix;
uniform vec4 uAtlascoord;
varying vec2 vTexcoord;  
void main(void) {
gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
}`
            console.log('~~~~~~~~~~~')
            f = 'precision lowp float;\n'+f
            console.log(v)
            console.log(f)
            console.log(unifromInfo)
            testGL.createShaderInfo(tName, RedShaderInfo.VERTEX_SHADER, v)
            testGL.createShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER, f)
            testGL.createProgramInfo(
                tName,
                testGL.getShaderInfo(tName, RedShaderInfo.VERTEX_SHADER),
                testGL.getShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER),
                function (target) {
                    unifromInfo = JSON.parse(JSON.stringify(unifromInfo))
                    unifromInfo.forEach(function(data){
                        console.log(data)
                        if (data['dataType'] == 'sampler2D') target.uniforms[data['name']] = target['diffuseInfo']
                    })
                    
                    target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
                }
            )
            var tTextrue = testGL.createTextureInfo(index%2 ? '../asset/tile/diffuse.png' : '../asset/draft1.png')
            testGL.createMaterialDefine(testGL.getProgramInfo(tName))
            var t2 = testGL.createMaterialInfo(tName,tTextrue)
 
            tMesh.materialInfo = t2
        }
    })()
    result = {
        setTest : setTest,
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'z-index', 10,
                'top', 0,
                'right', 0,
                'width', 400,
                'height', 400,
                'background', '#000',
                '>', testCvs = Recard.Dom('canvas').S(
                    '@width', 400,
                    '@height', 400,
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
                        '../asset/cubemap/posx.jpg',
                        '../asset/cubemap/negx.jpg',
                        '../asset/cubemap/posy.jpg',
                        '../asset/cubemap/negy.jpg',
                        '../asset/cubemap/posz.jpg',
                        '../asset/cubemap/negz.jpg'
                    ])
                )
                testMat = testGL.createMaterialInfo('color')
                tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.sphere(testGL, 10, 32, 32, 32), testMat)
         
                testScene.children.push(tMesh)
                var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
                    testCamera.setPosition(Math.sin(time / 3000) * 60, 60, Math.cos(time / 5000) * 40)
                    testCamera.lookAt([0, 0, 0])
                })
                renderer.start()
            }, false, [
                    { id: 'colorVS', src: '../glsl/colorVS.glsl' },
                    { id: 'colorFS', src: '../glsl/colorFS.glsl' },
                    { id: 'skyBoxVS', src: '../glsl/skyBoxVS.glsl' },
                    { id: 'skyBoxFS', src: '../glsl/skyBoxFS.glsl' }
                ])

        }
    }
    return result
})())