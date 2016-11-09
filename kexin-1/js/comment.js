$(function(){
	var coachId='',nowPage=1,pageSize=10;
	coachId=Uiho.tool.geturldata(window.location.href).id;
	//获取默认的列表
	getCommentList(coachId,nowPage,pageSize);
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getCommentList(coachId,nowPage,pageSize);
	});

	//选择查询
	// $('#SelectQueryBtn').on('click',function(){
	// 	//alert(nowPage)
	// 	coachId=$('#coachId').val();
	// 	//选择查询
	// 	getCommentList(coachId,nowPage,pageSize);
	// });
});

//获取教练列表
function getCommentList(coachId,nowPage,pageSize){

	var datas='data={"action":"getCommentList","params":{"coachId":"'+coachId+'","nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"web", "target":"comment"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData)
			if(oData.responseCode==1){
				var tableHtml='';
				for(var i=0; i<oData.object.length; i++){
					var sData=oData.object[i];
				
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.userId+'</td><td>'+sData.userPhone+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td><td>'+sData.content+'</td><td>'+sData.rating+'</td></tr>';
                                // <a href="javascript:;" title="删除教练" class="btn btn-warning btn-sm"><i class="fa fa-times"></i>删除教练</a>
				}
				$('#tbody').html(tableHtml);
				
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getCommentList(coachId,nowPage,pageSize);
				});
			}else{
				$('#tbody').html('<tr><td colspan="8" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			//handleCoach();
		}
	})
};
//禁用教练
//{"action":"disableOneCoach","params":1,"source":"web","target":"coach"}
