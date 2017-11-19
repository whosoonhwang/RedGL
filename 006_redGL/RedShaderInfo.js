"use strict";
var RedShaderInfo;
(function () {
    var parseData;
    var tGL;
    var tShader;
    var tDatas;
    RedShaderInfo = function (redGL, type, key, source) {
        if (!(this instanceof RedShaderInfo)) return new RedShaderInfo(redGL, type, key, source)
        if (!redGL['__datas']['shaderInfo']) {
            redGL['__datas']['shaderInfo'] = {}
            redGL['__datas']['shaderInfo'][RedShaderInfo.FRAGMENT_SHADER] = {}
            redGL['__datas']['shaderInfo'][RedShaderInfo.VERTEX_SHADER] = {}
        }
        // 저장할 공간확보하고
        tDatas = redGL['__datas']['shaderInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[type][key]) return console.log('캐싱쉐이더 리턴!',key), tDatas[type][key]
        tGL = redGL.__gl
        // 쉐이더생성
        switch (type) {
            case RedShaderInfo.VERTEX_SHADER:
                tShader = tGL.createShader(tGL.VERTEX_SHADER);
                break
            case RedShaderInfo.FRAGMENT_SHADER:
                tShader = tGL.createShader(tGL.FRAGMENT_SHADER);
                break
            default:
                throw '쉐이더 타입을 확인하세요!'
                break
        }
        tGL.shaderSource(tShader, source)
        tGL.compileShader(tShader)
        if (!tGL.getShaderParameter(tShader, tGL.COMPILE_STATUS)) {
            console.log(tGL.getShaderInfoLog(tShader))
            throw '쉐이더 컴파일에 실패하였습니다.';
        }
        parseData = source.match(/.attribute[\s\S]+?\;|.uniform[\s\S]+?\;/g)
        this['key'] = key
        this['type'] = type
        this['shader'] = tShader
        this['parseData'] = parseData
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[type][key] = this
        Object.freeze(this)
        // console.log(this)
    }
    RedShaderInfo.FRAGMENT_SHADER = 'fragmentShader'
    RedShaderInfo.VERTEX_SHADER = 'vertexShader'
    Object.freeze(RedShaderInfo)
})();