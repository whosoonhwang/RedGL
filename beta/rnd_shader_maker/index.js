'use strict';

Recard.static('INDEX', (function () {
    var result;
    result = {
        init: function () {
            Recard.Css('body').S(
                'background', '#222',
                'font-size', 12,
                'color', '#fff',
                'user-select', 'none'
            )
            Recard.Css('.inputItem').S(
                'position', 'relative',
                'text-align', 'left',
                'padding-left', 10,
                'height', 20,
                'font-size', 11,
                'line-height', 20
            )
            Recard.Css('.outputItem').S(
                'position', 'relative',
                'text-align', 'right',
                'padding-right', 10,
                'height', 20,
                'font-size', 11,
                'line-height', 20
            )
            /////////////////////////////////////
            var info;
            info = {}
            info['structure'] = {
                title: null,
                output: {
                    TEXTURE: null,
                    R: null,
                    G: null,
                    B: null,
                    A: null
                },
                input: {
                    UV: null
                }
            }
            info.src = ''
            /////////////////////////////////////
            var diffuse, normal;
            diffuse = new Structure_Texture(info)
            normal = new Structure_Texture(info)
            console.log(diffuse)

            diffuse['next'] = {
                target: normal,
                key: 'UV'
            }
            normal['prev'] = {
                target: diffuse,
                key: 'TEXTURE'
            }
            diffuse.S('left',100)
            normal.S('left',400)
            var svgList = []
            Recard.LOOPER.add('test', function () {
                // console.log(diffuse['next'],normal['prev'])
                svgList.forEach(function (item) {
                    item.remove()
                })
                svgList.length = 0
                var startItem, endItem
                startItem = normal['prev']['target'].query('[key="' + normal['prev']['key'] + '"]')
                endItem = diffuse['next']['target'].query('[key="' + diffuse['next']['key'] + '"]')





                var sL, sT
                var eL, eT
                sL = parseInt(diffuse.S('left') + startItem.__dom__.offsetLeft + startItem.__dom__.clientWidth + 5)
                sT = parseInt(diffuse.S('top') + startItem.__dom__.offsetTop + startItem.__dom__.clientHeight / 2)
                eL = parseInt(normal.S('left') + endItem.__dom__.offsetLeft - 5)
                eT = parseInt(normal.S('top') + endItem.__dom__.offsetTop + endItem.__dom__.clientHeight / 2)
                console.log(
                    [
                        'M' + sL + ',' + sT,
                        'C' + (sL - eL) / 4 + ',' + (sT - eT) / 4,
                        (sL - eL) / 4 * 3 + ',' + (sT - eT) / 4 * 3,
                        eL + ',' + eT
                    ].join(' ')
                );
                svgList.push(
                    Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
                        'position', 'absolute',
                        'top', 0,
                        'left', 0,
                        '@viewBox', [
                            0, 0,
                            Recard.WIN.w,
                            Recard.WIN.h
                        ].join(','),
                        '>', Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'path')).S(
                            '@fill', 'none',
                            '@stroke', 'red',
                            '@stroke-linecap', 'round',
                            '@stroke-width', 4,
                            '@d', [
                                'M' + sL + ',' + sT,
                                // 'C' + (sL - eL) / 2+','+(sT - eT) / 2,
                                // (sL - eL) / 2+','+(sT - eT) / 2,
                                'C' + sL + ',' + (sT),
                                sL + ',' + (eT),
                                ///
                                eL + ',' + eT
                            ].join(' ')
                            // '@d', 'M100,250 C100,100 400,100 400,250'
                        ),
                        'z-index', 0,
                        '<', 'body'
                    )
                )
            })

            Recard.Dom('body').S(
                '>', diffuse,
                '>', normal
            )
        }
    }
    return result
})())