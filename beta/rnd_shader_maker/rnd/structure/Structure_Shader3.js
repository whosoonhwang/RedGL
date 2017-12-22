'use strict';
var Structure_Shader3;
(function () {
    var index;
    index = 0
    Structure_Shader3 = function (shaderType) {
        this['index'] = index
        this['structureBase'] = {
            output: {
                SHADER_TEST_OUTPUT: { dataType: 'vec4', to: {}, sourceKey: 'SHADER_TEST_OUTPUT_' + this['index'] }
            }
        }
        Structure_base.apply(this, ['ShaderTest2', shaderType])
        this['structureBase']['functions']['shaderTest3'] =
            `

vec4 shaderTest3_${this['index']} (vec4 position){
 
    return normalize(vec4(
        sin( vSystemTime ) * position.x  +  cos( vSystemTime ) * position.z , 
        sin( vSystemTime ) * position.y  +  cos( vSystemTime ) * position.y ,
        sin( vSystemTime ) * position.z  +  cos( vSystemTime ) * position.x ,
        1.0
    ));
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
            tDefineData['footers'].push('    gl_Position += ' + `shaderTest3_${this['index']}(gl_Position)`)
            return Structure_util.makeViewStr(tDefineData)
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Shader3)
})();