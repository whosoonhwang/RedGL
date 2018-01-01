"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMaterialInfo`,
        description : `
            - 재질 생성기.
            - 타입키에 해당하는 <b>RedMaterialDefine</b> 정의가 존재하지않을경우 에러.
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            typeName : [
                {type:'String'},
                '- 재질 타입 지정'
            ],
            diffuseInfo : [
                {type:'RedTextureInfo or RedCubeTextureInfo'},
                '- DiffuseMap 지정'
            ],
            normalInfo : [
                 {type:'RedTextureInfo or RedCubeTextureInfo'},
                '- normalMap 지정'
            ],
            displacementInfo : [
                {type:'RedTextureInfo or RedCubeTextureInfo'},
                '- displacementMap 지정'
            ],
            specularInfo : [
                {type:'RedTextureInfo or RedCubeTextureInfo'},
                '- specularInfo 지정'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            // basic이라는 이름으로 프로그램을 만든다. 
            test.createProgramInfo(
                'basic',
                test.getShaderInfo('basic', RedProgramInfo.VERTEX_SHADER),
                test.getShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER)
            )
            // basic이라는 타입의 재질 정의한다.
            test.createMaterialDefine(test.getProgramInfo('basic'))
            // basic재질을 실제로 생성한다.
            test.createMaterialInfo('basic')
        `,
        return : 'RedMaterialInfo Instance'
    }
