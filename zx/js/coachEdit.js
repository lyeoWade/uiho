$(function(){

	//获取教练信息
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	var datas='data={"action":"getOneCoach","params":'+Sid+',"source":"web","target":"coach"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			var obj=oData.object;
			$('#username').val(obj.realname);
			$('#phone').val(obj.phone);
			$('#idcard').val(obj.card);
			$('#age').val(obj.age);
			$('#sex').val(obj.gender); 
			$('#idcardtype').val(obj.licenseType);
			$('#driverschool').val(obj.viewDriving);
			$('#address').val(obj.address);
			$('#bankcard').val(obj.bankCard);
			$('#cardholder').val(obj.cardholder);
			$('#bank').val(obj.bank);
			$('#autograph').val(obj.signature);
			$('#avatar img').attr('src',obj.avatar);
			$('#commission').val(obj.brokerage);
			$('#allincome').val(obj.income);
			//$('#expselct').val(obj.exfA);
			$('#save').attr('picsId',obj.picsId);
			if(obj.isFreeTrial==1){
				$('#isFreeTrial').attr('checked','true').parents('div').addClass('checked');
				$('#spaceExp').css('display','block');
				var str=obj.exfA
				
				getSite(str);


				
			};
			var imageList='';
			if(obj.imageList){
				for(var i=0; i<obj.imageList.length; i++){
					imageList+='<div class="imgwarp"><img src="'+obj.imageList[i].imgUrl+'"><a href="javascript:;" imgid="'+obj.imageList[i].id+'">删除</a></div>';
				}
				$('#oldthumb').html(imageList);
			}
			//console.log(oData);
			upload();
		},
		complete:function(){			
 			deleteImages();
			$('.iCheck-helper').on('click',function(){
				if($('#isFreeTrial').is(':checked')){
					getSite();
					$('#spaceExp').css('display','block');

				}else{
					$('#spaceExp').css('display','none');
				}
			})
			
		}
	})

});
// 获取场地

function getSite(isSelect){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={"action":"getSiteList","params":{},"source":"web", "target":"site" }',
		success:function(str){
			var oData=$.parseJSON(str);
			var allstr='';
			if(oData.responseCode==1){
				for(var i=0; i<oData.object.length; i++){
					var datas=oData.object[i];
					//console.log(datas)
                    allstr+='<option value="'+datas.id+'">'+datas.name+'</option>';
				};
				$('#expselct').html(allstr);

				//当默认是推荐的时候的初始状态
				if(isSelect){
					for(var i=0; i<$("#expselct option").length; i++){
						if($("#expselct option").eq(i).text()==isSelect){
							$("#expselct option").eq(i).attr('selected',true)
						}
					}
				}
				
			}else{
				alert(oData.responseMsg);
			}
		},
		complete:function(str){
		}
	});
}


function upload(){
	//得到选择的文件名
	changes($('.StylePhoto'),function(name){
		$('.Stylemarktag').html(name);
	});

	changes($('.fileInput2'),function(name){
		$('.marktag').html(name);
	});

	//var thumbs='';
	$('#upload').on('click',function(){
			//var thumbs='';
			var f=$('.StylePhoto').get(0).files[0];
			//alert(f)
			if(f!=undefined){
				//$('#thumbs').html('<div class="imgwarp">文件上传中,请稍后...</div>');//empty();
				//新增
				uploadFile(f,function(evt){
					/*服务器端返回响应时候触发event事件*/
					var info = evt.target.responseText;
					var data=eval('('+info+')'); 
					$('<div class="imgwarp"><img src="'+data.objectURL+'"><a href="javascript:;" class="newimage">删除</a></div>').appendTo('#thumbs');
					deletenewimage();
					$('.StylePhoto').val(''); //清空选择的文件
					$('.Stylemarktag').html('点击上传风采照');//去掉提示的文件名
				});
			}else{
				alert('请选择要上传的风采照!');
				return false;
			}
	});

	//封面图 只有一张
	$('#uploadBanner2').on('click',function(){
		var thumbs=''; 
		var f=$('.fileInput2').get(0).files[0];
		if(f){
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

	//选择

	//新增
	$('#save').on('click',function(){

		var realname=$('#username').val();
		var age=$('#age').val();
		var gender=$('#sex').val();
		if(gender==null){
			gender='';
		};
		var card=$('#idcard').val();
		var licenseType=$('#idcardtype').val();
		var viewDriving=$('#driverschool').val();
		var signature=$('#autograph').val();
		var exfE=$('#expselct').val();
		var exfA=$("#expselct  option:selected").text();
		var address=$('#address').val();
		var bankCard=$('#bankcard').val();
		var bank=$('#bank').val();
		var cardholder=$('#cardholder').val();
		var avatar=$('#avatar img').attr('src');

		//var picsId=$(this).attr('picsId');
		var isFreeTrial='';
		if($('#isFreeTrial').is(':checked')){
			isFreeTrial=1;
		}else{
			isFreeTrial=0;
			exfE='';
			exfA='';
		};
		var imgArr=[];
		var a='';
		if($('#allthumb img').length!=0){
			for(var i=0; i<$('#allthumb img').length; i++){
				a='{"imgUrl":"'+$('#allthumb img').eq(i).attr('src')+'"}';
				imgArr.push(a);
			}
		};
		var c='['+imgArr+',]';
		var str2=c.replace(c.substring(c.lastIndexOf(',')),']');

		//判断照片的长度
		var imgArr=JSON.parse(str2);
		//alert();
		if(imgArr.length>5){
			imgArr=imgArr.splice(0,5);
			alert('风采照最多上传5张！');
		}
		var newstr2=JSON.stringify(imgArr);
		
		//提交
		var datas='data={"action":"updateOneCoach","params":{"realname":"'+realname+'","avatar":"'+avatar+'","age":"'+age+'","gender":"'+gender+'","card":"'+card+'","licenseType":'+licenseType+',"viewDriving":"'+viewDriving+'","address":"'+address+'","bankCard":"'+bankCard+'","bank":"'+bank+'","cardholder":"'+cardholder+'","exfA":"'+exfA+'","exfE":"'+exfE+'","id":'+Uiho.tool.geturldata(window.location.href).id+', "imageList": '+newstr2+',"isFreeTrial":'+isFreeTrial+',"signature":"'+signature+'"}, "source": "web", "target": "coach" }';


		//,"picsId":"'+picsId+'"

		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				console.log(str);
				operalog("修改了一个教练信息！")
				responseInfo(str);
				setTimeout(function(){
					window.location.href="coach.html";
				},1000);
			}
		});
	});
}

function changes(objFile,fn){
	objFile.on('change',function(){
		var obj=$(this);
		fileSelected(obj,function(name){
			fn&&fn(name);
		});
	});
};
