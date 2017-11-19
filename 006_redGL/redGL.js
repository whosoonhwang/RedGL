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
	RedGL = function (canvas) {
		if (!(this instanceof RedGL)) return new RedGL(canvas)
		this.__canvas = canvas
		this.gl = getGL(canvas)
		this.__UUID = REDGL_UUID++
		this.__datas = {}
		console.log('RedGL 생성완료')
	}
	RedGL.prototype = {
		createShader: function (key, type, source) {
			return new RedShaderInfo(this, key, type, source)
		},
		createProgram: function (key, vShaderInfo, fShaderInfo) {
			return new RedProgramInfo(this, key, vShaderInfo, fShaderInfo)
		},
		createArrayBuffer: function (key, pointer, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
			return new RedBufferInfo(this, RedBufferInfo.ARRAY_BUFFER, key, pointer, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
		},
		createIndexBuffer: function (key, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
			return new RedBufferInfo(this, RedBufferInfo.ELEMENT_ARRAY_BUFFER, key, null, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
		}
	}
})();