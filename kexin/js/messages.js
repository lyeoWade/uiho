$(function(){
	var type='',nowPage=1,pageSize=10;

	//获取默认的列表
	getMsgList(nowPage,pageSize,type);
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getMsgList(nowPage,pageSize,type)
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		type=$('#feedbacktype').val();
		//选择查询
		getMsgList(nowPage,pageSize,type)
	});
});

//获取教练列表
function getMsgList(nowPage,pageSize,type){
	var datas='data={"action":"getMsgList","params":{"nowPage":'+nowPage+', "pageSize":'+pageSize+',"type":"'+type+'"},"source":"web","target":"msg"}';
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
					//type
					var types='';
					if(sData.type==1){
						types='学员端消息';
					}else{
						types='教练端消息'
					}
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+types+'</td><td>'+sData.content+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td></tr>';
				}
				$('#tbody').html(tableHtml);
				
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getMsgList(nowPage,pageSize,type);
				});
			}else{
				$('#tbody').html('<tr><td colspan="6">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
		
		}
	})
};




