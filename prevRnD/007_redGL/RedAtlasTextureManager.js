"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedAtlasTextureManager`,
        description : `
            - <b>Atlas를 생성하고 텍스쳐관련작업을 자동으로 관리하는 오브젝트</b>
        `,
        params : {
            redGL : [
                {type:'RedGL'},
                '- redGL Instance'
            ],
            srcList : [
				{type:'String or Array'},
				'단일 문자열로 들어오면 알아서 배열로 바꿈.'
			],
			callback : [
				 {type:'Function'},
				 '아틀라스 완성후 실행할 콜백.'
			]
        },
        example : `
            RedAtlasTextureManager(redGLInstance, 원하는경로, 콜백이필요하면 콜백)
        `,
        return : 'RedAtlasTextureManager OBJECT'
    }
:DOC*/
var RedAtlasTextureManager;
(function () {
	var MAX_TEXTURE_SIZE;
	var MAX_TEXTURE_IMAGE_UNITS; // 최대 허용 이미지유닛수
	var atlasInfoList; // 아틀라스 객체 리스트
	var atlasKeyMap; // 아틀라스에 등록된 이미지 맵정보
	var tRedGL;
	var tTextureUnitIndex; // 텍스쳐 유닛인덱스
	var tAtlas; // 대상 아틀라스
	var createAtlas; // 아틀라스 캔버스 생성기
	var atlasPack; // 아틀라스에 이미지를 실제로 업로드하는 녀석
	atlasKeyMap = {}
	atlasInfoList = []
	createAtlas = function (image) {
		var canvas;
		var t0;
		if (image && (image['width'] > MAX_TEXTURE_SIZE || image['height'] > MAX_TEXTURE_SIZE)) throw MAX_TEXTURE_SIZE + ' - 최대 허용사이즈보다 이미지가 큽니다.'
		canvas = document.createElement('canvas');
		canvas.width = MAX_TEXTURE_SIZE, canvas.height = MAX_TEXTURE_SIZE;
		canvas.style.background = 'transparent', canvas.style.margin = '3px', canvas.style.display = 'inline-block'
		// document.body.appendChild(canvas)
		// 아틀라스 생성
		tAtlas = new Atlas(canvas);
		tAtlas['atlasInfo'] = RedAtlasInfo(tRedGL, tAtlas)
		tTextureUnitIndex++
		if (tTextureUnitIndex == MAX_TEXTURE_IMAGE_UNITS) tTextureUnitIndex = MAX_TEXTURE_IMAGE_UNITS - parseInt(MAX_TEXTURE_IMAGE_UNITS / 2)
		tAtlas['__targetIndex'] = tTextureUnitIndex // console.log(tAtlas)
		atlasInfoList.push(tAtlas['atlasInfo'])

	}
	atlasPack = function (targetImage) {
		tAtlas = atlasInfoList[0]['atlas']
		var node = tAtlas.pack(targetImage);
		var i, len;
		if (node === false) {
			// 아틀라스를 전체를 돌면서 찾아야하고..
			i = 0, len = atlasInfoList.length
			for (i; i < len; i++) {
				// 기존있는놈중에 들어가면 종료시키고
				tAtlas = atlasInfoList[i]['atlas']
				node = tAtlas.pack(targetImage);
				if (node) break
			}
			// 여기까지 흘러들어오면 아틀라스캔버스 자체를 추가한다.
			if (node === false) {
				createAtlas(targetImage)
				node = tAtlas.pack(targetImage)
			}
		}
		// RedAtlasTextureInfo를 생성하고 맵에 담아둠
		console.log(tAtlas.uv()[targetImage.id])
		atlasKeyMap[targetImage.id] = new RedAtlasTextureInfo(
			tAtlas.uv()[targetImage.id],
			tAtlas['atlasInfo']
		)
		return node
	}
	RedAtlasTextureManager = function (redGL, srcList, callback) {
		if (!(this instanceof RedAtlasTextureManager)) return new RedAtlasTextureManager(redGL, srcList, callback)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		if (!(srcList instanceof Array)) srcList = [srcList]
		tRedGL = redGL
		MAX_TEXTURE_SIZE = redGL['detect']['MAX_TEXTURE_SIZE']
		MAX_TEXTURE_IMAGE_UNITS = redGL['detect']['MAX_TEXTURE_IMAGE_UNITS']
		if (tTextureUnitIndex == undefined) tTextureUnitIndex = MAX_TEXTURE_IMAGE_UNITS - parseInt(MAX_TEXTURE_IMAGE_UNITS / 2)
		if (MAX_TEXTURE_SIZE > 4096) MAX_TEXTURE_SIZE = 4096
		console.log('MAX_TEXTURE_SIZE', MAX_TEXTURE_SIZE)
		console.log('MAX_TEXTURE_IMAGE_UNITS', MAX_TEXTURE_IMAGE_UNITS)
		if (!tAtlas) createAtlas()
		var loaded, targetNum;
		loaded = 0
		targetNum = srcList.length
		srcList.forEach(function (src) {
			var img = new Image();
			var id = src
			if (atlasKeyMap[id]) return // 이미존재하면 나가리..
			img.id = id
			img.src = src
			img.onload = function () {
				var node = atlasPack(this)
				loaded++
				if (targetNum == loaded) {
					atlasInfoList.forEach(function (v) {
						if (!v['textureInfo']) v['textureInfo'] = RedTextureInfo(redGL, v['atlas']['canvas'], v['atlas']['__targetIndex'])
						else v['textureInfo'].updateTexture(v['atlas']['canvas'])
					})
					if (callback) callback()
				}
			};
		})
		return RedAtlasTextureManager
	}
	/**DOC:
		{
			title :`getByKey`,
			code : 'PROPERTY',
			description : `
				- 이미지등록시 사용된 src를 key로 해당하는 RedAtlasTextureInfo 맵을 조회한다.
			`,
			example : `
				RedAtlasTextureManager.getByKey('찾고싶은 src')
			`,
			return : 'RedAtlasTextureInfo instance'
		}
	:DOC*/
	RedAtlasTextureManager.getByKey = function (key) {
		return atlasKeyMap[key]
	}
	Object.freeze(RedAtlasTextureManager)
})();