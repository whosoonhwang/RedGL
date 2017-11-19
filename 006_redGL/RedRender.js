"use strict";
var RedRender;
//TODO: 작성중
(function () {
    var tGL;
    var tDatas;
    RedRender = function (redGL, redScene) {
        if (!(this instanceof RedRender)) return new RedRender(redGL, redScene)
        tGL = redGL.gl
        // 씬생성!!
        this.targetRedScene = redScene
        this['__UUID'] = REDGL_UUID++
        this.render = function () {
            //TODO:이힝...
        }
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    Object.freeze(RedRender)
})();