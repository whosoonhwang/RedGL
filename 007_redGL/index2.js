"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)

var testData, testData2, testData3,testData4
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
testData4 = new Float32Array([
	// Front face
	0.0,  0.0,  1.0,
	0.0,  0.0,  1.0,
	0.0,  0.0,  1.0,
	0.0,  0.0,  1.0,

   // Back face
	0.0,  0.0, -1.0,
	0.0,  0.0, -1.0,
	0.0,  0.0, -1.0,
	0.0,  0.0, -1.0,

   // Top face
	0.0,  1.0,  0.0,
	0.0,  1.0,  0.0,
	0.0,  1.0,  0.0,
	0.0,  1.0,  0.0,

   // Bottom face
	0.0, -1.0,  0.0,
	0.0, -1.0,  0.0,
	0.0, -1.0,  0.0,
	0.0, -1.0,  0.0,

   // Right face
	1.0,  0.0,  0.0,
	1.0,  0.0,  0.0,
	1.0,  0.0,  0.0,
	1.0,  0.0,  0.0,

   // Left face
   -1.0,  0.0,  0.0,
   -1.0,  0.0,  0.0,
   -1.0,  0.0,  0.0,
   -1.0,  0.0,  0.0
])

//  버텍스버퍼생성
console.log(testGL.createArrayBufferInfo(
	'testBuffer',
	'aVertexPosition',
	testData,
	3, testData.length/3, testGL.gl.FLOAT
))
//  너말버퍼생성
console.log(testGL.createArrayBufferInfo(
	'testNormalBuffer',
	'aVertexNormal',
	testData4,
	3, testData4.length/3, testGL.gl.FLOAT
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

console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-bitmap-light')))
console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-bitmap-light')))
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
testGL.createProgramInfo(
	'bitmapLite',
	testGL.createShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER),
	testGL.createShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uTexture = target['diffuseInfo']
		target.uniforms.uAtlascoord =  RedAtlasUVInfo([0, 0, 1, 1])
	}
)
// 지오메트리생성
console.log(testGL.createGeometryInfo(
	'testGeo',
	testGL.getArrayBufferInfo('testBuffer'),
	testGL.getIndexBufferInfo('testIndexBuffer'),
	testGL.getArrayBufferInfo('testUv'),
	testGL.getArrayBufferInfo('testNormalBuffer')
))
// 프로그램조회
console.log(testGL.getProgramInfo('color'))
console.log(testGL.getProgramInfo('bitmap'))
// 재질정의
var testMatDefine = RedMaterialDefine(testGL, testGL.getProgramInfo('color'))
RedMaterialDefine(testGL, testGL.getProgramInfo('bitmap'))
RedMaterialDefine(testGL, testGL.getProgramInfo('bitmapLite'))
// 재질생성
var testColorMat = RedMaterialInfo(testGL, 'color')
var testTexture = RedTextureInfo(testGL, 'asset/crate.png')
var testTexture2 = RedTextureInfo(testGL, 'asset/test.png')
console.log(testTexture)
var testMatBitmap = RedMaterialInfo(testGL, 'bitmapLite', testTexture)
var testMatBitmap2 = RedMaterialInfo(testGL, 'bitmapLite', testTexture2)

console.log(testColorMat)
console.log(testMatBitmap)
console.log(testMatDefine)
// Scene 생성
var testScene = RedSceneInfo(testGL, 'testScene')
console.log(testScene)
var i2 = 100
while(i2--){
	var tMesh = testGL.createMeshInfo('testMesh'+i2, testGL.getGeometryInfo('testGeo'), testMatBitmap)
	tMesh.position[0] = Math.random()*50-25
	tMesh.position[1] = Math.random()*50-25
	tMesh.position[2] = -Math.random()*50-25
	tMesh.rotation[0] = Math.random()*Math.PI*2
	tMesh.rotation[1] = Math.random()*Math.PI*2
	tMesh.rotation[2] = Math.random()*Math.PI*2
	testScene.children.push(tMesh)
}
console.log(tMesh)
var checkCall = document.createElement('div')
document.body.appendChild(checkCall)
checkCall.style.position = 'absolute'
checkCall.style.left = '10px'
checkCall.style.top = '10px'
checkCall.style.color = '#fff'
var renderer = RedRender(testGL, testScene, function (time) {
	i2 = testScene.children.length
	while(i2--){
		var tMesh = testScene.children[i2]
		tMesh.rotation[0] +=0.005
		tMesh.rotation[1] +=0.005
		tMesh.rotation[2] +=0.005
	}
	checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
})
renderer.start()
