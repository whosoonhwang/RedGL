'use strict';
Recard.static('UPDATER', (function () {
    var result;
    var svgList = []
    var svgRootBox;
    result = {
        init: function () {
            svgRootBox = Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
                'position', 'absolute',
                'top', 0,
                'left', 0,
                '@viewBox', [
                    0, 0,
                    Recard.WIN.w,
                    Recard.WIN.h
                ].join(','),
                'z-index', 0,
                '<', 'body'
            )
            Recard.WIN_RESIZER.add('SVG_ROOT_BOX', function () {
                svgRootBox.S(
                    '@viewBox', [
                        0, 0,
                        Recard.WIN.w,
                        Recard.WIN.h
                    ].join(',')
                )
            })
            Recard.LOOPER.del('UPDATER')
            Recard.LOOPER.add('UPDATER', function () {
                var nodeList = Recard.queryAll('[outputItem]')
                // console.log('//////////')
                svgList.forEach(function (item) {
                    // console.log(item)
                    item.remove()
                })
                svgList.length = 0
                nodeList.forEach(function (item) {
                    var endItem
                    var startItem
                    var sL, sT
                    var eL, eT
                    var tNextData
                    for (var k in item['next']) {
                        tNextData = item['next'][k]
                        // console.log('시작아이템정보',tPrevData)
                        if (tNextData && (endItem = tNextData['target'])) {
                            //    console.log('오긴하냐')

                            var startTargetKey
                            var endTargetKey
                            // 목표아이템을 찾고
                            startItem = endItem['prev']['target']

                            // 소스아이템의 목표키를 찾는다.
                            startTargetKey = endItem['prev']['targetKey']
                            endTargetKey = tNextData['targetKey']

                            // console.log(startTargetKey,endTargetKey)
                            // console.log(startItem,endItem)
                            var startItem2 = startItem.parent()
                            var endItem2 = endItem.parent()
                            sL = endItem['prev']['rootBox'].S('left') + startItem2.__dom__.offsetLeft + startItem2.__dom__.clientWidth + 3
                            sT = endItem['prev']['rootBox'].S('top') + startItem2.__dom__.offsetTop + startItem2.__dom__.clientHeight / 2
                            eL = tNextData['rootBox'].S('left') + endItem2.__dom__.offsetLeft - 3
                            eT = tNextData['rootBox'].S('top') + endItem2.__dom__.offsetTop + endItem2.__dom__.clientHeight / 2
                            // console.log(
                            //     [
                            //         'M' + sL + ',' + sT,
                            //         'C' + (sL - eL) / 4 + ',' + (sT - eT) / 4,
                            //         (sL - eL) / 4 * 3 + ',' + (sT - eT) / 4 * 3,
                            //         eL + ',' + eT
                            //     ].join(' ')
                            // );
                            svgList.push(
                                Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'path')).S(
                                    '@fill', 'none',
                                    '@stroke', 'rgb(174, 226, 57)',
                                    '@stroke-linecap', 'round',
                                    '@stroke-width', 2,
                                    '@d', [
                                        'M' + sL + ',' + sT,
                                        'C' + sL + ',' + (sT),
                                        sL + ',' + (eT),
                                        ///
                                        eL + ',' + eT
                                    ].join(' '),
                                    'on', ['mouseover', function () { this.S('@stroke', 'red') }],
                                    'on', ['mouseout', function () { this.S('@stroke', 'rgb(174, 226, 57)') }],
                                    '<', svgRootBox
                                )

                            )
                        }
                    }

                })

            })

        }
    }
    return result
})())