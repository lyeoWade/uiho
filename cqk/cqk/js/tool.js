
//ajax请求地址
var requrl='http://m.wego58.com/info/InfoServlet';
//var requrl='http://rhbiz.dev.uiho.com/info/InfoServlet'; //测试
var Uiho={}
/* 验证  正则匹配 */ 
Uiho.ver={}
Uiho.ver.init=function(arr,fn){
	for(var i=0; i<arr.length; i++){
		if(arr[i].obj.value==''){
			fn&&fn(arr[i].tag+"不能为空!");
			return false;
		 }else if(!Uiho.ver.moblie(arr[i].obj.value)){
		 	alert('---'+arr[i].obj.value)
		 	fn&&fn("请输入正确的"+arr[i].tag+"!");
		 	return false;
		 }else if(!Uiho.ver.password(arr[i].obj.value)){
		 	alert(arr[i].obj.value)
		 	fn&&fn("请输入正确的"+arr[i].tag+"!");
		 	return false;
		 }else{
		 	fn&&fn();
		 };
	};
};
Uiho.ver.empty=function(arr,fn){
	for(var i=0; i<arr.length; i++){
		if(arr[i].obj.value==''){
			fn&&fn(arr[i].tag+"不能为空!");
			return false;
		 }
	};
};
//0-99
Uiho.ver.numint=function(num){
	return /^(\d{1,2})$/.test(num);
};
//0-1000
Uiho.ver.num1000=function(num){
	return /^(\d{1,3}|1000)$/.test(num);
};
Uiho.ver.num=function(num){
	return /^\d+$/.test(num);
}

Uiho.ver.allnum=function(num){
	return /^(-)?\d+$/.test(num);
}

//中文名
Uiho.ver.chinese=function(str){
	return /^[\u4e00-\u9fa5]+$/.test(str);
};

Uiho.ver.moblie=function( value ){
    return /^1\d{10}$/.test( value );
}
Uiho.ver.password=function( value ){
    return /^[\w]{6,20}$/.test( value );
}
Uiho.ver.tel=function(value){
	return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);
}
Uiho.ver.email=function( value ){
    return /^[a-z0-9][\w]+\@[a-z0-9]{1,10}\.[a-z]{2,4}$/.test( value );
}



