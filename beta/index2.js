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
				target.materialUniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random(), 255])
			}
		)
		testGL.createProgramInfo(
			'bitmap',
			testGL.getShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER),
			testGL.getShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER),
			function (target) {
				target.materialUniforms.uDiffuseTexture = target['uDiffuseTexture']
				target.materialUniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
			}
		)
		testGL.createProgramInfo(
			'bitmapPhong',
			testGL.getShaderInfo('bitmapPhong', RedShaderInfo.VERTEX_SHADER),
			testGL.getShaderInfo('bitmapPhong', RedShaderInfo.FRAGMENT_SHADER),
			function (target) {
				target.materialUniforms.uDiffuseTexture = target['uDiffuseTexture']
				target.materialUniforms.uNormalTexture = target['uNormalTexture']
				target.materialUniforms.uDisplacementTexture = target['uDisplacementTexture']
				target.materialUniforms.uSpecularTexture = target['uSpecularTexture']
				target.materialUniforms.uReflectionTexture = target['uReflectionTexture']

				target.materialUniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
				target.materialUniforms.uShininess = 16
			}
		)
		testGL.createProgramInfo(
			'skybox',
			testGL.getShaderInfo('skybox', RedShaderInfo.VERTEX_SHADER),
			testGL.getShaderInfo('skybox', RedShaderInfo.FRAGMENT_SHADER),
			function (target) {
				target.materialUniforms.uSkybox = target['uDiffuseTexture']

			}
		)
	}
	defineMaterials = function () {
		testGL.createMaterialDefine(testGL.getProgramInfo('skybox'))
		testGL.createMaterialDefine(testGL.getProgramInfo('color'))
		testGL.createMaterialDefine(testGL.getProgramInfo('bitmap'))
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
	// 재질생성 
	var testColorMat = testGL.createMaterialInfo('color')
	// 텍스쳐생성! //TODO: testGL.createTextureInfo/getTextureInfo를 만들어야겠군...
	var testTexture = testGL.createTextureInfo('asset/crate.png')
	var testTexture2 = testGL.createTextureInfo('asset/test.png')
	console.log(testTexture)
	var testMatBitmap = testGL.createMaterialInfo('bitmapPhong', testTexture)
	var testMatBitmap2 = testGL.createMaterialInfo('bitmapPhong', testTexture2)
	// 그리드 생성
	var grid = testGL.createMeshInfo('grid1', RedPrimitive.grid(testGL), testGL.createMaterialInfo('color'))
	grid.drawMode = testGL.gl.LINES
	testScene.setGrid(grid)
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

// 아틀라스테스트
	RedAtlasTextureManager(testGL, [
		'asset/draft1.png',
		'asset/draft2.png',
		'asset/draft3.png',
		'asset/draft4.png',
		'asset/draft5.png',
		'asset/test.png',
	], function () {
		var testMatBitmap3 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/test.png'))
		var testMatBitmap4 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft1.png'))
		var testMatBitmap5 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft2.png'))
		var testMatBitmap6 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft3.png'))
		var testMatBitmap7 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft4.png'))
		var testMatBitmap8 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft5.png'))
		setTimeout(function () {
			
			// grid.drawMode = testGL.gl.LINES
			var testAtlas2 = RedAtlasTextureManager(testGL, 'asset/addTest.png', function () {
				console.log('아틀라스 추가!되었음!')
				var i = 90, i2, i3;
				// testScene.children.reverse()
				while (i--) {
					var testMatBitmap9 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/addTest.png'))
					var tMesh = testGL.createMeshInfo('testMeshAdd' + i, RedPrimitive.cube(testGL, 1,1,1, 32, 32, 32), testMatBitmap9)
					tMesh.position[0] = Math.random() * 80 - 40
					tMesh.position[1] = Math.random() * 80 - 40
					tMesh.position[2] = Math.random() * 80 - 40
					tMesh.rotation[0] = Math.random() * Math.PI * 2
					tMesh.rotation[1] = Math.random() * Math.PI * 2
					tMesh.rotation[2] = Math.random() * Math.PI * 2
					// tMesh.scale[0] = 5
					// tMesh.scale[1] = 5
					// tMesh.scale[2] = 5
					testScene.children.push(tMesh)
				}
				// testScene.children.reverse()
			})
		}, 3000)
		///////////////////////////////////////////////////////////////////////////////////////////
		// 데모
		var i = 10, i2, i3;
		while (i--) {
			var tMesh = testGL.createMeshInfo('testMesh' + i, RedPrimitive.cube(testGL, 3,3,3, 32, 32, 32), Math.random() > 0.5 ? testMatBitmap : testMatBitmap5)
			tMesh.position[0] = Math.random() * 80 - 40
			tMesh.position[1] = Math.random() * 80 - 40
			tMesh.position[2] = Math.random() * 80 - 40
			tMesh.rotation[0] = Math.random() * Math.PI * 2
			tMesh.rotation[1] = Math.random() * Math.PI * 2
			tMesh.rotation[2] = Math.random() * Math.PI * 2
			// tMesh.drawMode = testGL.gl.LINE_STRIP
			i2 = 6
			var tt = Math.random() > 0.5 ? testMatBitmap5 : testMatBitmap6
			while (i2--) {
				var tSub = testGL.createMeshInfo('testMesh_' + i + '_' + i2, RedPrimitive.cube(testGL, 2,2,2, 32, 32, 32), tt)
				tSub.position[0] = Math.random() * 80 - 40
				tSub.position[1] = Math.random() * 80 - 40
				tSub.position[2] = Math.random() * 80 - 40
				// var tScale = Math.random() + 0.1
				// tSub.scale[0] = tScale
				// tSub.scale[1] = tScale
				// tSub.scale[2] = tScale
				// tSub.blendFactor2 = Math.random() > 0.5 ? testGL.gl.ONE_MINUS_SRC_ALPHA : testGL.gl.ONE
				tMesh.children.push(tSub)
				i3 = 5
				var tt = Math.random() > 0.5 ? testMatBitmap7 : testMatBitmap8
				while (i3--) {
					var tSub2 = testGL.createMeshInfo('testMesh_' + i + '_' + i2 + '_' + i3, RedPrimitive.cube(testGL, 1,1,1, 32, 32, 32), tt)
					tSub2.position[0] = Math.random() * 20 - 10
					tSub2.position[1] = Math.random() * 20 - 10
					tSub2.position[2] = Math.random() * 20 - 10
					// var tScale = Math.random() + 0.1
					// tSub2.scale[0] = tScale
					// tSub2.scale[1] = tScale
					// tSub2.scale[2] = tScale
					tSub.children.push(tSub2)
				}
			}
			testScene.children.push(tMesh)
		}

	})

	// 디렉셔널 라이트 테스트
	var i = 3
	while (i--) {
		var testLight = testGL.createDirectionalLight(testGL)
		testLight.direction[0] = Math.random() * 2 - 1
		testLight.direction[1] = Math.random() * 2 - 1
		testLight.direction[2] = Math.random() * 2 - 1
		testLight.color[0] = Math.random()
		testLight.color[1] = Math.random()
		testLight.color[2] = Math.random()
		testLight.color[3] = Math.random()

		testScene.addLight(testLight)
	}
	// 포인트 라이트 테스트
	i = 0
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
	
	var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
		testCamera.setPosition(Math.sin(time / 2000) * 60, 50, Math.cos(time / 5000) * 40)
		testCamera.lookAt([0, 0, 0])
		var i = testScene['lights']['directional'].length
		while (i--) {
			testScene['lights']['directional'][i].direction[0] = -Math.sin(time / 1700 + Math.PI * 2 / 2 * i) * 30
			testScene['lights']['directional'][i].direction[1] = Math.cos(time / 1400 + Math.PI * 2 / 2 * i) * 20 + Math.sin(time / 2700 + Math.PI * 2 / 2 * i) * 50
			testScene['lights']['directional'][i].direction[2] = -Math.sin(time / 1200 + Math.PI * 2 / 2 * i) * 30
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
