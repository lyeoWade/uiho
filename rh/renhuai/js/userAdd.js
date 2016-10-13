$(function(){
	$('#savebtn').on('click',function(){
		userAdd();
		
	})

	document.onkeydown=function(ev){
		var oEvent=ev||event;
	   	if(oEvent.keyCode==13){
	   		//	alert(code+'-'+name);
	   		userAdd();
	   	};
	};

});

function userAdd(){
	$name=$('#name').val();
	$password=$('#password').val();
	$repassword=$('#repassword').val();
	$roleId=$('#roleId').val();
	$tel=$('#tel').val();
	$email=$('#email').val();
	//alert(123)
	if($name=='' || !Uiho.ver.chinese($name)){
		$('.addtip').html('请输入正确的名字！');
		$('.addtip').addClass('error')
		return false;
	}
	if($tel=='' || !Uiho.ver.moblie($tel)){
		$('.addtip').html('请输入正确的手机号码！');
		$('.addtip').addClass('error')
		return false;
	}

	if($password=='' || !Uiho.ver.password($password)){
		$('.addtip').html('请输入正确的密码6-20位数字字母下划线！');
		$('.addtip').addClass('error')
		return false;
	}

	if($password!=$repassword){
		$('.addtip').html('两次密码不一致!');
		$('.addtip').addClass('error')
		return false;
	}

	var datas='data={"action":"addOneUser","params": { "name": "'+$name+'","password": "'+$password+'", "tel":'+$tel+', "roleId": "'+$roleId+'", "email": "'+$email+'" }, "source": "web", "target": "user" }';
	//console.log(datas);
	//alert(datas);
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str)
			responseInfo(str);
			 setTimeout(function(){
                    history.go(0);
                },800)
		}
	});
}