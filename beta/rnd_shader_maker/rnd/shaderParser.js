'use strict';
var shaderParser;
(function () {
    shaderParser = function () {
        console.log('start 쉐이더파싱 ----------------------------')
        console.log(this.comfileInfo)
        var codeBox;
        var tDataGroup, tData;
        var resultStr,resultStr2;
        resultStr = ""
        codeBox = this.query('[codeBox]')
        codeBox.S('html', '')
        this['lastCompileInfo'] = {
            uniforms : [],
            varyings : [],
            vars : []
        }
        // 유니폼 코드생성
        resultStr += '//define uniforms \n'
        tDataGroup = this.comfileInfo['define']['uniforms']
        resultStr2 =''
        for (var k in tDataGroup) {
            tData = tDataGroup[k]
            var tNAME;
            var tSourceLine;
            tNAME = tData['varName']
            if (tData['resultDst']) {
                if (tData['resultDst']['targetKey'] == 'DIFFUSE') tNAME = 'uDiffuseTexture'
                if (tData['resultDst']['targetKey'] == 'NORMAL') tNAME = 'uNormalTexture'
                if (tData['resultDst']['targetKey'] == 'DISPLACEMENT') tNAME = 'uDisplacementTexture'
                if (tData['resultDst']['targetKey'] == 'SPECULAR') tNAME = 'uSpecularTexture'
            }
            tSourceLine = tData['type'] + ' ' + tData['dataType'] + ' ' + tNAME
            // 유니폼선언이 같으면 추가를 안한다. 
            if (resultStr.indexOf(tSourceLine) == -1) resultStr += tSourceLine + ';\n', resultStr2 += tSourceLine + ';\n'
        }
        this['lastCompileInfo']['uniforms'].push(resultStr2)
        resultStr += '\n'
        // 베어링 코드생성
        resultStr += '//define varyings \n'
        tDataGroup = this.comfileInfo['define']['varyings']
        resultStr2 =''
        for (var k in tDataGroup) {
            tData = tDataGroup[k]
            var tNAME;
            var tSourceLine;
            tNAME = tData['varName']
            tSourceLine = tData['type'] + ' ' + tData['dataType'] + ' ' + tNAME
            resultStr += tSourceLine + ';\n', resultStr2 += tSourceLine + ';\n'

        }
        this['lastCompileInfo']['varyings'].push(resultStr2)
        resultStr += '\n'
        // 변수 코드생성
        resultStr += '//define vars \n'
        tDataGroup = this.comfileInfo['define']['vars']
        resultStr2 =''
        for (var k in tDataGroup) {
            tData = tDataGroup[k]
            var tNAME;
            var tSourceLine;
            tNAME = tData['varName']
            if (tData['resultDst']) {
                if (tData['resultDst']['targetKey'] == 'DIFFUSE') tNAME = 'texelColor_diffuse'
                if (tData['resultDst']['targetKey'] == 'NORMAL') tNAME = 'texelColor_normal'
                if (tData['resultDst']['targetKey'] == 'DISPLACEMENT') tNAME = 'texelColor_displacement'
                if (tData['resultDst']['targetKey'] == 'SPECULAR') tNAME = 'texelColor_specular'
            }
            tSourceLine = tData['dataType'] + ' ' + tNAME
            // 변수선언이 같으면 추가를 안한다. 
            if (resultStr.indexOf(tSourceLine) == -1) resultStr += tSourceLine + ';\n', resultStr2 += tSourceLine + ';\n'

        }
        this['lastCompileInfo']['vars'].push(resultStr2)
        resultStr += '\n'
        codeBox.S(
            'html',resultStr.replace(/\n/g,'<br>')
        )
        console.log('결과')
        console.log(resultStr)
        console.log('lastCompileInfo',this['lastCompileInfo'])
        console.log('end 쉐이더파싱 ----------------------------')
    }
})()