"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMaterialInfo`,
        description : `
            - RedGL에서 사용할 재질정보를 정의
            - 타입키에 해당하는 정의가 존재하지않을경우 에러
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            type : [
                {type:'String'},
                '- 재질 타입 지정'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShader(test,'basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShader(test,'basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            // basic이라는 이름으로 프로그램을 만든다. 
            test.createProgram(
                test,'basic',
                test.createShader(test,'basic', RedProgramInfo.VERTEX_SHADER),
                test.createShader(test,'basic', RedProgramInfo.FRAGMENT_SHADER)
            )
            // basic이라는 타입의 재질 정의한다.
            RedMaterialDefine(test, test.getProgramInfo('basic'))
            // basic재질을 실제로 생성한다.
            RedMaterialInfo(test,'basic')
        `,
        return : 'RedMaterialInfo Instance'
    }
:DOC*/
var RedMaterialInfo;
(function () {
    var tDefineMap
    var tData;
    RedMaterialInfo = function (redGL, type) {
        if (!(this instanceof RedMaterialInfo)) return new RedMaterialInfo(redGL, type)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof type != 'string') throw 'type은 문자열만 허용됩니다.'
        // 디파인더에서 재질정의를 찾고
        tDefineMap = redGL['__datas']['RedMaterialDefine']
        tData = tDefineMap[type]
        if (!tData) throw type + '재질은 존재하지않습니다.'
        /**DOC:
		{
            title :`programInfo`,
			description : `재질에 사용된 프로그램정보`,
			example : `인스턴스.programInfo`,
			return : 'RedProgramInfo'
        }
        :DOC*/
        this['programInfo'] = tData['programInfo']
        /**DOC:
		{
            title :`uniforms`,
			description : `렌더링시 참고할 유니폼데이터`,
			example : `인스턴스.uniforms`,
			return : 'Object'
        }
        :DOC*/
        this['uniforms'] = {}
        // 유니폼은 프로그램에 의하여 생성되고, 재질정보를 토대로 렌더시 참조
        tData['programInfo'].makeUniformValue(this)
        this['__UUID'] = REDGL_UUID++
    }
    Object.freeze(RedMaterialInfo)
})();