"use strict";
var testGL, start;
start = function () {
	console.log('안온다는거냐?')
	var makeShaders, makePrograms, defineMaterials, makeCheckRenderInfo;
	var checkCallBox;
	makeShaders = function () {
		console.log(testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('colorVS')))
		console.log(testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('colorFS')))

		console.log(testGL.createShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('bitmapVS')))
		console.log(testGL.createShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('bitmapFS')))

		console.log(testGL.createShaderInfo('bitmapPhong', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('bitmapPhongVS')))
		console.log(testGL.createShaderInfo('bitmapPhong', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('bitmapPhongFS')))

		console.log(testGL.createShaderInfo('skybox', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('skyBoxVS')))
		console.log(testGL.createShaderInfo('skybox', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('skyBoxFS')))
	}
	makePrograms = function () {
		testGL.createProgramInfo(
			'color',
			testGL.getShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
			testGL.getShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
			function (target) {
				target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random(), 255])
			}
		)
		testGL.createProgramInfo(
			'bitmapPhong',
			testGL.getShaderInfo('bitmapPhong', RedShaderInfo.VERTEX_SHADER),
			testGL.getShaderInfo('bitmapPhong', RedShaderInfo.FRAGMENT_SHADER),
			function (target) {
				target.uniforms.uTexture = target['diffuseInfo']
				target.uniforms.uNormalTexture = target['normalInfo']
				target.uniforms.uUseNormalTexture = 0			
				target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
				target.uniforms.uShininess = 16
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
	}
	defineMaterials = function () {
		testGL.createMaterialDefine(testGL.getProgramInfo('skybox'))
		testGL.createMaterialDefine(testGL.getProgramInfo('color'))
		testGL.createMaterialDefine(testGL.getProgramInfo('bitmapPhong'))
	}
	makeCheckRenderInfo = function () {
		checkCallBox = document.createElement('div')
		document.body.appendChild(checkCallBox)
		checkCallBox.style.position = 'absolute'
		checkCallBox.style.left = '10px'
		checkCallBox.style.top = '10px'
		checkCallBox.style.color = '#fff'
		var testCaseDoc = document.createElement('a')
		document.body.appendChild(testCaseDoc)
		testCaseDoc.style.position = 'absolute'
		testCaseDoc.style.left = '10px'
		testCaseDoc.style.bottom = '25px'
		testCaseDoc.style.color = '#fff'
		testCaseDoc.style.fontSize = '11px'
		testCaseDoc.href = 'testCase/index.html'
		testCaseDoc.innerHTML = 'RedGL TestCase'
		var doc = document.createElement('a')
		document.body.appendChild(doc)
		doc.style.position = 'absolute'
		doc.style.left = '10px'
		doc.style.bottom = '10px'
		doc.style.color = '#fff'
		doc.style.fontSize = '11px'
		doc.href = 'redDoc/redDoc.html'
		doc.innerHTML = 'RedGL Document'
	}
	console.log('이힝!')
	/// 기반준비
	makeShaders()
	makePrograms()
	defineMaterials()
	makeCheckRenderInfo()
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/// 데모시작

	// 카메라생성
	var testCamera = testGL.createBaseCameraInfo('testCamera')
	// Scene 생성
	var testScene = testGL.createSceneInfo('testScene', testCamera)
	// 재질정의
	var testTexture = testGL.createTextureInfo('asset/fieldstone.jpg')
	var testNormalTexture = testGL.createTextureInfo('asset/fieldstone-normal.jpg',RedTextureIndex.NORMAL)
	// 재질생성	
	var testMatBitmap = testGL.createMaterialInfo('bitmapPhong', testTexture, testNormalTexture)
	testMatBitmap.uShininess = 8

	// 그리드 생성
	var grid = testGL.createMeshInfo('grid1', RedPrimitive.grid(testGL), testGL.createMaterialInfo('color'))
	grid.drawMode = testGL.gl.LINES
	// testScene.setGrid(grid)
	// 스카이박스 생성
	testScene.setSkyBox(
		testGL.createSkyBoxInfo([
			'asset/cubemap/posx.jpg',
			'asset/cubemap/negx.jpg',
			'asset/cubemap/posy.jpg',
			'asset/cubemap/negy.jpg',
			'asset/cubemap/posz.jpg',
			'asset/cubemap/negz.jpg'
		])
	)

	// 중앙 테스트용 큰 구체...작성
	var tMesh = testGL.createMeshInfo('testMeshAdd2', RedPrimitive.sphere(testGL, 1, 32, 32, 32), testMatBitmap)
	tMesh.scale[0] = 4
	tMesh.scale[1] = 4
	tMesh.scale[2] = 4
	testScene.children.push(tMesh)

	// 중앙 테스트용 구체...정렬
	var i, max = 50
	i = max
	while (i--) {
		var tMesh = testGL.createMeshInfo('testMeshAdd1' + i, RedPrimitive.sphere(testGL, 1, 32, 32, 32), testMatBitmap)
		tMesh.position[0] = Math.sin(Math.PI * 2 / max * i) * 10
		tMesh.position[1] = 0
		tMesh.position[2] = Math.cos(Math.PI * 2 / max * i) * 10
		testScene.children.push(tMesh)
	}

	// 엠비언트 라이트 테스트
	var testLight = testGL.createAmbientLight(testGL)
	console.log(testLight)
	testScene.addLight(testLight)

	// 디렉셔널 라이트 테스트
	var i = 3
	while (i--) {
		var testLight = testGL.createDirectionalLight(testGL)
		testLight.direction[0] = Math.random() * 20 - 5
		testLight.direction[1] = Math.random() * 20 - 5
		testLight.direction[2] = Math.random() * 10 - 5
		testLight.color[0] = Math.random()
		testLight.color[1] = Math.random()
		testLight.color[2] = Math.random()
		testLight.color[3] = Math.random()

		testScene.addLight(testLight)
	}
	// 포인트 라이트 테스트
	i = 6
	while (i--) {
		var testLight = testGL.createPointLight(testGL)
		testLight.color[0] = Math.random()
		testLight.color[1] = Math.random()
		testLight.color[2] = Math.random()
		testLight.position[1] = Math.random() * 20 - 10
		testLight.radius = Math.random() * 10 + 5
		testLight.useDebugMode = true
		testScene.addLight(testLight)

	}

	// 무작위로 가보자
	var i = 30, j
	while (i--) {
		j = 70
		while (j--) {
			var tMesh = testGL.createMeshInfo('testMeshAdd2' + '_' + i + '_' + j, RedPrimitive.sphere(testGL, 0.5, 16, 16, 16), testMatBitmap)
			// var tMesh = testGL.createMeshInfo('testMeshAdd1'+i, RedPrimitive.cube(testGL,1,1,1,32,32,32), testMatBitmap)
			tMesh.position[0] = Math.sin(Math.PI * 2 * Math.random()) * 30
			tMesh.position[1] = Math.sin(Math.PI * 2 * Math.random()) * 30
			tMesh.position[2] = Math.cos(Math.PI * 2 * Math.random()) * 30
			var tScale = Math.random() * 3
			tMesh.scale[0] = tMesh.scale[1] = tMesh.scale[2] = tScale

			testScene.children.push(tMesh)
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// 렌더러 생성!!!!
	var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
		testCamera.setPosition(Math.sin(time / 3000) * 60, 60, Math.cos(time / 5000) * 40)
		testCamera.lookAt([0, 0, 0])
		i = testScene['lights']['point'].length
		while (i--) {
			testScene['lights']['point'][i].position[0] = Math.sin(time / 6000 + Math.PI * 2 / testScene['lights']['point'].length * i) * 20
			testScene['lights']['point'][i].position[1] = Math.tan(time / 3000 + Math.PI * 2 / testScene['lights']['point'].length * i) * 10 +
				Math.atan(time / 2000 + Math.PI * 2 / testScene['lights']['point'].length * i) * 10
			testScene['lights']['point'][i].position[2] = Math.cos(time / 2500 + Math.PI * 2 / testScene['lights']['point'].length * i) * 30
		}
		i = testScene['lights']['directional'].length
		while (i--) {
			testScene['lights']['directional'][i].direction[0] = Math.sin(time / 1700 + i) * 20
			testScene['lights']['directional'][i].direction[1] = Math.cos(time / 1400 + i) * 20 + Math.sin(time / 2700 + i) * 50
			testScene['lights']['directional'][i].direction[2] = Math.sin(time / 2200 + i) * 20
		}
		checkCallBox.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
	})
	renderer.start()
}
testGL = RedGL(document.getElementById('test'), start, true, [
	{ id: 'colorVS', src: 'glsl/colorVS.glsl' },
	{ id: 'colorFS', src: 'glsl/colorFS.glsl' },
	{ id: 'bitmapVS', src: 'glsl/bitmapVS.glsl' },
	{ id: 'bitmapFS', src: 'glsl/bitmapFS.glsl' },
	{ id: 'bitmapPhongVS', src: 'glsl/bitmapPhongVS.glsl' },
	{ id: 'bitmapPhongFS', src: 'glsl/bitmapPhongFS.glsl' },
	{ id: 'skyBoxVS', src: 'glsl/skyBoxVS.glsl' },
	{ id: 'skyBoxFS', src: 'glsl/skyBoxFS.glsl' }
])
