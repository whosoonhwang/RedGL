"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)
console.log(testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs')))
console.log(testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs')))

console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-bitmap-light')))
console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-bitmap-light')))
testGL.createProgramInfo(
	'color',
	testGL.getShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])
	}
)
testGL.createProgramInfo(
	'bitmapLite',
	testGL.getShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uTexture = target['diffuseInfo']
		target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
	}
)
// 카메라생성
var testCamera = RedBaseCamera(testGL, 'testCamera')
// Scene 생성
var testScene = testGL.createSceneInfo('testScene', testCamera)
// 재질정의
testGL.createMaterialDefine(testGL.getProgramInfo('color'))
RedMaterialDefine(testGL, testGL.getProgramInfo('bitmapLite'))

// 재질생성
var testTexture = RedTextureInfo(testGL, 'asset/crate.png')
var testMatBitmap = RedMaterialInfo(testGL, 'bitmapLite', testTexture)
var tMesh = testGL.createMeshInfo('testMeshAdd1', RedPrimitive.cube(testGL), testMatBitmap)

var tMesh2 = testGL.createMeshInfo('testMeshAdd2', RedPrimitive.cube(testGL), testMatBitmap)
var tMesh3 = testGL.createMeshInfo('testMeshAdd3', RedPrimitive.cube(testGL), testMatBitmap)
tMesh2.position[0] = -2
tMesh3.position[0] = 2
testScene.children.push(tMesh)
testScene.children.push(tMesh2)
testScene.children.push(tMesh3)
var checkCall = document.createElement('div')
document.body.appendChild(checkCall)
checkCall.style.position = 'absolute'
checkCall.style.left = '10px'
checkCall.style.top = '10px'
checkCall.style.color = '#fff'
var grid = testGL.createMeshInfo('grid1', RedPrimitive.floor(testGL), testColorMat)
grid.drawMode = testGL.gl.LINES
console.log(grid)
testScene.setGrid(grid)
var renderer = RedRender(testGL, testScene, function (time) {
	testCamera.setPosition(Math.sin(time / 1000) * 20, 20, Math.cos(time / 1000) * 20)
	testCamera.lookAt(tMesh.position)
	checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
})
renderer.start()