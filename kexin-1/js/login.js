$(function(){
	//ajax请求地址
	var requrl="http://console.qjias.com/info/InfoServlet";

	document.onkeydown=function(ev){
       if(ev.keyCode==13){
        login();
       }
    }
	$("#loginbtn").on('click',function(){
		login();
	});
	function login(){
		var $email=$('#email').val();
		var $pass=$('#password').val();
		if($email=='' || !Uiho.ver.email($email)){
			$('#tip').html('请输入正确的邮箱！');
			$('#tip').addClass('error')
			return false;
		}else if($pass=='' ||  !Uiho.ver.password($pass)){
			$('#tip').html('请输入正确的密码！');
			$('#tip').addClass('error')
			return false;
		};
		var reqdata = '{"action":"managerLogin","params":{"password":"'+$pass+'","phone": "'+$email+'"},"source":"web","target":"manager"}';
		$.ajax({		
			url:requrl,
			type:"POST",
			data:'data='+reqdata+'',
			success:function(str){
				var oData=$.parseJSON(str);
				console.log(oData.object);
				if(oData.responseCode==1){
					$('#tip').html('登录成功!跳转中...');
					$('#tip').addClass('success');

					//得到object 将所有的存到cookie里面
					var object=JSON.stringify(oData.object);
					Uiho.cookies.setCookie('userinfo',object,1); //5小时
					setTimeout(function(){
						window.location.href="index.html";
					},1000)
				}else{
					$('#tip').html('用户名或密码不正确或被禁用！');
					$('#tip').addClass('error')
				}
				
			}
		})
	}
});