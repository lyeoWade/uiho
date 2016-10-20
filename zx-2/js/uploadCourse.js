$(function(){
	//getCourseList() //获取默认课程列表
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	var beginTime='',endTime='',coachId=Sid,courseStatus='',nowPage='1',pageSize='20';
	getCourseList(beginTime,endTime,coachId,courseStatus,nowPage,pageSize);

	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getCourseList(beginTime,endTime,coachId,courseStatus,nowPage,pageSize);
	});


	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		 courseStatus=$('#courseStatus').val();
		 beginTime=$('#beginTime').val();
		 endTime=$('#endTime').val();
		//选择查询
		getCourseList(beginTime,endTime,coachId,courseStatus,nowPage,pageSize);
	});
	
});




function getCourseList(beginTime,endTime,coachId,courseStatus,nowPage,pageSize){
	var datas='data={"action":"getCourseList","params":{"beginTime":"'+beginTime+'", "coachId":'+coachId+',"endTime":"'+endTime+'","courseStatus":"'+courseStatus+'","nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"web", "target":"course"}';
	console.log(datas);
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData)
			if(oData.responseCode==1){
				var stbodyHtml='';
				for(var i=0; i<oData.object.length; i++){
					var obj=oData.object[i];

					//预约状态
					var status='',showbtnHtml='',checkBtnHTml='';
					if(obj.courseStatus==1){//已经预约
						status='<button type="button" class="btn btn-success btn-xs">已预约</button>';
					}else{//0未预约
						status='<button type="button" class="btn btn-default btn-xs">未预约</button>';
						checkBtnHTml='<input courseId="'+obj.id+'" class="checkBtn" type="checkbox">';
						showbtnHtml='<div class="btn-group"><a href="javascript:;" courseId="'+obj.id+'" class="courseDeletes btn btn-primary btn-sm">删除</a></div>';
					}
					//驾照
					var licenseTypes=''
					switch(obj.licenseType){
						case 1:
							licenseTypes='C1';
						break;
						case 2:
							licenseTypes="C2"
						break;
					}
					//时段
					var periodTypes='';
					switch(obj.periodType){
						case 1:
							periodTypes='上午';
						break;
						case 2:
							periodTypes='下午';
						break;
						case 3:
							periodTypes='晚上';
						break;
					}
					var subject='';
					switch(obj.subject){
						case 1:
							subject='科目一';
						break;
						case 2:
							subject='科目二';
						break;
						case 3:
							subject='科目三';
						break;
						case 4:
							subject='科目四';
						break;
					}
					stbodyHtml+='<tr><td>'+checkBtnHTml+'</td>\
						<td>'+(i+1)+'</td><td>'+Uiho.tool.DetailTimesTamp(obj.createTime)+'</td>\
                        <td>'+obj.siteName+'</td><td>'+licenseTypes+'</td>\
                        <td>'+subject+'</td><td>'+periodTypes+'</td>\
                        <td>'+Uiho.tool.DetailTimesTamp(obj.courseDate).substring(0,10)+'</td>\
                        <td>'+obj.beginTime+'</td>\
                        <td>'+obj.endTime+'</td>\
                        <td>'+status+'</td>\
                        <td>'+showbtnHtml+'</td></tr>';
					$('#tbody').html(stbodyHtml);
				};

				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getCourseList(beginTime,endTime,coachId,courseStatus,nowPage,pageSize);
				});
				deletes(function(){
					getCourseList(beginTime,endTime,coachId,courseStatus,nowPage,pageSize);
				});

				allselect(function(){
					getCourseList(beginTime,endTime,coachId,courseStatus,nowPage,pageSize);
				});
			}else{
				$('#titles').html('&nbsp;');
				$('#tbody').html('<tr><td colspan="15" align="center">'+oData.responseMsg+'</td></tr>')
			}
		},
		complete:function(){
			

		}
	});
};

//删除
function deletes(fn){
	$('.courseDeletes').on('click',function(){
		//{"action":"deleteOneCourse","params": 5,"source":"web","target":"course"}

		var oCourseId=$(this).attr('courseId');
		var datas='data={"action":"deleteOneCourse","params": '+oCourseId+',"source":"web","target":"course"}';
		var r=confirm("确定删除本条数据吗?")
		if(r==true){
			$.ajax({
				url:requrl,
				type:"POST",
				data:datas,
				success:function(str){
					var oData=$.parseJSON(str);
					if(oData.responseCode==1){
						alert(oData.responseMsg);
						operalog("删除了一条课程");
						fn&fn();
					}else{
						alert(oData.responseMsg)
					}
				}
			})
		}
	})
};






function allselect(fn){
	var oAllSelect=document.getElementById('allselect');
	var oCheckBtn=document.getElementsByClassName('checkBtn');
	var oAllCheckedBox=document.getElementsByClassName('allCheckedBox')[0];
	 
	var Sys=true;
	oAllSelect.onclick=function(){
		//alert(oCheckBtn.length)
		if(Sys){
			for(var i=0; i<oCheckBtn.length; i++){
				oCheckBtn[i].checked=true;
				Sys=false;
			}
		}else{
			for(var i=0; i<oCheckBtn.length; i++){
				oCheckBtn[i].checked=false;
				Sys=true;
			}
		}
	}
	var n=0;
	for(var i=0; i<oCheckBtn.length; i++){
		oCheckBtn[i].onclick=function(){
			if(this.checked==true)
			{
				n++;
			}
			else
			{
				n--;  	
			}
			if(n==oCheckBtn.length)
			{
				oAllSelect.checked=true;
			}
			else
			{
				oAllSelect.checked=false;
			}
		};
	}
	
	oAllCheckedBox.onclick=function(){
		//for(var i=0; i<oCheckBtn.length; i++){
		var arrNum=[];
		var i=0;
		while(i<oCheckBtn.length){

			if(oCheckBtn[i].checked==true){
				//alert(oCheckBtn[i].getAttribute('courseId'))
				arrNum.push(oCheckBtn[i].getAttribute('courseId'))
			}
			i++;
		}
		//alert(typeof arrNum.toString());
		if(arrNum.length<=0){
			alert("请选择要删除的数据;");
			return false;
		}
		var deletesDatas='data={"action":"batchDelCourse","params":"'+arrNum+'","source":"web","target":"course"}';
		//console.log(deletesDatas)
		$.ajax({
			url:requrl,
			type:"POST",
			data:deletesDatas,
			success:function(str){
				console.log(str)
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					alert(oData.responseMsg);
					operalog("批量删除了一些课程");
					fn&&fn();
				}else{
					alert(oData.responseMsg)
				}
			}
		})
	}
};





