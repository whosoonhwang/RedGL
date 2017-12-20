'use strict';
var Structure_Add;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Add = function () {
        this['nodeType'] = 'Add'
        this['index'] = index
        this['structure'] = {
            funcInfo : {},
            textureInfo : {},
            input: {
                INPUT1: {
                    dataType: null,
                    from: null
                },
                INPUT2: {
                    dataType: null,
                    from: null
                }
            },
            output: {
                OUTPUT: { dataType: null, to: {}, sourceKey: 'OUTPUT_' + this['index'] }
            }
        }
        this['parse'] = function () {
            this['define'] = {
                funcInfo : {},
                textureInfo : {},
                uniforms: {},
                varyings: {},
                vars: {},
                headers: [],
                bodys: [],
                footers: []
            }
            var defineInfo;
            var resultStr;
            var k, tData;
            var tInput1, tInput2, tOutput
       

           
            tInput1 = this['structure']['input']['INPUT1']
            tInput2 = this['structure']['input']['INPUT2']
            tOutput = this['structure']['output']['OUTPUT']
            console.log(this['define']['vars'])
            resultStr = ''
            if (tInput1['from'] && tInput2['from']) {
                tOutput['dataType'] = tInput1['dataType']
            }else tOutput['dataType'] = null
            if(tOutput['dataType']){
                
                this['define']['vars'][tVarKey = 'OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
                this['define']['headers'].push('    ' + tVarKey + ' = ' + tInput1['from']['info']['sourceKey'] + ' + ' +tInput2['from']['info']['sourceKey'])
            }
          

          
            defineInfo = this['define']
            //
            tData = defineInfo['uniforms']
            resultStr += '//define uniforms;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['varyings']
            resultStr += '//define varyings;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['vars']
            resultStr += '//define vars;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            resultStr += '//define headers;\n'
            defineInfo['headers'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += '//define footers;\n'
            defineInfo['footers'].forEach(function (v) { resultStr += v + ';\n' })


            return resultStr
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Add)
})();