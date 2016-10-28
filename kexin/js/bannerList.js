$(function(){
	var nowPage=1,pageSize=10,title='';

	//获取默认的列表
	getBannerList(nowPage,pageSize,title)
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getBannerList(nowPage,pageSize,title)
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		isEnable=$('#disabledState').val();
		phone=$('#mobile').val();
		realname=$('#ralename').val();
		card=$('#idcard').val();
		//选择查询
		getBannerList(nowPage,pageSize,title)
	});
});

//获取教练列表
function getBannerList(nowPage,pageSize,title){

	var datas='data={"action":"getBannerList","params":{"nowPage":'+nowPage+',"pageSize": '+pageSize+',"title":"'+title+'" },"source":"web","target":"banner"}';
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
					var linkUrl='';
					if(sData.linkUrl==undefined){
						linkUrl='未填写';
					}else{
						linkUrl=sData.linkUrl;
					}
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.title+'</td><td>'+linkUrl+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td><td><div class="btn-group"><a href="banner.html?id='+sData.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>\
						<button spaceid="'+sData.id+'" class="btn btn-warning btn-sm deleteList"><i class="fa fa-times"></i></button></div></td></tr>';
				};
				$('#tbody').html(tableHtml);
				
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getBannerList(nowPage,pageSize,title)
				});


				//删除
				$('.deleteList').on('click',function(){
					var datas='data={"action":"deleteOneBanner","params":'+$(this).attr('spaceid')+',"source":"web","target": "banner" }';
					deleteOneData(datas,0,"删除条banner！",function(){
						getBannerList(nowPage,pageSize,title);
					});

				});

			}else{
				$('#tbody').html('<tr><td colspan="6" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			
		}
	})
};