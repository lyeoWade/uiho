$(function(){
	var nowPage=1,pageSize=20,name='';

	//获取默认的列表
	getUserList(nowPage,pageSize,name)
	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		
		name=$('#shopname').val();
		
		//选择查询
		getUserList(nowPage,pageSize,name)
	});
	document.onkeydown=function(ev){
		
		name=$('#shopname').val();
		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		getUserList(nowPage,pageSize,name);
	    };
	};

});
//获取用户列表
function getUserList(nowPage,pageSize,name){

	var datas='data={"action":"getUserList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+',"name":"'+name+'","settledStatus":"1"},"source":"backstage","target":"user"}';
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
					var settledStatus='';
					if(sData.settledStatus==1){
						settledStatus='<a href="javascript:;" class="btn btn-default btn-sm">待审核</a>';
					}
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.name+'</td>\
						<td>'+sData.nickname+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createDatetime)+'</td>\
						<td>'+settledStatus+'</td>\
                        <td><div class="btn-group"><a href="shoplistapplyEdit.html?id='+sData.userId+'" class="btn btn-primary btn-sm"><i class="fa-gear fa"></i>&nbsp;查看</a>\
                        <a href="javascript:;" userid="'+sData.userId+'" class="btn btn-warning btn-sm deleteuser"><i class="fa-times fa"></i>&nbsp;删除</a></div></td>\
                       </tr>';
				}
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserList(nowPage,pageSize,name)
				});

				DeleteUser(function(){
					getUserList(nowPage,pageSize,name)
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
		var datas='data={"action":"deleteUser","params":'+userid+',"source":"backstage","target":"user"}';
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





















