'use strict';
var Structure_Texture;
(function () {
    var index;
    var tUniformKey,tVaryingKey,tVarKey;
    index = 0
    Structure_Texture = function () {
        this['nodeType'] = 'Texture'
        this['index'] = index
        this['structure'] = {
            funcInfo : {},
            textureInfo: {
                textureUniformKey : 'uDiffuseTexture',
                textureIndex : RedTextureIndex.DIFFUSE,
                varStr : 'textureColor_'+this['index'],
                src : 'images/noImage.jpg'
            },
            input: {
                UV: {
                    dataType: 'vec2',
                    from: null
                }
            },
            output: {
                COLOR: { dataType: 'vec4', to: {}, sourceKey : 'textureColor_'+this['index'] },
                R: { dataType: 'float', to: {}, sourceKey : 'textureColor_'+this['index']+'.r' },
                G: { dataType: 'float', to: {}, sourceKey : 'textureColor_'+this['index']+'.g' },
                B: { dataType: 'float', to: {}, sourceKey : 'textureColor_'+this['index']+'.b' },
                A: { dataType: 'float', to: {}, sourceKey : 'textureColor_'+this['index']+'.a' }
            }
        }
        this['parse'] = function(){
            this['define'] = {
                funcInfo : {},
                textureInfo : {},
                uniforms: {},
                varyings: {},
                vars: {},
                headers: [],
                bodys: [],
                footers: []
            }        
            var tUVKey;
            this['define']['uniforms'][tUniformKey = this['structure']['textureInfo']['textureUniformKey'] ] = 'uniform sampler2D ' + tUniformKey
            this['define']['textureInfo'][tUniformKey] = this['structure']['textureInfo']
            this['define']['varyings'][tVaryingKey = 'vTexcoord'] = 'varying vec2 ' + tVaryingKey
            tUVKey = tVaryingKey
            this['define']['vars'][tVarKey = 'textureColor_' + this['index']] = 'vec4 ' + tVarKey
            // 인풋 UV가있으면 바라보는 UV값을 변경해야함
            if(this['structure']['input']['UV']['from']){
               this['define']['vars'][tVarKey = 'inputUV_' + this['index']] = 'vec2 ' + tVarKey
               tUVKey = tVarKey
               this['define']['headers'].push(tUVKey + ' = ' + tVaryingKey)     
            }
            this['define']['headers'].push('    '+tVarKey + ' = texture2D(' + tUniformKey + ','+tUVKey+')')
            var defineInfo;
            var resultStr;
            var k,tData;
            resultStr = ''
            defineInfo = this['define']
            //
            tData = defineInfo['uniforms']
            resultStr += '//define uniforms;\n'
            for(k in tData){
                resultStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['varyings']
            resultStr += '//define varyings;\n'
            for(k in tData){
                resultStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['vars']
            resultStr += '//define vars;\n'
            for(k in tData){
                resultStr += tData[k] + ';\n'
            }
            console.log(defineInfo)
            resultStr += '//define headers;\n'
            defineInfo['headers'].forEach(function(v){ resultStr += v+';\n' })
            resultStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function(v){ resultStr += v+';\n' })
            resultStr += '//define footers;\n'
            defineInfo['footers'].forEach(function(v){ resultStr += v+';\n' })
            return resultStr
        }

        console.log('텍스쳐 기본정보',this['define'])
        
        index++
        console.log(this)
    }
    Object.freeze(Structure_Texture)
})();