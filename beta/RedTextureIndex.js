"use strict";
var RedTextureIndex;
(function () {
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`RedTextureIndex`,
			description : `
				- 텍스쳐 고유인덱스
			`,
			example : `
				RedTextureIndex.DIFFUSE
				RedTextureIndex.NORMAL
				RedTextureIndex.CUBE
			`,
			return : 'Integer'
		}
	:DOC*/
	RedTextureIndex = {
		/**DOC:
		{
			title :`CREATE`,
			code : 'CONST',
			description : `
				- 텍스쳐 생성시 자동부여되는 기본인덱스
				- 텍스쳐 생성완료이후 지정된 인덱스로 변환됨
			`,
			return : 'Integer'
		}
		:DOC*/
		CREATE : 0,
		/**DOC:
		{
			title :`DIFFUSE`,
			code : 'CONST',
			description : `
				- 디퓨즈 텍스쳐 인덱스
				- 텍스쳐 생성지 지정하지않을경우 기본 디퓨즈로 인식함
			`,
			return : 'Integer'
		}
		:DOC*/
		DIFFUSE : 1,
		/**DOC:
		{
			title :`CUBE`,
			code : 'CONST',
			description : `
				- 큐브 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		CUBE : 2,
		/**DOC:
		{
			title :`NORMAL`,
			code : 'CONST',
			description : `
				- 노멀 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		NORMAL : 3,
		/**DOC:
		{
			title :`DISPLACEMENT`,
			code : 'CONST',
			description : `
				- DISPLACEMENT 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		DISPLACEMENT : 4,
		//아틀라스는 자동
	}
	Object.freeze(RedTextureIndex)
})();