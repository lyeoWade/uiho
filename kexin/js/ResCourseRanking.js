$(function(){
	var type='',nowPage=1,pageSize=20;

	//获取默认的列表
	getFeedbackList();
	//选择每页多少条
	// Uiho.effect.selectNum(function(pageSize){
	// 	getFeedbackList(nowPage,pageSize,type)
	// });

	// //选择查询
	// $('#SelectQueryBtn').on('click',function(){
	// 	//alert(nowPage)
	// 	type=$('#feedbacktype').val();
	// 	//选择查询
	// 	getFeedbackList(nowPage,pageSize,type)
	// });
});

//获取教练列表
function getFeedbackList(){

	var datas='data={"action":"getResCourseRanking","params": {}, "source":"web","target":"course"}';
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
					
					tableHtml+='<tr><td>'+(i+1)+'</td><td><img src="'+sData.coachAvatar+'" style="width:80px;"></td><td>'+sData.coachName+'</td><td>'+sData.countReserve+'</td></tr>';
				}
				$('#tbody').html(tableHtml);
				
				// $('#pagination').attr('count',oData.count);
				// //页码选择 分页
				// var allNum=$('#pagination').attr('count');
				// Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
				// 	getFeedbackList(nowPage,pageSize,type);
				// });
			}else{
				$('#tbody').html('<tr><td colspan="6" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			//handle();
		}
	})
};
//禁用教练



