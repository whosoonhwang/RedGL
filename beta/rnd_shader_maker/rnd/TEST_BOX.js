'use strict';
Recard.static('TEST_BOX', (function () {
    var result;
    var rootBox;
    var contentBox;
    result = {
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'top', 400,
                'left', 0,
                'bottom', 0,
                '@className', 'style-1',
                'overflow', 'auto',
                '<', 'body'
            )
            Recard.Dom('button').S(
                'padding', 10,
                'html', '텍스쳐추가',
                'on',['down',function(){
                    Recard.RED_SHADER_GRID.addNode(new Structure_Texture())
                }],
                '<', rootBox
            )
        }
    }

    return result
})())