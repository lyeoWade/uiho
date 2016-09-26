$(function(){
	var type='',nowPage=1,pageSize=10;

	//获取默认的列表
	getFeedbackList(nowPage,pageSize,type);
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getFeedbackList(nowPage,pageSize,type)
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		type=$('#feedbacktype').val();
		//选择查询
		getFeedbackList(nowPage,pageSize,type)
	});
});



//获取教练列表
function getFeedbackList(nowPage,pageSize,type){

	var datas='data={"action":"getFeedbackList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+',"type":"'+type+'"},"source": "web","target": "feedback"}';
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
					//启用状态
					var isEnableHtml='';
					if(sData.processStatus==0){
						//0禁用
						isEnableHtml='<td><button type="button" feedbackid="'+sData.id+'" isEnable="'+sData.processStatus+'" class="btn btn-info handleBtn"><i class="fa fa-gear"></i>&nbsp;处理</button></td>';
					}else{
						//1启动
						isEnableHtml='<td><button type="button" userid="'+sData.id+'" isEnable="'+sData.processStatus+'" class="btn btn-success btn-xs">已处理</button></td>';
					};
					//type
					var types='';
					if(sData.type==1){
						types='举报';
					}else if(sData.type==2){
						types='反馈'
					}
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+types+'</td><td>'+sData.content+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td>'+isEnableHtml+'\
					<td><a href="feedbackEdit.html?id='+sData.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a></td></tr>';
				}
				$('#tbody').html(tableHtml);
				
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getFeedbackList(nowPage,pageSize,type);
				});
			}else{
				$('#tbody').html('<tr><td colspan="6" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			handle();
		}
	})
};
//禁用教练
//{"action":"disableOneCoach","params":1,"source":"web","target":"coach"}

function handle(){
	$('.handleBtn').on('click',function(){
		
		var _this=$(this);
		var feedbackid=$(this).attr('feedbackid');//userid="5" 用户id
		disable(feedbackid,_this);
	});
}

function disable(id,_this){
	//alert(id)
	var datas='data={"action":"processOneFeedback","params":'+id+',"source":"web","target":"feedback"}';
	//
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str);
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				_this.parents('td').html('<button type="button" class="btn btn-success btn-xs">已处理</button>');
				ChildMsg();
				alert(oData.responseMsg);
			}else{
				alert(oData.responseMsg);
			}
		}
	})
}





