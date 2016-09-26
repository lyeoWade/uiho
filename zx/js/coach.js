$(function(){
	var isEnable='',nowPage=1,pageSize=20,phone='',realname='',card='';

	//获取默认的列表
	getCoachList(isEnable,nowPage,pageSize,phone,realname,card);
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getCoachList(isEnable,nowPage,pageSize,phone,realname,card)
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		isEnable=$('#disabledState').val();
		phone=$('#mobile').val();
		realname=$('#ralename').val();
		card=$('#idcard').val();
		//选择查询
		getCoachList(isEnable,nowPage,pageSize,phone,realname,card);
	});
});
//获取教练列表
function getCoachList(isEnable,nowPage,pageSize,phone,realname,card){

	var datas='data={"action":"getCoachList","params":{"isEnable":"'+isEnable+'","nowPage":'+nowPage+',"pageSize":'+pageSize+',"phone":"'+phone+'","realname":"'+realname+'","card":"'+card+'"},"source":"web","target":"coach"}';
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
					//启用状态
					var isEnableHtml='';
					if(sData.isEnable==0){
						//0禁用
						isEnableHtml='<td><button type="button" userid="'+sData.id+'" isEnable="'+sData.isEnable+'" class="btn btn-default coachstatus"><i class="fa fa-gear"></i>&nbsp;启用</button></td>';
					}else{
						//1启动
						isEnableHtml='<td><button type="button" userid="'+sData.id+'" isEnable="'+sData.isEnable+'" class="btn btn-success coachstatus"><i class="fa fa-gear"></i>&nbsp;禁用</button></td>';
					}
					tableHtml+='<tr><td>'+sData.realname+'</td><td>'+sData.phone+'</td><td>'+sData.age+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td>'+isEnableHtml+'\
                                <td><div class="btn-group"><button data-toggle="dropdown" class="btn btn-primary dropdown-toggle btn-sm " type="button">查看教练选项 <span class="caret"></span></button>\
                                <ul role="menu" class="dropdown-menu"><li><a href="coachEdit.html?id='+sData.id+'">教练详情</a></li><li class="divider"></li>\
                                <li><a href="uploadCourse.html?id='+sData.id+'">课程列表</a></li>\
                                <li><a href="comment.html?id='+sData.id+'">评论管理</a></li><li class="divider"></li>\
                                <li><a href="income.html?id='+sData.id+'&name='+sData.realname+'">新增收入</a></li><li><a href="incomeDetail.html?id='+sData.id+'">收入详情</a></li>\
                                <li><a href="commissionList.html?id='+sData.id+'">佣金详情</a></li></ul></div></td></tr>';
				}
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getCoachList(isEnable,nowPage,pageSize,phone,realname,card);
				});

				handleCoach(function(){
					getCoachList(isEnable,nowPage,pageSize,phone,realname,card);
				});
			}else{
				$('tbody').html('<tr><td colspan="6" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			
		}
	})
};
//禁用教练
//{"action":"disableOneCoach","params":1,"source":"web","target":"coach"}

function handleCoach(fn){
	$('.coachstatus').on('click',function(){
		
		var _this=$(this);
		var status=$(this).attr('isEnable');//禁用启用状态
		var userId=$(this).attr('userId');//userid="5" 用户id
		//alert(status)
		if(status==1){//1启用状态
			disableCoach(userId,_this,fn);
		}else if(status==0){
			EnableCoach(userId,_this,fn);
		}
	});
}

function disableCoach(id,_this,fn){
	//alert(id)
	var datas='data={"action":"disableOneCoach","params":'+id+',"source":"web","target":"coach"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			//console.log(str);
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				fn&&fn();
				
				alert(oData.responseMsg);
			}else{
				alert(oData.responseMsg);
			}
		}
	})
}
//{ "action": "enableOneCoach", "datetime": 1456378316309, "params": 1, "source": "android", "target": "coach" }
function EnableCoach(id,_this,fn){
	var datas='data={"action":"enableOneCoach","params":'+id+',"source":"web","target":"coach"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			//console.log(str); 
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				alert(oData.responseMsg);
				fn&&fn();
			}else{
				alert(oData.responseMsg);
			}
		}
	});
}//





