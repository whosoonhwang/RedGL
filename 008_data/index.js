"use strict"


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// 정보맵을 생성하고..
var a = new Float32Array(256)
var i = 0, len = 256
for (i = 0; i < len; i++) {
    a[i] = Math.random()+Math.random()*256
}
// 던지기 위한 데이터 형식으로 변환
var b = new Uint8ClampedArray(a.buffer)
console.log(a)
// console.log(new Uint8Array(a.buffer))
console.log(b)
// 결과값을 확인해보면
var d = new DataView(b.buffer)
i=0

for(i;i<1;i++){
    console.log(d.getFloat32(i,i+4));    
    
    i+=3
}

function check() {
    // 캔버스에 해당 이미지를 그린다.
    var test = ctx.createImageData(256, 256)   
    test.data.set(b)
    
    ctx.putImageData(test, 0, 0);

};
check()


