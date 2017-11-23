"use strict";
var RedAtlasTextureInfo
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