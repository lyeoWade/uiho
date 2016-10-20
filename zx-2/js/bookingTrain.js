$(function(){
	var reserveStatus='',nowPage=1,pageSize=20,beginTime='',endTime='';
	var Sid=Uiho.tool.geturldata(window.location.href).id;

	
	$("#bookingTrainName").html(getName()+'的预约练车列表');
	$("#bookingTrainNames").html(getName()+'的预约练车列表');
	//alert(getName())
	
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
	var datas='data={"action":"getReserveCourseList","params":{"userId":'+Sid+',"beginTime":"'+beginTime+'","endTime":"'+endTime+'","nowPage":'+nowPage+',"pageSize":'+pageSize+',"exfF":0, "reserveStatus":"'+reserveStatus+'"},"source":"web","target":"reserveCourse"}';
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
						Etime='未结束';
					}else{
						Etime=Uiho.tool.DetailTimesTamp(sData.endTime);
					}
					var reserveStatusHtml='';
					if(sData.reserveStatus==2 || sData.reserveStatus==3){
						reserveStatusHtml='<a href="bookingTrainEdit.html?id='+sData.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>';
					}else{
						reserveStatusHtml='<a href="bookingTrainEdit.html?id='+sData.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>\
						<button bookid="'+sData.id+'" class="btn btn-warning btn-sm cancelcourse"><i class="fa fa-times"></i></button>';
					}
					var reserveStatus='';
					switch(sData.reserveStatus){
						case 1:
							reserveStatus="新预约";
						break;
						case 2:
							reserveStatus="已取消";
						break;
						case 3:
							reserveStatus="已完成";
						break;
					}

					tableHtml+='<tr><td>'+sData.coachName+'</td><td>'+sData.userName+'</td><td>'+bTime+'</td><td>'+Etime+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.courseDate)+'</td><td>'+reserveStatus+'</td>\
                        <td><div class="btn-group">'+reserveStatusHtml+'</div></td></tr>';
				}
				$('#tbody').html(tableHtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getReserveCourseList(reserveStatus,nowPage,pageSize,Sid,beginTime,endTime);
				});


				$('.cancelcourse').on('click',function(){
					var datas='data={"action":"cancelOneReserveCourse","params":'+$(this).attr('bookid')+',"source":"web","target":"reserveCourse"}';
					deleteOneData(datas,0,"取消了一条练车记录！");
				});
			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
		}
	});
};




