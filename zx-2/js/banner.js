$(function(){
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	//得到该广告的默认详情
	getbannerInit(Sid);
	updateOneBanner(Sid);
	//deletes(Sid);
});

function updateOneBanner(id){

	$('#updateBtns').on('click',function(){
		var title=$('#bannertit').val();
		var content=$('#thumbnaildesc').val();
		var linkUrl=encodeURIComponent($('#targeturl').val());
		var coverImg=$('#thumb2 img').attr('src');
		var picsId=$('#container').attr('picsId');
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

		// 获取图片列表地址 [{imgUrl:xxx},{},{}]
		var imgArr=[];
		var a='';
		for(var i=0; i<$('#allthumb img').length; i++){
			a='{"imgUrl":"'+$('#allthumb img').eq(i).attr('src')+'"}';
			imgArr.push(a);
		};
		var c='['+imgArr+',]';
		var str2=c.replace(c.substring(c.lastIndexOf(',')),']');

		var datas='data={"action":"updateOneBanner","params":{"banner":{"id":"'+id+'","linkUrl":"'+linkUrl+'","coverImg":"'+coverImg+'","title":"'+title+'","content":"'+content+'"}, "imageList": '+str2+' },"picsId":"'+picsId+'","source":"web","target":"banner"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				//console.log(str);
				operalog("修改了一个Banner！")
				responseInfo(str);
				reload();
			}
		});
	});
};

function getbannerInit(Sid){
	
	var datas='data={"action":"getOneBanner","params":"'+Sid+'","source": "web","target":"banner"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var sData=$.parseJSON(str);
			if(sData.responseCode==1){
				var obj=sData.object;
				$('#bannertit').val(obj.title);
				$('#thumbnaildesc').val(obj.content);
				$('#targeturl').val(obj.linkUrl);
				$('#creattime').val(Uiho.tool.DetailTimesTamp(obj.createTime));
				$('#thumb2').html('<div class="imgwarp"><img src="'+obj.coverImg+'"></div>');
				$('#container').attr('picsId',obj.picsId);
				if(obj.imageList){
					var picList='';
					for(var i=0; i<obj.imageList.length; i++){
						picList+='<div class="imgwarp"><img src="'+obj.imageList[i].imgUrl+'"><a href="javascript:;"  imgid="'+obj.imageList[i].id+'" class="newimage">删除</a></div>';
					}
					$('#oldthumb').html(picList);
				}
				//删除
				$('#deletes').on('click',function(){
					var datas='data={"action":"deleteOneBanner","params":'+Sid+',"source":"web","target": "banner" }';
					deleteOneData(datas,1,"删除条banner！");
				});

			}else{
				alert('获取数据失败;');
			}
		},
		complete:function(){
			deleteImages();
		}
	});
}