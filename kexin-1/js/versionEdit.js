$(function(){

	var datas='data={"action":"getOneVersion","params":"","source":"web","target":"version"}';

	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			var obj=oData.object;
			console.log(obj);
			$('#androidMinEnvir').val(obj.androidMinEnvir);
			$('#androidMinVersion').val(obj.androidMinVersion);
			$('#androidNewVersion').val(obj.androidNewVersion);
			$('#androidNewVersionUrl').val(obj.androidNewVersionUrl);
			$('#androidUpdateNote').val(obj.androidUpdateNote);iosMinEnvir

			$('#iosMinEnvir').val(obj.iosMinEnvir);
			$('#iosMinVersion').val(obj.iosMinVersion);
			$('#iosNewVersion').val(obj.iosNewVersion);
			$('#iosNewVersionUrl').val(obj.iosNewVersionUrl);
			$('#iosUpdateNote').val(obj.iosUpdateNote);
		},
		complete:function(){
			//deletes(Sid);
		}
	})


	$('#versionEdit').on('click',function(){

		if($('#androidMinVersion').val()!=''){
			if(!Uiho.ver.num($('#androidMinVersion').val())){
				alert('安卓最小可使用版本为正整数！');
				return false;
			};
		}

		if($('#androidNewVersion').val()!=''){
			if(!Uiho.ver.num($('#androidNewVersion').val())){
				alert('安卓最新版本正整数！');
				return false;
			};
		}

		var  datas='data={"action":"updateOneVersion","params":{"androidUpdateNote":"'+$('#androidUpdateNote').val()+'","androidNewVersionUrl":"'+$('#androidNewVersionUrl').val()+'","androidNewVersion":"'+$('#androidNewVersion').val()+'","androidMinVersion":"'+$('#androidMinVersion').val()+'","androidMinEnvir":"'+$('#androidMinEnvir').val()+'","iosMinEnvir":"'+$('#iosMinEnvir').val()+'","iosMinVersion":"'+$('#iosMinVersion').val()+'","iosNewVersion":"'+$('#iosNewVersion').val()+'","iosNewVersionUrl":"'+$('#iosNewVersionUrl').val()+'","iosUpdateNote":"'+$('#iosUpdateNote').val()+'","id":1},"source":"web","target":"version"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				//console.log(str);
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					operalog("更新了版本信息！");
					alert(oData.responseMsg)
				}else{
					alert(oData.responseMsg);
				}
			}
		})
	});
});
