"use strict";
var RedGeometryInfo;
(function () {
    var tGL;
    var tDatas;
    RedGeometryInfo = function (redGL, key, verticesBufferInfo, indicesBufferInfo, texcoordBufferInfo, normalBufferInfo) {
        if (!(this instanceof RedGeometryInfo)) return new RedGeometryInfo(redGL, key, verticesBufferInfo, indicesBufferInfo, texcoordBufferInfo, normalBufferInfo)
        if (!redGL['__datas']['RedGeometryInfo']) {
            redGL['__datas']['RedGeometryInfo'] = {}
        }
        // 저장할 공간확보하고
        tDatas = redGL['__datas']['RedGeometryInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) throw key + '는 이미 존재하는 RedGeometryInfo 입니다.'
        tGL = redGL.gl
        // 지오메트리생성!!
        this.attributes = {
            // vertexPosition: null, //이넘을 고유키값
            // texcoord: null, //이넘을 고유키값
            // normal : null //이넘을 고유키값
        }
        this.indices = null
        this['attributes']['vertexPosition'] = verticesBufferInfo // 버텍스버퍼
        this['attributes']['texcoord'] = texcoordBufferInfo // 코디네이트버퍼
        this['attributes']['normal'] = normalBufferInfo // 노말버퍼
        this['indices'] = indicesBufferInfo
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    Object.freeze(RedGeometryInfo)
})();