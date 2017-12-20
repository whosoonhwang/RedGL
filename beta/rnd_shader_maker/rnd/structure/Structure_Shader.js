'use strict';
var Structure_Shader;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Shader = function () {
        this['nodeType'] = 'ShaderTest'
        this['index'] = index
        this['structure'] = {
            funcInfo : {
                func_shaderTest : 
`vec4 func_shaderTest(vec2 currentTexcoord){
    vec2 v_texCoord = gl_FragCoord.xy/uSystemResolution +currentTexcoord;
    vec2 p =  (v_texCoord) * 8.0 ;
    vec2 i = p;
    float c = 1.0;
    float inten = .05;
    for (int n = 0; n < MAX_ITER; n++)
    {
        float t = uSystemTime * (2.0 - (3.0 / float(n+1)));

        i = p + vec2(cos(t - i.x) + sin(t + i.y),
        sin(t - i.y) + cos(t + i.x));

        c += 1.0/length(
            vec2(p.x / (sin(i.x+t)/inten),
        p.y / (cos(i.y+t)/inten)));
    }
    c /= float(MAX_ITER);
    c = 1.5 - sqrt(c);
    vec4 texColor = vec4(0.10, 0.55, 0.02, 1.);
    texColor.rgb *= (1.0/ (1.0 - (c + 0.05)));
    texColor.rgb *= 0.1;
    return texColor;
}
`
            },
            textureInfo : {},
            output: {
                SHADER_TEST_OUTPUT: { dataType: 'vec4', to: {}, sourceKey: 'SHADER_TEST_OUTPUT_' + this['index'] }
            }
        }
        this['parse'] = function () {
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
            var defineInfo;
            var resultStr;
            var k, tData;
            var  tOutput
       

           
            tOutput = this['structure']['output']['SHADER_TEST_OUTPUT']
            console.log(this['define']['vars'])
            resultStr = ''
            this['define']['uniforms']['MAX_ITER'] = 'const int MAX_ITER = 4'
            this['define']['vars'][tVarKey = 'SHADER_TEST_OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
            this['define']['funcInfo']['func_shaderTest'] = this['structure']['funcInfo']['func_shaderTest']
            this['define']['headers'].push('    ' + tVarKey + ' = ' + 'func_shaderTest(vTexcoord)')
         
            defineInfo = this['define']
            //
            tData = defineInfo['uniforms']
            resultStr += '//define uniforms;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['varyings']
            resultStr += '//define varyings;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['vars']
            resultStr += '//define vars;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            tData = defineInfo['funcInfo']
            resultStr += '//define funcs;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            resultStr += '//define headers;\n'
            defineInfo['headers'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += '//define footers;\n'
            defineInfo['footers'].forEach(function (v) { resultStr += v + ';\n' })


            return resultStr
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Shader)
})();