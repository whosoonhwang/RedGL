"use strict";
var RedAtlasTextureInfo
/**DOC:
    {
        constructorYn : true,
        title :`RedAtlasTextureInfo`,
        description : `
            <h2>주석 작성해야함</h2>
        `,
        params : {
            atlasUV : [
                {type:'Array'},
                '- 아틀라스상의 UV'
            ],
            targetAtlasInfo : [
                {type:'Atlas instance'}
            ]
        },
        example : `
            //TODO
        `,
        return : 'RedAtlasTextureInfo Instance'
    }
:DOC*/
RedAtlasTextureInfo = function (atlasUV, targetAtlasInfo) {
	console.log(atlasUV)
	atlasUV = new Float32Array([
		atlasUV[0][0],
		atlasUV[0][1],
		(atlasUV[1][0] - atlasUV[0][0]),
		(atlasUV[2][1] - atlasUV[0][1])
	])
	this['atlasUV'] = atlasUV
	this['targetAtlasInfo'] = targetAtlasInfo
	this['__webglAtlasTexture'] = 1
}