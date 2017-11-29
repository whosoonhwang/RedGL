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
		target.uniforms.uShininess = new Float32Array([32])
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
var tMesh = testGL.createMeshInfo('testMeshAdd1', RedPrimitive.cube(testGL,2,2,2,6,6,6), testMatBitmap)
var tMesh2 = testGL.createMeshInfo('testMeshAdd2', RedPrimitive.cube(testGL,2,2,2,6,6,6), testMatBitmap)
tMesh2.rotation[0] = Math.random() * Math.PI * 2
// tMesh2.rotation[1] = Math.random() * Math.PI * 2
tMesh2.rotation[2] = Math.random() * Math.PI * 2
var tMesh3 = testGL.createMeshInfo('testMeshAdd3', RedPrimitive.cube(testGL,2,2,2,6,6,6), testMatBitmap)
tMesh2.position[0] = -3
tMesh3.position[0] = 3
tMesh3.rotation[0] = Math.random() * Math.PI * 2
// tMesh3.rotation[1] = Math.random() * Math.PI * 2
tMesh3.rotation[2] = Math.random() * Math.PI * 2
testScene.children.push(tMesh)
testScene.children.push(tMesh2)
testScene.children.push(tMesh3)
var checkCall = document.createElement('div')
document.body.appendChild(checkCall)
checkCall.style.position = 'absolute'
checkCall.style.left = '10px'
checkCall.style.top = '10px'
checkCall.style.color = '#fff'
var grid = testGL.createMeshInfo('grid1', RedPrimitive.grid(testGL), RedMaterialInfo(testGL, 'color'))
grid.drawMode = testGL.gl.LINES
console.log(grid)
testScene.setGrid(grid)



var i = 3
while (i--) {

	var testLight = RedLightInfo(testGL, RedLightInfo.DIRECTIONAL)
	testLight.direction[0] = Math.random() * 10 - 5
	testLight.direction[1] = Math.random() * 10 - 5
	testLight.direction[2] = Math.random() * 10 - 5
	testLight.color[0] = 255 * Math.random()
	testLight.color[1] = 255 * Math.random()
	testLight.color[2] = 255 * Math.random()
	console.log(testLight.color)
	testScene.addLight(testLight)
}

var renderer = RedRender(testGL, testScene, function (time) {
	testCamera.setPosition(Math.sin(time / 1000) * 20, 20, Math.cos(time / 1000) * 20)
	testCamera.lookAt(tMesh.position)
	i = testScene['lights']['directional'].length
	while(i--){
		testScene['lights']['directional'][i].setPosition(Math.sin(time / 700) * 20, Math.cos(time / 700) * 20, Math.cos(time / 700) * 20)
	}
	checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
})
renderer.start()

