
//获取接口列表
$(function(){
	var type='',isProcess='',pageSize=20,nowPage=1;

	getCorrectionList(type,isProcess,nowPage,pageSize)

	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		tel=$('#tel').val();
		shopname=$('#name').val();
		//选择查询
		getCorrectionList(type,isProcess,nowPage,pageSize)
	});

	// document.onkeydown=function(ev){
	// 	code=$('#code').val();
	// 	name=$('#name').val();
	// 	apiStatusId=$('#apiStatusId').val();
	//    if(ev.keyCode==13){
	//    	 //	alert(code+'-'+name);
	//   	 getApiList(code,name,apiStatusId,apiGroupId,nowPage,pageSize);
	//    };
	// };
	// countApi(apiGroupId);

	
	// //新增接口地址
	// $('#addApi').attr('href','InterfaceAdd.html?apiGroupId='+apiGroupId+'&projectId='+projectId+'&subprojectId='+subprojectId+'&apigroupName='+decodeURIComponent(apigroupName));

	// getProName(projectId);
	// subprojectName(subprojectId);
});


function getCorrectionList(type,isProcess,nowPage,pageSize){

	//{"action":"getCorrectionList","params":{"nowPage":1,"pageSize":2,"type":3},"source":"backstage","target":"correction"}
	var datas='data={"action":"getCorrectionList","params":{"type":"'+type+'","isProcess":"'+isProcess+'","nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"backstage","target":"correction"}';
	$.ajax({
		type:"POST",
		url:requrl,
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			
			if(oData.responseCode==1){
				var oListObj=oData.object;
				console.log(oListObj);
				var proHtml='';
				for(var i=0; i<oListObj.length; i++){
					var isProcessHtml='';
					if(oListObj[i].isProcess==0){
						isProcessHtml='<a href="javascript:;" class="btn btn-primary btn-sm ErrorInfo" Errorid="'+oListObj[i].correctionId+'"><i class="fa-gavel fa"></i>&nbsp;&nbsp;处理</a>';
					}else{
						isProcessHtml="已处理";
					};
					var title='';
					switch(oListObj[i].type){
						case 1:
							title="地点不存在"
						break;
						case 2:
							title="位置错误"
						break;
						case 3:
							title="联系方式错误"
						break;
						case 4:
							title="其他错误"
						break;
							
					}
					proHtml+='<tr><td>'+(i+1)+'</td><td>'+title+'</td><td>'+oListObj[i].correctionUserName+'</td><td>'+oListObj[i].userNickname+'</td><td>'+oListObj[i].phone+'</td>\
							<td>'+Uiho.tool.DetailTimesTamp(oListObj[i].updateDatetime)+'</td>\
	                        <td>'+isProcessHtml+'</td>\
	                       <td><div class="btn-group"><a href="recoveryerrorListInfo.html?id='+oListObj[i].correctionId+'&type='+oListObj[i].type+'" class="btn btn-primary btn-sm">查看&nbsp;&nbsp;<i class="fa  fa-chevron-circle-right"></i></a></div></td></tr>';
				};
				$('#tbody').html(proHtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getCorrectionList(type,isProcess,nowPage,pageSize);
				});
				dErrorInfo(function(){
					getCorrectionList(type,isProcess,nowPage,pageSize);
				})
			}else{
				$('#tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){

		}
	});
};


function dErrorInfo(fn){
	$('.ErrorInfo').on('click',function(){
		var proid=$(this).attr('Errorid');
		var datas='data={"action":"processCorrention","params":'+proid+',"source":"backstage","target":"correction"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				console.log(oData)
				if(oData.responseCode==1){
					fn&&fn();
				}else{
					alert(oData.responseMsg)
				}
			}
		});
	});
}




