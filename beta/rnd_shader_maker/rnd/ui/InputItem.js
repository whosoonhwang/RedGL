'use strict';
var InputItem;
(function () {
    InputItem = function (key, info) {
        if (!(this instanceof InputItem)) return new InputItem(key, info)
        var rootBox;
        var fromBox, dataTypeBox, pointBox;
        var update;
        update = function () {
            fromBox.S('html', '')
            pointBox.S('background', '#666')
            if (info['from']) {
                var tStr;
                tStr = [info['from'].parent().parent().query('[titleBox]').S('text')]
                info['from'].queryAll('span').forEach(function (v) {
                    tStr.push(v.S('text'))
                })
                fromBox.S('html', 'from - ' + tStr.join(' '))
                pointBox.S('background', 'rgb(242, 169, 113)')
            }else{
                pointBox.S('background', '#666')
            }
            dataTypeBox.S(
                'html', info['dataType'] ? info['dataType'] : 'null'
            )
        }
        rootBox = Recard.Dom('div').S(
            '@inputItem', '',
            '@key', key,
            '@dataType', info['dataType'],
            'position', 'relative',
            'line-height', 20,
            '>', pointBox = Recard.Dom('button').S(
                'position', 'absolute',
                'top', '50%',
                'left', 0,
                'width', 15,
                'height', 15,
                'transform', 'translate(-50%, -50%)',
                'border-radius', '50%',
                'background', '#666',
                'on', ['up', function () {
                    var tTempOutputItem;
                    console.log('업', info)
                    tTempOutputItem = Recard.LINE_MANAGER.getTempOutputItem()
                    console.log(tTempOutputItem)
                    if (tTempOutputItem) {
                        if (tTempOutputItem.S('@key') == 'OUTPUT') {
                            if (!tTempOutputItem.S('@dataType')) {
                                console.log('데이터가 지정되지 않았습니다.')
                            }
                        } else {
                            // 계산아이템일떄
                            if (key.indexOf('INPUT') > -1) {
                                if (info['from']) info['from'].delTo(rootBox)
                                info['from'] = tTempOutputItem
                                info['dataType'] = tTempOutputItem.S('@dataType')
                                //TODO: 여기서 형시계산을 해줘야하는군...
                                update()
                                tTempOutputItem.addTo(rootBox)
                            }
                            // 일반아이템일때
                            else if (tTempOutputItem.S('@dataType') == info['dataType']) {
                                info['from'] = tTempOutputItem
                                update()
                            }
                            else console.log('같은 데이터 형식만 지정할 수 있습니다. ')
                        }
                    }
                }]
            ),
            '>', Recard.Dom('span').S(
                'margin-left', 15,
                'html', key
            ),
            '>', dataTypeBox = Recard.Dom('span').S(
                'margin-left', 5,
                'color', 'rgb(242, 169, 113)'
            ),
            '>', fromBox = Recard.Dom('div').S(
                'margin-left', 15,
                'font-size', 11,
                'white-space', 'noWrap',
                'color', '#666'
            )
        )
        update()
        rootBox['info'] = info
        rootBox['update'] = update
        return rootBox
    }
})()