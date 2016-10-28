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
	var datas='data={"action":"getUserList","params":{"exfE":"","isEnable":"'+isEnable+'","nowPage":"'+nowPage+'","pageSize":"'+pageSize+'","role":1,"phone":"'+phone+'"},"source":"web","target":"user"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			//alert(str)
			//console.log(str);
			var oData=$.parseJSON(str);
			
			console.log(oData);
			if(oData.responseCode==1){
				var tBodyhtml='';
				for(var i=0; i<oData.object.length; i++){
					var obj=oData.object[i];
					var isContact='',contactBtn='',haveSparringHtml='';
					if(obj.isContact==1){
						isContact='<button type="button" class="btn btn-success btn-xs">已联系</button>';
						contactBtn='<button type="button" class="btn btn-default btn-sm">已联系</button>';
					}else{
						isContact='<button type="button" class="btn btn-default btn-xs">未联系</button>'
						contactBtn='<button type="button" userId="'+obj.id+'" class="btn btn-info btn-sm isContact">立即联系</button>'
					}

					if(obj.haveSparring==1){
						haveSparringHtml='<a href="sparring.html?id='+obj.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>&nbsp;查看</a>';
					}else{
						haveSparringHtml='暂无陪练'
					}

					tBodyhtml+='<tr><td>'+obj.number+'</td><td>'+obj.phone+'</td>\
								<td>'+Uiho.tool.DetailTimesTamp(obj.updateTime)+'</td>\
                                <td>'+isContact+'</td>\
                                <td>'+haveSparringHtml+'</td>\
                                <td><div class="btn-group">'+contactBtn+'<button userId="'+obj.id+'" class="btn btn-warning btn-sm deleteOneUser"><i class="fa fa-times"></i>&nbsp;&nbsp;删除</button></div></td></tr>';
				}
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

				deleteOneUser(function(){
					getUserList(isEnable,nowPage,pageSize,phone,isContact);
				});
			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			 //SignUp();
			 
		}
	})
}

function contact(fn){
	$('.isContact').on('click',function(){
		var userId=$(this).attr('userId');
		var _this=$(this);
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
					//处理信息之后更新提示
					ChildMsg();
				}else{
					alert(oData.responseMsg)
				}
			}
		})
	})
	
}


function deleteOneUser(fn){
	
	$('.deleteOneUser').on('click',function(){
		var nUserId=$(this).attr('userId');
		var datas='data={"action":"deleteOneUser","params":'+nUserId+',"source":"web","target":"user"}';

		if(confirm("你确定要删除本条数据？")){
			$.ajax({
				url:requrl,
				type:"POST",
				data:datas,
				success:function(str){
					var oData=$.parseJSON(str);
					if(oData.responseCode==1){
						alert(oData.responseMsg)
						operalog("删除了一个用户！");
						fn&&fn();
						//处理信息之后更新提示
					}else{
						alert(oData.responseMsg)
					}
				}
			})
		}

		
	})
}
