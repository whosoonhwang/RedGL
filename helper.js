var helper;
helper = {
	getShaderFromScript: function (gl, id) {
		var shaderScript = document.getElementById(id);
		var str, k;
		var parseData;
		if (!shaderScript) throw "쉐이더소스가 없음!"
		str = "";
		k = shaderScript.firstChild;
		while (k) {
			if (k.nodeType == 3) str += k.textContent;
			k = k.nextSibling;
		}
		var shader;
		if (shaderScript.type == "x-shader/x-fragment") shader = gl.createShader(gl.FRAGMENT_SHADER);
		else if (shaderScript.type == "x-shader/x-vertex") shader = gl.createShader(gl.VERTEX_SHADER);
		else throw '형식이 맞지 않습니다.';

		gl.shaderSource(shader, str);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.log(gl.getShaderInfoLog(shader))
			throw '형식이 맞지 않습니다.';;
		}
		console.log(str)
		parseData = str.match(/.attribute[\s\S]+?\;|.uniform[\s\S]+?\;/g)
		shader['parseData'] = parseData
		return shader;
	},
	createProgramInfo: (function(){
		var ProgramInfo;
		ProgramInfo = function () {
			this.attributes = {}
			this.uniforms = {}
		}
		return function (gl, vs, fs) {
			var result;
			var vertexShader, fragmentShader;
			result = new ProgramInfo()
			vertexShader = helper.getShaderFromScript(gl, vs);
			fragmentShader = helper.getShaderFromScript(gl, fs);
			programInfo = gl.createProgram();
			gl.attachShader(programInfo, vertexShader);
			gl.attachShader(programInfo, fragmentShader);
			gl.linkProgram(programInfo);
	
			if (!gl.getProgramParameter(programInfo, gl.LINK_STATUS)) alert("Could not initialise shaders");
	
			gl.useProgram(programInfo);
			var info;
			
			info = {}
			vertexShader.parseData.forEach(function (v) {
				var tInfo;
				tInfo = {}
				v = v.trim().replace(';', '').split(' ')
				if (v[0] == 'attribute') {
					tInfo['location'] = gl.getAttribLocation(programInfo, v[2]);
					gl.enableVertexAttribArray(programInfo[v[2]]);
					result['attributes'][v[2]] = tInfo
				} else {
					tInfo['location'] = gl.getUniformLocation(programInfo, v[2]);
					result['uniforms'][v[2]] = tInfo
				}
			})
			console.log(result)
			result['program'] = programInfo
			return result
		}
	})(),
	createIndexBuffer: function (gl, list, pointSize, pointNum, type, normalize, stride, offset) {
		var buffer;
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, list, gl.STATIC_DRAW);
		buffer['pointSize'] = pointSize
		buffer['pointNum'] = pointNum
		buffer['type'] = type
		buffer['normalize'] = normalize ? normalize : false
		buffer['stride'] = stride ? stride : 0
		buffer['offset'] = offset ? offset : 0
		return buffer
	},
	createArrayBuffer: function (gl, pointer,list, pointSize, pointNum, type, normalize, stride, offset) {
		var buffer;
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, list, gl.STATIC_DRAW);
		buffer['pointer'] = pointer
		buffer['pointSize'] = pointSize
		buffer['pointNum'] = pointNum
		buffer['type'] = type   // the data is 32bit floats
		buffer['normalize'] = normalize ? normalize : false // don't normalize the data
		buffer['stride'] = stride ? stride : 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
		buffer['offset'] = offset ? offset : 0        // start at the beginning of the buffer
		return buffer
	},
	createBufferInfo: (function () {
		var BufferInfo = function () {
			this.attributes = {
				// position: null,
				// texcoord: null
			}
			this.indices = null
		}
		return function (gl, verticesBuffer, indicesBuffer, texcoordBuffer) {
			var result;
			result = new BufferInfo()

			result['attributes']['position'] = verticesBuffer
			if (texcoordBuffer) result['attributes']['texcoord'] = texcoordBuffer
			if (indicesBuffer) result['indices'] = indicesBuffer
			// result['indices'] = buffer
			// result['type'] = gl.UINT16
			console.log(result)
			return result
		}
	})(),
	drawObjectList: function (gl, renderList, time) {
		time = time / 1000
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		// renderList.forEach(function (drawInfo) {
		var i = renderList.length
		var drawInfo
		var bufferInfo, programInfo;
		while (i--) {
			drawInfo = renderList[i]
			programInfo = drawInfo['programInfo']
			drawInfo['rotation'][0] = time
			drawInfo['rotation'][1] = time
			drawInfo['rotation'][2] = time
			mat4.identity(mvMatrix);
			// mat4.translate(mvMatrix, mvMatrix, drawInfo['position']);
			// mat4.rotateX(mvMatrix, mvMatrix, drawInfo['rotation'][0]);
			// mat4.rotateY(mvMatrix, mvMatrix, drawInfo['rotation'][1]);
			// mat4.rotateZ(mvMatrix, mvMatrix, drawInfo['rotation'][2]);
			translate_rotate_scale(mvMatrix, drawInfo['position'], drawInfo['rotation'][0], drawInfo['rotation'][1], drawInfo['rotation'][2], drawInfo['scale'])
			// mat4.scale(mvMatrix, mvMatrix, drawInfo['scale']);
			
			for (var k in drawInfo['bufferInfo']['attributes']) {
				bufferInfo = drawInfo['bufferInfo']['attributes'][k]
				gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo);
				gl.vertexAttribPointer(programInfo['attributes'][k], bufferInfo.pointSize, bufferInfo.type, bufferInfo.normalize, bufferInfo.stride, bufferInfo.offset);
			}
			for (var k in programInfo['uniforms']) {
				//TODO: 여길 어떻게든 간소화
				var tKey;
				tKey = drawInfo['uniforms'][k]
				if(tKey instanceof Float32Array ||  tKey instanceof Float64Array){
					if(tKey && tKey.length){
						if(tKey.length == 16) tKey = 'uniformMatrix4fv'
						else if(tKey.length == 12) tKey = 'uniformMatrix3fv'
						else if(tKey.length == 8) tKey = 'uniformMatrix2fv'
					}
				}else{
					if(tKey && tKey.length){
						if(tKey.length == 16) tKey = 'uniformMatrix4iv'
						else if(tKey.length == 12) tKey = 'uniformMatrix3iv'
						else if(tKey.length == 8) tKey = 'uniformMatrix2iv'
					}
				}
				
				gl[tKey](programInfo['uniforms'][k].location, false, drawInfo['uniforms'][k]);
			}
			if (drawInfo['bufferInfo']['indices']) {
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInfo['bufferInfo']['indices']);
				gl.drawElements(drawInfo['drawMode'], drawInfo['bufferInfo']['indices'].pointNum, gl.UNSIGNED_SHORT, 0);
			}
			else {
				gl.drawArrays(drawInfo['drawMode'], 0, drawInfo['bufferInfo']['attributes']['position'].pointNum)
			}
		}
		// })
	}
}