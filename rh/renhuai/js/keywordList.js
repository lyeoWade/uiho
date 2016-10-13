$(function(){
	var nowPage=1,pageSize=20,name='';

	//获取默认的列表
	getKeywordList(nowPage,pageSize,name)

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		name=$('#name').val();
		//选择查询
		getKeywordList(nowPage,pageSize,name)
	});

	document.onkeydown=function(ev){
		name=$('#name').val();

		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		//	alert(code+'-'+name);
	   		getKeywordList(nowPage,pageSize,name)
	    };
	};

});

function getKeywordList(nowPage,pageSize,name){

	var datas='data={"action":"getKeywordList","params":{"name":"'+name+'","nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"backstage","target":"keyword"}';
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
			      
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.name+'</td><td>'+sData.orderBy+'</td>\
						<td>'+Uiho.tool.DetailTimesTamp(sData.updateDatetime)+'</td>\
						<td><div class="btn-group"><a href="keywordInfo.html?id='+sData.keywordId+'" class="btn btn-primary btn-sm">编辑&nbsp;&nbsp;<i class="fa  fa-chevron-circle-right"></i></a><a href="javascript:;" class="btn btn-warning btn-sm deleteKeyword" keywordId="'+sData.keywordId+'"><i class="fa fa-times"></i>&nbsp;&nbsp;删除</a></div></td></tr>';
				}
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getKeywordList(nowPage,pageSize,name)
				});
				deleteKeyword(function(){
					getKeywordList(nowPage,pageSize,name)
				});
			}else{
				$('tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			
		}
	})
};


function deleteKeyword(fn){
	$('.deleteKeyword').on('click',function(){
		var keywordId=$(this).attr('keywordId');
		var datas='data={"action":"deleteKeyword","params":'+keywordId+',"source":"backstage","target":"keyword"}';
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
	});
}



















