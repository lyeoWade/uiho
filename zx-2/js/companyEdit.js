$(function(){
	var data='data={"action":"getOneCompany","params": 1,"source":"web","target":"company"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:data,
		success:function(str){
			console.log(str);
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				$('#title').val(oData.object.title);
				$('#description').val(oData.object.intor);
				//缩略图显示
				var thumbsHtml='';
				//alert(oData.object.imageList)
				if(oData.object.imageList){
					for(var i=0; i<oData.object.imageList.length; i++){
						thumbsHtml+='<div class="imgwarp"><img src="'+oData.object.imageList[i].imgUrl+'"><a href="javascript:;" imgid="'+oData.object.imageList[i].id+'">删除</a></div>';
					}
				}
				$('#oldthumb').html(thumbsHtml);

			}else{
				alert('请求失败,返回上一页;');
				history.go(-1);
			}
		},
		complete:function(){ 
			deleteImages();
			updateOneCompany();
		}
	});
});

function updateOneCompany(){
	$('#companyBtn').on('click',function(){
		var title=$('#title').val();
		var description=$('#description').val();
		if(title==''){
			$('.addtip').html('标题不能为空！');
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

		var datas='data={"action":"updateOneCompany","params":{"company":{"id":1,"title":"'+title+'","intor":"'+description+'"},"imageList":'+str2+'},"source":"web","target":"company"}';
		//alert(datas);
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				//console.log(str);
				operalog("修改了一次公司信息！")
				responseInfo(str);
			}
		});
	})
}


