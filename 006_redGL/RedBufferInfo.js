"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedBufferInfo`,
        description : `
            - RedBufferInfo 인스턴스 생성자
            - <b>유일키</b>만 지원하며 키 중복일경우 기존 캐싱된 버퍼 정보를 반환함.
        `,
        params : {
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            bufferType : [
                {type:'String'},
                '- 버퍼타입을 지정',
                '- RedBufferInfo.ARRAY_BUFFER or RedBufferInfo.ELEMENT_ARRAY_BUFFER'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            shaderPointerKey : [
                {type:'null or String'},
                '- <b>arrayBuffer일때만 사용</b>',
                '- Shade내의 바인딩될 attribute이름'
            ],
            arrayData : [
                {type:'TypedArray'},
                '버퍼 raw data'
            ],
            pointSize : [
                {type:'Integer'},
                '포인트 구성사이즈'
            ],
            pointNum : [
                {type:'Number'},
                '포인트 갯수',
                '입력하지않으면 rawData/pointSize로 자동입력'
            ],
            normalize : [
                {type:'Boolean'},
                '기본값 : false'
            ],
            stride : [
                {type:'Number'},
                '기본값 : 0'
            ],
            offset : [
                {type:'Number'},
                '기본값 : 0'
            ],
            drawMode : [
                {type:'Integer'},
                '기본값 : gl.STATIC_DRAW'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShader(test,'basic', RedBufferInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShader(test,'basic', RedBufferInfo.FRAGMENT_SHADER, 쉐이더소스)
            test.createProgram(
                test,'basic',
                test.createShader(test,'basic', RedBufferInfo.VERTEX_SHADER),
                test.createShader(test,'basic', RedBufferInfo.FRAGMENT_SHADER)
            )
        `,
        return : 'RedBufferInfo Instance'
    }
:DOC*/
var RedBufferInfo;
(function () {
    var tGL;
    var tDatas;
    var tBufferType;
    var tBuffer;
    RedBufferInfo = function (redGL, bufferType, key, shaderPointerKey, arrayData, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
        if (!(this instanceof RedBufferInfo)) return new RedBufferInfo(redGL, bufferType, key, shaderPointerKey, arrayData, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof bufferType != 'string') throw 'bufferType - 문자열만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if (bufferType == RedBufferInfo.ARRAY_BUFFER && typeof shaderPointerKey != 'string') throw 'pointer - 문자열만 허용됩니다.'
        if (typeof pointSize != 'number' || pointSize != parseInt(pointSize)) throw 'pointSize - Integer만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedBufferInfo']) {
            redGL['__datas']['RedBufferInfo'] = {}
        }
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
        // 쉐이더 포인터 네임
        this['shaderPointerKey'] = shaderPointerKey
        // 타입드어레이 타입
        if (arrayType) this['arrayType'] = arrayType
        else throw '버퍼데이터의 형식을 지정해주세요'
        // 포인트 구성수
        if (pointSize) this['pointSize'] = pointSize
        else throw 'pointSize를 입력하세요'
        // 포인트수 
        this['pointNum'] = pointNum ? pointNum : arrayData.length.pointSize
        this['normalize'] = normalize ? normalize : false
        //


        if (typeof (stride = stride ? stride : 0) != 'number' || stride != parseInt(stride)) throw 'stride - Integer만 허용됩니다.' // 0 = move forward size * sizeof(type) each iteration to get the next position
        if (typeof (offset = offset ? offset : 0) != 'number' || offset != parseInt(offset)) throw 'offset - Integer만 허용됩니다.' // start at the beginning of the buffer
        this['stride'] = stride
        this['offset'] = offset
        //
        this['enabled'] = 0 // 활성화되었는지 여부
        //
        /**DOC:
		{
            title :`key`,
			description : `고유키`,
			example : `인스턴스.key`,
			return : 'String'
		}
	    :DOC*/
        this['key'] = key
        /**DOC:
		{
            title :`bufferType`,
			description : `RedBufferInfo.ARRAY_BUFFER or RedBufferInfo.ELEMENT_ARRAY_BUFFER`,
			example : `인스턴스.bufferType`,
			return : 'String'
		}
	    :DOC*/
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