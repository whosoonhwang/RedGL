'use strict';
var Structure_Shader;
(function () {
    var index;

    index = 0
    Structure_Shader = function (shaderType) {
        this['index'] = index
        this['structureBase'] = {
            output: {
                SHADER_TEST_OUTPUT: { dataType: 'vec4', to: {}, sourceKey: 'SHADER_TEST_OUTPUT_' + this['index'] }
            }
        }

        Structure_base.apply(this, ['ShaderTest1', shaderType])
        this['structureBase']['functions']['shaderTest'] =
            `
const int shaderTest_MAX_ITER = 4;
vec4 shaderTest_${this['index']} (vec2 currentTexcoord){
vec2 v_texCoord = ${shaderType == 'vertex' ? 'currentTexcoord.xy' : 'gl_FragCoord.xy'}/vSystemResolution ;
vec2 p =  (v_texCoord) * 8.0 ;
vec2 i = p;
float c = 1.0;
float inten = .05;
for (int n = 0; n < shaderTest_MAX_ITER ; n++)
{
float t = vSystemTime * (2.0 - (3.0 / float(n+1)));

i = p + vec2(cos(t - i.x) + sin(t + i.y),
sin(t - i.y) + cos(t + i.x));

c += 1.0/length(
vec2(p.x / (sin(i.x+t)/inten),
p.y / (cos(i.y+t)/inten)));
}
c /= float(shaderTest_MAX_ITER );
c = 1.5 - sqrt(c);
vec4 texColor = vec4(0.10, 0.55, 0.02, 0.);
texColor.rgb *= (1.0/ (1.0 - (c + 0.05)));
texColor.rgb *= 0.3;
return texColor;
}
`
        this['parse'] = function () {
            delete this['define_vertex']
            delete this['define_fragment']
            var tUVKey, tStructureBase;
            var tDefineData;
            var k;
            var tOutput
            var tVarKey;
            tStructureBase = this['structureBase']
            tDefineData = this['define_' + shaderType] = new Structure_define()
            tOutput = tStructureBase['output']['SHADER_TEST_OUTPUT']
            tDefineData['vars'][tVarKey = 'SHADER_TEST_OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
            for (var k in tStructureBase['functions']) {
                tDefineData['functions'][k] = tStructureBase['functions'][k]
            }
            tDefineData['headers'].push('    ' + tVarKey + ' = ' + `shaderTest_${this['index']}(vTexcoord)`)
            return Structure_util.makeViewStr(tDefineData)
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Shader)
})();