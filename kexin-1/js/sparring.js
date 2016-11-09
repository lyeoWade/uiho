$(function(){
	var reserveStatus=1,nowPage=1,pageSize=20,beginTime='',endTime='';
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	//获取默认的列表
	getReserveCourseList(reserveStatus,nowPage,pageSize,Sid,beginTime,endTime);
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getReserveCourseList(reserveStatus,nowPage,pageSize,Sid,beginTime,endTime)
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		reserveStatus=$('#disabledState').val();
		beginTime=$('#beginTime').val();
		endTime=$('#endTime').val();
		getReserveCourseList(reserveStatus,nowPage,pageSize,Sid,beginTime,endTime);
	});
});

//获取教练列表
function getReserveCourseList(reserveStatus,nowPage,pageSize,Sid,beginTime,endTime){
	var datas='data={"action":"getReserveCourseList","params":{"userId":'+Sid+',"beginTime":"'+beginTime+'","endTime":"'+endTime+'","nowPage":'+nowPage+',"pageSize":'+pageSize+',"exfF":1, "reserveStatus":"'+reserveStatus+'"},"source":"web","target":"reserveCourse"}';
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
					var bTime='',Etime='';
					if(sData.beginTime==undefined){
						bTime='未开始';
					}else{
						bTime=Uiho.tool.DetailTimesTamp(sData.beginTime);
					}
					if(sData.endTime==undefined){
						Etime='未开始';
					}else{
						Etime=Uiho.tool.DetailTimesTamp(sData.endTime);
					}
					var handel='';
					var reserveStatusHtml='';
					switch(sData.reserveStatus){
						case 1:
							reserveStatusHtml="新预约";
							handel='<a href="javascript:;" thisid="'+sData.id+'" class="btn btn-info btn-sm handlebtn">取消</a>';
						break;
						case 2:
							reserveStatusHtml="已取消";
						break;
						case 3:
							reserveStatusHtml="已完成";
						break;
					}
					tableHtml+='<tr><td>'+sData.coachName+'</td><td>'+bTime+'</td><td>'+Etime+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.courseDate).substring(0,10)+'</td><td>'+reserveStatusHtml+'</td>\
                        <td><div class="btn-group"><a href="sparringEdit.html?id='+sData.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>'+handel+'</div></td></tr>';
				}
				$('#tbody').html(tableHtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getReserveCourseList(reserveStatus,nowPage,pageSize,Sid,beginTime,endTime);
				});

				handle(function(){
					//getReserveCourseList(reserveStatus,nowPage,pageSize,Sid,beginTime,endTime);
					getReserveCourseList(reserveStatus,nowPage,pageSize,Sid,beginTime,endTime);
				});

			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
		}
	});
};


function handle(fn){
	$('.handlebtn').on('click',function(){
		var id=$(this).attr('thisid');
		var datas='data={"action":"cancelOneReserveCourse","params":'+id+',"source":"web", "target": "reserveCourse" }';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					alert(oData.responseMsg);
					operalog("处理了一条陪练信息！");
					fn&&fn();
				}
			}
		});
	})
}


