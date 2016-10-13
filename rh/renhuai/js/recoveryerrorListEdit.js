$(function(){
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	var datas='data={"action":"getUser","params":{"userId":'+Sid+'},"source":"backstage","target":"user"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			var obj=oData.object;
			console.log(obj)
			$('#name').val(obj.name);
			$('#shoptypename').val(obj.sortTitle);
			$('#shopchildname').val(obj.subSortTitle);
			$('#nickname').val(obj.nickname);
			$('#updateDatetime').val(Uiho.tool.DetailTimesTamp(obj.updateDatetime))
			$('#worktime').val(obj.tradeBeginTime)
			$('#tel').val(obj.tel);
			$('#intor').val(obj.intor);

			$('#bulletin').val(obj.bulletin);
			$('#settledDatetime').val(obj.settledDatetime);
			$('#address').val(obj.address); 
			

			$('#ewm img').attr('src',obj.qrCode);
			$('#coverImgWrap img').attr('src',obj.coverImg);
			$('#isRecommend').val(obj.isRecommend);
			var channelListHtml='';
			//商家渠道
			for(var i=0; i<obj.channelList.length; i++){
				channelListHtml+='<div class="qdchannelList">\
                <input class="form-control linkName" type="text" value="'+obj.channelList[i].linkName+'">\
                <input class="form-control linkUrl" type="text" value="'+obj.channelList[i].linkUrl+'"></div>';
			}
			$('.qdchannel').html(channelListHtml);

			//地图 
			$('.lat').val(obj.latitude);
			$('.lng').val(obj.longitude);
			map(obj.longitude,obj.latitude,function(e){
				$('.lat').val(e.point.lat);
				$('.lng').val(e.point.lng)
			});



			//商家图集
			var thumbsHtml='';
			for(var i=0; i<obj.imageList.length; i++){
				thumbsHtml+='<div class="imgwarp"><img src="'+obj.imageList[i].imgUrl+'"><a href="javascript:;" imgid="'+obj.imageList[i].imageId+'">删除</a></div>';
			}
			$('#oldthumb').html(thumbsHtml);
			//执行修改函数
			$('#save').on('click',function(){
				updataOneUser(Sid);
			});
		},
		complete:function(){	

			$('#isRecommend').on('change',function(){
				if($(this).val()==0){
					$('#refuseText').css('display','block');
				}else{
					$('#refuseText').css('display','none');
				}
			})
			//执行修改函数
 			document.onkeydown=function(ev){
				var oEvent=ev||event;
			   	if(oEvent.keyCode==13){
			   		//	alert(123);
			   		//updataUserInfo(Sid);
			   	};
			};
			//updataOneUser();

			deleteImages();
		}
	})

});


function map(lng,lat,fn){
	var map = new BMap.Map("allmap");

	map.centerAndZoom(new BMap.Point(lng,lat),17);  //初始化地图,设置城市和地图级别。

	var point = new BMap.Point(lng,lat);  
	var markerB = new BMap.Marker(point);// 创建标注
	map.addOverlay(markerB);             // 将标注添加到地图中

	markerB.enableDragging();
	var geoc = new BMap.Geocoder();  
	markerB.addEventListener('dragend',function(e){
		//console.log(e.point);
		var pt=e.point;
		geoc.getLocation(pt, function(rs){
			var addComp = rs.addressComponents;

			console.log(addComp.city +'-'+ addComp.district +'-'+ addComp.street +'-'+ addComp.streetNumber+'-经度：'+ e.point.lng + "-纬度：" + e.point.lat);

			fn&fn(e);
			//document.getElementById('nowaddress').innerHTML='<i class="mui-icon mui-icon-location"></i>当前位置:'+addComp.city + addComp.district+ addComp.street + addComp.streetNumber;
		});
	},false);
}


function updataUserInfo(Sid){
	var username=$('#username').val();
	var tel=$('#tel').val();
	var email=$('#email').val();
	//var roleId=$('#roleId').val();
	
	//提交
	var datas='data={"action":"updateUserInfo","params":{"name":"'+username+'","tel":"'+tel+'","email":"'+email+'","userId":"'+Sid+'"}, "source": "web", "target": "user" }';
	//alert(datas)
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







//修改
function updataOneUser(userId){
	//商家图集
	var filehtml='';
	var num=0;
	$('#addbanner').on('click',function(){
		num++;
		filehtml='<div class="form-group "><label for="phone" class="control-label col-lg-2 col-sm-2"></label>\
		<div class="col-lg-6 col-sm-6"><input type="file" id="fileInput'+num+'" name="fileInput" class="form-control fileInput">\
		<a class="btn btn-warning btn-sm deleteBtn"><i class="fa fa-times"></i></a></div></div>';
		$('#filewarp').append(filehtml);
		deleteFile();
	});
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

	//封面图 只有一张
	$('.uploadOnePic').on('click',function(){
		var thumbs=''; 
		var f=$(this).parent().find('.fileInput2').get(0).files[0];
		//console.log(f)
		var index=$(this).index('.uploadOnePic');
		//return ;
		if(f){
			uploadFile(f,function(evt){
				/* 服务器端返回响应时候触发event事件*/
				var info = evt.target.responseText;
				var data=eval('('+info+')'); 
				thumbs+='<img src="'+data.objectURL+'">';
				$('.coverImgWrap').eq(index).html(thumbs);
			});
		}else{
			alert('请选择图片！');
			return false;
		}
	});
	changes();

	var intor=$("#intor").val();
	var bulletin=$("#bulletin").val();
	var address=$("#address").val();
	var longitude=$(".lng").val();
	var latitude=$(".lat").val();
	var coverImg=$("#coverImgWrap img").attr('src');
	var qrCode=$("#ewm img").attr('src');
	var tel=$("#tel").val();

	//图片集地址
	var oImageUrl=$('#thumbnail img');
	var imgArr=[];
	var a='';
	if(oImageUrl.length!=0){
		for(var i=0; i<oImageUrl.length; i++){
			a='{"imgUrl":"'+oImageUrl.eq(i).attr('src')+'"}';
			imgArr.push(a);
		}
	};
	var c='['+imgArr+',]';
	var imageListArr=c.replace(c.substring(c.lastIndexOf(',')),']');


	// 渠道 [{"linkName":"外卖超人","linkUrl":"http://img2.imgtn.bdimg.com/it/u=1536207273,1509014297fm=21gp=0.jpg"}]

	var channelListArr='';
	var setJson='';
	var channelArr=[];
	for(var j=0; j<$('.qdchannelList').length; j++){
		var name=$('.qdchannelList').eq(j).find('.linkName').val();
		var url=$('.qdchannelList').eq(j).find('.linkUrl').val();
		setJson='{"linkName":"'+name+'","linkUrl":"'+url+'"}';
		channelArr.push(setJson);
	}
	var ccc='['+channelArr+',]';
	channelListArr=ccc.replace(ccc.substring(ccc.lastIndexOf(',')),']');
	

	var datas='data={"action":"updateUser","params":{"channelList":'+channelListArr+',"imageList":'+imageListArr+',"intor":"'+intor+'","bulletin":"'+bulletin+'","address":"'+address+'","longitude":"'+longitude+'","latitude":"'+latitude+'","coverImg":"'+coverImg+'","qrCode":"'+qrCode+'","tel":"'+tel+'","picsId":3,"userId":'+userId+'},"source":"backstage","target":"user"}';

	alert(datas); 
	return ;


};



function changes(){
	$('.fileInput2').on('change',function(){
		var obj=$(this);
		fileSelected(obj);

		obj.parent().find('.marktag').html(obj.val());
	});
};



