"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMeshBaseInfo`,
        description : `
            - 메쉬에 기본적으로 필요한 정보세팅
            - 시스템적으로 호출
        `,
        return : 'RedMeshBaseInfo Instance'
    }
:DOC*/
var RedMeshBaseInfo;
(function () {
    var tGL
    RedMeshBaseInfo = function (redGL) {
        tGL = redGL.gl
         /**DOC:
		{
            title :`uMVMatrix`,
            description : `
                - modelView Matrix를 반환
                - <span style="color:red"><b>uMVMatrix라는 키값은 쉐이더에서 사용되는 고정값이다.</b></span>
            `,
			example : `인스턴스.uMVMatrix`,
			return : 'mat4(Float32Array)'
        }
        :DOC*/
        Object.defineProperty(this,'uMVMatrix',{
            value : mat4.create(),
            enumerable : true
        })
        /**DOC:
		{
            title :`position`,
            description : `
                - positionXYZ를 Float32Array로 가진다.
                - <span style="color:red"><b>강제로 일반 Array로 치환하지않도록 주의해야한다.</b></span>
            `,
			example : `인스턴스.position`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        this['position'] = new Float32Array([0, 0, 0])
        /**DOC:
		{
            title :`rotation`,
            description : `
                - rotationXYZ를 Float32Array로 가진다.
                - <span style="color:red"><b>강제로 일반 Array로 치환하지않도록 주의해야한다.</b></span>
            `,
			example : `인스턴스.rotation`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        this['rotation'] = new Float32Array([0, 0, 0])
        /**DOC:
		{
            title :`scale`,
            description : `
                - scaleXYZ를 Float32Array로 가진다.
                - <span style="color:red"><b>강제로 일반 Array로 치환하지않도록 주의해야한다.</b></span>
            `,
			example : `인스턴스.rotation`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        this['scale'] = new Float32Array([1, 1, 1])
        /**DOC:
		{
            title :`geometryInfo`,
            description : `
                - 메쉬가 소유하고있는 geometryInfo
            `,
			example : `인스턴스.geometryInfo`,
			return : 'RedGeometryInfo'
        }
        :DOC*/
        this['geometryInfo'] = null
        /**DOC:
		{
            title :`materialInfo`,
            description : `
                - 메쉬가 소유하고있는 materialInfo
            `,
			example : `인스턴스.materialInfo`,
			return : 'RedMaterialInfo'
        }
        :DOC*/
        this['materialInfo'] = null
        /**DOC:
		{
            title :`drawMode`,
            description : `
                - 실제 메쉬를 그릴때 어떠한 방식으로 그릴지 결정
                - ex) gl.TRIANGLES
            `,
			example : `인스턴스.drawMode`,
			return : 'glConst'
        }
        :DOC*/
        this['drawMode'] = tGL.TRIANGLES
        /**DOC:
		{
            title :`cullFace`,
            description : `
                - 실제 메쉬를 그릴때 cullFace를 어떤 방식으로 그릴지 결정
                - ex) gl.BACK
            `,
			example : `인스턴스.cullFace`,
			return : 'glConst'
        }
        :DOC*/
        this['cullFace'] = tGL.BACK 
        /**DOC:
		{
            title :`children`,
            description : `
                - 자식노드리스트
            `,
			example : `인스턴스.children`,
			return : 'Array'
        }
        :DOC*/
        // 캐싱
        this['children'] = []
        this['__UUID'] = REDGL_UUID++
    }
    Object.freeze(RedMeshBaseInfo)
})();