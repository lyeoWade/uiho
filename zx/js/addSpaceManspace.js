$(function(){


	var filehtml='';
	var num=0;
	$('#addbanner').on('click',function(){
		num++;
		filehtml='<div class="form-group "><label for="phone" class="control-label col-lg-3 col-sm-3"></label>\
		<div class="col-lg-6 col-sm-6"><input type="file" id="fileInput'+num+'" name="fileInput" class="form-control fileInput">\
		<a class="btn btn-warning btn-sm deleteBtn"><i class="fa fa-times"></i></a></div></div>';
		$('#filewarp').append(filehtml);
		changes();
		deleteFile();
	});
	changes();
	$('#upload').on('click',function(){
		var thumbs='';
		$('.fileInput').each(function(index){
			var f=$('.fileInput').get(index).files[0];
			if(f!=undefined){
				$('#thumbs').empty();
				//新增
				uploadFile(f,function(evt){
					/*服务器端返回响应时候触发event事件*/
					var info = evt.target.responseText;
					var data=eval('('+info+')'); 
					thumbs+='<div class="imgwarp"><img src="'+data.objectURL+'"><a href="javascript:;" class="newimage">删除</a></div>';
					$('#thumbs').html(thumbs);
					deletenewimage();
				});
			}
			
		});
	});

	
	//新增
	$('#addSpace').on('click',function(){
		var $area=$('#area').val();
		var $spacename=$('#spacename').val();
		var $subject=$('#subject').val();
		var $spacedesc=$('#spacedesc').val();
		if($area=='' || $spacename==''){
			$('.addtip').html('区域和场地请填写完整！');
			$('.addtip').addClass('error')
			return false;
		}
		// 获取图片地址 [{imgUrl:xxx},{},{}]
		var imgArr=[];
		var a='';
		if($('#thumbs img').length!=0){
			for(var i=0; i<$('#thumbs img').length; i++){
				a='{"imgUrl":"'+$('#thumbs img').eq(i).attr('src')+'"}';
				imgArr.push(a);
			}
		};
		var c='['+imgArr+',]';
		var str2=c.replace(c.substring(c.lastIndexOf(',')),']');
		//提交
		var datas='data={"action":"addOneSite","params":{"imageList":'+str2+',"site":{"exfA":"'+$area+'","name": "'+$spacename+'","sub": '+$subject+',"intor": "'+$spacedesc+'"}},"source":"web","target":"site"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				console.log(str);
				operalog("新增一个场地！")
				responseInfo(str);
				reload();
			}
		});
	});


});
function changes(){
	$('.fileInput').on('change',function(){
		var obj=$(this);
		fileSelected(obj);
	});
};