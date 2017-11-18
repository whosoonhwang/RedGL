var tUniformValue,tUniformKey;						
tUniformKey = tUniformsList[i2][0], tUniformValue = tUniformsList[i2][1]
tLocation = tUniformLocationGroup[tUniformKey]['location']
if (tUniformValue._uniformMethod) {
    tUniformKey == 'uPMatrix' && updated_uPMatrix
        ? 0
        : tUniformValue.length > 11
            ? gl[tUniformValue._uniformMethod](tLocation, false, tUniformValueGroup[tUniformKey])
            : gl[tUniformValue._uniformMethod](tLocation, tUniformValueGroup[tUniformKey])
    
    tUniformKey == 'uPMatrix' ? updated_uPMatrix = true : 0

} else if (tUniformValue._webglTexture) {
    if (tUniformValue.loaded && prevDiffuseUUID != tUniformValue.UUID) {
        // console.log('오남',prevDiffuse[tUniformValue.UUID] , tUniformValue)	
        // console.log('오남2',tUniformValue)							
        tUniformValue.actived ? 0 : gl.activeTexture(gl.TEXTURE1)
        tUniformValue.actived = 1,
        gl.bindTexture(gl.TEXTURE_2D, tUniformValue),
        gl.uniform1i(tLocation, 0),
        prevDiffuseUUID = tUniformValue.UUID
        // console.log(prevDiffuse)
    }
    
} else throw '안되는 나쁜 타입인거야!!'