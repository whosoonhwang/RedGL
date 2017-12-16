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
        for (var k in info) this.S('>',InputItem(k,info[k]))
    }
    makeOutputItems = function (info) {
        for (var k in info) this.S('>',OutputItem(k,info[k]))
    }
    NodeBox = function (structureInfo) {
        if (!(this instanceof NodeBox)) return new NodeBox(structureInfo)
        var rootBox;
        var inputBox, outputBox;
        rootBox = Recard.Dom('div').S(
            'position', 'absolute',
            'top', 0,
            'left', 0,
            'width', 250,
            'max-height', 400,
            'background', 'rgba(29,28,36,0.8)',
            'box-shadow', '0px 0px 10px 5px rgba(0,0,0,0.2)',
            'border-radius', 10,
            'transform', 'translate(-50%, -50%)',
            '>', Recard.Dom('div').S(
                'position', 'relative',
                'height', 30,
                'border-top-left-radius', 8,
                'border-top-right-radius', 8,
                'background', '#272530',
                'line-height', 30,
                'padding-left', 10,
                '>',Recard.Dom('span').S(
                    '@titleBox','',
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
                        rootBox.remove()
                    }]
                )
            ),
            '>', inputBox = Recard.Dom('div').S('@className', 'inOutputBox', 'float', 'left'),
            '>', outputBox = Recard.Dom('div').S('@className', 'inOutputBox', 'float', 'right'),
            '>', Recard.Dom('div').S('clear', 'both'),
            '>', Recard.Dom('pre').S(
                '@className', 'style-1',
                'max-width', 400,
                'max-height', 200,
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
        makeInputItems.call(inputBox, structureInfo['structure']['input'])
        makeOutputItems.call(outputBox, structureInfo['structure']['output'])

        return rootBox
    }
})()