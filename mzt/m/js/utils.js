
/*
* @description: 中文说明
* @author: 空 杯---
* @update: 空 杯--- (2015-08-26 18:00:00)
*/

function remReSize(){
	
	var w = $(window).width();
	try{
		w = $(parent.window).width();
	}catch(ex){
	};
	
	if(w>640){w = 640;};
	
	$('html').css('font-size',200/640*w+'px');
	
	$('#js_style_for_pc').remove();
	
	$('body').append('<style id="js_style_for_pc">.m_header{margin-left: -'+w/2+'px;}<\/style>');
};
remReSize();

$(window).resize(remReSize);

$(document).ready(function() {remReSize();});

for(var i=0;i<3;i++){setTimeout(remReSize, 100*i);};





function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}


function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}




