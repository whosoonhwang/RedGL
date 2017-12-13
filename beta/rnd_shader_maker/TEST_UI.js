'use strict';
Recard.static('TEST_UI', (function () {
    var result;
    var setResult
    setResult = function () {
        var info;
        info = {}
        info['nodeType'] = 'gl_FragColor'
        info['structure'] = {
            title: 'gl_FragColor',
            output: {},
            input: {
                DIFFUSE: 'sampler2D',
                NORMAL: 'sampler2D',
                SPECULAR: 'sampler2D',
                DISPLACEMENT: 'sampler2D',
            }
        }
        info.src = '';
        var result;
        result = new Structure_Node(info)
        result.S(
            'left', 800,
            '<', 'body'
        )
    }
    result = {
        init: function () {
            setResult()
            /////////////////////////////////////
            Recard.Dom('div').S(
                'position', 'absolute',
                'bottom', 10,
                'left', 10,
                'right', 10,
                'z-index', 10000000,
                '<', 'body',
                '>', Recard.Dom('button').S(
                    'margin-right', 1,
                    'padding', 10,
                    'background', '#5b52aa',
                    'color', '#fff',
                    'outline', 'none',
                    'border', 0,
                    'cursor', 'pointer',
                    'html', '텍스쳐추가',
                    'on', ['down', function () {
                        var info;
                        info = {}
                        info['nodeType'] = 'Texture'
                        info['structure'] = {
                            title: null,
                            output: {
                                TEXTURE: 'sampler2D',
                                COLOR: 'vec4',
                                R: 'float',
                                G: 'float',
                                B: 'float',
                                A: 'float',
                                TEST_VEC2: 'vec2',
                                TEST_VEC3: 'vec3',
                                TEST_VEC4: 'vec4',
                                TEST_MAT2: 'mat2',
                                TEST_MAT3: 'mat3',
                                TEST_MAT4: 'mat4',
                            },
                            input: {
                                UV: 'vec2',
                                TEST: null
                            }
                        }
                        info.src = '';
                        (new Structure_Node(info)).S(
                            '<', 'body'
                        )
                    }]
                ),
                '>', Recard.Dom('button').S(
                    'margin-right', 1,
                    'padding', 10,
                    'background', '#5b52aa',
                    'color', '#fff',
                    'outline', 'none',
                    'border', 0,
                    'cursor', 'pointer',
                    'html', 'Add',

                    'on', ['down', function () {
                        var info;
                        info = {}
                        info['nodeType'] = 'Add'
                        info['structure'] = {
                            title: null,
                            output: {
                                OUTPUT: null
                            },
                            input: {
                                INPUT1: null,
                                INPUT2: null
                            }
                        }
                        info.src = '';
                        (new Structure_Node(info)).S(
                            '<', 'body'
                        )
                    }]
                ),
                '>', Recard.Dom('button').S(
                    'margin-right', 1,
                    'padding', 10,
                    'background', '#5b52aa',
                    'color', '#fff',
                    'outline', 'none',
                    'border', 0,
                    'cursor', 'pointer',
                    'html', 'Mul',
                    'on', ['down', function () {
                        var info;
                        info = {}
                        info['nodeType'] = 'Mul'
                        info['structure'] = {
                            title: null,
                            output: {
                                OUTPUT: null
                            },
                            input: {
                                INPUT1: null,
                                INPUT2: null
                            }
                        }
                        info.src = '';
                        (new Structure_Node(info)).S(
                            '<', 'body'
                        )
                    }]
                )
            )

        }
    }
    return result
})())