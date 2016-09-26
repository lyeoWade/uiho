$(function(){
	var reserveStatus='',nowPage=1,pageSize=10,endTime='',beginTime='',userId='',realname='',card='',tel='';

	//获取默认的列表
	getReserveExamList(reserveStatus,nowPage,pageSize,endTime,beginTime,userId,realname,card,tel)
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getReserveExamList(reserveStatus,nowPage,pageSize,endTime,beginTime,userId,realname,card,tel)
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		reserveStatus=$('#disabledState').val();
		tel=$('#mobile').val();
		realname=$('#ralename').val();
		 card=$('#card').val();
		//选择查询
		getReserveExamList(reserveStatus,nowPage,pageSize,endTime,beginTime,userId,realname,card,tel)
	});
});

//获取教练列表
function getReserveExamList(reserveStatus,nowPage,pageSize,endTime,beginTime,userId,realname,card,tel){
	var datas='data={"action":"getReserveExamList","params":{"beginTime":"'+beginTime+'", "endTime":"'+endTime+'","nowPage":'+nowPage+',"pageSize":'+pageSize+',"reserveStatus":"'+reserveStatus+'","userId":"'+userId+'","realname":"'+realname+'","card":"'+card+'","tel":"'+tel+'"},"source": "web", "target": "ReserveExam" }';

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
					//状态
					var status='';
					var handleBtn='';
					if(sData.reserveStatus==1){
						status='<button type="button" class="btn btn-info btn-xs">已预约</button>';
						handleBtn='<a href="javascript:;" thisid="'+sData.id+'" class="btn btn-info btn-sm handlebtn">处理</a>';
					}else{
						status='<button type="button" class="btn btn-default btn-xs">已处理</button>';
						handleBtn='<a href="javascript:;" class="btn btn-default btn-sm">已处理</a>';
					};

					//驾照类型
					var licenseType='';
					if(sData.licenseType==1){
						licenseType='C1';
					}else{
						licenseType="C2";
					}
					//科目
					var subject='';
					if(sData.subject==1){
						subject='科目一';
					}else if(sData.subject==2){
						subject='科目二';
					}else if(sData.subject==3){
						subject='科目三';
					}else if(sData.subject==4){
						subject='科目四';
					}
					tableHtml+='<tr><td>'+sData.realname+'</td><td>'+sData.card+'</td><td>'+sData.address+'</td><td>'+licenseType+'</td><td>'+subject+'</td>\
					<td>'+sData.tel+'</td><td>'+status+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.examTime)+'</td>\
                        <td><div class="btn-group">'+handleBtn+'</div></td></tr>';
				}
				$('#tbody').html(tableHtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getReserveExamList(reserveStatus,nowPage,pageSize,endTime,beginTime,userId,realname,card,tel);
				});
				handle(function(){
					getReserveExamList(reserveStatus,nowPage,pageSize,endTime,beginTime,userId,realname,card,tel)
				});
			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){                                   

		}
	})
};


function handle(fn){
	
	$('.handlebtn').on('click',function(){
		var id=$(this).attr('thisid')
		var datas='data={"action":"processOneReserveExam","params":'+id+',"source":"web","target":"reserveExam"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					alert(oData.responseMsg);
					operalog("处理了一条预约考试信息！");
					fn&&fn();
					ChildMsg();
				}
			}
		});
	})
}



