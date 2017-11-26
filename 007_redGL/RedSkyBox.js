"use strict";
var RedSkyBox;
/**DOC:
    {
        constructorYn : true,
        title :`RedMeshInfo`,
        description : `
           - <h2>TODO: 고민중...이걸해보니 메쉬베스라는 추상객체가 도입되어야할듯...
        `,
        return : 'RedSkyBox Instance'
    }
:DOC*/
(function () {
    RedSkyBox = function (redGL, srcList) {
        if (!(this instanceof RedSkyBox)) return new RedSkyBox(redGL,  srcList)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        this['materialInfo'] = RedMaterialInfo(redGL, 'skybox', RedCubeTextureInfo(redGL, srcList))
        this['geometryInfo'] = RedPrimitive.cube(redGL)
        this['uMVMatrix'] = mat4.create()
        this['position'] = new Float32Array([0, 0, 0])
        this['rotation'] = new Float32Array([0, 0, 0])
        this['scale'] =  new Float32Array([1000,1000,1000]) //TODO: 카메라꺼물어야함
        this['drawMode'] = redGL.gl.TRIANGLES 
        this['cullFace'] = redGL.gl.FRONT 
        this['children'] = []
        this['__UUID'] = REDGL_UUID++
    }
    Object.freeze(RedSkyBox)
})();