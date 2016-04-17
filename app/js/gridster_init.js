/**
 * Created by Walter on 16/3/21.
 */

var gridster;

var localStorageArr = [];

var baseX  = 35;
var baseY  = 35;



$(function(){
    renderFromRemoteData();
    var contentArea = $('#content');
    var selContent = $('#selForContent');
    gridster = $(".gridster ul").gridster({
        widget_base_dimensions: [baseX, baseY],
        widget_margins: [0, 0],
        resize:{
            enabled: true
        }
    }).data('gridster');

    var widgets = [
    ];
    for(var i=0;i<10;i++) {
        for(var j=0;j<10;j++) {
            widgets.push(['<li class="card"></li>', 1, 1, j+1, i+1]);
        }
    }

    $.each(widgets, function(i, widget){
        //var widget = gridster.add_widget.apply(gridster, widget);
        //localStorageArr.push(widget);
    });

    $('#doSerialize').click(function () {
        var content = gridster.serializeIxc();
        contentArea.html(JSON.stringify(content));
        console.log(content);
    });
    
    $('#addWidget').click(function () {
        var placeHolder = selContent.val();
        if(!placeHolder) return;
        var label = selContent.find('option:selected').text();
        var widgetLabel = gridster.add_widget.apply(gridster, ['<li type="label">'+label+'</li>',2,1,1,1]).css('line-height', baseY+'px');
        var widgetPlaceHolder = gridster.add_widget.apply(gridster, ['<li type="placeholder">'+placeHolder+'</li>',4,1,3,1]).css('line-height', baseY+'px');
        localStorageArr.push(widgetLabel);
        localStorageArr.push(widgetPlaceHolder);
    });
    $('#addWidgetLabel').click(function () {
        var placeHolder = selContent.val();
        if(!placeHolder) return;
        var label = selContent.find('option:selected').text();
        var widgetLabel = gridster.add_widget.apply(gridster, ['<li type="label">'+label+'</li>',2,1,1,1]).css('line-height', baseY+'px');
        localStorageArr.push(widgetLabel);
    });

    $('#resizable').change(function () {
        if($(this).is(':checked')) {
            gridster.enable_resize();
        }else {
            gridster.disable_resize();
        }
    });
    $('#dragable').change(function () {
        if($(this).is(':checked')) {
            gridster.enable();
        }else {
            gridster.disable();
        }
    });
    $('#doPrint').click(function() {
        $("#forPrint").print();
    });
});

function renderFromRemoteData() {
    $.getJSON(
        'app/data/data.json',
        function(data) {
            if($.isArray(data)) {
                $.each(data, function(i, widget){
                    if(widget.size_x<widget.size_y) {
                        gridster.add_widget('<li type="'+widget.type+'"><table cellpadding="0" cellspacing="0"  class="gridtable"><tr><td>'+getVerticalStr(widget.value)+'</td></tr></table></li>', widget.size_x, widget.size_y, widget.col, widget.row);
                    }else {
                        gridster.add_widget('<li type="'+widget.type+'"><table cellpadding="0" cellspacing="0"  class="gridtable"><tr><td>'+widget.value+'</td></tr></table></li>', widget.size_x, widget.size_y, widget.col, widget.row);
                    }
                });
                gridster.disable();
                gridster.disable_resize();
            }
        }
    );
}


function getVerticalStr(str) {
    var result = "";
    for(var i=0;i<str.length;i++) {
        if(i!=0) {
            result += '<br>'+str.charAt(i);
        }else {
            result += str.charAt(i);
        }
    }
    return result;
}





