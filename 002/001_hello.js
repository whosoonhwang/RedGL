var translate_rotate_scale;
var SIN, COS;
SIN = Math.sin
COS = Math.cos
translate_rotate_scale = function (targetMat, position, rx, ry, rz, scale) {
	var a = targetMat, sx, sy, sz, cx, cy, cz, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;

	if (position) {
		var x = position[0], y = position[1], z = position[2];
		a[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
		a[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
		a[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
		a[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	}
	if (!rx) {
		if (!ry && rz) {
			//z축회전
			sz = SIN(rz), cz = COS(rz),
				a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[4], a11 = a[5], a12 = a[6],
				a[0] = a00 * cz - a10 * sz, a[1] = a01 * cz - a11 * sz, a[2] = a02 * cz - a12 * sz,
				a[4] = a10 * cz + a00 * sz, a[5] = a11 * cz + a01 * sz, a[6] = a12 * cz + a02 * sz;
		} else if (!rz) {
			//y축 회전
			sy = SIN(ry), cy = COS(ry),
				a00 = a[0], a01 = a[1], a02 = a[2], a20 = a[8], a21 = a[9], a22 = a[10],
				a[0] = a00 * cy + a20 * sy, a[1] = a01 * cy + a21 * sy, a[2] = a02 * cy + a22 * sy,
				a[8] = -a00 * sy + a20 * cy, a[9] = -a01 * sy + a21 * cy, a[10] = -a02 * sy + a22 * cy;
		} else {
			//yz축 회전 
			sy = SIN(ry), cy = COS(ry), sz = SIN(rz), cz = COS(rz),
				a00 = a[0], a01 = a[1], a02 = a[2],
				a10 = a[4], a11 = a[5], a12 = a[6],
				a20 = a[8], a21 = a[9], a22 = a[10],
				b00 = cy * cz, b01 = -sz, b02 = sy * cz,
				b10 = cy * sz, b11 = cz, b12 = sy * sz,
				b20 = -sy, b22 = cy,
				a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
				a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
				a[8] = a00 * b20 + a20 * b22, a[9] = a01 * b20 + a21 * b22, a[10] = a02 * b20 + a22 * b22;
		}
	} else if (!ry) {
		if (!rz) {
			//x축 회전 
			sx = SIN(rx), cx = COS(rx),
				a10 = a[4], a11 = a[5], a12 = a[6], a20 = a[8], a21 = a[9], a22 = a[10],
				a[4] = a10 * cx - a20 * sx, a[5] = a11 * cx - a21 * sx, a[6] = a12 * cx - a22 * sx,
				a[8] = a20 * cx + a10 * sx, a[9] = a21 * cx + a11 * sx, a[10] = a22 * cx + a12 * sx;
		} else {
			//xz축 회전
			sx = SIN(rx), cx = COS(rx), sz = SIN(rz), cz = COS(rz),
				a00 = a[0], a01 = a[1], a02 = a[2],
				a10 = a[4], a11 = a[5], a12 = a[6],
				a20 = a[8], a21 = a[9], a22 = a[10],
				b00 = cz, b01 = -cx * sz, b02 = sx * sz,
				b10 = sz, b11 = cx * cz, b12 = -sx * cz,
				b21 = sx, b22 = cx,
				a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
				a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
				a[8] = a10 * b21 + a20 * b22, a[9] = a11 * b21 + a21 * b22, a[10] = a12 * b21 + a22 * b22;
		}
	} else if (!rz) {
		//xy축 회전
		sx = SIN(rx), cx = COS(rx), sy = SIN(ry), cy = COS(ry),
			a00 = a[0], a01 = a[1], a02 = a[2],
			a10 = a[4], a11 = a[5], a12 = a[6],
			a20 = a[8], a21 = a[9], a22 = a[10],
			b00 = cy, b01 = sx * sy, b02 = cx * sy,
			b11 = cx, b12 = -sx,
			b20 = -sy, b21 = sx * cy, b22 = cx * cy,
			a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
			a[4] = a10 * b11 + a20 * b12, a[5] = a11 * b11 + a21 * b12, a[6] = a12 * b11 + a22 * b12,
			a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22;
	} else {
		//xyz축 회전 
		sx = SIN(rx), cx = COS(rx), sy = SIN(ry), cy = COS(ry), sz = SIN(rz), cz = COS(rz),
			a00 = a[0], a01 = a[1], a02 = a[2],
			a10 = a[4], a11 = a[5], a12 = a[6],
			a20 = a[8], a21 = a[9], a22 = a[10],
			b00 = cy * cz, b01 = sx * sy * cz - cx * sz, b02 = cx * sy * cz + sx * sz,
			b10 = cy * sz, b11 = sx * sy * sz + cx * cz, b12 = cx * sy * sz - sx * cz,
			b20 = -sy, b21 = sx * cy, b22 = cx * cy,
			a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
			a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
			a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22;
	}
	if (scale) {
		var x = scale[0],
			y = scale[1],
			z = scale[2];

		a[0] = a[0] * x;
		a[1] = a[1] * x;
		a[2] = a[2] * x;
		a[3] = a[3] * x;
		a[4] = a[4] * y;
		a[5] = a[5] * y;
		a[6] = a[6] * y;
		a[7] = a[7] * y;
		a[8] = a[8] * z;
		a[9] = a[9] * z;
		a[10] = a[10] * z;
		a[11] = a[11] * z;
		// a[12] = a[12];
		// a[13] = a[13];
		// a[14] = a[14];
		// a[15] = a[15];
	}
	return a;
}

var gl;
function initGL(canvas) {
	try {
		gl = canvas.getContext("experimental-webgl", {
			premultipliedAlpha: false,
			alpha: false,
			
		});
		gl.cvs = canvas
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}

var colorProgram, bitmapProgram;
var mvMatrix
var pMatrix

var cubeBufferInfo;
var squareBufferInfo;
var renderList
function initBuffers() {
	var cubeVertex = helper.createArrayBuffer(
		gl,
		'aVertexPosition',
		new Float32Array(
			model['vertexs']
		),
		// pointSize, pointNum, type, normalize, stride, offset
		3, model['vertexs'].length / 3, gl.FLOAT, false, 0, 0
	)
	var cubeIndex=helper.createIndexBuffer(
		gl,
		new Uint16Array(
			model['indices']
		),
		// pointSize, pointNum, type, normalize, stride, offset
		1, model['indices'].length, gl.UNSIGNED_SHORT, false, 0, 0
	)
	cubeBufferInfo = helper.createBufferInfo(
		gl,
		cubeVertex,
		cubeIndex

	)



	squareBufferInfo = helper.createBufferInfo(
		gl,
		cubeVertex,
		cubeIndex,
		helper.createArrayBuffer(
			gl,
			'aTexcoord',
			new Float32Array(
				model['texcoord']
			),
			// pointSize, pointNum, type, normalize, stride, offset
			2, model['texcoord'].length / 2, gl.FLOAT, false, 0, 0
		)
	)
	console.log(model)
}

function drawScene(time) {
	// gl.cvs.width = 1024 + Math.sin(time/1000)*100
	var i = renderList.length
	while (i--) {
		renderList[i].position[0] =Math.sin(i+time/50000+renderList[i].rotation[0])*30+ Math.cos(i+time/2000)*10
		renderList[i].position[1] =Math.cos(i+time/30000+renderList[i].rotation[1])*30 +Math.cos(i+time/3000)*5
		renderList[i].position[2] =Math.sin(i+time/10000+renderList[i].rotation[2])*10-100
		renderList[i].rotation[0]+=0.01
		renderList[i].rotation[1]+=0.01
		renderList[i].rotation[2]+=0.01
	}

	helper.drawObjectList(gl, renderList, time)
	requestAnimationFrame(drawScene)
}


function webGLStart() {
	initGL(document.getElementById("lesson01-canvas"));
	colorProgram = helper.createProgramInfo(gl, 'color','shader-vs', 'shader-fs')
	bitmapProgram = helper.createProgramInfo(gl,'bitmap', 'shader-vs-bitmap', 'shader-fs-bitmap')
	mvMatrix = mat4.create();
	pMatrix = mat4.create();
	initBuffers();
	var texture = helper.createTexture(gl,'crate.png')
	var texture2 = helper.createTexture(gl,'test.png')
	var texture3 = helper.createTexture(gl,'crate.png')
	var Mesh;
	Mesh = function (programInfo, bufferInfos, uniformsInfos) {
		this.programInfo = programInfo
		this.bufferInfos = bufferInfos
		////

		////		
		this.uniforms = {
			uPMatrix: pMatrix,
			uMVMatrix: mvMatrix
		}
		if(programInfo == bitmapProgram) this.uniforms.uTexture = Math.random()>0.5 ? texture : texture2
		else this.uniforms.uColor = [Math.random(),Math.random(),Math.random()]
		//TODO: uniformsInfo가 있으면 또 밀어넣어야함
		this.position = new Float32Array([Math.random() * 50 - 25, Math.random() * 50 - 25, -Math.random() * 50 - 50.0])
		this.rotation = new Float32Array([Math.random(), Math.random(), Math.random()])
		this.scale = new Float32Array([1, 1, 1])
		this.drawMode = gl.TRIANGLES
	}
	renderList = [

	]
	var i = 3000
	while (i--) {
		renderList.push(new Mesh(i % 2 ? bitmapProgram : colorProgram, i % 2 ? squareBufferInfo : cubeBufferInfo))
	}
	renderList.sort(function(a,b){
		if(a['programInfo']['name'] > b['programInfo']['name']) return -1
		if(a['programInfo']['name'] < b['programInfo']['name']) return 1
		return 0
	})
	console.log(renderList)
	
	///
	gl.clearColor(1,1,1,1);
	gl.clear(gl.COLOR_BUFFER_BIT);
		// Turn off rendering to alpha
	gl.colorMask(true, true, true, false);
	///
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LESS)
	
	// gl.cullFace(gl.FRONT)
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.enable(gl.BLEND);
	
	Recard.WIN_RESIZER.add('test', function (e) {
		Recard.Dom('#lesson01-canvas').S(
			'@width', Recard.WIN.w,
			'@height', Recard.WIN.h
		)
		var aspect = gl.cvs.clientWidth / gl.cvs.clientHeight;
		mat4.perspective(pMatrix, 45, aspect, 0.1, 1000.0);
	})
	Recard.EVENT_EMITTER.fire(window,'resize',{})
	requestAnimationFrame(drawScene)
}
Recard.AjaxGet(function (v) {
	model = JSON.parse(v['content'])
	webGLStart()
}, 'test.js')
Recard.Css('body').S(
	'margin', 0,
	'padding', 0,
	'overflow', 'hidden'
)
