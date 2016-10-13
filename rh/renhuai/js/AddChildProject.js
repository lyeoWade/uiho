$(function(){
	getProList();
	
});

function getProList(){
	var datas='data={"action":"getProjectList","params":{"isEnable": "1","nowPage": 1,"pageSize":50 }, "source":"web","target":"project"}';
	$.ajax({
		type:"POST",
		url:requrl,
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			var oListObj=oData.object;
			console.log(oListObj);
			var proHtml='';

			for(var i=0; i<oListObj.length; i++){
				//console.log(oListObj[i].isEnable)
				proHtml+='<option id="'+oListObj[i].id+'">'+oListObj[i].name+'</option>';
			}
			$('#projectList').html(proHtml);

			$('#addChildProjectBtn').on('click',function(){
				AddChildProject();
			});
		},
		complete:function(){
			document.onkeydown=function(ev){
				var oEvent=ev||event;
			   	if(oEvent.keyCode==13){
			   		//	alert(code+'-'+name);
			   		AddChildProject();
			   	};
			};
		}
	});
};


function AddChildProject(){
			
	$apiUrl=encodeURIComponent($('#apiUrl').val());
	$name=$('#name').val()
	//$projectId=$('#projectList').attr('id');
	$projectId=$("#projectList option:selected").attr("id");
	$requestKey=$('#requestKey').val();
	$note=$('#note').val();
	var datas='data={"action":"addOneSubproject","params":{"apiUrl":"'+$apiUrl+'","name":"'+$name+'","projectId":'+$projectId+',"requestKey":"'+$requestKey+'","note":"'+$note+'"}, "source":"web","target":"subproject"}';
	//alert(datas)
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str)
			responseInfo(str);
			 setTimeout(function(){
                    history.go(0);
                },800)
		}
	})
}