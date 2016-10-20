$(function(){

	$("#msgbtn").on('click',function(){
		var content=$('#msgcontent').val();
		var type=$('#msgtype').val();
		if(content==''){
			$('.addtip').html('信息不能为空！').addClass('red')
			return false;
		}

		var datas='data={"action":"addOneMsg","params":{"content":"'+content+'","type":'+type+'},"source":"web","target":"msg"}';
		//alert(datas);
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				//console.log(str);
				var oData=$.parseJSON(str);
				//console.log(str);
				if(oData.responseCode==1){
					$('.addtip').html(oData.responseMsg);
					$('.addtip').addClass('success');
					if(type==1){
						operalog("发布了一条学员系统端消息！")
					}else{
						operalog("发布了一条教练系统端信息！")
					}
				}else{
					$('.addtip').html(oData.responseMsg);
					$('.addtip').addClass('error');
				}
			}
		});
	});

});