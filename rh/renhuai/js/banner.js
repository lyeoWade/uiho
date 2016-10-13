$(function(){
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	//得到该广告的默认详情
	getbannerInit(Sid);
	updateOneBanner(Sid);
	//deletes(Sid);
});

function updateOneBanner(id){
	changes();
	
	//封面图 只有一张
	$('#uploadBanner').on('click',function(){
		var thumbs=''; 
		var f=$('.fileInput1').get(0).files[0];
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


	$('#updateBtns').on('click',function(){
		var title=$('#bannertit').val();
		var linkUrl=encodeURIComponent($('#targeturl').val());
		var type=$('#bannertype').val();
		if(title==''){
			$('.addtip').html('标题不能为空！');
			$('.addtip').addClass('error')
			return false;
		};
		//获取封面图
		var coverImg='';
		if($('#thumb2 img').length!=0){
			coverImg=$('#thumb2 img').attr('src')
		}else{
			$('.addtip').html('封面图不能为空');
			$('.addtip').addClass('error')
			return false;
		};

		
		var datas='data={"action":"updateBanner","params":{"bannerId":"'+id+'","title":"'+title+'","coverImg":"'+coverImg+'","linkUrl":"'+linkUrl+'","type":"'+type+'"},"source":"backstage","target":"banner"}';

		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				responseInfo(str);
				reload();
			}
		});
	});
};



function getbannerInit(Sid){
	var datas='data={"action":"getBanner","params":"'+Sid+'","source":"backstage","target":"banner"}';
	
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var sData=$.parseJSON(str);
			if(sData.responseCode==1){
				console.log(sData)
				var obj=sData.object;
				$('#bannertit').val(obj.title);
				$('#bannertype').val(obj.type);
				$('#targeturl').val(obj.linkUrl);
				$('#creattime').val(Uiho.tool.DetailTimesTamp(obj.createDatetime));
				$('#thumb2').html('<div class="imgwarp"><img src="'+obj.coverImg+'"></div>');
			}else{
				alert('获取数据失败;');
			}
		},
		complete:function(){
		}
	});
}

function changes(){
	$('.fileInput1').on('change',function(){
		var obj=$(this);
		$('.marktag').html(obj.get(0).files[0].name);
		fileSelected(obj);
	});
};