'use strict';

Recard.static('INDEX', (function () {
    var result;

    result = {
       
        init: function () {
            Recard.Css('body').S(
                'background', 'url(grid.png)',
                'font-size', 12,
                'color', '#fff',
                'user-select', 'none'
            )
            Recard.Css('.inOutputBox').S(
                'display', 'inline-block',
                'width', '50%',
                'padding-top', 5,
                'padding-bottom', 5
            )
            Recard.Css('.inputItem').S(
                'position', 'relative',
                'text-align', 'left',
                'padding-left', 10,
                'height', 20,
                'color', 'rgb(242, 169, 113)',
                'font-size', 11,
                'line-height', 20
            )
            Recard.Css('.outputItem').S(
                'position', 'relative',
                'text-align', 'right',
                'padding-right', 10,
                'height', 20,
                'font-size', 11,
                'color', 'rgb(242, 169, 113)',
                'line-height', 20
            )
            /////////////////////////////////////
           

            Recard.UPDATER.init()
            Recard.TEST_UI.init()
            
           
        }
    }
    return result
})())