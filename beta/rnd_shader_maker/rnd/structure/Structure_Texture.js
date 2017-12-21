'use strict';
var Structure_Texture;
(function () {
    var index;
    var tUniformKey, tVaryingKey, tVarKey;
    index = 0
    Structure_Texture = function () {
        this['nodeType'] = 'Texture'
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
                    from: null
                }
            },
            output: {
                COLOR: { dataType: 'vec4', to: {}, sourceKey: 'textureColor_' + this['index'] },
                R: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.r' },
                G: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.g' },
                B: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.b' },
                A: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.a' }
            }
        }
        Structure_util.structureBaseFill(this['structureBase'])
        this['parse'] = function () {
            this['define'] = new Structure_define()
            var tUVKey;
            this['define']['uniforms'][tUniformKey = this['structureBase']['textureInfo']['textureUniformKey']] = 'uniform sampler2D ' + tUniformKey
            this['define']['textureInfo'][tUniformKey] = this['structureBase']['textureInfo']
            tUVKey = tVaryingKey
            this['define']['vars'][tVarKey = 'textureColor_' + this['index']] = 'vec4 ' + tVarKey
            // 인풋 UV가있으면 바라보는 UV값을 변경해야함
            if (this['structureBase']['input']['UV']['from']) {
                this['define']['vars'][tVarKey = 'inputUV_' + this['index']] = 'vec2 ' + tVarKey
                tUVKey = tVarKey
                this['define']['headers'].push(tUVKey + ' = ' + tVaryingKey)
            }
            this['define']['headers'].push('    ' + tVarKey + ' = texture2D(' + tUniformKey + ',' + tUVKey + ')')
            return Structure_util.makeViewStr(this['define'])
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Texture)
})();