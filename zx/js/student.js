
$(function(){
	var isEnable='',nowPage='1',pageSize='20',phone='',realname='',card='';
	getUserList(isEnable,nowPage,pageSize,phone,realname,card);

	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getUserList(isEnable,nowPage,pageSize,phone,realname,card);
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		isEnable=$('#disabledState').val();
		phone=$('#phone').val();
		realname=$('#realname').val();
		//card=$('#idcard').val();
		//选择查询
		getUserList(isEnable,nowPage,pageSize,phone,realname,card);
	});
});
function getUserList(isEnable,nowPage,pageSize,phone,realname,card){
	var datas='data={"action":"getUserList","params":{"isEnable":"'+isEnable+'","nowPage":"'+nowPage+'","pageSize":"'+pageSize+'","role": 2,"phone":"'+phone+'","realname":"'+realname+'","card":"'+card+'"},"source":"web","target":"user"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				var tBodyhtml='';
				for(var i=0; i<oData.object.length; i++){
					var obj=oData.object[i];

					var StudentStatus='',licenseTypes='';
					if(obj.isEnable==1){
						StudentStatus='<button type="button" class="btn btn-success btn-xs">可用</button>'
					}else{
						StudentStatus='<button type="button" userid="'+obj.id+'" class="btn btn-default btn-xs Enable">无效,点击启用</button>'
					}

					if(obj.licenseType==1){
						licenseTypes='C1';
					}else if(obj.licenseType==2){
						licenseTypes='C2';
					}
					tBodyhtml+='<tr><td>'+obj.number+'</td><td>'+obj.realname+'</td><td>'+obj.phone+'</td>\
                    <td>'+licenseTypes+'</td><td>'+StudentStatus+'</td>\
                    <td><div class="btn-group"><button data-toggle="dropdown" class="btn btn-primary dropdown-toggle btn-sm " type="button">查看学员选项<span class="caret"></span></button><ul role="menu" class="dropdown-menu">\
                    <li><a href="studentEdit.html?id='+obj.id+'">学员详情</a></li>\
                    <li><a href="bookingTrain.html?id='+obj.id+'&name='+obj.realname+'">预约练车记录</a></li><li class="divider"></li>\
                    <li><a href="NetExamFee.html?id='+obj.id+'">扣除考试费</a></li>\
                    <li class="divider"></li>\
                    <li><a href="addbond.html?id='+obj.id+'">新增保证金\\考试费</a></li>\
                    <li><a href="bond.html?id='+obj.id+'">查看保证金详情</a></li>\
                    <li><a href="exambond.html?id='+obj.id+'">查看考试费用详情</a></li>\
                    </ul></div></td></tr>';
				}
				$('#tbody').html(tBodyhtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserList(isEnable,nowPage,pageSize,phone,realname,card);
				});

				Enable(function(){
					getUserList(isEnable,nowPage,pageSize,phone,realname,card);
				});
			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		}
	})
}


function Enable(fn){
	$('.Enable').on('click',function(){
		var userid=$(this).attr('userid');

		var datas='data={"action":"enableOneUser","params":'+userid+',"source":"web","target":"user"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					alert(oData.responseMsg)
					operalog("启用了一个学员！");
					fn&&fn();
				}else{
					alert(oData.responseMsg);
				}
			}
		})
	})
}

