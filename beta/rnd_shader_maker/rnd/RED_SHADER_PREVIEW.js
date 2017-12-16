'use strict';
Recard.static('RED_SHADER_PREVIEW', (function () {
    var result;
    var rootBox;
    var contentBox;
    var startMouseX, startMouseY
    var startX, startY
    result = {
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'top', 0,
                'left', 0,
                'width', 400,
                'height', 400,
                'overflow', 'hidden',
                'background','#222',
                'html','프리뷰박스',
                '<', 'body'
            )
        }
    }

    return result
})())