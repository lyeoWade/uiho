//判断是不是在微信端
if(!getCookie("userId") || getCookie("userId")=='null' || getCookie("isLogin")!=1){
	//用户唯一识别码
	var userId = "";
	//是否注册
	var isLogin = "";
	//拿用户的openid
	//var scope = "snsapi_base";
	//拿用户的基本信息
	var scope = "snsapi_userinfo";

	if((window.location+'').lastIndexOf('userId=')!=-1){
		var i = (window.location+'').lastIndexOf("userId=");
		var j = (window.location+'').indexOf("&",(window.location+'').lastIndexOf("userId="));
		if(j!=-1){
			userId = (window.location+'').substring(i+7,j);
		}else{
			userId = (window.location+'').substring(i+7);
		}
	}

	if((window.location+'').lastIndexOf('isLogin=')!=-1){
		var i = (window.location+'').lastIndexOf("isLogin=");
		var j = (window.location+'').indexOf("&",(window.location+'').lastIndexOf("isLogin="));
		if(j!=-1){
			isLogin = (window.location+'').substring(i+8,j);
		}else{
			isLogin = (window.location+'').substring(i+8);
		}
	}
	
	var Uid=userId;

	//alert("userId = "+Uid);
	//alert("isLogin = "+isLogin);




	setCookie('userId',Uid,10);
	setCookie('isLogin',isLogin,10);
	
	//如果无userId，就去授权拿userId
	if(userId==""){
		//公众号参数
		var appid = "wx281172499e8b5cd9";
		
		//请求地址
		var req_url = location.href;
		//授权完了后的跳转页面
		var redirect_url = "http://app.uiho.com/pxb_ciqikou_oauth/RedirectServlet?url="+req_url;
		//跳转去拿授权得到用户信息
		window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+
		"&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
	};

}



