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
                title : null,
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

            diffuse['next'] = [normal,'UV']
            normal['prev'] = [diffuse,'TEXTURE']


            Recard.LOOPER.add('test',function(){
                // console.log(diffuse['next'],normal['prev'])
                diffuse['next'].query('[key="UV"]')
            })

            Recard.Dom('body').S(
                '>', diffuse,
                '>', normal
            )
        }
    }
    return result
})())