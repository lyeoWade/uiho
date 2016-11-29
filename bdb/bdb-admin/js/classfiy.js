$(function(){
	var nowPage=1,pageSize=30,title='';

	//获取默认的列表getUserList(nowPage,pageSize,tel);

	getSortList(nowPage,pageSize,title)
	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		title=$('#title').val();
		//选择查询
		getSortList(nowPage,pageSize,title)
	});
	document.onkeydown=function(ev){
		title=$('#title').val();

		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		//	alert(code+'-'+name);
	   		getSortList(nowPage,pageSize,title)
	    };
	};
});

function getSortList(nowPage,pageSize,title){

	var datas='data={"action":"getSortList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+',"title":"'+title+'"},"source":"backstage","target":"sort"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				var tableHtml='',zidHtml='';
				for(var i=0; i<oData.object.length; i++){
					var sData=oData.object[i];
					var imgUrls='';
			      	if(sData.imgUrl==undefined){
			      		imgUrls='暂无图片';
			      	}else{
			      		imgUrls=sData.imgUrl;
			      	}
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.sortNo+'</td><td>'+sData.title+'</td>\
						<td>'+imgUrls+'</td>\
						<td>'+Uiho.tool.DetailTimesTamp(sData.updateDatetime)+'</td>\
						<td><div class="btn-group"><a class="btn btn-primary btn-sm" href="classfiyInfo.html?id='+sData.sortId+'">编辑&nbsp;<i class="fa  fa-chevron-circle-right"></i></a>\
						<a href="javascript:;" class="btn btn-warning btn-sm DeleteSortList" sortId="'+sData.sortId+'"><i class="fa fa-times"></i>&nbsp;&nbsp;删除</a></div></td></tr>';
						zidHtml+='<option value="'+sData.sortId+'">'+sData.title+'</option>';
				}
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');

				$('#zid').html(zidHtml);
				
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getSortList(nowPage,pageSize,title)
				});
				DeleteSortList(function(){
					getSortList(nowPage,pageSize,title);
				});
			}else{
				$('tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			
		}
	})
};



// 删除

function DeleteSortList(fn){
	$('.DeleteSortList').on('click',function(){
		var sortId=$(this).attr('sortId');

		var datas='data={"action":"deleteSort","params":'+sortId+',"source":"backstage","target":"sort"}';
		var r=confirm("确定删除本条数据吗?");
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















