"use strict";
var RedBaseCamera;
/**DOC:
    {
        constructorYn : true,
        title :`RedBaseCamera`,
        description : `
            - RedBaseCamera 가장 기본적인 카메라 생성기
        `,
        return : 'RedBaseCamera Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedBaseCamera = function (redGL, key) {
        if (!(this instanceof RedBaseCamera)) return new RedBaseCamera(redGL, key)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key는 문자열만 허용됩니다.'
        var aspect
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedBaseCamera']) redGL['__datas']['RedBaseCamera'] = {}
        tDatas = redGL['__datas']['RedBaseCamera']
        // 기존에 등록된 녀석이면 퐈이어!
        if (tDatas[key]) throw key + '는 이미 존재하는 RedBaseCamera 입니다.'
        /**DOC:
            {
                title :`uPMatrix`,
                code : 'PROPERTY',
                description : `
                    - 퍼스펙티브 매트릭스
                    - 고정유니폼으로서 쉐이더내에 uPMatrix 유니폼과 연동된다.
                `,
                return : 'mat4(Float32Arrat)'
            }
        :DOC*/
        this['uPMatrix'] = mat4.create()
        /**DOC:
            {
                title :`uCameraMatrix`,
                description : `
                    - 카메라 매트릭스
                    - 고정유니폼으로서 쉐이더내에 uCameraMatrix 유니폼과 연동된다.
                `,
                return : 'mat4(Float32Arrat)'
            }
        :DOC*/
        this['uCameraMatrix'] = mat4.create()
        /**DOC:
            {
                title :`fov`,
                description : `
                    - 카메라 fov
                    - 기본값 45
                `,
                return : 'Number'
            }
        :DOC*/
        this['fov'] = 45
        /**DOC:
            {
                title :`aspect`,
                description : `- 카메라 aspect`,
                return : 'Number'
            }
        :DOC*/
        this['aspect'] = 0.1;
        /**DOC:
            {
                title :`near`,
                description : `
                    - 카메라 near
                    - 기본값 0.1
                `,
                return : 'Number'
            }
        :DOC*/
        this['near'] = 0.1
        /**DOC:
            {
                title :`far`,
                description : `
                    - 카메라 far
                    - 기본값 1000.0
                `,
                return : 'Number'
            }
        :DOC*/
        this['far'] = 1000.0
        this['position'] = new Float32Array([0, 0, 0])
        this['rotation'] = new Float32Array([0, 0, 0])
        this['__UUID'] = REDGL_UUID++
        this['__canvas'] = redGL.__canvas
        this.update()
        // 캐싱
        tDatas[key] = this
    }

    RedBaseCamera.prototype = {
        lookAt : function(v){
            var up = [0, 1, 0];
            //out, eye, center, up
            mat4.lookAt(this['uCameraMatrix'],this['position'], v, up);
        },
        /**DOC:
            {
                title :`RedBaseCamera`,
                code : 'FUNCTION',
                description : `
                    - 카메라 매트릭스 업데이터
                `,
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        update: function () {
            // 퍼스펙티브만 관여
            this['aspect'] = this['__canvas'].clientWidth / this['__canvas'].clientHeight
            mat4.identity(this['uPMatrix'])
            mat4.perspective(this['uPMatrix'], this['fov'], this['aspect'], this['near'], this['far'])
            // 개별 카메라 매트릭스는 또 새로 계산함
            // mat4.identity(this['uCameraMatrix'])
            // mat4.fromTranslation(this['uCameraMatrix'], this.position)
            // mat4.rotateX(this['uCameraMatrix'], this['uCameraMatrix'], this['rotation'][0])
            // mat4.rotateY(this['uCameraMatrix'], this['uCameraMatrix'], this['rotation'][1])
            // mat4.rotateZ(this['uCameraMatrix'], this['uCameraMatrix'], this['rotation'][2])
            // console.log(this)
            return this
        }
    }
    Object.freeze(RedBaseCamera)
})();