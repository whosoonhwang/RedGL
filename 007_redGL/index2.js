"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)

var testData, testData2, testData3,testData4,testData5
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
	RedFixedAttributeKey['aVertexPosition'],
	testData,
	3, testData.length/3, testGL.gl.FLOAT
))
// //  너말버퍼생성
// console.log(testGL.createArrayBufferInfo(
// 	'testNormalBuffer',
// 	'aVertexNormal',
// 	testData4,
// 	3, testData4.length/3, testGL.gl.FLOAT
// ))
console.log(testGL.createArrayBufferInfo(
	'testUv',
	RedFixedAttributeKey['aTexcoord'],
	testData3,
	2, testData3.length / 2, testGL.gl.FLOAT
))
// 인덱스 버퍼생성
console.log(testGL.createIndexBufferInfo(
	'testIndexBuffer',
	testData2,
	1, testData2.length, testGL.gl.UNSIGNED_SHORT
))

//  너말버퍼생성
console.log(testGL.createArrayBufferInfo(
	'testNormalBuffer',
	RedFixedAttributeKey['aVertexNormal'],
	testGL.calcNormal(
		testData,
		testData2
	),
	3, testData4.length/3, testGL.gl.FLOAT
))

function cube(splitX, splitY, splitZ) {
	var _segmentsW,_segmentsH,_segmentsD;
	var vs,is,uv;
	var tl, tr, bl, br, i, j, inc = 0;
	var vidx, fidx,uvidx; // is
	var hw, hh, hd; // halves
	var dw, dh, dd; // deltas
	var outer_pos;
	var u_tile_dim, v_tile_dim, u_tile_step, v_tile_step;
	var tl0u, tl0v, tl1u, tl1v,du, dv;
	_segmentsW = arguments[0] || 1, _segmentsH = arguments[1] || 1, _segmentsD = arguments[2] || 1,
		vs = [],is = [],uv = []
		vidx = 0, fidx = 0,uvidx=0// is
		hw = 1 / 2, hh = 1 / 2, hd = 1 / 2,// half cube dimensions
		dw = 1 / _segmentsW, dh = 1 / _segmentsH, dd = 1 / _segmentsD,// Segment dimensions
		u_tile_dim = 1, v_tile_dim = 1, u_tile_step = 0, v_tile_step = 0;
	tl0u = u_tile_step, tl0v = v_tile_step, tl1u = 2 * u_tile_step, tl1v = 0, du = u_tile_dim / _segmentsW, dv = v_tile_dim / _segmentsH;

	if (_segmentsW == 0 && _segmentsH == 0, _segmentsD == 0) this.error(0);

	for (i = 0; i <= _segmentsW; i++) {
		outer_pos = -hw + i*dw;
		for (j = 0; j <= _segmentsH; j++) {
			// front
			vs[vidx++] = outer_pos,vs[vidx++] = -hh + j*dh,vs[vidx++] = -hd,
			uv[uvidx++] = 1-( tl0u + i*du ),uv[uvidx++] = ( tl0v + (v_tile_dim - j*dv)),
				// back
				vs[vidx++] = outer_pos, vs[vidx++] = -hh + j * dh, vs[vidx++] = hd,
				uv[uvidx++] = 1-( tl1u + (u_tile_dim - i * du)), uv[uvidx++] = ( tl1v + (v_tile_dim - j * dv));
			if (i && j) tl = 2 * ((i - 1) * (_segmentsH + 1) + (j - 1)), tr = 2 * (i * (_segmentsH + 1) + (j - 1)), bl = tl + 2, br = tr + 2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr + 1, is[fidx++] = br + 1, is[fidx++] = bl + 1, is[fidx++] = tr + 1, is[fidx++] = bl + 1, is[fidx++] = tl + 1;
		}
	}
	inc += 2 * (_segmentsW + 1) * (_segmentsH + 1), tl0u = u_tile_step, tl0v = 0, tl1u = 0, tl1v = 0, du = u_tile_dim / _segmentsW, dv = v_tile_dim / _segmentsD;
	for (i = 0; i <= _segmentsW; i++) {
		outer_pos = -hw + i*dw;
		for (j = 0; j <= _segmentsD; j++) {
			// top
			vs[vidx++] = outer_pos, vs[vidx++] = hh, vs[vidx++] = -hd + j * dd,
			uv[uvidx++] = 1-( tl0u + i * du), uv[uvidx++] = ( tl0v + (v_tile_dim - j * dv)),
				// bottom
				vs[vidx++] = outer_pos, vs[vidx++] = -hh, vs[vidx++] = -hd + j * dd,
				uv[uvidx++] = 1-( tl1u + i * du), uv[uvidx++] = ( tl1v + j * dv);
			if (i && j) tl = inc + 2 * ((i - 1) * (_segmentsD + 1) + (j - 1)), tr = inc + 2 * (i * (_segmentsD + 1) + (j - 1)), bl = tl + 2, br = tr + 2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr + 1, is[fidx++] = br + 1, is[fidx++] = bl + 1, is[fidx++] = tr + 1, is[fidx++] = bl + 1, is[fidx++] = tl + 1;
		}
	}
	inc += 2 * (_segmentsW + 1) * (_segmentsD + 1), tl0u = 0, tl0v = v_tile_step, tl1u = 2 * u_tile_step, tl1v = v_tile_step, du = u_tile_dim / _segmentsD, dv = v_tile_dim / _segmentsH;
	for (i = 0; i <= _segmentsD; i++) {
		outer_pos = hd - i*dd;
		for (j = 0; j <= _segmentsH; j++) {
			// left
			vs[vidx++] = -hw, vs[vidx++] = -hh + j * dh, vs[vidx++] = outer_pos,
			uv[uvidx++] = 1-( tl0u + i*du),uv[uvidx++] = ( tl0v + (v_tile_dim - j*dv));
			// right
			vs[vidx++] = hw, vs[vidx++] = -hh + j * dh, vs[vidx++] = outer_pos;
			uv[uvidx++] = 1-( tl1u + (u_tile_dim - i * du)), uv[uvidx++] = ( tl1v + (v_tile_dim - j * dv));
			if (i && j) tl = inc + 2 * ((i - 1) * (_segmentsH + 1) + (j - 1)), tr = inc + 2 * (i * (_segmentsH + 1) + (j - 1)), bl = tl + 2, br = tr + 2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr + 1, is[fidx++] = br + 1, is[fidx++] = bl + 1, is[fidx++] = tr + 1, is[fidx++] = bl + 1, is[fidx++] = tl + 1;
		}
	}
	return [new Float32Array(vs), new Uint16Array(is), new Float32Array(uv)]
}
var testPrimitiveData = cube()
console.log(testPrimitiveData)
console.log(testGL.createArrayBufferInfo(
	'testBuffer1',
	RedFixedAttributeKey['aVertexPosition'],
	testPrimitiveData[0],
	3, testPrimitiveData[0].length / 3, testGL.gl.FLOAT
))
// 인덱스 버퍼생성
console.log(testGL.createIndexBufferInfo(
	'testIndexBuffer1',
	testPrimitiveData[1],
	1, testPrimitiveData[1].length, testGL.gl.UNSIGNED_SHORT
))

