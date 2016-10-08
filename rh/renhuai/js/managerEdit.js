$(function(){

	var Sid=Uiho.tool.geturldata(window.location.href).id;
	var datas='data={"action":"getManager","params":'+Sid+',"source":"backstage","target":"manager"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			//console.log(str)
			var oData=$.parseJSON(str);
			var obj=oData.object;
			console.log(obj)
			$('#username').val(obj.realname);
			$('#tel').val(obj.tel);
			$('#phone').val(obj.phone);
			$('#managerNo').val(obj.managerNo);
			$('#email').val(obj.email);
			$('#updateDatetime').val(Uiho.tool.DetailTimesTamp(obj.updateDatetime));

			$('#saves').on('click',function(){
				updataUserInfo(Sid);
			});
		},
		complete:function(){			
 			document.onkeydown=function(ev){
				var oEvent=ev||event;
			   	if(oEvent.keyCode==13){
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
	var datas='data={"action":"updateManagerInfo","params":{"realname":"'+username+'","tel":"'+tel+'","email":"'+email+'","managerId":"'+Sid+'"}, "source": "backstage", "target": "manager" }';
	alert(datas)
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
		//console.log(str);
			responseInfo(str);
			setTimeout(function(){
                history.go(0);
            },800)
		}
	});
}

