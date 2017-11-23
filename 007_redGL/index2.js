"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)

var testData, testData2, testData3
testData = new Float32Array([

	-1.0, -1.0, 1.0,
	1.0, -1.0, 1.0,
	1.0, 1.0, 1.0,
	-1.0, 1.0, 1.0,


	-1.0, -1.0, -1.0,
	-1.0, 1.0, -1.0,
	1.0, 1.0, -1.0,
	1.0, -1.0, -1.0,


	-1.0, 1.0, -1.0,
	-1.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 1.0, -1.0,


	-1.0, -1.0, -1.0,
	1.0, -1.0, -1.0,
	1.0, -1.0, 1.0,
	-1.0, -1.0, 1.0,


	1.0, -1.0, -1.0,
	1.0, 1.0, -1.0,
	1.0, 1.0, 1.0,
	1.0, -1.0, 1.0,


	-1.0, -1.0, -1.0,
	-1.0, -1.0, 1.0,
	-1.0, 1.0, 1.0,
	-1.0, 1.0, -1.0
])
testData2 = new Uint16Array([
	0, 1, 2, 0, 2, 3,
	4, 5, 6, 4, 6, 7,
	8, 9, 10, 8, 10, 11,
	12, 13, 14, 12, 14, 15,
	16, 17, 18, 16, 18, 19,
	20, 21, 22, 20, 22, 23
])
testData3 = new Float32Array([
	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0,

	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0,
	0.0, 0.0,

	0.0, 1.0,
	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0,

	1.0, 1.0,
	0.0, 1.0,
	0.0, 0.0,
	1.0, 0.0,

	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0,
	0.0, 0.0,

	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0
])

//  버텍스버퍼생성
console.log(testGL.createArrayBufferInfo(
	'testBuffer',
	'aVertexPosition',
	testData,
	3, 24, testGL.gl.FLOAT
))
console.log(testGL.createArrayBufferInfo(
	'testUv',
	'aTexcoord',
	testData3,
	2, testData3.length / 2, testGL.gl.FLOAT
))
// 인덱스 버퍼생성
console.log(testGL.createIndexBufferInfo(
	'testIndexBuffer',
	testData2,
	1, testData2.length, testGL.gl.UNSIGNED_SHORT
))
// 쉐이더생성
console.log(testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs')))
console.log(testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs')))
console.log(testGL.createShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-bitmap')))
console.log(testGL.createShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-bitmap')))
// 프로그램생성
testGL.createProgramInfo(
	'color',
	testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
	testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])
	}
)
testGL.createProgramInfo(
	'bitmap',
	testGL.createShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER),
	testGL.createShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uTexture = target['diffuseInfo']
		target.uniforms.uAtlascoord =  RedAtlasUVInfo([0, 0, 1, 1])
	}
)
// 지오메트리생성
console.log(testGL.createGeometryInfo(
	'testGeo',
	testGL.getArrayBufferInfo('testBuffer'),
	testGL.getIndexBufferInfo('testIndexBuffer')
	, testGL.getArrayBufferInfo('testUv')
))
// 프로그램조회
console.log(testGL.getProgramInfo('color'))
console.log(testGL.getProgramInfo('bitmap'))
// 재질정의
var testMatDefine = RedMaterialDefine(testGL, testGL.getProgramInfo('color'))
RedMaterialDefine(testGL, testGL.getProgramInfo('bitmap'))
// 재질생성
var testColorMat = RedMaterialInfo(testGL, 'color')
var testTexture = RedTextureInfo(testGL, 'asset/crate.png')
var testTexture2 = RedTextureInfo(testGL, 'asset/test.png')
console.log(testTexture)
var testMatBitmap = RedMaterialInfo(testGL, 'bitmap', testTexture)
var testMatBitmap2 = RedMaterialInfo(testGL, 'bitmap', testTexture2)

console.log(testColorMat)
console.log(testMatBitmap)
console.log(testMatDefine)
// Scene 생성
var testScene = RedSceneInfo(testGL, 'testScene')
console.log(testScene)
var tMesh = testGL.createMeshInfo('testMesh', testGL.getGeometryInfo('testGeo'), testMatBitmap)
tMesh.position[2] = -20
testScene.children.push(tMesh)
console.log(tMesh)
var checkCall = document.createElement('div')
document.body.appendChild(checkCall)
checkCall.style.position = 'absolute'
checkCall.style.left = '10px'
checkCall.style.top = '10px'
checkCall.style.color = '#fff'
var renderer = RedRender(testGL, testScene, function (time) {
	testScene.children[0].rotation[0] +=0.005
	testScene.children[0].rotation[1] +=0.005
	testScene.children[0].rotation[2] +=0.005
	checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
})
renderer.start()
