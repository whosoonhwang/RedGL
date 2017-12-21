'use strict';
var Structure_Texture;
(function () {
    var index;
    var tUniformKey, tVaryingKey, tVarKey;
    index = 0
    Structure_Texture = function (shaderType) {
        this['nodeType'] = shaderType+'_Texture'
        this['nodeColor'] = shaderType == 'fragment' ? 'rgb(144, 74, 135)' : 'rgb(50, 100, 135)'
        this['shaderType'] = shaderType
        this['index'] = index
        this['structureBase'] = {
            textureInfo: {
                textureUniformKey: 'uDiffuseTexture',
                textureIndex: RedTextureIndex.DIFFUSE,
                varStr: 'textureColor_' + this['index'],
                src: 'images/noImage.jpg'
            },
            input: {
                UV: {
                    dataType: 'vec2',
                    from: null,
                    shaderType : shaderType
                }
            },
            output: {
                COLOR: { dataType: 'vec4', to: {}, sourceKey: 'textureColor_' + this['index'], shaderType : shaderType },
                R: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.r', shaderType : shaderType },
                G: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.g', shaderType : shaderType },
                B: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.b', shaderType : shaderType },
                A: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.a', shaderType : shaderType }
            }
        }
        Structure_util.structureBaseFill(this['structureBase'])
        this['parse'] = function () {
            this['define_fragment'] = new Structure_define()
            var tUVKey;
            this['define_fragment']['uniforms'][tUniformKey = this['structureBase']['textureInfo']['textureUniformKey']] = 'uniform sampler2D ' + tUniformKey
            this['define_fragment']['textureInfo'][tUniformKey] = this['structureBase']['textureInfo']
            this['define_fragment']['varyings'][tVaryingKey = 'vTexcoord'] = 'varying vec2 vTexcoord' + tVaryingKey
            tUVKey = tVaryingKey
            this['define_fragment']['vars'][tVarKey = 'textureColor_' + this['index']] = 'vec4 ' + tVarKey
            // 인풋 UV가있으면 바라보는 UV값을 변경해야함
            if (this['structureBase']['input']['UV']['from']) {
                this['define_fragment']['vars'][tVarKey = 'inputUV_' + this['index']] = 'vec2 ' + tVarKey
                tUVKey = tVarKey
                this['define_fragment']['headers'].push(tUVKey + ' = ' + tVaryingKey)
            }
            this['define_fragment']['headers'].push('    ' + tVarKey + ' = texture2D(' + tUniformKey + ',' + tUVKey + ')')
            return Structure_util.makeViewStr(this['define_fragment'])
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Texture)
})();