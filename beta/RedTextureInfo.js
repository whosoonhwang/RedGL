"use strict";
var RedTextureInfo;
(function () {
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`RedTextureInfo`,
			description : `
				- 기본 텍스쳐 생성기
			`,
			params : {
				redGL : [
					{type:'RedGL Instance'}
				],
				src : [
					{type:'String or CanvasElement'},
					'텍스쳐경로나 캔버스 오브젝트만 사용가능'
				]
				// targetIndex : [
				// 	{type:'Integer'},
				// 	'- 타겟 인덱스를 지정한다.',
				// 	'- 기본값 : 1 (기본인덱스는 1번을 사용함)',
				// 	'- 아틀라스텍스쳐의 경우 하드웨어 지원 텍스쳐수의 절반을 parseInt한 값을 시작으로 끝까지 시스템에서 자동으로 부여함.'

				// ]
			},
			example : `
				var testGL
				testGL = RedGL(document.getElementById('test'), true)
				testGL.createTextureInfo('asset/crate.png')
			`,
			return : 'RedTextureInfo Instance'
		}
	:DOC*/
	RedTextureInfo = function (redGL, src, targetIndex, internalFormat, format, type) {
		if (!(this instanceof RedTextureInfo)) return new RedTextureInfo(redGL, src, targetIndex, internalFormat, format, type)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		if (src != undefined && typeof src != 'string' && !(src instanceof Element && src.nodeName == 'CANVAS')) throw 'src는 문자열과 캔버스 오브젝트만 허용됩니다.'
		var texture;
		var img;
		var level = 0;
		var width = 1;
		var height = 1;
		var border = 0;
		var self;
		self = this
		tGL = redGL.gl
		internalFormat = internalFormat ? internalFormat : tGL.RGBA;
		format = format ? format : tGL.RGBA;
		type = type ? type : tGL.UNSIGNED_BYTE;
		targetIndex = targetIndex ? targetIndex : RedTextureIndex.DIFFUSE
		texture = tGL.createTexture()
		tGL.activeTexture(tGL.TEXTURE0 + RedTextureIndex.CREATE)
		tGL.bindTexture(tGL.TEXTURE_2D, texture)
		// 초기이미지 설정
		tGL.texImage2D(
			tGL.TEXTURE_2D,
			level,
			internalFormat,
			width,
			height,
			border,
			format,
			type,
			new Uint8Array(
				222, 222, 222, 255,
				66, 66, 66, 255,
				66, 66, 66, 255,
				222, 222, 222, 255
			)
		)
		img = new Image();
		// 캔버스 일경우 캔버스이미지데이터를 활용함
		if (src != undefined) img.src = src instanceof Element ? src.toDataURL() : src
		img.crossOrigin = 'anonymous'
		img.addEventListener('load', function () {
			// 로딩상태 플래그를 완료로 설정
			self['loaded'] = 1
			// 타겟인덱스를 설정함		
			self['__targetIndex'] = targetIndex
			tGL.bindTexture(tGL.TEXTURE_2D, self['texture'])
			tGL.texImage2D(tGL.TEXTURE_2D, 0, tGL.RGBA, tGL.RGBA, tGL.UNSIGNED_BYTE, self['__img'])
			tGL.texParameterf(tGL.TEXTURE_2D, tGL.TEXTURE_MAG_FILTER, tGL.LINEAR);
			tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_MIN_FILTER, tGL.LINEAR_MIPMAP_NEAREST);
			tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_S, tGL.CLAMP_TO_EDGE);
			tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_T, tGL.CLAMP_TO_EDGE);
			tGL.generateMipmap(tGL.TEXTURE_2D)

			// img.onload = null
		});
		// tGL.bindTexture(tGL.TEXTURE_2D, null)
		this['__img'] = img
		// 인덱스 번호 지정 - 초기생성전담은 0번 인덱스를 사용함
		this['__targetIndex'] = RedTextureIndex.CREATE
		// 로딩이 다되었는지
		this['loaded'] = 0
		// 액티브된적이있는지
		this['actived'] = 0
		// 웹지엘 텍스쳐인지
		this['__webglTexture'] = 1
		this['__UUID'] = REDGL_UUID++
		this['texture'] = texture
	}
	RedTextureInfo.prototype.updateTexture = function (src) {
		console.log('업데이트', src)
		self['loaded'] = 0
		this['__img'].src = src instanceof Element ? src.toDataURL() : src
	}
})();