$(function(){
	var email='',nowPage=1,pageSize=20,phone='',realname='',managerNo='';

	//获取默认的列表
	getUserList(email,nowPage,pageSize,phone,realname,managerNo);

	//选择每页多少条
	// Uiho.effect.selectNum(function(pageSize){
	// 	getUserList(code,nowPage,pageSize,tel,name,roleId)
	// });

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		email=$('#email').val();
		phone=$('#phone').val();
		realname=$('#name').val();
		managerNo=$('#managerNo').val();
		//选择查询
		getUserList(email,nowPage,pageSize,phone,realname,managerNo);
	});
	document.onkeydown=function(ev){
		email=$('#email').val();
		phone=$('#phone').val();
		realname=$('#name').val();
		managerNo=$('#managerNo').val();

		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		getUserList(email,nowPage,pageSize,phone,realname,managerNo);
	    };
	};

});
//获取用户列表
function getUserList(email,nowPage,pageSize,phone,realname,managerNo){

	var datas='data={"action":"getManagerList","params":{"email":"'+email+'","nowPage":'+nowPage+',"pageSize":'+pageSize+',"phone":"'+phone+'","realname":"'+realname+'","managerNo":"'+managerNo+'"},"source":"backstage","target":"manager"}';

	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				var tableHtml='';
				for(var i=0; i<oData.object.length; i++){
					var sData=oData.object[i];
					var role='';

					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.realname+'</td>\
						<td>'+sData.phone+'</td><td>'+sData.email+'</td>\
                        <td><div class="btn-group"><a href="managerEdit.html?id='+sData.managerId+'" class="btn btn-primary btn-sm"><i class="fa-gear fa"></i>&nbsp;查看</a>\
                        <a href="javascript:;" userid="'+sData.managerId+'" class="btn btn-warning btn-sm deleteuser"><i class="fa-times fa"></i>&nbsp;删除</a></div></td>\
                       </tr>';
				}
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserList(email,nowPage,pageSize,phone,realname,managerNo)
				});

				DeleteUser(function(){
					getUserList(email,nowPage,pageSize,phone,realname,managerNo)
				});
			}else{
				$('tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			
		}
	})
};


//删除

function DeleteUser(fn){
	
	$('.deleteuser').on('click',function(){
		var userid=$(this).attr('userid');
		var datas='data={"action":"deleteManager","params": '+userid+',"source": "backstage","target":"manager"}';
		var r=confirm("确定删除本条数据吗?")
		if(r==true){
			$.ajax({
				url:requrl,
				type:"POST",
				data:datas,
				success:function(str){
					var oData=$.parseJSON(str);
					console.log(oData)
					if(oData.responseCode==1){
						alert(oData.responseMsg)
						fn&&fn();
					}else{
						alert(oData.responseMsg)
					}
				}
			});
		}
		
	})
}





















