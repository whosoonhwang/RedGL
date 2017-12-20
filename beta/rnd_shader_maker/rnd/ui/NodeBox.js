'use strict';
var NodeBox;
(function () {
    var startMouseX, startMouseY;
    var startX, startY;
    var currentZIndex;
    var makeInputItems, makeOutputItems;
    Recard.Css('.inOutputBox').S(
        'display', 'inline-block',
        'width', '50%',
        'padding-top', 5,
        'padding-bottom', 5
    )
    currentZIndex = 1
    makeInputItems = function (info) {
        for (var k in info) this.S('>', InputItem(k, info[k]))
    }
    makeOutputItems = function (info) {
        for (var k in info) this.S('>', OutputItem(k, info[k]))
    }
    NodeBox = function (structureInfo) {
        if (!(this instanceof NodeBox)) return new NodeBox(structureInfo)
        var rootBox;
        var inputBox, outputBox;
        var imageBox, fileBox, uniformNameBox;
        rootBox = Recard.Dom('div').S(
            '@nodeType', structureInfo['nodeType'],
            'position', 'absolute',
            'top', 0,
            'left', 0,
            'min-width', 250,
            'z-index', currentZIndex++,
            // 'max-height', 400,
            'background', 'rgba(29,28,36,0.8)',
            'box-shadow', '0px 0px 10px 5px rgba(0,0,0,0.2)',
            'border-radius', 10,
            'transform', 'translate(-50%, -50%)',
            '>', Recard.Dom('div').S(
                'position', 'absolute',
                'top', 0,
                'left', 0,
                'right', 0,
                'transform', 'translate(0,-100%)',
                // 텍스쳐의 경우 이미지를 따로 받아서 UUID로 활용한다.
                // 일반적인 UUID는 아니며... 쉐이더내의 유니폼명으로 활용하기위한 기반
                'background', 'rgba(0,0,0,0.5)',
                'display', structureInfo['nodeType'] == 'Texture' ? 'block' : 'none',
                '>', imageBox = Recard.Dom('img').S(
                    '@imageBox', '',
                    'float', 'left',
                    'width', 80,
                    'height', 80,
                    'margin', 10,
                    'border-radius', 5,
                    '@src', structureInfo['structure']['textureInfo']['src']
                ),
                '>', Recard.Dom('div').S(
                    'margin-top', 10,
                    'width', 200,
                    'display', 'inline-block',
                    '>', uniformNameBox = Recard.Dom('input').S(
                        '@disabled', '',
                        '@type', 'text',
                        '@value', structureInfo['nodeType'] == 'Texture' ? structureInfo['structure']['textureInfo']['textureUniformKey'] : (structureInfo['nodeType'] + structureInfo['index']),
                        'width', 200,
                        'on', ['focusout', function (e) {
                            structureInfo['structure']['textureInfo']['textureUniformKey'] = this.S('@value')

                            Recard.query('[nodeType="Final"]')['parseDefine']()
                        }]
                    ),
                    '>', fileBox = Recard.Dom('input').S(
                        '@type', 'file',
                        '@accept', '.png, .jpg, .jpeg',
                        'width', 200,
                        'on', ['change', function (e) {
                            console.log(this.__dom__.files)
                            structureInfo['structure']['textureInfo']['src'] = window.URL.createObjectURL(this.__dom__.files[0])
                            imageBox.S('@src', window.URL.createObjectURL(this.__dom__.files[0]))

                            Recard.query('[nodeType="Final"]')['parseDefine']()
                        }]
                    ),
                    '>', (function () {
                        var t0;
                        t0 = Recard.Dom('select').S(
                            'width', 200,
                            'on', ['change', function (e) {
                                console.log(this.__dom__.files)
                                structureInfo['structure']['textureInfo']['textureIndex'] = +this.S('@value')
                                uniformNameBox.S('@disabled', null)
                                switch (structureInfo['structure']['textureInfo']['textureIndex']) {
                                    case RedTextureIndex.DIFFUSE:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structure']['textureInfo']['textureUniformKey'] = 'uDiffuseTexture'
                                        break
                                    case RedTextureIndex.NORMAL:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structure']['textureInfo']['textureUniformKey'] = 'uNormalTexture'
                                        break
                                    case RedTextureIndex.SPECULAR:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structure']['textureInfo']['textureUniformKey'] = 'uSpecularTexture'
                                        break
                                    case RedTextureIndex.DISPLACEMENT:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structure']['textureInfo']['textureUniformKey'] = 'uDisplacementTexture'
                                        break
                                    default:
                                        structureInfo['structure']['textureInfo']['textureUniformKey'] = 'uTexture_' + structureInfo['index']
                                        break
                                }
                                uniformNameBox.S(
                                    '@value', structureInfo['structure']['textureInfo']['textureUniformKey']
                                )

                                Recard.query('[nodeType="Final"]')['parseDefine']()
                            }]
                        )
                        for (var k in RedTextureIndex) {
                            if (k != 'CREATE') {
                                Recard.Dom('option').S(
                                    '@value', RedTextureIndex[k],
                                    'html', k,
                                    '<', t0
                                )
                            }
                        }
                        return t0;
                    })()
                )
            ),
            '>', Recard.Dom('div').S(
                'position', 'relative',
                'height', 30,
                'border-top-left-radius', 8,
                'border-top-right-radius', 8,
                'background', '#272530',
                'line-height', 30,
                'padding-left', 10,
                '>', Recard.Dom('span').S(
                    '@titleBox', '',
                    'html', structureInfo['nodeType'] + structureInfo['index'],
                ),
                'cursor', 'move',
                'on', ['down', function (e) {
                    rootBox.S('z-index', currentZIndex++)
                    startMouseX = Recard.WIN.mouseX
                    startMouseY = Recard.WIN.mouseY
                    startX = rootBox.S('left')
                    startY = rootBox.S('top')
                    Recard.LOOPER.add('RED_SHADER_NODE_BOX', function () {
                        var tX, tY
                        tX = startX - (startMouseX - Recard.WIN.mouseX)
                        tY = startY - (startMouseY - Recard.WIN.mouseY)
                        rootBox.S(
                            'left', tX,
                            'top', tY
                        )
                    })
                    Recard.EVENT_EMITTER.on(window, 'mouseup', function () {
                        Recard.LOOPER.del('RED_SHADER_NODE_BOX')
                        Recard.EVENT_EMITTER.off(window, 'mouseup')
                    })
                }],
                '>', Recard.Dom('button').S(
                    'display', 'block',
                    'float', 'right',
                    'margin-right', 5,
                    'height', 30,
                    'background', 'transparent',
                    'border', 0,
                    'color', '#fff',
                    'font-size', 11,
                    'cursor', 'pointer',
                    'html', 'X',
                    'on', ['down', function () {
                        rootBox.queryAll('[inputItem]').forEach(function(item){
                            item['deleteFromData']()
                        })
                        rootBox.queryAll('[outputItem]').forEach(function(item){
                            for(var k in item['info']['to']){
                                var tItemData = item['info']['to'][k]
                                console.log(tItemData)
                                for(var k2 in tItemData){
                                    tItemData[k2]['deleteFromData']()
                                }
                                
                            }
                        })
                        rootBox.remove()
                    }]
                )
            ),
            '>', inputBox = Recard.Dom('div').S('@className', 'inOutputBox', 'float', 'left'),
            '>', outputBox = Recard.Dom('div').S('@className', 'inOutputBox', 'float', 'right'),
            '>', Recard.Dom('div').S('clear', 'both'),
            '>', Recard.Dom('pre').S(
                '@className', 'style-1',
                'max-width', 500,
                'max-height', 400,
                'overflow', 'auto',
                'margin', 0,
                'background', 'transparent',
                '>', Recard.Dom('code').S(
                    '@codeBox', '',
                    '@className', 'language-javascript',
                    'background', 'rgba(0,0,0,0.1)',
                    'padding', 10
                )
            )
        )
        rootBox['structureInfo'] = structureInfo
        rootBox['prism'] = function () {
            Prism.highlightElement(rootBox.query('[codeBox]').__dom__)
        }
        rootBox['parseDefine'] = (function () {
            var makeNodeStack;
            makeNodeStack = function (tRoot, tList) {
                tRoot.queryAll('[inputItem]').forEach(function (item) {
                    if (item['info']['from']) {
                        item['info']['from'].parent().parent()['structureInfo'].parse()
                        tList.push(item['info']['from'].parent().parent())
                        makeNodeStack(item['info']['from'].parent().parent(), tList)
                        // console.log(item.S('@key'),item['info']['from'])
                    }
                })

            }
            return function () {
                console.log(this)
                rootBox.query('[codeBox]').S(
                    'html', ''
                )
                var tList = []
                var resultInfo = []
                var finalDefine = {
                    funcInfo: {},
                    textureInfo: {},
                    uniforms: {},
                    varyings: {},
                    vars: {},
                    headers: [],
                    bodys: [],
                    footers: []
                }
                // 하위노드 리스트를 만들고
                makeNodeStack(Recard.query('[nodeType="Final"]'), tList)
                tList.reverse()
                // 하위부터 정보를 합한다.
                tList.forEach(function (item) {
                    console.log(item['structureInfo']['define'])
                    resultInfo.push({
                        uuid: item['structureInfo']['nodeType'] + item['structureInfo']['index'],
                        define: item['structureInfo']['define']
                    })
                })
                console.log('최종결과', resultInfo)
                resultInfo.forEach(function (item) {
                    var tData = item['define']
                    for (var groupKey in tData) {
                        var tGroupData = tData[groupKey]
                        if (tGroupData instanceof Array) {
                            tGroupData.forEach(function (v) {
                                finalDefine[groupKey].push(v)
                            })

                        } else {
                            for (var key in tGroupData) {
                                finalDefine[groupKey][key] = tGroupData[key]
                            }
                        }

                    }
                })
                console.log('finalDefine', finalDefine)
                if (structureInfo instanceof Structure_Final) {
                    Recard.RED_SHADER_PREVIEW.setTest(null, rootBox['structureInfo'].parse(finalDefine), finalDefine['textureInfo'])
                    Recard.query('[nodeType="Final"]').query('[codeBox]').S(
                        'html', Recard.query('[nodeType="Final"]')['structureInfo'].parse(finalDefine)
                    )
                } else {
                    rootBox.query('[codeBox]').S(
                        'html', rootBox['structureInfo'].parse(finalDefine)
                    )
                    Recard.query('[nodeType="Final"]').query('[codeBox]').S(
                        'html', Recard.query('[nodeType="Final"]')['parseDefine']()
                    )
                }



                rootBox['prism']()
                Recard.query('[nodeType="Final"]')['prism']()
            }
        })()
        makeInputItems.call(inputBox, structureInfo['structure']['input'])
        makeOutputItems.call(outputBox, structureInfo['structure']['output'])

        return rootBox
    }
})()