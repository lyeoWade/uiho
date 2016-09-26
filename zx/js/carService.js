$(function(){
	var nowPage=1,pageSize=10,title='',processStatus='';

	//获取默认的列表
	getCarList(nowPage,pageSize,processStatus,title)
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getCarList(nowPage,pageSize,processStatus,title)
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		processStatus=$('#processStatus').val();
		title=$('#title').val();
		//realname=$('#ralename').val();
		//card=$('#idcard').val();
		//选择查询
		getCarList(nowPage,pageSize,processStatus,title)
	});
});

function getCarList(nowPage,pageSize,processStatus,title){
	var datas='data={"action":"getCarList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+',"processStatus":"'+processStatus+'","title":"'+title+'"}, "source":"web","target":"car"}';
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
					var sprocessStatus='',userNames='',userPhones='';

					if(sData.userName==undefined){
						userNames='未填写';
					}else{
						userNames=sData.userName;
					}
					if(sData.userPhone==undefined){
						userPhones='未填写';
					}else{
						userPhones=sData.userPhone;
					}
					if(sData.processStatus==0){//未处理
						sprocessStatus='<button type="button" carId="'+sData.id+'" class="handleBtn btn btn-info"><i class="fa fa-gear"></i>&nbsp;处理</button>';
					}else{
						sprocessStatus='<button type="button" class="btn btn-success btn-xs">已处理</button>';
					};
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.title+'</td><td>'+userNames+'</td><td>'+userPhones+'</td>\
					<td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td>\
					   <td>'+sprocessStatus+'</td><td><div class="btn-group"><a href="carServiceEdit.html?id='+sData.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a></div></td></tr>';
				}
				$('#tbody').html(tableHtml);
				
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getCarList(nowPage,pageSize,processStatus,title)
				});
			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			handleBtn();
		}
	})
};

function handleBtn(){
	$('.handleBtn').on('click',function(){
		var carId=$(this).attr('carId');
		var _this=$(this);
		var datas='data={"action":"processOneCar","params":'+carId+',"source":"web","target":"car"}';

		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				operalog("处理了一条爱车服务请求！");
				_this.parents('td').html('<button type="button" class="btn btn-success btn-xs">已处理</button>');
				ChildMsg();
				responseInfo(str);
			}
		})
	})
}