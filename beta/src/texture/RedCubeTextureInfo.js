
"use strict";
var RedCubeTextureInfo;
(function () {
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`RedCubeTextureInfo`,
			description : `
				- Cube 텍스쳐 생성기
			`,
			params : {
				redGL : [
					{type:'RedGL Instance'},
					'텍스쳐경로나 캔버스 오브젝트만 사용가능'
				],
				src : [
					{type:'Array'},
					`
						TEXTURE_CUBE_MAP_POSITIVE_X,
						TEXTURE_CUBE_MAP_NEGATIVE_X,
						TEXTURE_CUBE_MAP_POSITIVE_Y, 
						TEXTURE_CUBE_MAP_NEGATIVE_Y,
						TEXTURE_CUBE_MAP_POSITIVE_Z,
						TEXTURE_CUBE_MAP_NEGATIVE_Z
					`
				],
				targetIndex : [
					{type:'Integer'},
					'- 타겟 인덱스를 지정한다.',
					'- 기본값 : RedTextureIndex.CUBE_REFLECTION',
					'- RedTextureIndex.CUBE_XXX의 목록을 사용한다.'
				]
			},
			return : 'RedCubeTextureInfo Instance'
		}
	:DOC*/
	RedCubeTextureInfo = function (redGL, srcList, textureIndex) {
		if (!(this instanceof RedCubeTextureInfo)) return new RedCubeTextureInfo(redGL, srcList, textureIndex)
		if (!(redGL instanceof RedGL)) throw 'RedCubeTextureInfo : RedGL 인스턴스만 허용됩니다.'
		if (!(srcList instanceof Array)) throw 'RedCubeTextureInfo : srcList는 Array만 허용됩니다.'
		var texture;
		var i;
		var loadedNum;
		var self;
		var textureIndex;
		self = this
		tGL = redGL.gl
		loadedNum = 0

		var i = srcList.length
		this['__imgList'] = []
		while (i--) {
			var img = new Image()
			var tSrc
			tSrc = srcList[i]
			if (tSrc != undefined && typeof tSrc != 'string' && !(tSrc instanceof Element && tSrc.nodeName == 'CANVAS')) throw 'RedTextureInfo : src는 문자열과 캔버스 오브젝트만 허용됩니다.'
			img.src = tSrc instanceof Element ? tSrc.toDataURL() : tSrc
			console.log(img.src)
			img.onload = function () {
				loadedNum++
				this.onload = null
				if (loadedNum == 6) {
					self.__allLoaed(tGL)
				}
			}
			this['__imgList'][i] = img
		}
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
		this['texture'] = tGL.createTexture()
		// 인덱스 번호 지정 - 초기생성전담은 0번 인덱스를 사용함
		textureIndex = textureIndex ? textureIndex : RedTextureIndex.CUBE_REFLECTION
		this['__targetIndex'] = RedTextureIndex.CUBE_CREATE
		this['__allLoadedTargetIndex'] = textureIndex
		// 웹지엘 텍스쳐인지
		this['__webglCubeTexture'] = 1
		this['__UUID'] = REDGL_UUID++

		tGL.activeTexture(tGL.TEXTURE0 + RedTextureIndex.CUBE_CREATE)
		tGL.bindTexture(tGL.TEXTURE_CUBE_MAP, this['texture'])
	}
	RedCubeTextureInfo.prototype['__allLoaed'] = function () {
		// 로딩상태 플래그를 완료로 설정

		// 타겟인덱스를 설정함	
		var self
		self = this
		this['__targetIndex'] = this['__allLoadedTargetIndex']
		console.log(this)
		tGL.activeTexture(tGL.TEXTURE0 + RedTextureIndex.CUBE_CREATE)
		tGL.bindTexture(tGL.TEXTURE_CUBE_MAP, self['texture'])
		this['__imgList'].forEach(function (img, index) {
			// console.log(
			// 	tGL.TEXTURE_CUBE_MAP_POSITIVE_X,
			// 	tGL.TEXTURE_CUBE_MAP_NEGATIVE_X,
			// 	 tGL.TEXTURE_CUBE_MAP_POSITIVE_Y, 
			// 	 tGL.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			// 	  tGL.TEXTURE_CUBE_MAP_POSITIVE_Z,
			// 	   tGL.TEXTURE_CUBE_MAP_NEGATIVE_Z
			// )
			tGL.texImage2D(
				tGL.TEXTURE_CUBE_MAP_POSITIVE_X + index,
				0,
				tGL.RGBA,
				tGL.RGBA,
				tGL.UNSIGNED_BYTE,
				img
			);

		})

		tGL.texParameteri(tGL.TEXTURE_CUBE_MAP, tGL.TEXTURE_MIN_FILTER, tGL.LINEAR);
		tGL.texParameteri(tGL.TEXTURE_CUBE_MAP, tGL.TEXTURE_MAG_FILTER, tGL.LINEAR);
		tGL.texParameteri(tGL.TEXTURE_CUBE_MAP, tGL.TEXTURE_WRAP_S, tGL.CLAMP_TO_EDGE);
		tGL.texParameteri(tGL.TEXTURE_CUBE_MAP, tGL.TEXTURE_WRAP_T, tGL.CLAMP_TO_EDGE);
		tGL.generateMipmap(tGL.TEXTURE_CUBE_MAP);

		self['loaded'] = 1

	}
})();