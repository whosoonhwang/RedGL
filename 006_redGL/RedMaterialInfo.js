"use strict";
var RedMaterialInfo;
(function () {
    var tGL;
    var tDatas;
    RedMaterialInfo = function (redGL, redProgramInfo) {
        if (!(this instanceof RedMaterialInfo)) return new RedMaterialInfo(redGL, redProgramInfo)
        tGL = redGL.gl
        // 메쉬생성!!
        // 음그렇군...프로그램에따라 새로운 재질이 되고...
        // TODO: 이렇다는건.....재질인포이전에 재질 생성기가 도입되어야하는군...
        this.programInfo = redProgramInfo
        this.uniforms = {}
        // 유니폼은 프로그램에 의하여 생성되고..
        // 재질정보를 토대로 렌더시 참조
        redProgramInfo.makeUniformValue(this)
       
        this['__UUID'] = REDGL_UUID++
       
        // console.log(this)
    }
    Object.freeze(RedMaterialInfo)
})();