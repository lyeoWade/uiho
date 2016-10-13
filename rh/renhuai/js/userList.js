$(function(){
	var nowPage=1,pageSize=20,name='';

	//获取默认的列表
	getUserList(nowPage,pageSize,name);

	//选择每页多少条
	// Uiho.effect.selectNum(function(pageSize){
	// 	getUserList(code,nowPage,pageSize,tel,name,roleId)
	// });

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		name=$('#name').val();
		//选择查询
		//alert(name)
		getUserList(nowPage,pageSize,name);
	});

	document.onkeydown=function(ev){
		name=$('#name').val();

		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		//	alert(code+'-'+name);
	   		getUserList(nowPage,pageSize,name);
	    };
	};

});
//获取用户列表
function getUserList(nowPage,pageSize,name){

	var datas='data={"action":"getUserList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+',"nickname":"'+name+'"},"source":"backstage","target":"user"}';
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
			      
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.nickname+'</td><td><img src="'+sData.avatar+'" /></td>\
						<td>'+Uiho.tool.DetailTimesTamp(sData.updateDatetime)+'</td></tr>';
				}
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserList(nowPage,pageSize,name);
				});

			}else{
				$('tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			
		}
	})
};




















