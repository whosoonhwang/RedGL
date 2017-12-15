'use strict';
var dataMaker;
(function () {
    var makeTextureBase
    makeTextureBase = function (self) {
        var t0, t1
        // 유니폼
        t1 = 'uniform sampler2D uTexture'
        t1 = t1.split(' ')
        t0 = {
            type: t1[0],
            dataType: t1[1],
            varName: t1[2],
            resultDst: null
        }
        // 아웃풋 링크정보
        self.comfileInfo['outLinkInfo']['COLOR'] = 'textureColor_' + shaderIndex
        self.comfileInfo['uniforms'][t1[2] + '_' + shaderIndex] = t0
        // 텍스쳐 코드생성
        self.comfileInfo['header'].push(
            'textureColor_' + shaderIndex + '= texture2D(' + t1[2] + '_' + shaderIndex + ',vTexcoord);\n'
        )
        // 베어링
        t1 = 'varying vec2 vTexcoord'
        t1 = t1.split(' ')
        t0 = {
            type: t1[0],
            dataType: t1[1],
            varName: t1[2],
            resultDst: null
        }
        self.comfileInfo['varyings'][t1[2]] = t0
        // 변수
        t1 = 'vec4 textureColor'
        t1 = t1.split(' ')
        t0 = {
            type: null,
            dataType: t1[0],
            varName: t1[1],
            resultDst: null
        }
        self.comfileInfo['vars'][t1[1] + '_' + shaderIndex] = t0
        shaderIndex++
    }
    dataMaker = function () {
        this['comfileInfo'] = new Structure_Texture()
        console.log('start 데이터 메이커 ---------------------------------------------------')
        console.log('this.info', this.info)
        console.log('this.info.structure.output', this.info.structure.output)
        console.log('this.comfileInfo', this.comfileInfo)
        var inoutputList;
        var self = this
        //
        makeTextureBase(self)
        inoutputList = this.queryAll('.outputItem [key]')
        inoutputList = inoutputList.filter(function (item) {
            if (item['next']) {
                for (var k in item['next']) {
                    var tNextItem;
                    var tKEY
                    tNextItem = item['next'][k]
                    tKEY = item.S('@key')
                    console.log(tKEY)
                    switch (tKEY) {
                        case 'R':
                            self.comfileInfo['header'].push(self.comfileInfo['outLinkInfo']['COLOR'] + '.r')
                            self.comfileInfo['outLinkInfo']['R'] = self.comfileInfo['outLinkInfo']['COLOR']+'.r'
                            break
                        case 'G':
                            self.comfileInfo['header'].push(self.comfileInfo['outLinkInfo']['COLOR'] + '.g')
                            self.comfileInfo['outLinkInfo']['G'] = self.comfileInfo['outLinkInfo']['COLOR']+'.g'
                            break
                        case 'B':
                            self.comfileInfo['header'].push(self.comfileInfo['outLinkInfo']['COLOR'] + '.b')
                            self.comfileInfo['outLinkInfo']['B'] = self.comfileInfo['outLinkInfo']['COLOR']+'.b'
                            break
                        case 'A':
                            self.comfileInfo['header'].push(self.comfileInfo['outLinkInfo']['COLOR'] + '.a')
                            self.comfileInfo['outLinkInfo']['A'] = self.comfileInfo['outLinkInfo']['COLOR']+'.a'
                            break
                    }
                }
            }
        })

        console.log(this.comfileInfo)
        console.log('end 데이터 메이커 ---------------------------------------------------')
    }
})()