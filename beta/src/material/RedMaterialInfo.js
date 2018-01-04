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
                {type:'RedTextureInfo'},
                '- DiffuseMap 지정'
            ],
            normalInfo : [
                 {type:'RedTextureInfo'},
                '- normalMap 지정'
            ],
            displacementInfo : [
                {type:'RedTextureInfo'},
                '- displacementMap 지정'
            ],
            specularInfo : [
                {type:'RedTextureInfo'},
                '- specularInfo 지정'
            ],
            reflectionInfo : [
                {type:'RedCubeTextureInfo'},
                '- reflectionInfo 지정'
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
    RedMaterialInfo = function (redGL, typeName, diffuseTexture, normalTexture, displacementTexture, specularTexture, reflectionTexture, refractionTexture) {
        if (!(this instanceof RedMaterialInfo)) return new RedMaterialInfo(redGL, typeName, diffuseTexture, normalTexture, displacementTexture, specularTexture, reflectionTexture, refractionTexture)
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
        if (diffuseTexture) this[RedMaterialInfo.DIFFUSE_TEXTURE] = diffuseTexture
        if (normalTexture) this[RedMaterialInfo.NORMAL_TEXTURE] = normalTexture
        if (displacementTexture) this[RedMaterialInfo.DISPLACEMENT_TEXTURE] = displacementTexture
        if (specularTexture) this[RedMaterialInfo.SPECULAR_TEXTURE] = specularTexture
        if (reflectionTexture) this[RedMaterialInfo.REFLECTION_TEXTURE] = reflectionTexture
        if (refractionTexture) this[RedMaterialInfo.REFRACTION_TEXTURE] = refractionTexture
        

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
                - 실제론 텍스쳐 변경시 textureUpdated의 의미를 가진다.
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
            } else throw 'RedMaterialInfo : '+ k + '는 올바르지 않은 타입입니다.'
        }
        ////////////////////////////////////////////////////////////////////////////////////////
        // 프로그램 정보를 처리
        if (this['needUniformList']) {
            this['__uniformList'] = []
            var tUniformGroup = this['materialUniforms']
            var tUniformLocationGroup = this['programInfo']['uniforms']
            var tRenderType
           
            for (k in tUniformGroup) {
                console.log('//////////////////////////////////////')
                console.log(k)
                console.log(tUniformLocationGroup)
                console.log(tUniformLocationGroup[k])
                console.log(tUniformLocationGroup[k]['type'])
                console.log(tUniformGroup[k])
                console.log(tUniformLocationGroup[k]['location'])
                console.log(tUniformLocationGroup)
                console.log('//////////////////////////////////////')
                var tObj;
                tObj = {}
                tRenderType = undefined
                if(!tUniformLocationGroup.hasOwnProperty(k)) throw 'RedMaterialInfo : 유니폼명 : '+k+' / 쉐이더에 정의되지 않은 유니폼에 접근하려고합니다.'
                if (tUniformLocationGroup[k]['type'] == 'samplerCube' || tUniformLocationGroup[k]['type'] == 'sampler2D') {
                    tRenderType = RedConst.SAMPLER
                }
                if (tUniformLocationGroup[k]['type'] == 'vec2' || tUniformLocationGroup[k]['type'] == 'vec3' || tUniformLocationGroup[k]['type'] == 'vec4') {
                    tRenderType = RedConst.VEC
                }
                if (tUniformLocationGroup[k]['type'] == 'mat2' || tUniformLocationGroup[k]['type'] == 'mat3' || tUniformLocationGroup[k]['type'] == 'mat4') {
                    tRenderType = RedConst.MAT
                }
                if (k == 'uAtlascoord') tRenderType = RedConst.ATLASCOORD
                if (tUniformLocationGroup[k]['type'] == 'int') tRenderType = RedConst.INT
                if (tUniformLocationGroup[k]['type'] == ['float']) tRenderType = RedConst.FLOAT
                this['__uniformList'].push({
                    key: k,
                    type: tUniformLocationGroup[k]['type'],
                    renderType: tRenderType,
                    value: tUniformGroup[k],
                    location: tUniformLocationGroup[k]['location']
                })
                // if(tMeterial.hasOwnProperty(k)) throw '유니폼이름과 재질의 프로퍼티네임이 같으면 안됩니다.'
                this[k] = tUniformGroup[k]
            }
            this['needUniformList'] = false
        }
    }
    /**DOC:
		{
            title :`setTexture`,
            code :`FUNCTION`,
            description : `
                - 텍스쳐 변경 매서드
                - 텍스쳐 변경후 자동으로 needUniformList=true를 반영하여 렌더링시 유니폼리스트를 재생성한다.
            `,
			example : `인스턴스.setTexture('uDiffuseTexture',RedTextureInfo instance)`,
			return : 'void'
        }
        :DOC*/
    RedMaterialInfo.prototype.setTexture = function (key, texture) {
        if (texture instanceof RedTextureInfo || texture instanceof RedCubeTextureInfo || texture instanceof RedAtlasUVInfo) {
            this[key] = texture
            this.updateUniformList()
        } else {
            throw '텍스쳐 형식이 아닙니다.'
        }
    }
    /**DOC:
		{
            title :`DIFFUSE_TEXTURE`,
            code : 'CONST',
            description : `
                - 디퓨즈 텍스쳐 유니폼 상수
            `,
			example : `인스턴스.DIFFUSE_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.DIFFUSE_TEXTURE = 'uDiffuseTexture'
    /**DOC:
		{
            title :`NORMAL_TEXTURE`,
            code : 'CONST',
            description : `
                - NORMAL_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.NORMAL_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.NORMAL_TEXTURE = 'uNormalTexture'
    /**DOC:
		{
            title :`DISPLACEMENT_TEXTURE`,
            code : 'CONST',
            description : `
                - DISPLACEMENT_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.DISPLACEMENT_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.DISPLACEMENT_TEXTURE = 'uDisplacementTexture'
    /**DOC:
		{
            title :`SPECULAR_TEXTURE`,
            code : 'CONST',
            description : `
                - SPECULAR_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.SPECULAR_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.SPECULAR_TEXTURE = 'uSpecularTexture'
    /**DOC:
		{
            title :`REFLECTION_TEXTURE`,
            code : 'CONST',
            description : `
                - REFLECTION_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.REFLECTION_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.REFLECTION_TEXTURE = 'uReflectionTexture'
     /**DOC:
		{
            title :`REFLECTION_TEXTURE`,
            code : 'CONST',
            description : `
                - REFLECTION_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.REFLECTION_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.REFRACTION_TEXTURE = 'uRefractionTexture'
    
    Object.freeze(RedMaterialInfo)
})();