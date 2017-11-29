"use strict";
var RedPointLightInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedPointLightInfo`,
        description : `
            - RedPointLightInfo 생성
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // firstScene 키로 Scene생성
            RedPointLightInfo(test)
        `,
        return : 'RedPointLightInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedPointLightInfo = function (redGL) {
        if (!(this instanceof RedPointLightInfo)) return new RedPointLightInfo(redGL)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedPointLightInfo']) redGL['__datas']['RedPointLightInfo'] = {}
        tDatas = redGL['__datas']['RedPointLightInfo']
        /**DOC:
		{
            title :`color`,
            description : `라이트 컬러`,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32'
        }
        :DOC*/
        this['color'] = new Float32Array([255, 255, 255, 255])
         /**DOC:
		{
            title :`position`,
            description : `라이트 포지션`,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32'
        }
        :DOC*/
        this['position'] = new Float32Array([0, 0, 0])
        /**DOC:
		{
            title :`position`,
            description : `라이트 포지션`,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32'
        }
        :DOC*/
        this['radius'] = 1
        this['__UUID'] = REDGL_UUID++
       
    }
    RedPointLightInfo['TYPE'] = 'point'
    Object.freeze(RedPointLightInfo)
})();