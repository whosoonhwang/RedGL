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
console.log(RedShaderInfo(test, RedShaderInfo.VERTEX_SHADER, 'basic', getSourceFromScript('shader-vs')))
console.log(RedShaderInfo(test, RedShaderInfo.FRAGMENT_SHADER, 'basic', getSourceFromScript('shader-fs')))
RedProgramInfo(
	test, 'basic', 
	RedShaderInfo(test, RedShaderInfo.VERTEX_SHADER, 'basic'),
	RedShaderInfo(test, RedShaderInfo.FRAGMENT_SHADER, 'basic')
)
console.log(RedProgramInfo(test, 'basic'))
console.log(test)
console.log(test2)

console.log(test.__gl == test2.__gl)