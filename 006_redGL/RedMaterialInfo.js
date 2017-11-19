"use strict";
var RedMaterialInfo;
//TODO: 작성중
(function () {
    var tGL;
    var tDatas;
    RedMaterialInfo = function (redGL, redProgramInfo) {
        if (!(this instanceof RedMaterialInfo)) return new RedMaterialInfo(redGL, redProgramInfo)
        tGL = redGL.gl
        // 메쉬생성!!
        //TODO: 동적 유니폼 생성! 아마도 타입별로 해야할듯.
        this.redProgramInfo = redProgramInfo
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    Object.freeze(RedMaterialInfo)
})();