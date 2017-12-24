'use strict';
var Structure_Shader2;
(function () {
    var index;
    index = 0
    Structure_Shader2 = function (shaderType) {
        this['index'] = index
        this['structureBase'] = {
            output: {
                SHADER_TEST_OUTPUT: { dataType: 'vec4', to: {}, sourceKey: 'SHADER_TEST_OUTPUT_' + this['index'] }
            }
        }
        Structure_base.apply(this, ['ShaderTest2', shaderType])
        this['structureBase']['functions']['shaderTest2_'+this['index']] =
            `
#define PI 3.14159265359
#define T (vSystemTime/2.)
vec3 shaderTest2_${this['index']}_hsv2rgb (vec3 c){
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 shaderTest2_${this['index']} (vec2 currentTexcoord){
vec2 position = (( gl_FragCoord.xy / vSystemResolution.xy ) - 1.0) +vTexcoord;
position.x *= vSystemResolution.x / vSystemResolution.y;
vec3 color = vec3(0.);
for (float i = 0.; i < PI*2.; i += PI/17.5) {
    vec2 p = position - vec2(cos(i+T), sin(i+T)) * 0.25;
    vec3 col = shaderTest2_${this['index']}_hsv2rgb(vec3((i)/(PI*2.), 1., mod(i-T*3.,PI*2.)/PI));
    color += col * (1./1024.) / length(p);
}
return vec4(color,1.0);
}
`
        this['parse'] = function () {
            delete this['define_vertex']
            delete this['define_fragment']
            var tVarKey;
            var tUVKey, tStructureBase;
            var tDefineData;
            var k;
            var tOutput
            tStructureBase = this['structureBase']
            tDefineData = this['define_' + shaderType] = new Structure_define()
            tOutput = tStructureBase['output']['SHADER_TEST_OUTPUT']
            console.log(tDefineData['vars'])
            tDefineData['vars'][tVarKey = 'SHADER_TEST_OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
            for (var k in tStructureBase['functions']) {
                tDefineData['functions'][k] = tStructureBase['functions'][k]
            }
            tDefineData['headers'].push('    ' + tVarKey + ' = ' + `shaderTest2_${this['index']}(vTexcoord)`)
            return Structure_util.makeViewStr(tDefineData)
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Shader2)
})();