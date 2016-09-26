$(function(){



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
				$('#avatar').html(thumbs);
				deletenewimage();
			});
		}else{
			alert('请选择图片！');
			return false;
		}
	});


	$('#coachAddBtn').on('click',function(){
		$coachusername=$('#coachusername').val();
		$phone=$('#phone').val();
		$idcard=$('#idcard').val();
		$age=$('#age').val();
		$sex=$('#sex').val();
		$idcardtype=$('#idcardtype').val();
		$driverschool=$('#driverschool').val();
		$address=$('#address').val();
		$card=$('#card').val();
		$cardholder=$('#cardholder').val();
		$bank=$('#bank').val();
		$avatar=$('#avatar img').attr('src');
		//alert($avatar);
		//return false;
		if($coachusername=='' || !Uiho.ver.chinese($coachusername)){
			$('.addtip').html('请输入正确的教练名字！');
			$('.addtip').addClass('error')
			return false;
		}
		if($phone=='' || !Uiho.ver.moblie($phone)){
			$('.addtip').html('请输入正确的手机号码！');
			$('.addtip').addClass('error')
			return false;
		}
		if($age=='' || !Uiho.ver.numint($age)){
			$('.addtip').html('请输入正确的年龄！');
			$('.addtip').addClass('error')
			return false;
		}
		if($driverschool==''){
			$('.addtip').html('请填写驾校！');
			$('.addtip').addClass('error')
			return false;
		}

		var datas='data={"action":"addOneCoach","params": { "address": "'+$address+'","avatar": "'+$avatar+'", "age":'+$age+', "bank": "'+$bank+'", "bankCard": "'+$card+'", "card": "'+$idcard+'", "cardholder": "'+$cardholder+'", "gender":'+$sex+', "licenseType":'+$idcardtype+', "phone": "'+$phone+'", "realname": "'+$coachusername+'", "viewDriving": "'+$driverschool+'" }, "source": "web", "target": "coach" }';
		//console.log(datas);
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				responseInfo(str);
				operalog('新增了一个教练！');
				setTimeout(function(){
					window.location.href="coach.html";
				},800)
			}
		})
	})
});