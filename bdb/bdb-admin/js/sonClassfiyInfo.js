$(function(){
	getClassfiyList(function(){
		getSonSort();
	});
});

function getSonSort(){

	var Sid=Uiho.tool.geturldata(window.location.href).id;
	//var datas='data={"action":"getSort","params":'+Sid+',"source":"backstage","target":"sort"}';
	var datas='data={"action":"getSubSort","params":'+Sid+',"source":"backstage","target":"subSort"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){

			var oData=$.parseJSON(str);
			var obj=oData.object;
			console.log(obj)
			$('#title').val(obj.title);
			$('#note').val(obj.note);
			$('#zid').val(obj.sortId)
			$('#saves').on('click',function(){
				updataUserInfo(Sid);
			});
		},
		complete:function(){			
 			document.onkeydown=function(ev){
				var oEvent=ev||event;
			   	if(oEvent.keyCode==13){
			   		//	alert(123);
			   		updataUserInfo(Sid);
			   	};
			};
		}
	})
}


function updataUserInfo(Sid){
	var title=$('#title').val();
	var note=$('#note').val();
	var zid=$('#zid').val();
	//提交
	var datas='data={"action":"updateSubSort","params":{"sortId":'+zid+',"subSortId":'+Sid+',"title":"'+title+'","note":"'+note+'"},"source":"backstage","target":"subSort"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str);
			responseInfo(str);
			setTimeout(function(){
                history.go(0);
            },800)
		}
	});
}

