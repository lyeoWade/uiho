if(!getCookie("userIdByWeixin") || getCookie("userIdByWeixin")=='null'){
	//判断是不是在微信端
	function isWeiXin(){ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
			return true; 
		}else{ 
			return false; 
		}  
	}; 
	//不是微信端
	if(!isWeiXin()){
		alert('请在微信客户端打开链接。');
	};
	//用户唯一识别码
	var userIdByWeixin = "";
	//拿用户的openid
	//var scope = "snsapi_base";
	//拿用户的基本信息
	var scope = "snsapi_userinfo";
	if((window.location+'').lastIndexOf('userId=')!=-1){
		var i = (window.location+'').lastIndexOf("userId=");
		var j = (window.location+'').indexOf("&",(window.location+'').lastIndexOf("userId="));
		if(j!=-1){
			userIdByWeixin = (window.location+'').substring(i+7,j);
		}else{
			userIdByWeixin = (window.location+'').substring(i+7);
		}
	};
	//如果无userId，就去授权拿userId
	if(userIdByWeixin==""){
		//公众号参数
		var appid = "wxa993ec4becaa49d5";
		//请求地址
		var req_url = location.href;
		//授权完了后的跳转页面
		var redirect_url = "http://m.wego58.com/oauth/RedirectServlet?url="+req_url+'?1=1';
		//跳转去拿授权得到用户信息
		window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+
				"&redirect_uri="+decodeURIComponent(redirect_url)+
				"&response_type=code&scope="+scope+
				"&state=123#wechat_redirect";
	}
	//alert('获取到的微信id为:'+userIdByWeixin);
	setCookie("userIdByWeixin", userIdByWeixin, 10);
}else{
	//alert('有userid'+getCookie("userIdByWeixin"));

	//alert(typeof getCookie("userIdByWeixin"));
}

function setCookie(name, value, Hours){
	var oDate=new Date();
	var oh=oDate.getHours()+Hours;
	oDate.setHours(oh);
	//alert(oDate)
	document.cookie=name+'='+value+';expires='+oDate;
}
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