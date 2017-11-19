"use strict";
var RedBufferInfo;
(function () {
    var tGL;
    var tDatas;
    var tBufferType;
    var tBuffer;
    RedBufferInfo = function (redGL, bufferType, key, pointer, arrayData, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
        if (!(this instanceof RedBufferInfo)) return new RedBufferInfo(redGL, key, vShaderInfo, fShaderInfo)
        if (!redGL['__datas']['RedBufferInfo']) {
            redGL['__datas']['RedBufferInfo'] = {}
        }
        // 저장할 공간확보하고
        tDatas = redGL['__datas']['RedBufferInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) throw key + '는 이미 존재하는 RedBufferInfo 입니다.'
        tGL = redGL.gl
        // 버퍼생성!
        tBuffer = tGL.createBuffer();
        tBufferType = bufferType
        switch (bufferType) {
            case RedBufferInfo.ARRAY_BUFFER:
                bufferType = tGL.ARRAY_BUFFER
                if (!(arrayData instanceof Float32Array || arrayData instanceof Float64Array || arrayData instanceof Array)) throw 'TypedArray형식을 사용해야합니다.'
                break
            case RedBufferInfo.ELEMENT_ARRAY_BUFFER:
                bufferType = tGL.ELEMENT_ARRAY_BUFFER
                if (
                    !(arrayData instanceof Uint8Array ||
                        arrayData instanceof Uint16Array ||
                        arrayData instanceof Uint32Array ||
                        arrayData instanceof Int8Array ||
                        arrayData instanceof Int16Array ||
                        arrayData instanceof Int32Array)
                ) throw 'TypedArray형식을 사용해야합니다.'
                break
            default:
                throw '지원하지 않는 버퍼타입입니다. '
        }
        tGL.bindBuffer(bufferType, tBuffer);
        tGL.bufferData(bufferType, arrayData, drawMode ? drawMode : tGL.STATIC_DRAW);
        // 정보생성
        this['shaderPointerKey'] = pointer // 쉐이더 포인터 네임
        if (arrayType) this['arrayType'] = arrayType // 타입드어레이 타입
        else throw '버퍼데이터의 형식을 지정해주세요'
        if (pointSize) this['pointSize'] = pointSize // 포인트 구성수
        else throw 'pointSize를 입력하세요'
        this['pointNum'] = pointNum ? pointNum : arrayData.length.pointSize // 포인트수 
        this['normalize'] = normalize ? normalize : false
        this['stride'] = stride ? stride : 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
        this['offset'] = offset ? offset : 0 // start at the beginning of the buffer
        this['enabled'] = 0 // 활성화되었는지 여부
        //
        this['key'] = key
        this['bufferType'] = tBufferType
        this['buffer'] = tBuffer
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    RedBufferInfo.ARRAY_BUFFER = 'arrayBuffer'
    RedBufferInfo.ELEMENT_ARRAY_BUFFER = 'elementArrayBuffer'
    Object.freeze(RedBufferInfo)
})();