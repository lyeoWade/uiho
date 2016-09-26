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
			$('#phone').attr('oldphone',obj.phone);
			$('#idcard').val(obj.card);
			$('#idcardtype').val(obj.licenseType);
			$('#address').val(obj.address);
			if(obj.lastLoginTime){
				$('#loginTime').val(Uiho.tool.DetailTimesTamp(obj.lastLoginTime));
			}else{
				$('#loginTime').val('');
			}
			
			$('#sex').val(obj.gender);
			$('#bzj').val(obj.bail);
			$('#examFee').val(obj.examFee);
			$('#avatar img').attr('src',obj.avatar);

			$('#yue').attr('isBalancePay',obj.isBalancePay);
			$('#throghtstatus1').attr('subAStatus',obj.subAStatus)
			$('#throghtstatus2').attr('subBStatus',obj.subBStatus)
			$('#throghtstatus3').attr('subCStatus',obj.subCStatus)
			$('#throghtstatus4').attr('subDStatus',obj.subDStatus)
			$('#isRecommend').attr('isRecommend',obj.isRecommend)

			if(obj.isBalancePay==1){
				$('#yue').attr('checked','true').parents('div').addClass('checked');
			};

			if(obj.subAStatus==1){
				$('#throghtstatus1').attr('checked','true').parents('div').addClass('checked');
			}
			if(obj.subBStatus==1){
				$('#throghtstatus2').attr('checked','true').parents('div').addClass('checked');
			}
			if(obj.subCStatus==1){
				$('#throghtstatus3').attr('checked','true').parents('div').addClass('checked');
			}
			if(obj.subDStatus==1){
				$('#throghtstatus4').attr('checked','true').parents('div').addClass('checked');
			}
			//subBTime

			$('#subBTime').val('总计'+obj.subBTime+'课时,总花费'+obj.subBMoney+'元');
			$('#subCTime').val('总计'+obj.subCTime+'课时,总花费'+obj.subCMoney+'元');
			$('#isRecommend').val(obj.isRecommend);
			

		}
	});


	//修改学员信息

	$('#updateStudent').on('click',function(){
		var isBalancePay=$('#yue').attr('isBalancePay'),
			phone=$('#phone').val(),
			oldphone=$('#phone').attr('oldphone'),
			subAStatus=$('#throghtstatus1').attr('subAStatus'),
			subBStatus=$('#throghtstatus2').attr('subBStatus'),
			subCStatus=$('#throghtstatus3').attr('subCStatus'),
			subDStatus=$('#throghtstatus4').attr('subDStatus'),
			isRecommend=$('#isRecommend').val(),
			phonereq='';
		

		if(phone=='' || !Uiho.ver.moblie(phone)){
			$('.addtip').html('请填写正确的手机号码').addClass('error')
			return false;
		}

		if($("#yue").is(':checked')){
			isBalancePay=1;
		}else{
			isBalancePay=0;
		};
		if($("#throghtstatus1").is(':checked')){
			subAStatus=1;
		}else{
			subAStatus=0;
		};
		if($("#throghtstatus2").is(':checked')){
			subBStatus=1;
		}else{
			subBStatus=0;
		};
		if($("#throghtstatus3").is(':checked')){
			subCStatus=1;
		}else{
			subCStatus=0;
		};
		if($("#throghtstatus4").is(':checked')){
			subDStatus=1;
		}else{
			subDStatus=0;
		};

		if(phone==oldphone){
			phonereq='';
		}else{
			phonereq=',"phone":'+phone+'';
		};

		var datas='data={"action":"updateOneUser","params":{"id":'+Sid+''+phonereq+',"isBalancePay":'+isBalancePay+',"subAStatus":'+subAStatus+',"subBStatus":'+subBStatus+',"subCStatus":'+subCStatus+',"subDStatus":'+subDStatus+', "isRecommend": '+isRecommend+' },"source":"android","target":"user"}';

		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				responseInfo(str);
				operalog("修改了学员"+$('#username').val()+".");
				setTimeout(function(){
					window.location.href="student.html";
				},800)
			}
		})
	})

});