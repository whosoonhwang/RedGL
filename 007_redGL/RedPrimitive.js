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
    var checkShareInfo;
    checkShareInfo = function (redGL) {
        if (!redGL['__datas']['RedPrimitive']) redGL['__datas']['RedPrimitive'] = {}
        return redGL['__datas']['RedPrimitive']
    }
    RedPrimitive = {}
    createGeo = function (redGL, tType, vertices, indices, uvs, normals) {
        vertices = new Float32Array(vertices)
        indices = new Uint16Array(indices)
        uvs = new Float32Array(uvs)
        normals = new Float32Array(normals)
        vertices = redGL.createArrayBufferInfo(tType + '_vertices', RedFixedAttributeKey['aVertexPosition'], vertices, 3, vertices.length / 3, redGL.gl.FLOAT)
        indices = redGL.createIndexBufferInfo(tType + '_indices', indices, 1, indices.length, redGL.gl.UNSIGNED_SHORT)
        if (uvs) uvs = redGL.createArrayBufferInfo(tType + '_uvs', RedFixedAttributeKey['aTexcoord'], uvs, 2, uvs.length / 2, redGL.gl.FLOAT)
        if (normals) normals = redGL.createArrayBufferInfo(tType + '_normals', RedFixedAttributeKey['aVertexNormal'], normals, 3, normals.length / 3, redGL.gl.FLOAT)
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
            tDatas = checkShareInfo(redGL)
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
    })();
    /**DOC:
        {
            code : 'FUNCTION',
            title :`cube`,
            description : `
                - cube 지오메트리가 반환됨,
                - 생성시 내부적으로 'RedPrimitiveCube' + '_' + width + '_' + height + '_' + depth + '_' + widthSegments + '_' + heightSegments + '_' + depthSegments 키로 캐싱한뒤..
                - share되는 지오메트리를 생성한다.
            `,
            return : 'RedPrimitivePlane Instance'
        }
    :DOC*/
    RedPrimitive.cube = (function () {
        var numberOfVertices;
        var groupStart;
        var buildPlane;
        buildPlane = function (vertices, indices, uvs, normals, u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
            var segmentWidth = width / gridX;
            var segmentHeight = height / gridY;
            var widthHalf = width / 2;
            var heightHalf = height / 2;
            var depthHalf = depth / 2;
            var gridX1 = gridX + 1;
            var gridY1 = gridY + 1;
            var vertexCounter = 0;
            var groupCount = 0;
            var ix, iy;
            var vector = []
            // generate vertices, normals and uvs
            for (iy = 0; iy < gridY1; iy++) {
                var y = iy * segmentHeight - heightHalf;
                for (ix = 0; ix < gridX1; ix++) {
                    var x = ix * segmentWidth - widthHalf;
                    // set values to correct vector component
                    vector[u] = x * udir;
                    vector[v] = y * vdir;
                    vector[w] = depthHalf;
                    // now apply vector to vertex buffer
                    vertices.push(vector.x, vector.y, vector.z);
                    // set values to correct vector component
                    vector[u] = 0;
                    vector[v] = 0;
                    vector[w] = depth > 0 ? 1 : - 1;
                    // now apply vector to normal buffer
                    normals.push(vector.x, vector.y, vector.z);
                    // uvs
                    uvs.push(ix / gridX);
                    uvs.push(1 - (iy / gridY));
                    // counters
                    vertexCounter += 1;
                }
            }
            // indices
            // 1. you need three indices to draw a single face
            // 2. a single segment consists of two faces
            // 3. so we need to generate six (2*3) indices per segment
            for (iy = 0; iy < gridY; iy++) {
                for (ix = 0; ix < gridX; ix++) {
                    var a = numberOfVertices + ix + gridX1 * iy;
                    var b = numberOfVertices + ix + gridX1 * (iy + 1);
                    var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                    var d = numberOfVertices + (ix + 1) + gridX1 * iy;
                    // faces
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                    // increase counter
                    groupCount += 6;
                }
            }
            // calculate new start value for groups
            groupStart += groupCount;
            // update total number of vertices
            numberOfVertices += vertexCounter;

        }
        return function RedPrimitiveCube(redGL, width, height, depth, widthSegments, heightSegments, depthSegments) {
            if (!(this instanceof RedPrimitiveCube)) return new RedPrimitiveCube(redGL, width, height, depth, widthSegments, heightSegments, depthSegments)
            if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'

            width = width || 1;
            height = height || 1;
            depth = depth || 1;
            // segments
            widthSegments = Math.floor(widthSegments) || 1;
            heightSegments = Math.floor(heightSegments) || 1;
            depthSegments = Math.floor(depthSegments) || 1;

            // 저장할 공간확보하고
            tDatas = checkShareInfo(redGL)
            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            tType = 'RedPrimitiveCube' + '_' + width + '_' + height + '_' + depth + '_' + widthSegments + '_' + heightSegments + '_' + depthSegments
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
            numberOfVertices = 0;
            groupStart = 0;
            //TODO: 적화필요
            buildPlane(vertices, indices, uvs, normals, 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0); // px
            buildPlane(vertices, indices, uvs, normals, 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1); // nx
            buildPlane(vertices, indices, uvs, normals, 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
            buildPlane(vertices, indices, uvs, normals, 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3); // ny
            buildPlane(vertices, indices, uvs, normals, 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4); // pz
            buildPlane(vertices, indices, uvs, normals, 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5); // nz
            console.log(vertices, indices, uvs, normals)
            ////////////////////////////////////////////////////////////////////////////
            // 캐싱
            tDatas[tType] = createGeo(redGL, tType, vertices, indices, uvs, normals)
            // console.log(redGL['__datas']['RedPrimitive'])
            return tDatas[tType]
        }
    })();
    RedPrimitive.floor = (function () {
        var dim;
        var lines;
        var inc;
        var i;
        return function RedPrimitiveFloor(redGL, w, h) {
            if (!(this instanceof RedPrimitiveFloor)) return new RedPrimitiveFloor(redGL, w, h)
            if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
            // 저장할 공간확보하고
            tDatas = checkShareInfo(redGL)
            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            w= w ? w : 50
            h= h ? h : 50
            tType = 'RedPrimitiveFloor'+'_'+w+'_'+h
            if (tDatas[tType]) {
                console.log('기존에 생성된 공융 프리미티브를 사용함! : ' + tType)
                return tDatas[tType]
            }

            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!

            // buffers Data
            var vertices = [];
            var indices = [];
            dim = w ,
                lines = h,
                inc = 2 * dim / lines

            for (i = 0; i <= lines; i++) {
                vertices[6 * i] = -dim,
                    vertices[6 * i + 1] = 0,
                    vertices[6 * i + 2] = -dim + (i * inc),

                    vertices[6 * i + 3] = dim,
                    vertices[6 * i + 4] = 0,
                    vertices[6 * i + 5] = -dim + (i * inc),

                    vertices[6 * (lines + 1) + 6 * i] = -dim + (i * inc),
                    vertices[6 * (lines + 1) + 6 * i + 1] = 0,
                    vertices[6 * (lines + 1) + 6 * i + 2] = -dim,

                    vertices[6 * (lines + 1) + 6 * i + 3] = -dim + (i * inc),
                    vertices[6 * (lines + 1) + 6 * i + 4] = 0,
                    vertices[6 * (lines + 1) + 6 * i + 5] = dim,

                    indices[2 * i] = 2 * i,
                    indices[2 * i + 1] = 2 * i + 1,
                    indices[2 * (lines + 1) + 2 * i] = 2 * (lines + 1) + 2 * i,
                    indices[2 * (lines + 1) + 2 * i + 1] = 2 * (lines + 1) + 2 * i + 1
            }

            console.log(vertices, indices )
            ////////////////////////////////////////////////////////////////////////////
            // 캐싱
            tDatas[tType] = createGeo(redGL, tType, vertices, indices)
            // console.log(redGL['__datas']['RedPrimitive'])
            return tDatas[tType]
        }
    })();
    RedPrimitive.sphere = (function () {
        var thetaEnd;
        var ix, iy;
        var index
        var grid = [];
        var vertex = new Float32Array([0, 0, 0])
        var normal = new Float32Array([0, 0, 0])
        var a, b, c, d;
        return function RedPrimitiveSphere(redGL, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
            if (!(this instanceof RedPrimitiveSphere)) return new RedPrimitiveSphere(redGL, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
            if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'

            radius = radius || 1;
            widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
            heightSegments = Math.max(2, Math.floor(heightSegments) || 6);
            phiStart = phiStart !== undefined ? phiStart : 0;
            phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;
            thetaStart = thetaStart !== undefined ? thetaStart : 0;
            thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

            thetaEnd = thetaStart + thetaLength;
            ix, iy;
            index = 0;
            grid.length = 0
            vertex[0] = 0, vertex[1] = 0, vertex[2] = 0
            normal[0] = 0, normal[1] = 0, normal[2] = 0

            // 저장할 공간확보하고
            tDatas = checkShareInfo(redGL)
            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            tType = 'RedPrimitiveSphere' + '_' + radius + '_' + widthSegments + '_' + heightSegments + '_' + phiStart + '_' + phiLength + '_' + thetaStart + '_' + thetaLength
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
            for (iy = 0; iy <= heightSegments; iy++) {
                var verticesRow = [];
                var v = iy / heightSegments;
                for (ix = 0; ix <= widthSegments; ix++) {
                    var u = ix / widthSegments;
                    // vertex
                    vertex.x = - radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                    vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                    vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                    vertices.push(vertex.x, vertex.y, vertex.z);
                    // normal
                    normal[0] = vertex.x
                    normal[1] = vertex.y
                    normal[2] = vertex.z
                    vec3.normalize(normal, normal)
                    normals.push(normal[0], normal[1], normal[2]);
                    // uv
                    uvs.push(u, 1 - v);
                    verticesRow.push(index++);
                }
                grid.push(verticesRow);
            }
            // indices
            for (iy = 0; iy < heightSegments; iy++) {
                for (ix = 0; ix < widthSegments; ix++) {
                    a = grid[iy][ix + 1]
                    b = grid[iy][ix]
                    c = grid[iy + 1][ix]
                    d = grid[iy + 1][ix + 1]
                    if (iy !== 0 || thetaStart > 0) indices.push(a, b, d)
                    if (iy !== heightSegments - 1 || thetaEnd < Math.PI) indices.push(b, c, d)
                }
            }
            console.log(vertices, indices, uvs, normals)
            ////////////////////////////////////////////////////////////////////////////
            // 캐싱
            tDatas[tType] = createGeo(redGL, tType, vertices, indices, uvs, normals)
            // console.log(redGL['__datas']['RedPrimitive'])
            return tDatas[tType]
        }
    })()
    Object.freeze(RedPrimitive)
})();