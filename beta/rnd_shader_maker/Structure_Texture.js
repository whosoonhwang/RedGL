
'use strict';
var Structure_Texture;
// 텍스쳐 기본정보
(function () {
    var W;
    var targetContainer;
    var startX, startY
    W = 150
    Structure_Texture = function (tInfo) {
        var rootBox;
        var inputBox;
        var outputBox;
        var info;
        ////////////////////////////////////////////////////////
        info = tInfo
        
        ////////////////////////////////////////////////////////
        rootBox = Recard.Dom('div').S(
            'position', 'absolute',
            'z-index',1,
            'left', Recard.WIN.w / 2 - W / 2,
            'top', Recard.WIN.h / 2,
            'width', 150,
            'min-height', 100,
            'background', '#444',
            'box-shadow', '0px 0px 10px 10px rgba(0,0,0,0.1)',
            '>', Recard.Dom('div').S(
                'background', '#666',
                'height', 30,
                'line-height', 30,
                'padding-left', 6,
                'html', info['title'] ? info['title'] : '정의되지않았음',
                'cursor', 'pointer',
                'on', ['down', function (e) {
                    targetContainer = rootBox
                    startX = e.nativeEvent.offsetX
                    startY = e.nativeEvent.offsetY
                }]
            ),
            '>', inputBox = Recard.Dom('div').S(
                'float', 'left',
                'display', 'inline-block',
                'width', '50%',
            ),
            '>', outputBox = Recard.Dom('div').S(
                'float', 'right',
                'display', 'inline-block',
                'width', '50%'
            )
        )
        for (var k in info['structure']['input']) {
            Recard.Dom('div').S(
                '@className', 'inputItem',
                '@key', k,
                'html', k,
                '>', Recard.Dom('div').S(
                    'position', 'absolute',
                    'top', '50%',
                    'left', 0,
                    'width', 10,
                    'height', 10,
                    'transform', 'translate(-50%,-50%)',
                    'background', '#fff',
                    'border-radius', '50%'
                ),
                '<', inputBox
            )
        }
        for (var k in info['structure']['output']) {
            Recard.Dom('div').S(
                '@className', 'outputItem',
                '@key', k,
                'html', k,
                '>', Recard.Dom('div').S(
                    'position', 'absolute',
                    'top', '50%',
                    'right', 0,
                    'width', 10,
                    'height', 10,
                    'transform', 'translate(50%,-50%)',
                    'background', '#fff',
                    'border-radius', '50%'
                ),
                '<', outputBox
            )
        }
        ////////////////////////////////////////////////////////
        rootBox['info'] = info
        rootBox['next'] = null
        rootBox['prev'] = null
        ////////////////////////////////////////////////////////

        return rootBox
    }
    Object.freeze(Structure_Texture)
    Recard.EVENT_EMITTER.on(window, 'mousemove', function (e) {
        if (targetContainer) {
            targetContainer.S(
                'top', Recard.WIN.mouseY - startY,
                'left', Recard.WIN.mouseX - startX
            )
        }
    })
    Recard.EVENT_EMITTER.on(window, 'mouseup', function (e) {
        targetContainer = null
    })
})();
