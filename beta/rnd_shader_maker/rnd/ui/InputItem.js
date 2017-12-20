'use strict';
var InputItem;
(function () {
    InputItem = function (key, info) {
        if (!(this instanceof InputItem)) return new InputItem(key, info)
        var rootBox;
        var fromBox, dataTypeBox, pointBox, deleteBox;
        var update;
        var deleteFromData
        update = function () {
            fromBox.S('html', '')
            pointBox.S('background', '#666')
            if (info['from']) {
                var tStr;
                tStr = [info['from'].parent().parent().query('[titleBox]').S('text')]
                tStr.push(info['from'].S('@dataType') + ' ' + info['from'].S('@key'))
                fromBox.S('html', 'from - ' + tStr.join(' '))
                pointBox.S('background', 'rgb(242, 169, 113)')
                deleteBox.S('display','block')
            } else {
                pointBox.S('background', '#666')
                deleteBox.S('display','none')
            }
            dataTypeBox.S(
                'html', info['dataType'] ? info['dataType'] : 'null'
            )
            rootBox.parent().parent()['parseDefine']()
        }
        deleteFromData = function(){
            if (info['from']) {
                console.log(info['from']['info'])
                var tRoot;
                tRoot = rootBox.parent().parent().query('[titleBox]').S('text')
                console.log('지울데이터',info['from']['info']['to'][tRoot][key])
                delete info['from']['info']['to'][tRoot][key]
                info['from'].update()
                delete info['from']
                update()
            }
        }
        rootBox = Recard.Dom('div').S(
            '@inputItem', '',
            '@key', key,
            '@dataType', info['dataType'],
            'position', 'relative',
            'line-height', 20,
            '>', pointBox = Recard.Dom('button').S(
                'position', 'absolute',
                'top', 5,
                'left', 0,
                'width', 15,
                'height', 15,
                'transform', 'translate(-50%, 0%)',
                'border-radius', '50%',
                'background', '#666',
                'on', ['up', function () {
                    var tTempOutputItem;
                    console.log('업', info)
                    tTempOutputItem = Recard.LINE_MANAGER.getTempOutputItem()
                    console.log(tTempOutputItem)
                    if (tTempOutputItem) {
                        // 계산아이템
                        if (key.indexOf('INPUT') > -1) {
                            // 계산아이템
                            if (info['from']) info['from'].delTo(rootBox)
                            info['from'] = tTempOutputItem
                            info['dataType'] = tTempOutputItem.S('@dataType')
                            console.log(rootBox.parent().parent()['structureInfo'])
                            if (rootBox.parent().parent().S('@nodeType') == 'Add') {
                                rootBox.parent().parent()['structureInfo']['structure']['output']['OUTPUT']['dataType'] = info['dataType']
                                rootBox.parent().parent().query('[key="OUTPUT"]').S('@dataType', info['dataType'])
                                rootBox.parent().parent().query('[key="OUTPUT"] span').S('html', info['dataType'])
                            }

                            //TODO: 여기서 형시계산을 해줘야하는군...
                            update()
                            tTempOutputItem.addTo(rootBox)
                        }
                        // 일반아이템
                        else if (tTempOutputItem.S('@dataType') == info['dataType']) {
                            if (info['from']) info['from'].delTo(rootBox)
                            info['from'] = tTempOutputItem
                            tTempOutputItem.addTo(rootBox)
                            update()
                        }
                        else console.log('같은 데이터 형식만 지정할 수 있습니다. ')
                    }
                }]
            ),
            '>', deleteBox = Recard.Dom('div').S(
                '@deleteBox', '',
                'display', 'none',
                'position', 'absolute',
                'top', 5, 'left', -15,
                'background', '#5b52aa',
                'font-size', 11,
                'line-height', 11,
                'color', '#fff',
                'padding', '2px 5px 3px 5px',
                'transform', 'translate(-100%,0%)',
                'html', 'delete',
                'cursor', 'pointer',
                'on', ['over', function () { this.S('background', 'red') }],
                'on', ['out', function () { this.S('background', '#5b52aa') }],
                'on', ['down', function () {
                    deleteFromData()
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
                '@fromBox', '',
                'margin-left', 15,
                'font-size', 11,
                'white-space', 'noWrap',
                'color', '#666'
            )
        )

        rootBox['info'] = info
        rootBox['update'] = update
        rootBox['deleteFromData'] = deleteFromData
        requestAnimationFrame(rootBox['update'])
        return rootBox
    }
})()