$(function(){

	//获取教练信息
	var Sid=Uiho.tool.geturldata(window.location.href).id;

	var datas='data={"action":"getOneReserveCourse","params": '+Sid+',"source":"web","target":"reserveCourse"}';
	//alert(datas)
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData)
			var obj=oData.object;
			$('#username').val(obj.coachName);
			$('#phone').val(obj.coachPhone);
			$('#address').val(obj.siteName);
			$('#project').val(obj.subject);
			$('#allmoney').val(obj.price);
			//alert(obj.beginTime)
			var bTime='',Etime='';
			if(obj.beginTime==undefined){
				bTime='未开始';
			}else{
				bTime=Uiho.tool.DetailTimesTamp(obj.beginTime);
			}
			if(obj.endTime==undefined){
				Etime='未开始';
			}else{
				Etime=Uiho.tool.DetailTimesTamp(obj.endTime);
			}

			if(obj.reserveStatus==2 || obj.reserveStatus==3){
				$('#cancelcourse').remove();
			}

			var payChannel='';

			switch(obj.payChannel){
				case 1:
					payChannel="微信支付";
				break;
				case 2:
					payChannel="支付宝支付";
				break;
				case 3:
					payChannel="保证金";
				break;
			}


			$('#startTime').val(bTime);
			$('#endTime').val(Etime);
			$('#appoTime').val(Uiho.tool.DetailTimesTamp(obj.createTime));
			$('#courseTime').val(Uiho.tool.DetailTimesTamp(obj.courseDate));
			$('#payTime').val(obj.payTime);
			$('#payway').val(payChannel);
			$('#paymentDeduction').val(obj.payDeductions);
			$('#actpay').val(obj.payment);

			if(obj.isPay==1){
				$('#paystatus').attr('checked','true').parents('div').addClass('checked');
			}
			if(obj.isComment==1){
				$('#isComment').attr('checked','true').parents('div').addClass('checked');
			}

			// $('#avatar img').attr('src',obj.avatar);

			//取消练车记录

			$('#cancelcourse').on('click',function(){
				var datas='data={"action":"cancelOneReserveCourse","params":'+Sid+',"source":"web","target":"reserveCourse"}';
				deleteOneData(datas,1,"取消了一条练车记录！");
			});
		},
		complete:function(){
			//cancelcourse();
		}
	})

});


//取消课程预约

function cancelcourse(){

	$('#cancelcourse').on('click',function(){
		var Sid=Uiho.tool.geturldata(window.location.href).id;

		var datas='data={"action":"cancelOneReserveCourse","params":'+Sid+',"source":"web","target":"reserveCourse"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				console.log(str)
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					$('.addtip').html(oData.responseMsg);
					$('.addtip').addClass('success');
					operalog('取消了一条练车记录！');
				}else{
					$('.addtip').html(oData.responseMsg);
					$('.addtip').addClass('error');
				}
				
			}
		});
	})
}









