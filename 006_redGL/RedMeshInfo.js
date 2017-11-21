"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMeshInfo`,
        description : `
            - RedGL에서 사용할 재질정보를 정의
            - 타입키에 해당하는 정의가 존재하지않을경우 에러
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 키'
            ],
            geometryInfo : [
                {type:'RedGeometryInfo'},
                '- 지오메트리정보'
            ],
            materialInfo : [
                {type:'RedMaterialInfo'},
                '- 재질정보'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            RedMeshInfo(test, 'firstMesh',geometryInfo, materialInfo)
        `,
        return : 'RedMeshInfo Instance'
    }
:DOC*/
var RedMeshInfo;
(function () {
    var tGL;
    var tDatas;
    RedMeshInfo = function (redGL, key, geometryInfo, materialInfo) {
        if (!(this instanceof RedMeshInfo)) return new RedMeshInfo(redGL, key, geometryInfo, materialInfo)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if (!(geometryInfo instanceof RedGeometryInfo)) throw 'geometryInfo - RedGeometryInfo만 허용됩니다.'
        if (!(materialInfo instanceof RedMaterialInfo)) throw 'materialInfo - RedMaterialInfo만 허용됩니다.'
        tGL = redGL.gl
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedMeshInfo']) {
            redGL['__datas']['RedMeshInfo'] = {}
        }
        tDatas = redGL['__datas']['RedMeshInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) throw key + '는 이미 존재하는 RedMeshInfo 입니다.'
        // 메쉬생성!!
        this['uMVMatrix'] = mat4.create()
        this['position'] = new Float32Array([0, 0, 0])
        this['rotation'] = new Float32Array([0, 0, 0])
        this['scale'] = new Float32Array([1, 1, 1])
        this['geometryInfo'] = geometryInfo
        this['materialInfo'] = materialInfo
        this['__UUID'] = REDGL_UUID++
        this['drawMode'] = tGL.TRIANGLES //TODO: 그리기모드는 매쉬가 가지는것이 맞는가!.. 맞을걸 같아..
        this['children'] = []
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    Object.freeze(RedMeshInfo)
})();