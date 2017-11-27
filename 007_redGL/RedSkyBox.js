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
        RedMeshBaseInfo.call(this,redGL)
        this['materialInfo'] = RedMaterialInfo(redGL, 'skybox', RedCubeTextureInfo(redGL, srcList))
        this['geometryInfo'] = RedPrimitive.cube(redGL)
        this['scale'][0] = 1000//TODO: 카메라꺼물어야함
        this['scale'][1] = 1000
        this['scale'][2] = 1000
        this['cullFace'] = redGL.gl.FRONT 
    }
    Object.freeze(RedSkyBox)
})();