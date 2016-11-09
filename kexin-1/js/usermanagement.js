$(function(){
	var isEnable='',nowPage='1',pageSize='20',phone='',isContact='';
	getUserList(isEnable,nowPage,pageSize,phone,isContact);

	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getUserList(isEnable,nowPage,pageSize,phone,isContact);
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		//isEnable=$('#disabledState').val();
		phone=$('#phone').val();
		// realname=$('#ralename').val();
		// card=$('#idcard').val();
		//选择查询
		getUserList(isEnable,nowPage,pageSize,phone,isContact);
	});
});



function getUserList(isEnable,nowPage,pageSize,phone,isContact){

	var datas='data={"action":"getUserList","params":{"isContact":"'+isContact+'","isEnable":"'+isEnable+'","nowPage":"'+nowPage+'","exfE":"1","pageSize":"'+pageSize+'","role":1,"phone":"'+phone+'"},"source":"web","target":"user"}';
	//alert(datas);
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			//alert(str)
			var oData=$.parseJSON(str);
			console.log(oData)
			if(oData.responseCode==1){

				var tBodyhtml='';
				for(var i=0; i<oData.object.length; i++){
					var obj=oData.object[i];
					var isContact='',payChannelHtml='';
					if(obj.isContact==1){
						isContact='<button type="button" class="btn btn-success btn-xs">已联系</button>'
					}else{
						isContact='<button type="button" class="btn btn-default btn-xs">未联系</button>'
					}

					if(obj.payChannel==1){
						payChannelHtml='微信支付'
					}else if(obj.payChannel==2){
						payChannelHtml='支付宝支付'
					}
					tBodyhtml+='<tr><td>'+obj.number+'</td><td>'+obj.realname+'</td><td>'+obj.phone+'</td>\
								<td>'+Uiho.tool.DetailTimesTamp(obj.updateTime)+'</td>\
								<td>'+payChannelHtml+'</td>\
								<td>'+obj.bail+'</td>\
                                <td><a href="usermanagementEdit.html?id='+obj.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a></td></td></tr>';
				};
				$('#tbody').html(tBodyhtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserList(isEnable,nowPage,pageSize,phone,isContact);
				});

				contact(function(){
					getUserList('',1,20,'','');
				});
			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			// SignUp();
			 
		}
	})
}

function contact(fn){
	$('.isContact').on('click',function(){
		var userId=$(this).attr('userId');

		var datas='data={"action":"contactOneUser","params":'+userId+',"source":"web", "target":"user" }';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					alert(oData.responseMsg)
					operalog("联系了一个学员！");
					fn&&fn();
				}else{
					alert(oData.responseMsg)
				}
			}
		})
	})
	
}


