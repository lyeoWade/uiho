$(function(){
	//初始化得到保证金比例

	initbondset($('#deposit'),3);
	updateOnePaymentRatio($('#depositBtn'),$('#deposit'),3,'修改了预付保证金！',0);


	initbondset($('#bondset'),1);
	initbondset($('#commission'),2);
	updateOnePaymentRatio($('#bondsetbtn'),$('#bondset'),1,'修改了保证金！',1);
	updateOnePaymentRatio($('#commissionbtn'),$('#commission'),2,'修改了佣金！',1)
	
});

function updateOnePaymentRatio(oBtn,obj,id,info,test){
	oBtn.on('click',function(){
		if(test==1){
			if(!Uiho.ver.numint(obj.val())){
				$('.addtip').html('比例请设置在0-99之内');
				$('.addtip').addClass('error')
				return false;
			};
		}else{
			if(!Uiho.ver.num1000(obj.val())){
				$('.addtip').html('请输入0-1000之内的正整数！');
				$('.addtip').addClass('error')
				return false;
			}
		}
		
		//保证金比例设置
		var datas='data={ "action": "updateOnePaymentRatio","params":{"id":'+id+',"ratio":"'+obj.val()+'"}, "source": "web", "target": "paymentRatio" }';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				console.log(str);
				operalog(info)
				responseInfo(str);
			}
		});
	})
}

function initbondset(obj,id){
	var datas='data={ "action": "getOnePaymentRatio","params":'+id+', "source": "web", "target": "paymentRatio" }';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				obj.val(oData.object.ratio)
			}else{
				alert('数据获取失败');
			}
		}
	});
}


