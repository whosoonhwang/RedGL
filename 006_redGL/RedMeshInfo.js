"use strict";
var RedMeshInfo;
//TODO: 작성중
(function () {
    var tGL;
    var tDatas;
    RedMeshInfo = function (redGL, geometryInfo, materialInfo) {
        if (!(this instanceof RedMeshInfo)) return new RedMeshInfo(redGL, geometryInfo, materialInfo)
        tGL = redGL.gl
        // 메쉬생성!!
        //TODO: 동적 유니폼 생성! 아마도 타입별로 해야할듯.
        this.matrix //TODO: mvMatrix
        this.position = new Float32Array([0, 0, 0])
        this.rotation = new Float32Array([0, 0, 0])
        this.scale = new Float32Array([1, 1, 1])
        this.geometryInfo = geometryInfo 
        this.materialInfo = materialInfo 
        this['__UUID'] = REDGL_UUID++
        this.drawMode = gl.TRIANGLES //TODO: 그리기모드는 매쉬가 가지는것이 맞는가!
        this.children = []
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    Object.freeze(RedMeshInfo)
})();