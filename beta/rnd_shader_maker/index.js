'use strict';

Recard.static('INDEX', (function () {
    var result;
    var svgList = []
    result = {
        getLineList: function () {
            return svgList
        },
        init: function () {
            Recard.Css('body').S(
                'background', 'url(grid.png)',
                'font-size', 12,
                'color', '#fff',
                'user-select', 'none'
            )
            Recard.Css('.inputItem').S(
                'position', 'relative',
                'text-align', 'left',
                'padding-left', 10,
                'height', 20,
                'color', 'rgb(242, 169, 113)',
                'font-size', 11,
                'line-height', 20
            )
            Recard.Css('.outputItem').S(
                'position', 'relative',
                'text-align', 'right',
                'padding-right', 10,
                'height', 20,
                'font-size', 11,
                'color', 'rgb(242, 169, 113)',
                'line-height', 20
            )
            /////////////////////////////////////
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

            Recard.UPDATER.init()

            Recard.Dom('div').S(
                'position', 'absolute',
                'bottom', 10,
                'left', 10,
                'right', 10,
                '<','body',
                '>', Recard.Dom('button').S(
                    'margin-right',1,
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
                    'margin-right',1,
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
                    'margin-right',1,
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


            Recard.Dom('body').S(
                '>', diffuse,
                '>', normal
            )
        }
    }
    return result
})())