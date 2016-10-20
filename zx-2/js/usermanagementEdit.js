$(function(){
	//
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	var datas='data={"action":"getOneUser","params":'+Sid+',"source":"web","target":"user"}';

	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData)
			var obj=oData.object;
			
			$('#username').val(obj.realname);
			$('#phone').val(obj.phone);
			$('#idcard').val(obj.card);
			$('#address').val(obj.address);
			$('#tel').val(obj.tel);
			$('#idcardtype').val(obj.licenseType);
			$('#tel').val(obj.tel);
			$('#idcardtype').val(obj.licenseType);
			$('#bail').val(obj.bail);
			
			if(obj.updateTime){
				$('#updateTime').val(Uiho.tool.DetailTimesTamp(obj.updateTime));
			}else{
				$('#updateTime').val('从未登陆');
			};
			//$('#bzj').val(obj.bail);//余额
			 SignUp(Sid);
		}
	});

});

//升级用户
function SignUp(Sid){

	$("#subBtn").on('click',function(){

		if($("#bzj").val()=='' || !Uiho.ver.num($("#bzj").val())){
			$(".addtip").html('请填写正确的金额！').addClass('error');
			return false;
		};
		//请求
		var money=$("#bzj").val();
		var datas='data={"action":"upgradeOneUser","params":{"money":"'+money+'","userId":"'+Sid+'"}, "source":"web","target":"user"}'
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					$(".addtip").html(oData.responseMsg);
					$(".addtip").addClass('success')
					operalog("升级了一个学员！");
					ChildMsg();
					window.location.href('student.html');
				}else{
					$(".addtip").html(oData.responseMsg);
				}
			}
		})
	});
}

