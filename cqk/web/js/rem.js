function remReSize() {

	var w = document.documentElement.clientWidth;
	if (w > 640) {
		w = 640;
	};
	document.getElementsByTagName('html')[0].style.fontSize=200/640*w + 'px';
};
remReSize();

window.addEventListener('resize', remReSize, false);

function id(obj) {
    return document.getElementById(obj);
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
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
var reqUrl='http://app.uiho.com/pxb_ciqikou/InfoServlet';

function getCookie(cookiename){
    var result;
    var mycookie = document.cookie;
    var start2 = mycookie.indexOf(cookiename + "=");
    if (start2 > -1) {
        start = mycookie.indexOf("=", start2) + 1;
        var end = mycookie.indexOf(";", start);

        if (end == -1) {
            end = mycookie.length;
        }

        result = unescape(mycookie.substring(start, end));
    }
    return result;
}
function setCookie(name, value, Hours){
    var oDate=new Date();
    var oh=oDate.getHours()+Hours;
    oDate.setHours(oh);
    document.cookie=name+'='+value+';expires='+oDate;
}

function removeCookie(name)
{
    Uiho.cookies.setCookie(name, 'undefined', -10);
}

