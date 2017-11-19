"use strict";
var RedProgramInfo;
(function () {
    var tGL;
    var tDatas;
    var tProgram;
    var info;
    var self;
    var tList;
    tList = []
    RedProgramInfo = function (redGL, key, vShaderInfo, fShaderInfo) {
        if (!(this instanceof RedProgramInfo)) return new RedProgramInfo(redGL, key, vShaderInfo, fShaderInfo)
        if (!redGL['__datas']['programInfo']) {
            redGL['__datas']['programInfo'] = {}
        }
        // 저장할 공간확보하고
        tDatas = redGL['__datas']['programInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) return console.log('캐싱프로그램 리턴!', key), tDatas[key]
        tGL = redGL.gl
        this['key'] = key
        this['attributes'] = {}
        this['uniforms'] = {}
        self = this;
        // 프로그램생성!
        tProgram = tGL.createProgram();
        tGL.attachShader(tProgram, vShaderInfo['shader'])
        tGL.attachShader(tProgram, fShaderInfo['shader'])
        tGL.linkProgram(tProgram)
        // 프로그램 링크 확인
        if (!tGL.getProgramParameter(tProgram, tGL.LINK_STATUS)) throw "쉐이더를 초기화 할 수 없습니다."
        tGL.useProgram(tProgram);
        info = {}
        tList.length = 0
        tList.push(vShaderInfo, fShaderInfo)
        tList.forEach(function (data) {
            if (data['parseData']) {
                data['parseData'].forEach(function (v) {
                    var tInfo;
                    tInfo = {}
                    v = v.trim().replace(';', '').split(' ')
                    if (v[0] == 'attribute') {
                        tInfo['location'] = tGL.getAttribLocation(tProgram, v[2]);
                        self['attributes'][v[2]] = tInfo
                    } else {
                        tInfo['location'] = tGL.getUniformLocation(tProgram, v[2]);
                        self['uniforms'][v[2]] = tInfo
                    }
                })
            }

        });
        this['program'] = tProgram
        this['shaderInfos'] = {
            vShaderInfo: vShaderInfo,
            fShaderInfo: fShaderInfo
        }
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
        Object.freeze(this)
        // console.log(this)
    }
    Object.freeze(RedProgramInfo)
})();