Uiho.tool={};
Uiho.tool.DetailTimesTamp=function(time){
	var d = new Date(time);    //根据时间戳生成的时间对象
	var date = (d.getFullYear()) + "-" + Uiho.tool.toZero(d.getMonth() + 1) + "-" +Uiho.tool.toZero(d.getDate()) + " " + Uiho.tool.toZero(d.getHours()) + ":" + Uiho.tool.toZero(d.getMinutes()) + ":" + Uiho.tool.toZero(d.getSeconds());
	return date;
};
Uiho.tool.toZero=function(n){
	return n<10?n='0'+n:n;
};
Uiho.tool.geturldata=function(url){
	var urldata=url.split('?')[1].split('&');
	var result=[];
	var c=[];
	for(var i=0; i<urldata.length; i++){
		a=urldata[i].split('=');
		c+=result.concat('"'+urldata[i]+'",')
	};
	var laststr=c.replace(/=/g,'":"');//;
	var aaa='{'+laststr.substring(0,laststr.lastIndexOf(','))+'}';
	var obj=JSON.parse(aaa);

	if(obj.id){
		obj.id=parseInt(obj.id);
	}
	return obj;
};
function getName(){
	var SName=decodeURIComponent(Uiho.tool.geturldata(window.location.href).name);
	if(SName.indexOf('#')!=-1){
		//alert(SName.indexOf('#'))
		return SName.substring(0,SName.indexOf('#'));
	}else{
		return SName;
	}
};
//cookie
Uiho.cookies={};
Uiho.cookies.getCookie=function(cookiename){
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
Uiho.cookies.setCookie=function(name, value, Hours){
	var oDate=new Date();
	var oh=oDate.getHours()+Hours;
	oDate.setHours(oh);
	//alert(oDate)
	document.cookie=name+'='+value+';expires='+oDate;
}

Uiho.cookies.removeCookie=function(name)
{
	Uiho.cookies.setCookie(name, 'undefined', -10);
}


//效果
Uiho.effect={};

//简单的分页  
/*
	allnum--->总条数
	pageSize->每一页多少条
	nowPage-->当前第几页
	fn------->执行函数,传参nowPage
*/
Uiho.effect.pagination=function(allnum,pageSize,nowPage,fn){
	nowPage=parseInt(nowPage);
	var nums=Math.ceil(allnum/pageSize);
	$allnum='<div class="pull-left"><span>共 '+allnum+' 条数据</span>&nbsp;&nbsp;&nbsp;<span>共'+nums+'页</span></div><ul id="page" class="pagination pagination-sm no-margin pull-right"></ul>';
	$('#pagination').html($allnum);
	
	var oPage=document.getElementById('page');
	//只显示5条

	if(nowPage>=4 && nums>=6){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="1">首页</a>';
		oPage.appendChild(oLi);
	}
	if(nowPage>=2){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+(nowPage-1)+'">上一页</a>';
		oPage.appendChild(oLi);	
	}
	if(nums<=5){
		for(var i=1; i<=nums; i++){
			var oLi=document.createElement('li');
			if(nowPage==i){
				oLi.className="active";
			}
			oLi.innerHTML+='<a pagenum="'+i+'">'+i+'</a>';
			oPage.appendChild(oLi);
		}
			
	}else{
		for(var i=1; i<=5; i++){
			var oLi=document.createElement('li');
			
			if(nowPage==1 || nowPage==2){
				oLi.innerHTML='<a pagenum="'+i+'">'+i+'</a>';
				if(nowPage==i){
					oLi.className="active";
				}
				else{
					oLi.className="";
				}
				
			}else if((nums - nowPage)==0 || (nums-nowPage)==1){// 倒数第一和第二 特殊处理
				
				oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				if( (nums - nowPage) ==0 && i==5){ //倒数第一项
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}else if((nums - nowPage) ==1 && i==4){ //倒数第二项
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}else{
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}
			}else{
				
				if(i==3){
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
				}else{
					oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
				}
				oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
			}
			oPage.appendChild(oLi);	
		}	
	}
	if((nums-nowPage)>=1){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+(nowPage+1)+'">下一页</a>';
		oPage.appendChild(oLi);
	}
	if((nums-nowPage)>=3){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+nums+'">尾页</a>';
		oPage.appendChild(oLi);
	}
					
	 var aLi=oPage.children;

	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			if(aLi[this.index].className=='active')return false;
			var aA=this.getElementsByTagName('a')[0];
			var oNum=aA.getAttribute('pagenum');
			fn&&fn(oNum);
		};
	};
};


Uiho.effect.selectNum=function (fn){
	$('#selectNum').on('change',function(){
		fn&&fn($(this).val());
	})
}

Uiho.effect.getEncodeData=function(obj){
	return encodeURIComponent(obj);
}

Uiho.effect.getDecodeData=function(obj){
	return decodeURIComponent(obj);
}


var formatJson = function(json, options) {

    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    '; // one can also use '\t' or a different number of spaces

    // optional settings
    options = options || {};
    // remove newline where '{' or '[' follows ':'
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    // use a space after a colon
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

    // begin formatting...
    if (typeof json !== 'string') {
        // make sure we start with the JSON as a string
        json = JSON.stringify(json);
    } else {
        // is already a string, so parse and re-stringify in order to remove extra whitespace
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }

    // add newline before and after curly braces
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');

    // add newline before and after square brackets
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');

    // add newline after comma
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');

    // remove multiple newlines
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');

    // remove newlines before commas
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');

    // optional formatting...
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {         
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {          
        reg = /\:/g;
        json = json.replace(reg, ': ');
    }

    $.each(json.split('\r\n'), function(index, node) {
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
};




function responseInfo(str){

	var oData=$.parseJSON(str);
	if(oData.responseCode==1){
		$('.addtip').html(oData.responseMsg);
		$('.addtip').addClass('success');
	}else{
		$('.addtip').html(oData.responseMsg);
		$('.addtip').addClass('error');
	}
}


//处理报文

function  deresopon(str){
	return str.replace(/\n/g,'').replace(/\s+/g,'').replace(/"/g,'\\"');
}

// var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));


// //权限控制
// if(cookieValue.roleId==3 || cookieValue.roleId==1 || cookieValue.roleId==2){
	
// }else{
// 	$('.noroot').remove();
// }
//返回页面顶部
parent.scrollTo(0,0);