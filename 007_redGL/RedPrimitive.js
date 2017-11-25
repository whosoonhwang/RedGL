"use strict";
var RedPrimitive;
/**DOC:
    {
        constructorYn : true,
        title :`RedPrimitive`,
        description : `
            - RedPrimitive 생성기
        `,
        return : 'RedPrimitive Instance'
    }
:DOC*/
(function () {
    var tType;
    var tDatas;;
    var createGeo;
    RedPrimitive = {}
    createGeo = function (redGL, tType, vertices, indices, uvs, normals) {
        vertices = new Float32Array(vertices)
        indices = new Uint16Array(indices)
        uvs = new Float32Array(uvs)
        normals = new Float32Array(normals)
        vertices = redGL.createArrayBufferInfo(tType + '_vertices', RedFixedAttributeKey['aVertexPosition'], vertices, 3, vertices.length / 3, redGL.gl.FLOAT)
        indices = redGL.createIndexBufferInfo(tType + '_indices', indices, 1, indices.length, redGL.gl.UNSIGNED_SHORT)
        uvs = redGL.createArrayBufferInfo(tType + '_uvs', RedFixedAttributeKey['aTexcoord'], uvs, 2, uvs.length / 2, redGL.gl.FLOAT)
        normals = redGL.createArrayBufferInfo(tType + '_normals', RedFixedAttributeKey['aVertexNormal'], normals, 3, normals.length / 3, redGL.gl.FLOAT)
        return redGL.createGeometryInfo(tType, vertices, indices, uvs, normals)
    }
    /**DOC:
        {
            code : 'FUNCTION',
            title :`plane`,
            description : `
                - plane 지오메트리가 반환됨,
                - 생성시 내부적으로 'RedPrimitivePlane' + '_' + width + '_' + height + '_' + segmentW + '_' + segmentH 키로 캐싱한뒤..
                - share되는 지오메트리를 생성한다.
            `,
            return : 'RedPrimitivePlane Instance'
        }
    :DOC*/
    RedPrimitive.plane = (function () {
        var width_half;
        var height_half;
        var gridX;
        var gridY;
        var gridX1;
        var gridY1;
        var segment_width;
        var segment_height;
        var ix, iy;
        var tX, tY;
        var a, b, c, d;
        return function RedPrimitivePlane(redGL, width, height, segmentW, segmentH) {
            if (!(this instanceof RedPrimitivePlane)) return new RedPrimitivePlane(redGL, width, height, segmentW, segmentH)
            if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'

            width = width || 1, height = height || 1
            segmentH = segmentH || 1, segmentH = segmentH || 1
            width_half = width / 2, height_half = height / 2
            gridX = Math.floor(segmentW) || 1, gridY = Math.floor(segmentH) || 1
            gridX1 = gridX + 1, gridY1 = gridY + 1
            segment_width = width / gridX, segment_height = height / gridY

            // 저장할 공간확보하고
            if (!redGL['__datas']['RedPrimitive']) redGL['__datas']['RedPrimitive'] = {}
            tDatas = redGL['__datas']['RedPrimitive']
            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            tType = 'RedPrimitivePlane' + '_' + width + '_' + height + '_' + segmentW + '_' + segmentH
            if (tDatas[tType]) {
                console.log('기존에 생성된 공융 프리미티브를 사용함! : ' + tType)
                return tDatas[tType]
            }

            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!

            // buffers Data
            var vertices = [];
            var indices = [];
            var uvs = [];
            var normals = [];
            // generate vertices, normals and uvs
            for (iy = 0; iy < gridY1; iy++) {
                tY = iy * segment_height - height_half
                for (ix = 0; ix < gridX1; ix++) {
                    tX = ix * segment_width - width_half,
                        vertices.push(tX, - tY, 0),
                        normals.push(0, 0, 1),
                        uvs.push(ix / gridX, 1 - (iy / gridY))
                }
            }
            // indices
            for (iy = 0; iy < gridY; iy++) {
                for (ix = 0; ix < gridX; ix++) {
                    a = ix + gridX1 * iy,
                        b = ix + gridX1 * (iy + 1),
                        c = (ix + 1) + gridX1 * (iy + 1),
                        d = (ix + 1) + gridX1 * iy,
                        // faces
                        indices.push(a, b, d, b, c, d)
                }
            }
            ////////////////////////////////////////////////////////////////////////////
            // 캐싱
            tDatas[tType] = createGeo(redGL, tType, vertices, indices, uvs, normals)
            // console.log(redGL['__datas']['RedPrimitive'])
            return tDatas[tType]
        }
    })()

    Object.freeze(RedPrimitive)
})();