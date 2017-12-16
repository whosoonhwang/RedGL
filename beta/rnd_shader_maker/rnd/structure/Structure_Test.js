'use strict';
var Structure_Test;
(function () {
    var index;
    index = 0
    Structure_Test = function () {
        this['nodeType'] = 'TypeTest'
        this['index'] = index
        this['structure'] = {
            input: {
                FLOAT: {
                    dataType: 'float',
                    from: null
                },
                INT: {
                    dataType: 'int',
                    from: null
                },
                VEC2: {
                    dataType: 'vec2',
                    from: null
                },
                VEC3: {
                    dataType: 'vec3',
                    from: null
                },
                VEC4: {
                    dataType: 'vec4',
                    from: null
                }
            },
            output: {
                FLOAT: { dataType: 'float', to: {} },
                INT: { dataType: 'int', to: {} },
                VEC2: { dataType: 'vec2', to: {} },
                VEC3: { dataType: 'vec3', to: {} },
                VEC4: { dataType: 'vec4', to: {} }
            }
        }
        this['compileInfo'] = new CompileInfo()
        index++
        console.log(this)
    }
    Object.freeze(Structure_Test)
})();