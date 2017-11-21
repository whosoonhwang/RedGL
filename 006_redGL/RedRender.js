"use strict";
var RedRender;
//TODO: 작성중
(function () {
    var tGL;
    var tDatas;
    RedRender = function (redGL, redScene) {
        if (!(this instanceof RedRender)) return new RedRender(redGL, redScene)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        var self;
        self = this
        tGL = redGL.gl
        // 씬생성!!
        this['targetRedScene'] = redScene
        this['__UUID'] = REDGL_UUID++
        this.render = function () {
            // tGL.clearColor(Math.random(), 1, 1, 1);
            tGL.clear(tGL.COLOR_BUFFER_BIT | tGL.DEPTH_BUFFER_BIT);
            requestAnimationFrame(self.render)
        }
        // console.log(this)
    }
    RedRender.prototype = {
        start : function(){
            requestAnimationFrame(this.render)
        }
    }
    Object.freeze(RedRender)
})();