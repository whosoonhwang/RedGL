"use strict";
var RedShaderLoader;
/**DOC:
    {
        constructorYn : true,
        title :`RedShaderLoader`,
        description : `
			<h2>- 걍 소스로딩기</h2>
			<h2>- TODO: 중복로딩을 막아야함...</h2>
        `,
        params : {
            list : [
                {type:'Array'},
                '소스 로딩정보'
            ],
            callback : [
                {type:'Function'},
                '- 소스로딩완료후 실행될 콜백'
            ]
        },
		example : `
			RedShaderLoader(
				[
					{ id: 'colorVS', src: 'glsl/colorVS.glsl' },
					{ id: 'colorFS', src: 'glsl/colorFS.glsl' },
					{ id: 'bitmapPhongVS', src: 'glsl/bitmapPhongVS.glsl' },
					{ id: 'bitmapPhongFS', src: 'glsl/bitmapPhongFS.glsl' },
					{ id: 'skyBoxVS', src: 'glsl/skyBoxVS.glsl' },
					{ id: 'skyBoxFS', src: 'glsl/skyBoxFS.glsl' }
				],
				function(){
					console.log('콜백!')
				}
			)
        `,
        return : 'RedSceneInfo Instance'
    }
:DOC*/
(function () {
	RedShaderLoader = function (list, callback) {
		console.log(list, callback)
		if (!(this instanceof RedShaderLoader)) return new RedShaderLoader(list, callback)
		var cnt = 0;
		list['callback'] = callback
		list.forEach(function (v, idx) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', v['src'], true);
			xhr.onreadystatechange = function () {
				var scr;
				if (xhr.readyState == 4 && xhr.status == 200) {
					scr = document.createElement('script');
					scr.setAttribute('id', v['id'])
					scr.setAttribute('type','glsl')
					scr.text = xhr.responseText;
					console.log(v['id'],scr.text);
					console.log(list)
					document.body.appendChild(scr);
					if (++cnt == list.length && list['callback']) list['callback']();
				}
			};
			xhr.send(null);
		});
	};

})();