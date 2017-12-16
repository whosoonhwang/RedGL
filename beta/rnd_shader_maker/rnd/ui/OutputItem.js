'use strict';
var OutputItem;
(function () {
    OutputItem = function (key, info) {
        if (!(this instanceof OutputItem)) return new OutputItem(key, info)
        var rootBox;
        var pointBox;
        var toInfo;
        toInfo = info['to']
        console.log('toInfo', toInfo)
        rootBox = Recard.Dom('div').S(
            '@outputItem', '',
            '@key', key,
            '@dataType', info['dataType'],
            'position', 'relative',
            'height', 20,
            'text-align', 'right',
            'line-height', 20,
            '>', pointBox = Recard.Dom('button').S(
                'position', 'absolute',
                'top', '50%',
                'right', 0,
                'width', 15,
                'height', 15,
                'transform', 'translate(50%, -50%)',
                'border-radius', '50%',
                'background', '#666',
                'on', ['down', function () {
                    Recard.LINE_MANAGER.setTempCurve(rootBox)
                    Recard.EVENT_EMITTER.on(window, 'mouseup', function () {
                        Recard.EVENT_EMITTER.off(window, 'mouseup')
                        setTimeout(function () {
                            Recard.LINE_MANAGER.removeTempCurve()
                        }, 1)
                    })
                }]
            ),
            '>', Recard.Dom('span').S(
                'margin-right', 5,
                'color', 'rgb(242, 169, 113)',
                'html', info['dataType'] ? info['dataType'] : 'null'
            ),
            '>', Recard.Dom('span').S(
                'margin-right', 15,
                'html', key
            )
        )
        rootBox['delTo'] = function (inputItem) {
            console.log('기존꺼있으면삭제')
            var tKey;
            tKey = inputItem.parent().parent().query('[titleBox]').S('text')
            if (!toInfo[tKey]) toInfo[tKey] = {}
            delete toInfo[tKey][inputItem.S('@key')]
        }
        rootBox['addTo'] = function (inputItem) {
            console.log('새로추가삭제')
            var tKey;
            tKey = inputItem.parent().parent().query('[titleBox]').S('text')
            if (!toInfo[tKey]) toInfo[tKey] = {}
            toInfo[tKey][inputItem.S('@key')] = inputItem
            console.log(toInfo)
        }
        return rootBox
    }
})()