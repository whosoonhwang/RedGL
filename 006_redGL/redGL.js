"use strict";
var RedGL;
var REDGL_UUID; // 내부에서 사용할 고유아이디
(function () {
	var getGL;
	REDGL_UUID = 0
	getGL = (function () {
		var checkList; // 체크할 리스트
		var option; // 기본초기화 옵션
		var t0, i;
		option = {
			premultipliedAlpha: false,
			alpha: false
		}
		checkList = 'experimental-webgl,webgl,webkit-3d,moz-webgl,3d'.split(',')
		return function (cvs) {
			i = checkList.length
			while (i--) {
				if (t0 = cvs.getContext(checkList[i], option)) return t0
			}
			throw "웹지엘을 사용할수없습니다."
		}
	})();
	/**DOC:
		{
			constructorYn : true,
			title :`RedGL`,
			description : `
				RedGL 인스턴스 생성자
			`,
			params : {
				canvas : [
					{type:'Canvas Element'}
				]
			},
			example : `
				RedGL(document.getElementById('test'))
			`,
			return : 'RedGL Instance'
		}
	:DOC*/
	RedGL = function (canvas) {
		if (!(this instanceof RedGL)) return new RedGL(canvas)
		this.__canvas = canvas
		this.gl = getGL(canvas)
		this.__UUID = REDGL_UUID++
		this.__datas = {}
		console.log('RedGL 생성완료')
	}
	RedGL.prototype = {
		/**DOC:
		{
			title :`getSourceFromScript`,
			code: 'FUNCTION',
			description : `
				script 소스를 가져옴
			`,
			params : {
				id : [
					{type:'String'},
					'아이디'
				]
			},
			example : `
				RedShaderInfo.getSourceFromScript(id)
			`,
			return : 'String'
		}
		:DOC*/
		getSourceFromScript : (function () {
			var shaderScript
			var str, k;
			return function (id) {
				shaderScript = document.getElementById(id)
				if (!shaderScript) throw "쉐이더소스가 없음!"
				str = "";
				k = shaderScript.firstChild;
				while (k) {
					if (k.nodeType == 3) str += k.textContent;
					k = k.nextSibling;
				}
				return str
			}
		})(),
		/**DOC:
		{
			title :`createShader`,
			code : 'FUNCTION',
			description : `
				- RedGL 쉐이더 생성기.
				- 유일키만 지원하며 키 중복일경우 기존 캐싱된 쉐이더정보를 반환함.
				- 단 프레그먼트/버텍스의 키는 따로 관리함.
			`,
			params : {
				key : [
					{type:'String'},
					'- 등록될 키명'
				],
				type : [
					{type:'String'},
					'- 버텍스 쉐이더(RedShaderInfo.VERTEX_SHADER)',
					'- 프레그먼트 쉐이더(RedShaderInfo.FRAGMENT_SHADER)'
				],
				source : [
					{type:'String'},
					'- 생성할 쉐이더 소스문자열'
				]
			},
			example : `
			 	var test;
				test = RedGL(Canvas Element)
				// basic이라는 이름으로 버텍스 쉐이더를 만든다. 
				test.createShader('basic', RedShaderInfo.VERTEX_SHADER, 쉐이더소스)
			`,
			return : 'RedShaderInfo Instance'
		}
		:DOC*/
		createShader: function (key, type, source) {
			return new RedShaderInfo(this, key, type, source)
		},
		getShader: function (key, type) {
			//TODO:
		},
		createProgram: function (key, vShaderInfo, fShaderInfo) {
			return new RedProgramInfo(this, key, vShaderInfo, fShaderInfo)
		},
		getProgramInfo: function (key) {
			//TODO:
		},
		createArrayBuffer: function (key, pointer, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
			return new RedBufferInfo(this, RedBufferInfo.ARRAY_BUFFER, key, pointer, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
		},
		createIndexBuffer: function (key, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
			return new RedBufferInfo(this, RedBufferInfo.ELEMENT_ARRAY_BUFFER, key, null, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
		},
		getArrayBuffer: function (key) {
			return this['__datas']['RedBufferInfo'][key]
		},
		getIndexBuffer: function (key) {
			return this['__datas']['RedBufferInfo'][key]
		},
		createGeometryInfo: function (key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer) {
			return new RedGeometryInfo(this, key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer)
		}
	}
})();