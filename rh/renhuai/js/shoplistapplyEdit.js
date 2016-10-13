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

			// $('#shoptypename').val(obj.sortTitle);
			$('#shopchildname').val(obj.userSortList[0].sortName+'/'+obj.userSubSortList[0].subSortName);



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
			//$('#isRecommend').val(obj.isRecommend);
			// var channelListHtml=''; 
			// //商家渠道
			// for(var i=0; i<obj.channelList.length; i++){
			// 	channelListHtml+='<div class="qdchannelList">\
   //              <input class="form-control linkName" type="text" value="'+obj.channelList[i].linkName+'">\
   //              <input class="form-control linkUrl" type="text" value="'+obj.channelList[i].linkUrl+'"></div>';
			// }
			// $('.qdchannel').html(channelListHtml);

			var channelListHtml='';
			//商家渠道
			if(obj.channelList==undefined){
				channelListHtml='';
			}else{
				for(var i=0; i<obj.channelList.length; i++){
	                channelListHtml+='<div class="cheallLine" cLink="'+obj.channelList[i].linkUrl+'" cName="'+obj.channelList[i].linkName+'"  cId="'+obj.channelList[i].channelId+'" title="'+obj.channelList[i].linkName+'\n'+obj.channelList[i].linkUrl+'"><span class="picwarp"><img src="'+obj.channelList[i].note+'"></span><div class="handlex"><i class="fa fa-pencil editQd" targetId="t'+obj.channelList[i].channelId+'"></i><i class="fa fa-times deleteQds" channelId="'+obj.channelList[i].channelId+'"></i></div></div>'
				}
				if(obj.channelList.length>=6){
					$('.newChannel').css('display','none')
				}
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

			refuse(Sid);
			throuth(Sid);
		},
		complete:function(){	

			$('#isRecommend').on('change',function(){
				if($(this).val()==0){
					$('#refuseText').css('display','block');
					//拒绝
					$('#refuseBtn').css('display','block');
					$('#saveBtn').css('display','none');
				}else{
					$('#refuseText').css('display','none');
					$('#saveBtn').css('display','block');
					$('#refuseBtn').css('display','none');
					
				}
			})


		}
	})

});

function refuse(Sid){
	$('#refuseBtn').on('click',function(){

		if($('#refuse').val()==''){
			alert("请填写拒绝理由!");
			return false;
		}
		var datas='data={"action":"disagreeUserSettled","params":{"failureCauses":"'+$('#refuse').val()+'","userId":'+Sid+'},"source":"backstage","target":"user"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				responseInfo(str);
				setTimeout(function(){
	                history.go(-1);
	            },400)
			}
		})
	});
}

function throuth(Sid){
	$('#saveBtn').on('click',function(){
		var datas='data={"action":"agreeUserSettled","params":'+Sid+',"source":"backstage","target":"user"}';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				responseInfo(str);
				setTimeout(function(){
	                history.go(-1);
	            },400)
			}
		})
	});
}

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


