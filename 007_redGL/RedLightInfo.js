"use strict";
var RedLightInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedLightInfo`,
        description : `
            - RedLightInfo 생성
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            type : [
                {type:'String'},
                '- 라이트 타입처리'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // firstScene 키로 Scene생성
            RedLightInfo(test,RedLightInfo.DIRECTIONAL)
        `,
        return : 'RedLightInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedLightInfo = function (redGL, type) {
        if (!(this instanceof RedLightInfo)) return new RedLightInfo(redGL, type)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof type != 'string') throw 'type은 문자열만 허용됩니다.'
        console.log(type)
        if (RedLightInfo['DIRECTIONAL'] != type) throw type + '은 생성불가능한 타입입니다. '
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedLightInfo']) redGL['__datas']['RedLightInfo'] = {}
        tDatas = redGL['__datas']['RedLightInfo']
        /**DOC:
		{
            title :`type`,
            description : `라이트 타입`,
            code:'PROPERTY',
            example : `인스턴스.type`,
            return : 'String'
        }
        :DOC*/
        this['type'] = type
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
            title :`direction`,
            description : `라이트 포지션`,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32'
        }
        :DOC*/
        this['direction'] = new Float32Array([0, 0, 0])
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
        this['__UUID'] = REDGL_UUID++
        Object.freeze(this)
    }
    RedLightInfo.prototype = {
        /**DOC:
		{
            title :`setSkyBox`,
            description : `포지션설정`,
            code:'FUNCTION',
			example : `인스턴스.setPosition(0,0,0)`
        }
        :DOC*/
        setPosition: function (x, y, z) {
            this['position'][0] = x
            this['position'][1] = y
            this['position'][2] = z
        }
    }
    RedLightInfo['DIRECTIONAL'] = 'directional'
    Object.freeze(RedLightInfo)
})();