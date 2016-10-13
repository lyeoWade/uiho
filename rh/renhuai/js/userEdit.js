$(function(){

	var Sid=Uiho.tool.geturldata(window.location.href).id;
	var datas='data={"action":"getOneUser","params":'+Sid+',"source":"web","target":"user"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){

			var oData=$.parseJSON(str);
			var obj=oData.object;
			console.log(obj)
			$('#username').val(obj.name);
			$('#tel').val(obj.tel);
			$('#code').val(obj.code);
			$('#email').val(obj.email);
			$('#roleId').val(obj.roleId); 
			var lastLoginDatetime='',lastip='';
			
			if(obj.lastLoginDatetime==undefined){
				lastLoginDatetime='从未登录';
			}else{
				lastLoginDatetime=Uiho.tool.DetailTimesTamp(obj.lastLoginDatetime);
			}
			if(obj.lastLoginIp==undefined){
				lastip='从未登录';
			}else{
				lastip=Uiho.tool.DetailTimesTamp(obj.lastLoginIp);
			}

			$('#lastLoginDatetime').val(lastLoginDatetime);
			$('#lastip').val(lastip);
			$('#saves').on('click',function(){
				updataUserInfo(Sid);
			});
		},
		complete:function(){			
 			document.onkeydown=function(ev){
				var oEvent=ev||event;
			   	if(oEvent.keyCode==13){
			   		//	alert(123);
			   		updataUserInfo(Sid);
			   	};
			};
		}
	})

});




function updataUserInfo(Sid){
	var username=$('#username').val();
	var tel=$('#tel').val();
	var email=$('#email').val();
	//var roleId=$('#roleId').val();
	
	//提交
	var datas='data={"action":"updateUserInfo","params":{"name":"'+username+'","tel":"'+tel+'","email":"'+email+'","userId":"'+Sid+'"}, "source": "web", "target": "user" }';
	//alert(datas)
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str);
			responseInfo(str);
			 setTimeout(function(){
                    history.go(0);
                },800)
		}
	});
}

