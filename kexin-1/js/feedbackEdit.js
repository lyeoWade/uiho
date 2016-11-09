$(function(){

	var Sid=Uiho.tool.geturldata(window.location.href).id;

	var datas='data={"action":"getOneFeedback","params":'+Sid+',"source":"web","target":"feedback"}';

	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData)
			var obj=oData.object;
			//console.log(obj);
			$('#title').val(obj.type);
			$('#text').val(obj.content);
			$('#Appli').val(Uiho.tool.DetailTimesTamp(obj.createTime));
			console.log(obj.processStatus)
			$('#handlestatus').val(obj.processStatus);
			//$('#handle').val(obj.gender);
		},
		complete:function(){
			deletes(Sid);
		}
	})

});

function deletes(Sid){
	$('#deletes').on('click',function(){
		var datas='data={"action":"deleteOneFeedback","params":'+Sid+',"source":"web","target":"feedback"}';
			$.ajax({
				url:requrl,
				type:"POST",
				data:datas,
				success:function(str){
					//console.log(str);
					var oData=$.parseJSON(str);
					if(oData.responseCode==1){
						operalog("删除一条反馈/举报信息！");
						alert(oData.responseMsg+',返回上一页;');
						history.go(-1);
					}else{
						alert(oData.responseMsg);
					}
				}
			})
	})
	
}