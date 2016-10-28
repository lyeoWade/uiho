$(function(){
	var reserveStatus='',nowPage=1,pageSize=10,coachId='',endTime='',beginTime='',type='1',card='',tel='';
	var userId=Uiho.tool.geturldata(window.location.href).id;

	//获取默认的列表
	 getAccountList(nowPage,pageSize,userId,type,coachId)
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		 getAccountList(nowPage,pageSize,userId,type,coachId);
	});
	//选择查询
	// $('#SelectQueryBtn').on('click',function(){
	// 	//alert(nowPage)
	// 	userId=$('#userid').val();
	// 	//选择查询
	// 	 getAccountList(nowPage,pageSize,userId,type,coachId);
	// 	});
});

