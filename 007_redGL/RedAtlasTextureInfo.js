"use strict";
var RedAtlasTextureInfo;
(function () {
    var checkMap;;
    checkMap = {}
    /**DOC:
        {
            constructorYn : true,
            title :`RedAtlasTextureInfo`,
            description : `
                <h2>주석 작성해야함</h2>
            `,
            params : {
                aAtalsUVInfo : [
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
    RedAtlasTextureInfo = function (aAtlasUVInfo, targetAtlasInfo) {
        console.log(aAtlasUVInfo)
        var t0;
        var tKey
        t0 = [
            aAtlasUVInfo[0][0],
            aAtlasUVInfo[0][1],
            (aAtlasUVInfo[1][0] - aAtlasUVInfo[0][0]),
            (aAtlasUVInfo[2][1] - aAtlasUVInfo[0][1])
        ]
        tKey = t0.toString()
        if (checkMap[tKey]) aAtlasUVInfo = checkMap[tKey]
        else aAtlasUVInfo = checkMap[tKey] = new RedAtlasUVInfo(t0)
        console.log(aAtlasUVInfo)

        this['atlasUVInfo'] = aAtlasUVInfo
        this['targetAtlasInfo'] = targetAtlasInfo
        this['__webglAtlasTexture'] = 1
    }
})();