//  너말버퍼생성
console.log(testGL.createArrayBufferInfo(
	'testNormalBuffer1',
	RedFixedAttributeKey['aVertexNormal'],
	testGL.calcNormal(
		testPrimitiveData[0],
		testPrimitiveData[1]
	),
	3, testPrimitiveData[0].length/3, testGL.gl.FLOAT
))
//  uv
console.log(testGL.createArrayBufferInfo(
	'testUv1',
	RedFixedAttributeKey['aTexcoord'],
	testPrimitiveData[2],
	2, testPrimitiveData[2].length/2, testGL.gl.FLOAT
))
testGL.createGeometryInfo(
	'cube',
	testGL.getArrayBufferInfo('testBuffer1'),
	testGL.getIndexBufferInfo('testIndexBuffer1'),
	testGL.getArrayBufferInfo('testUv1'),
	testGL.getArrayBufferInfo('testNormalBuffer1')
)

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
	testGL.getShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])
	}
)
testGL.createProgramInfo(
	'bitmap',
	testGL.getShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uTexture = target['diffuseInfo']
		target.uniforms.uAtlascoord = RedAtlasUVInfo([0,0,1,1])
	}
)

testGL.createProgramInfo(
	'bitmapLite',
	testGL.getShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER),
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
// 메쉬 생성 테스트
console.log(testGL.createMeshInfo('testMesh', testGL.getGeometryInfo('testGeo'), testColorMat))
// 카메라생성
var testCamera = RedBaseCamera(testGL,'testCamera')
// Scene 생성
var testScene = testGL.createSceneInfo('testScene',testCamera)
console.log(testScene)
// 아틀라스테스트
 RedAtlasTextureManager(testGL, [
	'asset/draft1.png',
	'asset/draft2.png',
	'asset/draft3.png',
	'asset/draft4.png',
	'asset/draft5.png',
	'asset/test.png',
],function(){
	var testMatBitmap3 = RedMaterialInfo(testGL, 'bitmapLite', RedAtlasTextureManager.getByKey('asset/test.png'))
	var testMatBitmap4 = RedMaterialInfo(testGL, 'bitmapLite', RedAtlasTextureManager.getByKey('asset/draft1.png'))
	var testMatBitmap5 = RedMaterialInfo(testGL, 'bitmapLite', RedAtlasTextureManager.getByKey('asset/draft2.png'))
	var testMatBitmap6 = RedMaterialInfo(testGL, 'bitmapLite', RedAtlasTextureManager.getByKey('asset/draft3.png'))
	var testMatBitmap7 = RedMaterialInfo(testGL, 'bitmapLite', RedAtlasTextureManager.getByKey('asset/draft4.png'))
	var testMatBitmap8 = RedMaterialInfo(testGL, 'bitmapLite', RedAtlasTextureManager.getByKey('asset/draft5.png'))
	setTimeout(function(){
		var testAtlas2 =RedAtlasTextureManager(testGL, 'asset/addTest.png',function(){
			console.log('아틀라스 추가!되었음!')
			var i = 90, i2, i3;
			while (i--) {
				var testMatBitmap9 = RedMaterialInfo(testGL, 'bitmapLite', RedAtlasTextureManager.getByKey('asset/addTest.png'))
				var tMesh = testGL.createMeshInfo('testMeshAdd' + i, testGL.getGeometryInfo('cube'), testMatBitmap9)
				tMesh.position[0] = Math.random() * 40 -20
				tMesh.position[1] = Math.random() * 40 -20
				tMesh.position[2] = -15 - Math.random() * 10
				tMesh.rotation[0] = Math.random() * Math.PI * 2
				tMesh.rotation[1] = Math.random() * Math.PI * 2
				tMesh.rotation[2] = Math.random() * Math.PI * 2
			
				testScene.children.push(tMesh)
			}
		})
	},3000)
	///////////////////////////////////////////////////////////////////////////////////////////
	// 데모
	var i = 85, i2, i3;
	while (i--) {
		var tMesh = testGL.createMeshInfo('testMesh' + i, testGL.getGeometryInfo('cube'), Math.random()>0.5 ? testMatBitmap : testMatBitmap5)
		tMesh.position[0] = Math.random() * 40 -20
		tMesh.position[1] = Math.random() * 40 -20
		tMesh.position[2] = -35 - Math.random() * 30
		tMesh.rotation[0] = Math.random() * Math.PI * 2
		tMesh.rotation[1] = Math.random() * Math.PI * 2
		tMesh.rotation[2] = Math.random() * Math.PI * 2
		i2 = 6
		var tt =Math.random()>0.5 ? testMatBitmap5 : testMatBitmap6
		while (i2--) {
			var tSub = testGL.createMeshInfo('testMesh_' + i + '_' + i2, testGL.getGeometryInfo('cube'), tt)
			tSub.position[0] = Math.random() * 20 - 10
			tSub.position[1] = Math.random() * 20 - 10
			tSub.position[2] = Math.random() * 20 - 10
			var tScale = Math.random() + 0.1
			tSub.scale[0] = tScale
			tSub.scale[1] = tScale
			tSub.scale[2] = tScale
			tMesh.children.push(tSub)
			i3 = 5
			var tt =Math.random()>0.5 ? testMatBitmap7 : testMatBitmap8
			while (i3--) {
				var tSub2 = testGL.createMeshInfo('testMesh_' + i + '_' + i2 + '_' + i3, testGL.getGeometryInfo('cube'), tt)
				tSub2.position[0] = Math.random() * 20 - 10
				tSub2.position[1] = Math.random() * 20 - 10
				tSub2.position[2] = Math.random() * 20 - 10
				var tScale = Math.random() + 0.1
				tSub2.scale[0] = tScale
				tSub2.scale[1] = tScale
				tSub2.scale[2] = tScale
				tSub.children.push(tSub2)
				
				// tSub2.drawMode = testGL.gl.LINE_STRIP
			}
		}
		testScene.children.push(tMesh)
	}
	var checkCall = document.createElement('div')
	document.body.appendChild(checkCall)
	checkCall.style.position = 'absolute'
	checkCall.style.left = '10px'
	checkCall.style.top = '10px'
	checkCall.style.color = '#fff'
	var renderer = RedRender(testGL, testScene, function (time) {
		i = testScene.children.length
		var tMesh, tMesh2, tMesh3
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
				tMesh2.rotation[0] += 0.01
				tMesh2.rotation[1] += 0.01
				tMesh2.rotation[2] += 0.01
				i3 = tMesh2.children.length
				while (i3--) {
					tMesh3 = tMesh2.children[i3]

					tMesh3.rotation[0] += 0.01
					tMesh3.rotation[1] += 0.01
					tMesh3.rotation[2] += 0.01
				}
			}
		}
		checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
	})
	renderer.start()
})

