
//获取接口列表
$(function(){
	var shopname='',tel='',pageSize=20,nowPage=1,sortid='';
	getSortList();
	getUserList(shopname,tel,sortid,nowPage,pageSize)

	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		tel=$('#tel').val();
		shopname=$('#name').val();
		sortid=$('#getSortList').val();
		//alert(sortid)
		//选择查询
		getUserList(shopname,tel,sortid,nowPage,pageSize)
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

//获取分类列表

 function getSortList(){
	 	var datas='data={"action":"getSortList","params":{"nowPage":1,"pageSize":30},"source":"backstage","target":"sort"}';
		$.ajax({
		    url:requrl,
		    type:"POST",
		    data:datas,
		    success:function(str){
		        var oData=$.parseJSON(str);
		        console.log(oData);
		        if(oData.responseCode==1){
		            var zidHtml='';
		            for(var i=0; i<oData.object.length; i++){
		                var sData=oData.object[i];
		                zidHtml+='<option value="'+sData.sortId+'">'+sData.title+'</option>';
		            }
		            $('#getSortList').html('<option value="">全部</option>'+zidHtml);
		        }else{
		            $('#getSortList').html('<option value="no">'+sData.responseMsg+'</option>');
		        }
		    },
		    complete:function(){
		        
		    }
		});
 }

function getUserList(shopname,tel,sortid,nowPage,pageSize){

	var datas='data={"action":"getUserList","params":{"settledStatus":"2","name":"'+shopname+'","tel":"'+tel+'","sortId":"'+sortid+'","nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"backstage","target":"user"}';
	//alert(datas)
	$.ajax({
		type:"POST",
		url:requrl,
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var oListObj=oData.object;
				console.log(oData);
				var proHtml='';
				for(var i=0; i<oListObj.length; i++){
					var deleteHtml='',names='';
					if(oListObj[i].nickname==undefined){
						names='';
					}else{
						names=oListObj[i].nickname;
					}
					proHtml+='<tr><td>'+(i+1)+'</td><td>'+oListObj[i].name+'</td><td>'+names+'</td><td>'+oListObj[i].tel+'</td>\
							<td>'+Uiho.tool.DetailTimesTamp(oListObj[i].createDatetime)+'</td>\
	                        <td>'+oListObj[i].residentDay+'</td>\
	                        <td><a href="resident.html?id='+oListObj[i].userId+'" class="btn btn-primary btn-sm">查看&nbsp;&nbsp;<i class="fa  fa-chevron-circle-right"></i></a></td>\
	                       <td><div class="btn-group"><a href="shoplistEdit.html?id='+oListObj[i].userId+'" class="btn btn-primary btn-sm">编辑&nbsp;&nbsp;<i class="fa  fa-chevron-circle-right"></i></a><a href="javascript:;" class="btn btn-warning btn-sm deleteChildPro" proid="'+oListObj[i].userId+'"><i class="fa fa-times"></i>&nbsp;&nbsp;删除</a></div></td></tr>';
	                $('body').attr('projectId',oListObj[i].projectId);
	                $('body').attr('subprojectId',oListObj[i].subprojectId);
				};
				$('#tbody').html(proHtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserList(shopname,tel,sortid,nowPage,pageSize)
				});
				deleteApi(function(){
					getUserList(shopname,tel,sortid,nowPage,pageSize)
				})//删除接口
			}else{
				$('#pagination').attr('count',0);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserList(shopname,tel,sortid,nowPage,pageSize)
				});
				$('#tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){

		}
	});
};

//
function deleteApi(fn){
	$('.deleteChildPro').on('click',function(){
		var proid=$(this).attr('proid');
		var datas='data={"action":"deleteUser","params":'+proid+',"source":"backstage","target":"user"}';
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
