$(function(){


	var filehtml='';
	var num=0;
	$('#addbanner').on('click',function(){
		num++;
		filehtml='<div class="form-group "><label for="phone" class="control-label col-lg-3 col-sm-3">图片集</label><div class="col-lg-6 col-sm-6">\
		<input type="file" id="fileInput'+num+'" name="fileInput" class="form-control fileInput">\
		<a class="btn btn-warning btn-sm deleteBtn"><i class="fa fa-times"></div></div>';
		$('#filewarp').append(filehtml);
		changes();
		deleteFile();
	});
	changes();
	//选择文件 
	changes2();
	
	$('#uploadBanner').on('click',function(){

		var thumbs=''; 
		$('.fileInput').each(function(index){
			var f=$('.fileInput').get(index).files[0];
			if(f!=undefined){
				//清空
				$('#thumbs').empty();
				//console.log(thumbs)

				//新增
				uploadFile(f,function(evt){
					/* 服务器端返回响应时候触发event事件*/
					var info = evt.target.responseText;
					var data=eval('('+info+')'); 
					thumbs+='<div class="imgwarp"><img src="'+data.objectURL+'"><a href="javascript:;" class="newimage">删除</a></div>';
					$('#thumbs').html(thumbs);
					deletenewimage();
				});
			}
			

		});
	});


	//封面图 只有一张
	$('#uploadBanner2').on('click',function(){
		var thumbs=''; 
		var f=$('.fileInput2').get(0).files[0];
		console.log(f)
		if(f){
			$('.marktag').html(f.name);
			uploadFile(f,function(evt){
				/* 服务器端返回响应时候触发event事件*/
				var info = evt.target.responseText;
				var data=eval('('+info+')'); 
				thumbs+='<div class="imgwarp"><img src="'+data.objectURL+'"></div>';
				$('#thumb2').html(thumbs);
				deletenewimage();
			});
		}else{
			alert('请选择图片！');
			return false;
		}
	});


	//新增
	$('#bannerAddBtn').on('click',function(){
		var $bannertit=$('#bannertit').val();
		var $thumbnaildesc=$('#thumbnaildesc').val();
		var $targeturl=encodeURIComponent($('#targeturl').val());

		if($bannertit==''){
			$('.addtip').html('标题不能为空！');
			$('.addtip').addClass('error')
			return false;
		}
		//获取封面图
		var coverImg='';
		if($('#thumb2 img').length!=0){
			coverImg=$('#thumb2 img').attr('src')
		}else{
			$('.addtip').html('封面图不能为空');
			$('.addtip').addClass('error')
			return false;
		}
		// 获取图片列表地址 [{imgUrl:xxx},{},{}]
		var imgArr=[];
		var a='';
		for(var i=0; i<$('#thumbs img').length; i++){
			a='{"imgUrl":"'+$('#thumbs img').eq(i).attr('src')+'"}';
			imgArr.push(a);
		}
		var c='['+imgArr+',]';
		var str2=c.replace(c.substring(c.lastIndexOf(',')),']');
		//提交
		var datas='data={"action": "addOneBanner","params": {"banner": {"coverImg": "'+coverImg+'","title": "'+$bannertit+'","content": "'+$thumbnaildesc+'","linkUrl": "'+$targeturl+'"},"imageList": '+str2+'},"source": "web","target": "banner"}';
		//console.log(datas);
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				//console.log(str);
				operalog("新增一个Banner！")
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
function changes2(){
	$('.fileInput2').on('change',function(){
		var obj=$(this);
		$('.marktag').html(obj.get(0).files[0].name);
		fileSelected(obj);
	});
};
