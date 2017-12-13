
'use strict';
var Structure_Node;
(function () {
    var W;
    var dragRootBox, dragStartX, dragStartY;
    var currentZIndex = 2
    var instanceID = 0
    var startPointRootBox, startItem, startItemKey, startItemType;
    var startDragX, startDragY
    var curveItem
    var drawTempCurve;
    var setPrevNext;
    W = 200
    drawTempCurve = function () {
        var sL, sT;
        var eL, eT;
        if (startItem) {
            sL = startDragX
            sT = startDragY
            eL = Recard.WIN.mouseX
            eT = Recard.WIN.mouseY
            if (curveItem) curveItem.remove(), curveItem = null
            curveItem = Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
                'position', 'absolute',
                'top', 0, 'left', 0,
                'z-index', 0,
                '@viewBox', [0, 0, Recard.WIN.w, Recard.WIN.h].join(','),
                '>', Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'path')).S(
                    '@fill', 'none',
                    '@stroke', 'green',
                    '@stroke-linecap', 'round',
                    '@stroke-width', 2,
                    '@d', [
                        'M' + sL + ',' + sT,
                        'C' + sL + ',' + (sT),
                        sL + ',' + (eT),
                        eL + ',' + eT
                    ].join(' ')
                ),
                '<', 'body'
            )

        }
    }
    setPrevNext = (function () {
        var tStart, tEnd
        var tEndUUID, tStartUUID;
        return function (targetItem, targetRootBox, key, endItemtype) {
            if (startItemType == 'outputItem') {
                console.log('시작이 아웃풋인놈')
                if (endItemtype != 'inputItem') return
                else tStart = startItem, tEnd = targetItem
            }
            tStartUUID = tStart['__uuid__']
            tEndUUID = tEnd['__uuid__']
            //
            if (!tStart['next']) tStart['next'] = {}
            if (!tStart['next'][tEndUUID]) tStart['next'][tEndUUID] = {}
            if (!tEnd['prev']) tEnd['prev'] = {}
            if (!tEnd['prev'][tStartUUID]) tEnd['prev'][tStartUUID] = {}
            //
            tStart['next'][tEndUUID] = {
                target: tEnd,
                rootBox: targetRootBox,
                targetKey: key
            }
            tEnd['prev'] = {
                target: tStart,
                rootBox: startPointRootBox,
                targetKey: startItemKey
            }
            console.log(tStart, tEnd)
        }
    })()
    Structure_Node = function (info) {
        var rootBox;
        var inputBox;
        var outputBox;
        instanceID++
        rootBox = Recard.Dom('div').S(
            '@nodeItem', '',
            'position', 'absolute',
            'z-index', currentZIndex++,
            'top', Recard.WIN.h / 2, 'left', Recard.WIN.w / 2 - W / 2,
            'width', W, 'min-height', 100,
            'background', 'rgba(29,28,36,0.8)',
            'box-shadow', '0px 0px 10px 5px rgba(0,0,0,0.2)',
            'border-radius', 10,
            '>', Recard.Dom('div').S(
                'position','relative',
                'height', 30,
                'border-top-left-radius', 8,
                'border-top-right-radius', 8,
                'background', '#272530',                
                'line-height', 30,
                'padding-left', 10,
                'html', info['title'] ? info['title'] : (info['type'] + ' Instance' + instanceID),
                'cursor', 'pointer',
                'on', ['down', function (e) {
                    dragRootBox = rootBox
                    dragStartX = e.nativeEvent.offsetX
                    dragStartY = e.nativeEvent.offsetY
                    rootBox.S('z-index', currentZIndex++)
                }],
                '>', Recard.Dom('button').S(
                    'float', 'right',
                    'margin-right',5,
                    'height', 30,
                    'background', 'transparent',
                    'border', 0,
                    'color', '#fff',
                    'font-size',11,
                    'cursor','pointer',
                    'html', 'X',
                    'on', ['down', function () {
                        rootBox.queryAll('[outputItem]').forEach(function(item,index){
                            if(item['next']){
                                for(var k in item['next']){
                                    delete item['next'][k]
                                }
                            }
                        })
                        rootBox.queryAll('[inputItem]').forEach(function(item,index){
                            if(item['prev']){
                                var tTarget = item['prev']['target']
                                console.log(tTarget)
                                for(var k in tTarget['next']){
                                    if(tTarget['next'][k]['rootBox']==rootBox) delete tTarget['next'][k]
                                }
                            }
                        })
                        rootBox.remove()
                    }]
                )
            ),
            '>', inputBox = Recard.Dom('div').S('@className', 'inOutputBox', 'float', 'left'),
            '>', outputBox = Recard.Dom('div').S('@className', 'inOutputBox', 'float', 'right')
        )
        for (var k in info['structure']['input']) {
            Recard.Dom('div').S(
                '@className', 'inputItem',
                '>', Recard.Dom('span').S('html', k, ),
                '>', Recard.Dom('span').S('color', '#888', 'html', ' ' + info['structure']['input'][k]),
                '>', Recard.Dom('div').S(
                    '@inputItem', '',
                    '@key', k,
                    'position', 'absolute',
                    'top', '50%', 'left', 0,
                    'width', 10, 'height', 10,
                    'transform', 'translate(-50%,-50%)',
                    'background', '#666',
                    'border-radius', '50%',
                    'cursor', 'pointer',
                    'on', ['over', function () { this.S('background', 'red') }],
                    'on', ['out', function () { this.S('background', '#666') }],
                    'on', ['up', function () {
                        console.log('오냐?')
                        setPrevNext(this, rootBox, this.S('@key'), this.parent().S('@className'))
                    }]
                ),
                '<', inputBox
            )
        }
        for (var k in info['structure']['output']) {
            Recard.Dom('div').S(
                '@className', 'outputItem',
                '>', Recard.Dom('span').S('color', '#888', 'html', info['structure']['output'][k] + ' '),
                '>', Recard.Dom('span').S('html', k, ),
                '>', Recard.Dom('div').S(
                    '@outputItem', '',
                    '@key', k,
                    'position', 'absolute',
                    'top', '50%', 'right', 0,
                    'width', 10, 'height', 10,
                    'transform', 'translate(50%,-50%)',
                    'background', '#fff',
                    'border-radius', '50%',
                    'cursor', 'pointer',
                    'on', ['over', function () { this.S('background', 'red') }],
                    'on', ['out', function () { this.S('background', '#fff') }],
                    'on', ['down', function () {
                        startPointRootBox = rootBox
                        startItem = this
                        startItemKey = this.S('@key')
                        startItemType = this.parent().S('@className')
                        startDragX = Recard.WIN.mouseX
                        startDragY = Recard.WIN.mouseY
                    }]
                ),
                '<', outputBox
            )
        }
        ////////////////////////////////////////////////////////
        rootBox['info'] = info
        ////////////////////////////////////////////////////////
        return rootBox
    }
    Object.freeze(Structure_Node)
    // 드래그/라인처리 관련 이벤트 처리
    Recard.EVENT_EMITTER.on(window, 'mousemove', function (e) {
        if (dragRootBox) {
            dragRootBox.S(
                'top', Recard.WIN.mouseY - dragStartY,
                'left', Recard.WIN.mouseX - dragStartX
            )
        }
        if (startItem) drawTempCurve()
    })
    Recard.EVENT_EMITTER.on(window, 'mouseup', function (e) {
        dragRootBox = null

        if (curveItem) {
            setTimeout(function () {
                startItem = null
            }, 1)
            curveItem.remove(), curveItem = null
        }
    })
})();
