'use strict';
Recard.static('TEST_UI', (function () {
    var result;
    result = {
        init: function () {
            var info;
            info = {}
            info['type'] = 'Texture'
            info['structure'] = {
                title: null,
                output: {
                    TEXTURE: 'vec4',
                    R: 'float',
                    G: 'float',
                    B: 'float',
                    A: 'float'
                },
                input: {
                    UV: 'vec2',
                    TEST: null
                }
            }
            info.src = ''
            /////////////////////////////////////
            var diffuse, normal;
            diffuse = new Structure_Node(info)
            normal = new Structure_Node(info)
            console.log(diffuse)

            diffuse.S('left', 100)
            normal.S('left', 400)
            
            Recard.Dom('body').S(
                '>', diffuse,
                '>', normal
            )
            /////////////////////////////////////
            Recard.Dom('div').S(
                'position', 'absolute',
                'bottom', 10,
                'left', 10,
                'right', 10,
                'z-index',10000000,
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
                        info['type'] = 'Texture'
                        info['structure'] = {
                            title: null,
                            output: {
                                TEXTURE: 'vec4',
                                R: 'float',
                                G: 'float',
                                B: 'float',
                                A: 'float'
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
                        info['type'] = 'Add'
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
                        info['type'] = 'Mul'
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