$(function(){
	var nowPage=1,pageSize=20,type='';

	//获取默认的列表
	getBannerList(nowPage,pageSize,type);
	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		type=$('#bannertype').val();
		//选择查询
		getBannerList(nowPage,pageSize,type);
	});

	document.onkeydown=function(ev){
		type=$('#bannertype').val();

		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		//	alert(code+'-'+name);
	   		getBannerList(nowPage,pageSize,type)
	    };
	};
});
//获取用户列表
function getBannerList(nowPage,pageSize,type){

	var datas='data={"action":"getBannerList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+',"type":"'+type+'"},"source":"backstage","target":"banner"}';
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
			      
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.title+'</td><td><img src="'+sData.coverImg+'" /></td>\
						<td>'+sData.linkUrl+'</td>\
						<td>'+Uiho.tool.DetailTimesTamp(sData.updateDatetime)+'</td>\
						<td><div class="btn-group"><a class="btn btn-primary btn-sm" href="banner.html?id='+sData.bannerId+'">编辑&nbsp;<i class="fa  fa-chevron-circle-right"></i></a>\
						<a href="javascript:;" class="btn btn-warning btn-sm deleteBanner" bannerId="'+sData.bannerId+'"><i class="fa fa-times"></i>&nbsp;&nbsp;删除</a></div></td></tr>';
				}
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getBannerList(nowPage,pageSize,type)
				});
				deleteBanner(function(){
					getBannerList(nowPage,pageSize,type)
				})
			}else{
				$('tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			
		}
	})
};



function deleteBanner(fn){
	$('.deleteBanner').on('click',function(){
		var bannerId=$(this).attr('bannerId');

		var datas='data={"action":"deleteBanner","params":'+bannerId+',"source":"backstage","target":"banner"}';

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



















