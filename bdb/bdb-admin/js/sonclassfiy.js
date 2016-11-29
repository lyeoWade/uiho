$(function(){
	var nowPage=1,pageSize=20,sortId='';
	getClassfiyList();
	//获取默认的列表getUserList(nowPage,pageSize,tel);

	getSubSortList(nowPage,pageSize,sortId)
	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		sortId=$('#zid').val();
		//选择查询
		getSubSortList(nowPage,pageSize,sortId)
	});
	document.onkeydown=function(ev){
		sortId=$('#zid').val();

		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		//	alert(code+'-'+name);
	   		getSubSortList(nowPage,pageSize,sortId)
	    };
	};


});
//获取用户列表
function getSubSortList(nowPage,pageSize,sortId){
	var datas='data={"action":"getSubSortList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+',"sortId":"'+sortId+'"},"source":"backstage","target":"subSort"}';
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
					var imgUrls='';
			      	if(sData.imgUrl==undefined){
			      		imgUrls='暂无图片';
			      	}else{
			      		imgUrls=sData.imgUrl;
			      	}
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.title+'</td>\
						<td>'+Uiho.tool.DetailTimesTamp(sData.updateDatetime)+'</td>\
						<td><div class="btn-group"><a class="btn btn-primary btn-sm" href="sonClassfiyInfo.html?id='+sData.subSortId+'">编辑&nbsp;<i class="fa  fa-chevron-circle-right"></i></a>\
						<a href="javascript:;" class="btn btn-warning btn-sm DeleteSortList" subSortId="'+sData.subSortId+'"><i class="fa fa-times"></i>&nbsp;&nbsp;删除</a></div></td></tr>';
				}
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');

				
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getSubSortList(nowPage,pageSize,sortId)
				});
				DeleteSortList(function(){
					getSubSortList(nowPage,pageSize,sortId)
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
		var subSortId=$(this).attr('subSortId');
		var datas='data={"action":"deleteSubSort","params":'+subSortId+',"source":"backstage","target":"subSort"}'
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















