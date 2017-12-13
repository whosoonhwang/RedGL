'use strict';
Recard.static('TEST_UI', (function () {
    var result;
    var setResult
    setResult = function () {
        var info;
        info = {}
        info['nodeType'] = 'Result'
        info['structure'] = {
            title: 'Result',
            output: {},
            input: {
                DIFFUSE: 'vec4',
                NORMAL: 'vec4',
                SPECULAR: 'vec4',
                DISPLACEMENT: 'vec4'
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
        lastCompile: (function(){
            var parse;
            var data;
            parse = function(parentData,tData){
                var root;
                var tInputItemList
                console.log(tData)
                parentData.push(tData)
                root = tData['rootBox']                
                tInputItemList = root.queryAll('[inputItem]')
                tInputItemList.forEach(function (item, index) {
                    if(item['prev']) {
                        parse(parentData,item['prev'])
                    }
                })
            }
            return function () {
                var root;
                var tInputItemList
                data = {}
                root = Recard.query('[nodeType="Result"]')
                tInputItemList = root.queryAll('[inputItem]')
                console.log(root)            
                tInputItemList.forEach(function (item, index) {
                    if(item['prev']) {
                        data[item.S('@key')]={
                            children : []
                        }
                        parse(data[item.S('@key')]['children'],item['prev'])
                    }
                    
                })
                console.log(data)
                root['compileInfo'] = {
                    define: {
                        uniforms: {},
                        varyings: {},
                        vars: {}
                    },
                    header: [],
                    body: [],
                    footer: []
                }
                var mergeCompileSource = {
                    define: {
                        uniforms: [],
                        varyings: [],
                        vars: []
                    },
                    header: [],
                    body: [],
                    footer: []
                }
                for (var k in data) {
                    var tFlow;
                    tFlow = data[k]['children'].concat()
                    tFlow.reverse()
                    console.log(k, '에 대한 플로우', tFlow)
                    tFlow.forEach(function (item) {
                        var tData = item['rootBox']['compileSourceInfo']
                        console.log(tData)
                        mergeCompileSource['header'] = mergeCompileSource['header'].concat(tData['header'])
                        mergeCompileSource['body'] = mergeCompileSource['body'].concat(tData['body'])
                        mergeCompileSource['footer'] = mergeCompileSource['footer'].concat(tData['footer'])
                        mergeCompileSource['define']['uniforms'] = mergeCompileSource['define']['uniforms'].concat(
                            item['rootBox']['compileSourceInfo']['define']['uniforms']
                        )
                        mergeCompileSource['define']['varyings'] = mergeCompileSource['define']['varyings'].concat(
                            item['rootBox']['compileSourceInfo']['define']['varyings']
                        )
                        mergeCompileSource['define']['vars'] = mergeCompileSource['define']['vars'].concat(
                            item['rootBox']['compileSourceInfo']['define']['vars']
                        )
                        
                      
                    })
                }
                console.log(mergeCompileSource)
                root.makeCode(mergeCompileSource)


            }
        })(),
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
                                // TEXTURE: 'sampler2D',
                                COLOR: 'vec4',
                                R: 'float',
                                G: 'float',
                                B: 'float',
                                A: 'float'
                            },
                            input: {
                                UV: 'vec2'
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