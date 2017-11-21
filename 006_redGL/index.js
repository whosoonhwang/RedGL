"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)

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
console.log(testGL.createArrayBufferInfo(
	'testBuffer',
	'aVertexPosition',
	testData,
	3, 24, testGL.gl.FLOAT
))
// 인덱스 버퍼생성
console.log(testGL.createIndexBufferInfo(
	'testIndexBuffer',
	testData2,
	1, testData2.length, testGL.gl.UNSIGNED_SHORT
))
// 쉐이더생성
console.log(testGL.createShaderInfo('basic', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs')))
console.log(testGL.createShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs')))
// 프로그램생성
testGL.createProgramInfo(
	'basic',
	testGL.createShaderInfo('basic', RedShaderInfo.VERTEX_SHADER),
	testGL.createShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER)
)
// 지오메트리생성
console.log(testGL.createGeometryInfo('testGeo', testGL.getArrayBufferInfo('testBuffer'), testGL.getIndexBufferInfo('testIndexBuffer')))
// 프로그램생성
console.log(testGL.getProgramInfo('basic'))
// 재질정의
var testMatDefine = RedMaterialDefine(testGL, testGL.getProgramInfo('basic'))
// 재질생성
var testMat = RedMaterialInfo(testGL, 'basic')
console.log(testMat)
console.log(testMatDefine)
// 메쉬 생성 테스트
console.log(testGL.createMeshInfo('testMesh', testGL.getGeometryInfo('testGeo'), testMat))
// Scene 생성
var testScene = RedSceneInfo(testGL, 'testScene')
console.log(testScene)
///////////////////////////////////////////////////////////////////////////////////////////
// 데모
var i = 100, i2,i3;
while (i--) {
	var tMesh = testGL.createMeshInfo('testMesh' + i, testGL.getGeometryInfo('testGeo'), RedMaterialInfo(testGL, 'basic'))
	tMesh.position[0] = Math.random() * 80 - 40
	tMesh.position[1] = Math.random() * 80 - 40
	tMesh.position[2] = -55 - Math.random()*30
	tMesh.rotation[0] = Math.random()*Math.PI*2
	tMesh.rotation[1] = Math.random()*Math.PI*2
	tMesh.rotation[2] = Math.random()*Math.PI*2
	i2 = 6
	while (i2--) {		
		var tSub = testGL.createMeshInfo('testMesh_' + i + '_' + i2, testGL.getGeometryInfo('testGeo'), RedMaterialInfo(testGL, 'basic'))
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
			var tSub = testGL.createMeshInfo('testMesh_' + i + '_' + i2+'_'+i3, testGL.getGeometryInfo('testGeo'), RedMaterialInfo(testGL, 'basic'))
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
var checkCall = document.createElement('div')
document.body.appendChild(checkCall)
checkCall.style.position = 'absolute'
checkCall.style.left ='10px'
checkCall.style.top ='10px'
checkCall.style.color = '#fff'
var renderer = RedRender(testGL, testScene, function (time) {
	i = testScene.children.length
	var tMesh,tMesh2,tMesh3
	var SIN, COS
	SIN = Math.sin
	COS = Math.cos
	while (i--) {
		tMesh = testScene.children[i]
		tMesh.rotation[0] += 0.01
		tMesh.rotation[1] += 0.01
		tMesh.rotation[2] += 0.01
		i2 = tMesh.children.length
		while (i2--) {
			tMesh2 = tMesh.children[i2]
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
	checkCall.innerHTML = 'numDrawCall : '+renderer.numDrawCall
})
renderer.start()
