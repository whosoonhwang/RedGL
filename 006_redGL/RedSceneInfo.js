"use strict";
var RedSceneInfo;
//TODO: 작성중
(function () {
    var tGL;
    var tDatas;
    RedSceneInfo = function (redGL, key) {
        if (!(this instanceof RedSceneInfo)) return new RedSceneInfo(redGL, key)
        if (!redGL['__datas']['RedSceneInfo']) {
            redGL['__datas']['RedSceneInfo'] = {}
        }
        // 저장할 공간확보하고
        tDatas = redGL['__datas']['RedSceneInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) throw key + '는 이미 존재하는 RedSceneInfo 입니다.'
        tGL = redGL.gl
        // 씬생성!!
        this.children = []
        this['__UUID'] = REDGL_UUID++        
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    Object.freeze(RedSceneInfo)
})();