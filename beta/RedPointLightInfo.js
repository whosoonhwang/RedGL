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
            test.createPointLight()
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
            description : `
                - 라이트 컬러
                - 기본값 : new Float32Array([1, 1, 1, 1])
            `,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32Array(4)'
        }
        :DOC*/
        this['color'] = new Float32Array([1, 1, 1, 1])
         /**DOC:
		{
            title :`position`,
            description : `라이트 포지션`,
            code:'PROPERTY',
            example : `인스턴스.position`,
            return : 'Float32Array(3)'
        }
        :DOC*/
        this['position'] = new Float32Array([0, 0, 0])
        /**DOC:
		{
            title :`radius`,
            description : `라이트 반경`,
            code:'PROPERTY',
            example : `인스턴스.radius`,
            return : 'Number'
        }
        :DOC*/
        this['radius'] = 1
        /**DOC:
		{
            title :`usedebugMode`,
            description : `디버그모드 사용여부`,
            code:'PROPERTY',
            example : `인스턴스.usedebugMode`,
            return : 'Boolean'
        }
        :DOC*/
        this['usedebugMode'] = false
        this['__UUID'] = REDGL_UUID++
        this['__debugMesh'] = redGL.createMeshInfo(
            'RedPointLightInfo__debugMesh' + this['__UUID'],
            RedPrimitive.sphere(redGL, 0.5,16,16,16),
            redGL.createMaterialInfo('color')
        )
        this['__debugMesh'].children.push(
            redGL.createMeshInfo(
                'RedPointLightInfo__debugMesh' + this['__UUID']+'_center',
                RedPrimitive.sphere(redGL, 0.03,16,16,16),
                redGL.createMaterialInfo('color')
            )
        )        
        this['__debugMesh'].drawMode = redGL.gl.LINE_STRIP

    }
    RedPointLightInfo['TYPE'] = 'point'
    Object.freeze(RedPointLightInfo)
})();