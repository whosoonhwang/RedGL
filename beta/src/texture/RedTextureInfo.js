"use strict";
var RedTextureInfo;
(function () {
	var tGL;
	var nullTexture;
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
				],
				targetIndex : [
					{type:'Integer'},
					'- 타겟 인덱스를 지정한다.',
					'- 기본값 : RedTextureIndex.DIFFUSE',
					'- RedTextureIndex의 목록을 사용한다.',
					'- 아틀라스텍스쳐의 경우 시스템에서 자동으로 부여함.'
				]
			},
			example : `
				var testGL
				testGL = RedGL(Canvas Element)
				testGL.createTextureInfo('asset/crate.png')
			`,
			return : 'RedTextureInfo Instance'
		}
	:DOC*/
	RedTextureInfo = function (redGL, src, targetIndex, internalFormat, format, type) {
		if (!(this instanceof RedTextureInfo)) return new RedTextureInfo(redGL, src, targetIndex, internalFormat, format, type)
		if (!(redGL instanceof RedGL)) throw 'RedTextureInfo : RedGL 인스턴스만 허용됩니다.'
		if (src == undefined) throw 'RedTextureInfo : src는 문자열과 캔버스 오브젝트만 허용됩니다.'
		if (src != undefined && typeof src != 'string' && !(src instanceof Element && src.nodeName == 'CANVAS')) throw 'RedTextureInfo : src는 문자열과 캔버스 오브젝트만 허용됩니다.'
		var texture;
		var img;
		var level = 0;
		var width = 1;
		var height = 1;
		var border = 0;
		var self;
		
		console.log(src)
		self = this
		tGL = redGL.gl
		internalFormat = internalFormat ? internalFormat : tGL.RGBA;
		format = format ? format : tGL.RGBA;
		type = type ? type : tGL.UNSIGNED_BYTE;
		targetIndex = targetIndex==undefined ? RedTextureIndex.DIFFUSE : targetIndex
		if (!nullTexture) {
			nullTexture = tGL.createTexture()
			tGL.activeTexture(tGL.TEXTURE0)
			tGL.bindTexture(tGL.TEXTURE_2D, nullTexture)
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
					222, 222, 222, 255
				)
			)
		}
		texture = tGL.createTexture()
		tGL.activeTexture(tGL.TEXTURE0)
		tGL.bindTexture(tGL.TEXTURE_2D, nullTexture)
		img = new Image();
		// 캔버스 일경우 캔버스이미지데이터를 활용함
		console.log('src instanceof Element',src,src instanceof Element)
		if (src != undefined) img.src = src instanceof Element ? src.toDataURL() : src
	
		img.crossOrigin = 'anonymous'
		img.addEventListener('load', function () {
			console.log('여기')
			// 로딩상태 플래그를 완료로 설정
			self['loaded'] = 1
			// 타겟인덱스를 설정함		
			self['__targetIndex'] = targetIndex
			tGL.activeTexture(tGL.TEXTURE0 + RedTextureIndex.CREATE)
			tGL.bindTexture(tGL.TEXTURE_2D, self['texture'])
			tGL.texImage2D(tGL.TEXTURE_2D, 0, internalFormat, format, type, self['__img'])
			tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_MIN_FILTER, tGL.LINEAR_MIPMAP_NEAREST);
			tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_MAG_FILTER, tGL.LINEAR);
			// tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_S, tGL.CLAMP_TO_EDGE);
			// tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_T, tGL.CLAMP_TO_EDGE);
			tGL.generateMipmap(tGL.TEXTURE_2D)
			// img.onload = null
		});
		// tGL.bindTexture(tGL.TEXTURE_2D, null)

		/**DOC:
		{
			title :`loaded`,
			code : 'PROPERTY',
			description : `
			- 텍스쳐 로딩완료여부
			`,
			example : `
			인스턴스.loaded
			`,
			return : '0 or 1'
		}
		:DOC*/
		this['loaded'] = 0
		/**DOC:
		{
			title :`texture`,
			code : 'PROPERTY',
			description : `
				- WebGLTexture 인스턴스
			`,
			example : `
				인스턴스.loaded
			`,
			return : 'WebGLTexture Instance'
		}
		:DOC*/
		this['texture'] = texture
		this['__img'] = img
		// 웹지엘 텍스쳐인지
		this['__webglTexture'] = 1
		this['__webglTextureYn'] = 1
		this['__UUID'] = REDGL_UUID++		
		// 인덱스 번호 지정 - 초기생성전담은 0번 인덱스를 사용함
		this['__targetIndex'] = RedTextureIndex.CREATE
	}
	/**DOC:
		{
			title :`updateTexture`,
			code : 'PROPERTY',
			description : `
				- 텍스쳐 경로를 업데이트.
				- 실행시 loaded가 0으로 변환되며 텍스쳐재생성후 loaded가 1로 변함.
			`,
			example : `
				인스턴스.updateTexture(새로운경로)
			`,
			return : 'void'
		}
		:DOC*/
	RedTextureInfo.prototype.updateTexture = function (src) {
		console.log('업데이트', src)
		this['loaded'] = 0
		this['__img'].src = src instanceof Element ? src.toDataURL() : src
	}
})();