:DOC*/
var RedMaterialInfo;
(function () {
    var tDefineMap
    var tDefineData;
    var typeMAP;
    var k, t0;
    var tGL;
    typeMAP = {
        f: {
            16: 'uniformMatrix4fv',
            12: 'uniformMatrix3fv',
            8: 'uniformMatrix2fv',
            4: 'uniform4fv',
            3: 'uniform3fv',
            2: 'uniform2fv',
            1: 'uniform1fv'
        },
        i: {
            16: 'uniformMatrix4iv',
            12: 'uniformMatrix3iv',
            8: 'uniformMatrix2iv',
            4: 'uniform4iv',
            3: 'uniform3iv',
            2: 'uniform2iv',
            1: 'uniform1iv'
        }
    }
    RedMaterialInfo = function (redGL, typeName, diffuseTexture, normalTexture, displacementTexture, specularTexture, reflectionTexture) {
        if (!(this instanceof RedMaterialInfo)) return new RedMaterialInfo(redGL, typeName, diffuseTexture, normalTexture, displacementTexture, specularTexture, reflectionTexture)
        //TODO: 
        if (!(redGL instanceof RedGL)) throw 'RedMaterialInfo : RedGL 인스턴스만 허용됩니다.'
        if (typeof typeName != 'string') throw 'RedMaterialInfo : typeName은 문자열만 허용됩니다.'
        // 디파인더에서 재질정의를 찾고
        tDefineMap = redGL['__datas']['RedMaterialDefine']
        tDefineData = tDefineMap[typeName]
        tGL = redGL.gl
        if (!tDefineData) throw typeName + '재질은 존재하지않습니다.'
        /**DOC:
		{
            title :`programInfo`,
			description : `재질에 사용된 프로그램정보`,
			example : `인스턴스.programInfo`,
			return : 'RedProgramInfo'
        }
        :DOC*/
        this['programInfo'] = tDefineData['programInfo']
        /**DOC:
		{
            title :`diffuseInfo`,
            description : `
                - diffuseInfo
            `,
			example : `인스턴스.diffuseInfo`,
			return : 'RedTextureInfo or RedCubeTextureInfo'
        }
        :DOC*/
        if (diffuseTexture) this['uDiffuseTexture'] = diffuseTexture
        if (normalTexture) this['uNormalTexture'] = normalTexture
        if (displacementTexture) this['uDisplacementTexture'] = displacementTexture
        if (specularTexture) this['uSpecularTexture'] = specularTexture
        if (reflectionTexture) this['uReflectionTexture'] = reflectionTexture

        /**DOC:
		{
            title :`materialUniforms`,
            description : `
                - 렌더링시 참고할 유니폼데이터
            `,
			example : `인스턴스.materialUniforms`,
			return : 'Object'
        }
        :DOC*/
        this['materialUniforms'] = {}
        // 재질에 초기유니폼정의를 반영함
        this['programInfo'].initUniformValue(this)
        /**DOC:
		{
            title :`needUniformList`,
            description : `
                - 렌더링시 유니폼리스트를 다시 만들어야할지 여부
            `,
			example : `인스턴스.needUniformList`,
			return : 'Boolean'
        }
        :DOC*/
        this['needUniformList'] = true
        this.updateUniformList()
        this['__UUID'] = REDGL_UUID++
    }
    RedMaterialInfo.prototype.updateUniformList = function () {
        console.log(this['programInfo'])
        if (this['programInfo']['defineTexture']) this['programInfo']['defineTexture'](this)
        ////////////////////////////////////////////////////////////////////////////////////////
        // 유니폼을 업데이트할 glMethod를 찾는다. 
        for (k in this['materialUniforms']) {
            t0 = this['materialUniforms'][k]
            if (t0 instanceof Float32Array || t0 instanceof Float64Array) {
                t0['__uniformMethod'] = typeMAP['f'][t0.length]
                t0['__isMatrix'] = t0['__uniformMethod'].length > 11
            } else if (
                t0 instanceof Uint8Array ||
                t0 instanceof Uint16Array ||
                t0 instanceof Uint32Array ||
                t0 instanceof Int8Array ||
                t0 instanceof Int16Array ||
                t0 instanceof Int32Array
            ) {
                t0['__uniformMethod'] = typeMAP['i'][t0.length]
                t0['__isMatrix'] = t0['__uniformMethod'].length > 11
            } else if (t0 == null) {
            } else if (typeof t0 == 'number') {
            } else if (t0 instanceof RedAtlasUVInfo) {
            } else if (t0 instanceof RedTextureInfo || t0 instanceof RedCubeTextureInfo) {

            } else if (t0 instanceof RedAtlasTextureInfo) {
                this['materialUniforms']['uAtlascoord'] = t0['atlasUVInfo']
            } else throw k + '는 올바르지 않은 타입입니다.'
        }
        ////////////////////////////////////////////////////////////////////////////////////////
        // 프로그램 정보를 처리
        if (this['needUniformList']) {
            this['__uniformList'] = []
            var tUniformGroup = this['materialUniforms']
            var tUniformLocationGroup = this['programInfo']['uniforms']
            for (k in tUniformGroup) {
                // console.log('//////////////////////////////////////')
                // console.log(k)
                // console.log(tUniformLocationGroup)
                // console.log(tUniformLocationGroup[k])
                // console.log(tUniformLocationGroup[k]['type'])
                // console.log(tUniformGroup[k])
                // console.log(tUniformLocationGroup[k]['location'])
                // console.log(tUniformLocationGroup)
                // console.log('//////////////////////////////////////')
                if (tUniformLocationGroup[k]['type'] == 'samplerCube') {

                }
                this['__uniformList'].push({
                    key: k,
                    type: tUniformLocationGroup[k]['type'],
                    value: tUniformGroup[k],
                    location: tUniformLocationGroup[k]['location']
                })
                // if(tMeterial.hasOwnProperty(k)) throw '유니폼이름과 재질의 프로퍼티네임이 같으면 안됩니다.'
                this[k] = tUniformGroup[k]
            }
            this['needUniformList'] = false
        }
    }
    RedMaterialInfo.prototype.setTexture = function (key, texture) {
        if (texture instanceof RedTextureInfo || texture instanceof RedCubeTextureInfo || texture instanceof RedAtlasUVInfo) {
            this[key] = texture
            this.updateUniformList()
        } else {
            throw '텍스쳐 형식이 아닙니다.'
        }
    }
    Object.freeze(RedMaterialInfo)
})();