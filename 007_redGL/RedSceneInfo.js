"use strict";
var RedSceneInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedSceneInfo`,
        description : `
            - RedGL에서 사용할 Scene정보를 생성
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 존재하는 키일경우 에러.'
            ],
            camera : [
                {type:'RedBaseCamera'},
                '- 사용할 카메라 객체등록'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // firstScene 키로 Scene생성
            RedSceneInfo(test,'firstScene')
        `,
        return : 'RedSceneInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedSceneInfo = function (redGL, key, camera) {
        if (!(this instanceof RedSceneInfo)) return new RedSceneInfo(redGL, key, camera)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key는 문자열만 허용됩니다.'        
        if (!(camera instanceof RedBaseCamera)) throw 'camera는 RedBaseCamera 인스턴스만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedSceneInfo']) redGL['__datas']['RedSceneInfo'] = {}
        tDatas = redGL['__datas']['RedSceneInfo']
        // 기존에 등록된 녀석이면 퐈이어!
        if (tDatas[key]) throw key + '는 이미 존재하는 RedSceneInfo 입니다.'
        /**DOC:
		{
            title :`children`,
			description : `씬이 물고있는 Mesh리스트들`,
			example : `인스턴스.children`,
			return : 'Array'
        }
        :DOC*/
        this['children'] = []
        /**DOC:
		{
            title :`camera`,
			description : `씬이 가지고있는 카메라`,
			example : `인스턴스.camera`,
			return : 'RedBaseCamera'
        }
        :DOC*/
        this['camera'] = camera
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
    }
    RedSceneInfo.prototype.setSkyBox = function(v){
        this['skyBox'] = v
    }
    Object.freeze(RedSceneInfo)
})();