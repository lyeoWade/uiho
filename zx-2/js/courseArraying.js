$(function(){

	var periodType='',nowPage=1,pageSize=10;
	getTimetableList(nowPage,pageSize,periodType);
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getTimetableList(nowPage,pageSize,periodType);
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		periodType=$('#periodType').val();
		//选择查询
		getTimetableList(nowPage,pageSize,periodType);
	});
});

function getTimetableList(nowPage,pageSize,periodType){
	var datas='data={"action":"getTimetableList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+',"periodType":"'+periodType+'"},"source":"web", "target": "timetable" }';
	//console.log(datas);
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			//console.log(str);
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var tableHtml='';
				for(var i=0; i<oData.object.length; i++){
					var datas=oData.object[i];
					//时段
					var preiod='';
					switch(datas.periodType){
						case 1:
							preiod='上午';
						break;
						case 2:
							preiod='下午';
						break;
						case 3:
							preiod='晚上';
						break;

					}

					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+datas.beginTime+'</td><td>'+datas.endTime+'</td>\
                            <td>'+preiod+'</td><td>'+datas.price+'</td>\
                            <td>'+Uiho.tool.DetailTimesTamp(datas.createTime)+'</td>\
                            <td><div class="btn-group"><a href="courseArrayingEdit.html?id='+datas.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>\
                            <button courseid="'+datas.id+'" class="btn btn-warning btn-sm deleteOneCourse"><i class="fa fa-times"></i></button></div></td></tr>';
				}
				$('#pagination').attr('count',oData.count);
				$('#tbody').html(tableHtml);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getTimetableList(nowPage,pageSize,periodType);
				});


				
				//删除
				$('.deleteOneCourse').on('click',function(){
					var reqdata='data={"action":"deleteOneTimetable","params": '+$(this).attr('courseid')+', "source": "web","target":"timetable"}';
					deleteOneData(reqdata,0,"删除一条排课信息",function(){
						getTimetableList(nowPage,pageSize,periodType);
					});
				});
			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		}
	});
}