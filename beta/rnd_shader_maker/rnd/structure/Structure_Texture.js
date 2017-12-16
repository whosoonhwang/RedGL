'use strict';
var Structure_Texture;
(function () {
    var index;
    index = 0
    Structure_Texture = function () {
        this['nodeType'] = 'Texture'
        this['index'] = index
        this['structure'] = {
            input: {
                UV: {
                    dataType: 'vec2',
                    from: null
                }
            },
            output: {
                COLOR: { dataType: 'vec4', to: {} },
                R: { dataType: 'float', to: {} },
                G: { dataType: 'float', to: {} },
                B: { dataType: 'float', to: {} },
                A: { dataType: 'float', to: {} }
            }
        }
        this['compileInfo'] = new CompileInfo()
        index++
        console.log(this)
    }
    Object.freeze(Structure_Texture)
})();