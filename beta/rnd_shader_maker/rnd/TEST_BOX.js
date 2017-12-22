'use strict';
Recard.static('TEST_BOX', (function () {
    var result;
    var rootBox;
    var contentBox;
    Recard.Css('.nodeItemButton').S(
        'width', '50%',
        'cursor', 'pointer',
        'border', 0,
        'outline', 'none',
        'border-bottom', '1px solid #000',
        'padding', 10
    )
    Recard.Css('div .nodeItemButton:nth-child(2n)').S(
        'border-left', '1px solid #000'
    )
    result = {
        init: function () {
            rootBox = Recard.Dom('div').S(
                '@className', 'style-1',
                'position', 'fixed',
                'left', 0,
                'bottom', 0,
                'width', 400,
                'overflow', 'auto',
                'background', 'rgba(0,0,0,0.5)',
                '<', 'body'
            )
            Recard.Dom('div').S(
                '>', Recard.Dom('button').S(
                    '@className', 'nodeItemButton',
                    'html', 'fragment 텍스쳐추가',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Texture('fragment'))
                    }]
                ),
                '>', Recard.Dom('button').S(
                    '@className', 'nodeItemButton',
                    'html', 'vertex 텍스쳐추가',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Texture('vertex'))
                    }]
                ),
                '<', rootBox
            )
            Recard.Dom('div').S(
                '>', Recard.Dom('button').S(
                    '@className', 'nodeItemButton',
                    'html', 'fragment 타입테스트추가',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Test('fragment'))
                    }]
                ),
                '>', Recard.Dom('button').S(
                    '@className', 'nodeItemButton',
                    'html', 'vertex 타입테스트추가',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Test('vertex'))
                    }]
                ),
                '<', rootBox
            )
            Recard.Dom('div').S(
                '>', Recard.Dom('button').S(
                    '@className', 'nodeItemButton',
                    'html', 'fragment Add',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Add('fragment'))
                    }]
                ),
                '>', Recard.Dom('button').S(
                    '@className', 'nodeItemButton',
                    'html', 'vertex Add',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Add('vertex'))
                    }]
                ),
                '<', rootBox
            )
            Recard.Dom('div').S(
                '>', Recard.Dom('button').S(
                    '@className', 'nodeItemButton',
                    'html', 'fragment ShaderTest',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Shader('fragment'))
                    }]
                ),
                '<', rootBox
            )
            Recard.Dom('div').S(
                '>', Recard.Dom('button').S(
                    '@className', 'nodeItemButton',
                    'html', 'fragment ShaderTest2',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Shader2('fragment'))
                    }]
                ),
                '<', rootBox
            )
            Recard.RED_SHADER_GRID.addNode(new Structure_Final())

        }
    }

    return result
})())