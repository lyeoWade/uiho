$(function(){

	//获取教练信息
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	//{"action":"getOneCar","params": 2,"source":"web","target":"car"}
	var datas='data={"action":"getOneCar","params":'+Sid+',"source":"web","target":"car"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			var obj=oData.object;
			console.log(obj);
			$('#title').val(obj.title);
			$('#username').val(obj.userName);
			$('#phone').val(obj.userPhone);
			$('#model').val(obj.model);
			$('#text').val(obj.info);
			$('#Appli').val(Uiho.tool.DetailTimesTamp(obj.createTime));
			$('#handle').val(obj.processStatus);
		},
		complete:function(){

		}
	})

});