$(function(){
	var applyStatus='',nowPage=1,pageSize=10,phone='',linkname='';
	
	getApplyTrialList(applyStatus,nowPage,pageSize,phone,linkname);

	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getApplyTrialList(applyStatus,nowPage,pageSize,phone,linkname);
	});
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		applyStatus=$('#applyStatus').val();
		phone=$('#mobile').val();
		linkname=$('#linkname').val();
		//选择查询
		getApplyTrialList(applyStatus,nowPage,pageSize,phone,linkname);
	});




});


function getApplyTrialList(applyStatus,nowPage,pageSize,phone,linkname){

	var datas='data={"action":"getApplyTrialList","params":{"applyStatus":"'+applyStatus+'","nowPage":"'+nowPage+'","pageSize":"'+pageSize+'","phone":"'+phone+'","linkname":"'+linkname+'"}, "source":"web","target":"applyTrial"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				var tBodyhtml='';
				for(var i=0; i<oData.object.length; i++){
					var obj=oData.object[i];
					//驾照
					var licenseType='';
					if(obj.licenseType==1){
						licenseType='C1';
					}else if(obj.licenseType==2){
						licenseType='C2';
					}
					//状态
					var Status='',handleBtnHtml='';

					switch(obj.applyStatus){
						case 1:
							Status='<button type="button" class="btn btn-success btn-xs">已申请</button>';
							handleBtnHtml='<button type="button" class="btn btn-success handle" userid="'+obj.id+'">处理</button><button type="button" class="btn btn-default ignore" userid="'+obj.id+'">忽略</button>';
						break;
						case 2:
							Status='<button type="button" class="btn btn-info btn-xs">已处理</button>';
							handleBtnHtml='无操作';
						break;
						case 3:
							Status='<button type="button" class="btn btn-default btn-xs">已忽略</button>';
							handleBtnHtml='无操作';
						break;
					};

					tBodyhtml+='<tr><td>'+(i+1)+'</td><td>'+obj.coachName+'</td><td>'+obj.linkname+'</td><td>'+obj.userPhone+'</td><td>'+obj.phone+'</td><td>'+licenseType+'</td>\
                                <td>'+Uiho.tool.DetailTimesTamp(obj.createTime)+'</td><td>'+obj.siteName+'</td>\
                                <td>'+Status+'</td>\
                                <td><div class="btn-group">'+handleBtnHtml+'</div></td></tr>';
				}
				$('#tbody').html(tBodyhtml);

				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getApplyTrialList(applyStatus,nowPage,pageSize,phone,linkname);
				});
			}else{
				$('#tbody').html('<tr><td colspan="13" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){

			//操作 处理---忽略

			$('.ignore').on('click',function(){
				var userid=$(this).attr('userid')
				var datas='data={"action":"processOneApplyTrial","params":{"applyStatus":3,"id":'+userid+'},"source":"web","target":"applyTrial"}';
				$.ajax({
					url:requrl,
					type:"POST",
					data:datas,
					success:function(str){
						var oData=$.parseJSON(str);
						alert(oData.responseMsg);
						applyStatus=3;
						getApplyTrialList(applyStatus,nowPage,pageSize,phone,linkname);
						ChildMsg();
					}
				});
			});

			$('.handle').on('click',function(){
				var userid=$(this).attr('userid')
				var datas='data={"action":"processOneApplyTrial","params":{"applyStatus":2,"id":'+userid+'},"source":"web","target":"applyTrial"}';
				$.ajax({
					url:requrl,
					type:"POST",
					data:datas,
					success:function(str){
						var oData=$.parseJSON(str);
						alert(oData.responseMsg);
						applyStatus=2;
						getApplyTrialList(applyStatus,nowPage,pageSize,phone,linkname);
						ChildMsg();
					}
				});
			});

		}
	})
}

