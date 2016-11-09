$(function(){
	//getWithdrawAppList() //获取默认提现列表

	//var Sid=Uiho.tool.geturldata(window.location.href).id;
	var coachId='',withdrawStatus='',nowPage='1',pageSize='20';
	getWithdrawAppList(coachId,withdrawStatus,nowPage,pageSize);

	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getWithdrawAppList(coachId,withdrawStatus,nowPage,pageSize);
	});


	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		 withdrawStatus=$('#withdrawStatus').val();
		 // coachId=$('#coachId').val();
		//选择查询
		getWithdrawAppList(coachId,withdrawStatus,nowPage,pageSize);
	});

	
});

function getWithdrawAppList(coachId,withdrawStatus,nowPage,pageSize){
	
	var datas='data={"action":"getWithdrawAppList","params":{"nowPage": '+nowPage+',"pageSize":"'+pageSize+'","withdrawStatus":"'+withdrawStatus+'","coachId":"'+coachId+'"},"source":"web","target":"withdrawApp"}';
	//console.log(datas);
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var stbodyHtml='';
				for(var i=0; i<oData.object.length; i++){
					var obj=oData.object[i];

					//预约状态
					var status='';
					var handleBtnHtml='';
					if(obj.withdrawStatus==1){//已经提交
						status='<button type="button" class="btn btn-info btn-xs">已提交</button>';
						
						handleBtnHtml='<a href="javascript:;" money="'+obj.money+'" coachId="'+obj.coachId+'" processId="'+obj.id+'" class="handle btn btn-primary btn-sm">处理</a>\
                        <a href="javascript:;" money="'+obj.money+'" coachId="'+obj.coachId+'" processId="'+obj.id+'" class="ignore btn btn-info btn-sm">忽略</a>';

					}else if(obj.withdrawStatus==2){//
						status='<button type="button" class="btn btn-success btn-xs">已处理</button>';
					}else if(obj.withdrawStatus==3){//
						status='<button type="button" class="btn btn-default btn-xs">已忽略</button>';
						
						//handleBtnHtml='<a href="javascript:;" money="'+obj.money+'" coachId="'+obj.coachId+'" processId="'+obj.id+'" class="handle btn btn-primary btn-sm">处理</a>';

					}
					stbodyHtml+='<tr><td>'+obj.coachName+'</td><td>'+obj.coachPhone+'</td><td>'+Uiho.tool.DetailTimesTamp(obj.createTime)+'</td>\
                        <td>'+obj.money+'</td><td>'+status+'</td>\
                        <td><div class="btn-group">'+handleBtnHtml+'</div></td></tr>';
					//console.log(oData);
					$('#tbody').html(stbodyHtml);
				}
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getWithdrawAppList(coachId,withdrawStatus,nowPage,pageSize);
				});
			}else{
				$('#tbody').html('<tr><td colspan="8" align="center">'+oData.responseMsg+'</td></tr>')
			}
		},
		complete:function(){
			handlefn(function(){
				getWithdrawAppList(coachId,withdrawStatus,nowPage,pageSize);
			});
		}
	});
};


function handlefn(fn){

	// 处理
	$('.handle').on('click',function(){
		var _this=$(this);
		initfn(_this,fn,"处理了一条提现申请！",2);
	});

	$('.ignore').on('click',function(){
		var _this=$(this);
		initfn(_this,fn,"忽略了一条提现申请！",3);
	});

	function initfn(_this,fn,info,Tid){
		//alert(Tid)
		var coachId=_this.attr('coachId');
		var processId=_this.attr('processId');
		var money=_this.attr('money');
		var datas='data={"action":"processOneWithdrawApp","params":{"coachId":"'+coachId+'","id":'+processId+',"money":"'+money+'", "withdrawStatus":'+Tid+'},"source":"web","target":"withdrawApp"}';
		//alert(datas)
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var sData=$.parseJSON(str);
				//console.log(sData);
				if(sData.responseCode==1){
					operalog(info);
					fn&&fn();
					ChildMsg();
					alert(sData.responseMsg)
				}else{
					alert(sData.responseMsg)
				}
			}
		});
	}
}