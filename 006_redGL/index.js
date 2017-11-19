"use strict";
var test, test2;
var getSourceFromScript;
getSourceFromScript = (function () {
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
})()
test = RedGL(document.getElementById('test'))
test2 = RedGL(document.getElementById('test2'))
console.log(test.createShader('basic', RedShaderInfo.VERTEX_SHADER, getSourceFromScript('shader-vs')))
console.log(test.createShader('basic', RedShaderInfo.FRAGMENT_SHADER, getSourceFromScript('shader-fs')))
test.createProgram(
	'basic',
	test.createShader('basic', RedShaderInfo.VERTEX_SHADER),
	test.createShader('basic', RedShaderInfo.FRAGMENT_SHADER)
)
var testData,testData2;
testData = new Float32Array([
	
			-1.0, -1.0, 1.0,
			1.0, -1.0, 1.0,
			1.0, 1.0, 1.0,
			-1.0, 1.0, 1.0,
	
	
			-1.0, -1.0, -1.0,
			-1.0, 1.0, -1.0,
			1.0, 1.0, -1.0,
			1.0, -1.0, -1.0,
	
	
			-1.0, 1.0, -1.0,
			-1.0, 1.0, 1.0,
			1.0, 1.0, 1.0,
			1.0, 1.0, -1.0,
	
	
			-1.0, -1.0, -1.0,
			1.0, -1.0, -1.0,
			1.0, -1.0, 1.0,
			-1.0, -1.0, 1.0,
	
	
			1.0, -1.0, -1.0,
			1.0, 1.0, -1.0,
			1.0, 1.0, 1.0,
			1.0, -1.0, 1.0,
	
	
			-1.0, -1.0, -1.0,
			-1.0, -1.0, 1.0,
			-1.0, 1.0, 1.0,
			-1.0, 1.0, -1.0
		])
		testData2 = new Uint16Array([
			0, 1, 2,      0, 2, 3,   
			4, 5, 6,      4, 6, 7,   
			8, 9, 10,     8, 10, 11,  
			12, 13, 14,   12, 14, 15, 
			16, 17, 18,   16, 18, 19,
			20, 21, 22,   20, 22, 23 
		])
console.log(test.createArrayBuffer(
	'testBuffer',
	'aPointer',
	testData,
	3, 24,test.gl.FLOAT
))
console.log(test.createIndexBuffer(
	'testIndexBuffer',
	testData2,
	2, testData2.length/2,test.gl.UNSIGNED_SHORT
))
console.log(test.createProgram('basic'))
console.log(test)
console.log(test2)

console.log(test.gl == test2.gl)