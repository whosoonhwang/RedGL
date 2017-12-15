'use strict';
Recard.static('RED_SHADER_MIXER', (function () {
    var result;
    var setResult
    var nodeBox;
    setResult = function () {
        var info;
        info = {}
        info['nodeType'] = 'Result'
        info['structure'] = {
            title: 'Result',
            output: {},
            input: {
                DIFFUSE: 'vec4',
                NORMAL: 'vec4',
                SPECULAR: 'vec4',
                DISPLACEMENT: 'vec4',
                TEST_FLOAT : 'float'
            }
        }
        info.src = '';
        var result;
        result = new Structure_Node(info)
        result.S(
            'top',10000,
            'left', 10000,
            '<', 'body'
        )
    }
    result = {
        lastCompile: (function(){
            return function(){
                console.log('라스트 파서!')
                var root;
                var tTarget
                var tCompileInfo,tLastCompileInfo
                var codeBox;
                var addStr=""
                var resultStr="";
                root = Recard.query('[nodeType="Result"]')
                codeBox= root.query('[codeBox]')
                codeBox.S('html','')
                
                // 값이 있는 링크를 모드 찾는다.
                var tList;
                var lastCompileInfoList;
                var mergedInfo;
                var tStr
                lastCompileInfoList = []
                tList = root.queryAll('[key]')
                tList = tList.filter(function (item) {
                    if (item['prev']) return true
                })
                tList.forEach(function(v){
                    lastCompileInfoList.push(v['prev']['rootBox']['lastCompileInfo'])
                })
                console.log('병합할 정보들',lastCompileInfoList)
                mergedInfo = {
                    uniforms: [],
                    varyings: [],
                    vars: [],
                    header: [],
                    body: [],
                    footer: []
                }
                lastCompileInfoList.forEach(function(v){
                    ('header,body,footer,uniforms,varyings,vars'.split(',')).forEach(function(key){
                        v[key].forEach(function(v2){
                            if(mergedInfo[key].indexOf(v2)==-1) mergedInfo[key].push(v2)
                        })
                    })
                    
                })
                console.log('병합된 정보',mergedInfo)

                // 디퓨즈처리
                tTarget = root.query('[key="DIFFUSE"]')                
                if(tTarget['prev']){
                    tTarget = tTarget['prev']
                    console.log('//디퓨즈처리')
                    console.log('타겟정보',tTarget)
                    console.log('컴파일정보', tCompileInfo = tTarget['rootBox']['comfileInfo'])
                    console.log('최종컴파일정보', tLastCompileInfo = tTarget['rootBox']['lastCompileInfo'])
                    tStr='vec4 texelColor_DIFFUSE =' + tCompileInfo['outLinkInfo']['COLOR']+';\n'
                    addStr+= tStr
                    mergedInfo['header'].push()
                }
                // 노말처리
                tTarget = root.query('[key="NORMAL"]')                
                if(tTarget['prev']){
                    tTarget = tTarget['prev']
                    console.log('//노말처리')
                    console.log('타겟정보',tTarget)
                    console.log('컴파일정보', tCompileInfo = tTarget['rootBox']['comfileInfo'])
                    console.log('최종컴파일정보', tLastCompileInfo = tTarget['rootBox']['lastCompileInfo'])
                    tStr= 'vec4 texelColor_NORMAL =' + tCompileInfo['outLinkInfo']['COLOR']+';\n'
                    addStr+= tStr
                }
                // SPECULAR
                tTarget = root.query('[key="SPECULAR"]')                
                if(tTarget['prev']){
                    tTarget = tTarget['prev']
                    console.log('//SPECULAR처리')
                    console.log('타겟정보',tTarget)
                    console.log('컴파일정보', tCompileInfo = tTarget['rootBox']['comfileInfo'])
                    console.log('최종컴파일정보', tLastCompileInfo = tTarget['rootBox']['lastCompileInfo'])
                    tStr= 'vec4 texelColor_SPECULAR =' + tCompileInfo['outLinkInfo']['COLOR']+';\n'
                    addStr+= tStr
                }
                mergedInfo.header.push(addStr)
                resultStr += '\n//define uniforms \n'
                resultStr += mergedInfo.uniforms.join('')
                resultStr += '\n//define varyings \n'
                resultStr += mergedInfo.varyings.join('')
                resultStr += '\n//define vars \n'
                resultStr += mergedInfo.vars.join('')
                resultStr += '\n//define main \n'
                resultStr += 'void main(void){ \n'
                resultStr += mergedInfo.header.join('')
                resultStr += mergedInfo.body.join('')
                resultStr += mergedInfo.footer.join('')
                resultStr += '\n}'
                codeBox.S(
                    'html',resultStr.replace(/\n/g,'<br>')
                )
                
            }
        })(),
        init: function () {
            (function(){
                var startX,startY
                nodeBox= Recard.Dom('div').S(
                    '@id','nodeBox',
                    'position','relative',
                    'width',20000,
                    'height',20000,
                    '<','body',
                    'on',['down',function(){
                        startX = Recard.WIN.scroll('x')
                        startY = Recard.WIN.scroll('y')
                        this.S(
                            'on',['move',function(e){
                                console.log('오니2',e)
                                startX-=e.nativeEvent.movementX
                                startY-=e.nativeEvent.movementY
                                Recard.WIN.scroll(startX,startY)
                            }]
                        )
                    }],
                    'on',['up',function(){
                        this.S(
                            'off','move'
                        )
                    }]
                )
            })();
            Recard.WIN.scroll(nodeBox.__dom__.clientWidth/2-Recard.WIN.w/2,nodeBox.__dom__.clientHeight/2-Recard.WIN.h/2)
            setResult()
            /////////////////////////////////////
            Recard.Dom('div').S(
                'position', 'fixed',
                'bottom', 10,
                'left', 10,
                'right', 10,
                'z-index', 20000000,
                '<', 'body',
                '>', Recard.Dom('button').S(
                    'margin-right', 1,
                    'padding', 10,
                    'background', '#5b52aa',
                    'color', '#fff',
                    'outline', 'none',
                    'border', 0,
                    'cursor', 'pointer',
                    'html', '텍스쳐추가',
                    'on', ['down', function () {
                        var info;
                        info = {}
                        info['nodeType'] = 'Texture'
                        info['structure'] = {
                            title: null,
                            output: {
                                // TEXTURE: 'sampler2D',
                                COLOR: 'vec4',
                                R: 'float',
                                G: 'float',
                                B: 'float',
                                A: 'float'
                            },
                            input: {
                                UV: 'vec2',
                                TEST_VEC4 : 'vec4'
                            }
                        }
                        info.src = '';
                        (new Structure_Node(info)).S(
                            'top',Recard.WIN.scroll('y')+Recard.WIN.h/2,
                            'left',Recard.WIN.scroll('x')+Recard.WIN.w/2,
                            '<', 'body'
                        )
                    }]
                )
            )

        }
    }
    return result
})())