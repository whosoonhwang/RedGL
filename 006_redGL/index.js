"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)
console.log(testGL.createShader('basic', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs')))
console.log(testGL.createShader('basic', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs')))
testGL.createProgram(
	'basic',
	testGL.createShader('basic', RedShaderInfo.VERTEX_SHADER),
	testGL.createShader('basic', RedShaderInfo.FRAGMENT_SHADER)
)
var testData, testData2;
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

//  버텍스버퍼생성
console.log(testGL.createArrayBuffer(
	'testBuffer',
	'aVertexPosition',
	testData,
	3, 24, testGL.gl.FLOAT
))
// 인덱스 버퍼생성
console.log(testGL.createIndexBuffer(
	'testIndexBuffer',
	testData2,
	1, testData2.length, testGL.gl.UNSIGNED_SHORT
))
// 지오메트리생성
console.log(testGL.createGeometryInfo('testGeo', testGL.getArrayBuffer('testBuffer'), testGL.getIndexBuffer('testIndexBuffer')))
// 프로그램생성
console.log(testGL.createProgram('basic'))
// 재질정의
var testMatDefine = RedMaterialDefine(testGL, testGL.getProgramInfo('basic'))
// 재질생성
var testMat = RedMaterialInfo(testGL, 'basic')
console.log(testMat)
console.log(testMatDefine)
// 메쉬 생성 테스트
console.log(testGL.createMesh('testMesh', testGL.getGeometryInfo('testGeo'), testMat))
// Scene 생성
var testScene = RedSceneInfo(testGL, 'testScene')
console.log(testScene)
///////////////////////////////////////////////////////////////////////////////////////////
// 데모
var i = 100, i2,i3;
while (i--) {
	var tMesh = testGL.createMesh('testMesh' + i, testGL.getGeometryInfo('testGeo'), RedMaterialInfo(testGL, 'basic'))
	tMesh.position[0] = Math.random() * 80 - 40
	tMesh.position[1] = Math.random() * 80 - 40
	tMesh.position[2] = -55 - Math.random()*30
	tMesh.rotation[0] = Math.random()*Math.PI*2
	tMesh.rotation[1] = Math.random()*Math.PI*2
	tMesh.rotation[2] = Math.random()*Math.PI*2
	i2 = 6
	while (i2--) {		
		var tSub = testGL.createMesh('testMesh_' + i + '_' + i2, testGL.getGeometryInfo('testGeo'), RedMaterialInfo(testGL, 'basic'))
		tSub.position[0] = Math.random()*20-10
		tSub.position[1] = Math.random()*20-10
		tSub.position[2] = Math.random()*20-10
		var tScale = Math.random() + 0.1
		tSub.scale[0] = tScale
		tSub.scale[1] = tScale
		tSub.scale[2] = tScale
		tMesh.children.push(tSub)
		i3 = 5
		while (i3--) {		
			var tSub = testGL.createMesh('testMesh_' + i + '_' + i2+'_'+i3, testGL.getGeometryInfo('testGeo'), RedMaterialInfo(testGL, 'basic'))
			tSub.position[0] = Math.random()*20-10
			tSub.position[1] = Math.random()*20-10
			tSub.position[2] = Math.random()*20-10
			var tScale = Math.random() + 0.1
			tSub.scale[0] = tScale
			tSub.scale[1] = tScale
			tSub.scale[2] = tScale
			tMesh.children.push(tSub)
		}
	}
	testScene.children.push(tMesh)
}
var renderer = RedRender(testGL, testScene, function (time) {
	i = testScene.children.length
	var tMesh,tMesh2,tMesh3
	var SIN, COS
	SIN = Math.sin
	COS = Math.cos
	while (i--) {
		tMesh = testScene.children[i]
		// tMesh.position[0] = SIN(i + time / 6000 + tMesh.rotation[0]) * 30 + COS(i + time / 2000) * 15
		// tMesh.position[1] = COS(i + time / 3000 + tMesh.rotation[1]) * 30 + COS(i + time / 3000) * 5
		// tMesh.position[2] = SIN(i + time / 1000 + tMesh.rotation[2]) * 10 - 75
		tMesh.rotation[0] += 0.01
		tMesh.rotation[1] += 0.01
		tMesh.rotation[2] += 0.01
		i2 = tMesh.children.length
		while (i2--) {
			tMesh2 = tMesh.children[i2]
			// tMesh.position[0] = SIN(i + time / 6000 + tMesh.rotation[0]) * 30 + COS(i + time / 2000) * 15
			// tMesh.position[1] = COS(i + time / 3000 + tMesh.rotation[1]) * 30 + COS(i + time / 3000) * 5
			// tMesh.position[2] = SIN(i + time / 1000 + tMesh.rotation[2]) * 10 - 75
			tMesh2.rotation[0] += 0.03
			tMesh2.rotation[1] += 0.03
			tMesh2.rotation[2] += 0.03
			i3 = tMesh2.children.length
			while (i3--) {
				tMesh3 = tMesh2.children[i3]
			
				tMesh3.rotation[0] += 0.03
				tMesh3.rotation[1] += 0.03
				tMesh3.rotation[2] += 0.03
			}
		}
	}
})
renderer.start()
