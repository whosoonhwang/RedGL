'use strict';
var Structure_Shader;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Shader = function () {
        this['nodeType'] = 'ShaderTest'
        this['index'] = index
        this['structureBase'] = {
            functions: {
                func_shaderTest:
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
}`
            },
            output: {
                SHADER_TEST_OUTPUT: { dataType: 'vec4', to: {}, sourceKey: 'SHADER_TEST_OUTPUT_' + this['index'] }
            }
        }
        Structure_util.structureBaseFill(this['structureBase'])
        this['parse'] = function () {
            this['define'] = new Structure_define()
            var k, tData;
            var tOutput
            tOutput = this['structureBase']['output']['SHADER_TEST_OUTPUT']
            console.log(this['define']['vars'])
            this['define']['uniforms']['MAX_ITER'] = 'const int MAX_ITER = 4'
            this['define']['vars'][tVarKey = 'SHADER_TEST_OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
            for(var k in this['structureBase']['functions']){
                this['define']['functions'][k] = this['structureBase']['functions'][k]
            }
            this['define']['headers'].push('    ' + tVarKey + ' = ' + 'func_shaderTest(vTexcoord)')
            return Structure_util.makeViewStr(this['define'])
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Shader)
})();