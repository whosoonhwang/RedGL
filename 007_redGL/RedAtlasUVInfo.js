"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedAtlasUVInfo`,
        description : `
            <h2>주석 작성해야함</h2>
            아틀라스 UV전용이라고 보면되겟당...
        `,
        params : {
            redGL : [
                {type:'Array'},
                '- redGL Instance'
            ]
        },
        example : `
            //TODO
        `,
        return : 'RedAtlasUVInfo OBJECT'
    }
:DOC*/
var RedAtlasUVInfo;
RedAtlasUVInfo = function (v) {
    this['value'] = new Float32Array(v)
    this['__UUID'] = REDGL_UUID++
    this['value']['__UUID'] = this['__UUID']
}