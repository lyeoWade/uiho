$(function(){
	var Sid=Uiho.tool.geturldata(window.location.href).id;


	//获取商家信息
	getSubSortList(1);
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
			$('#updateDatetime').val(Uiho.tool.DetailTimesTamp(obj.updateDatetime));

			$('#settledDatetime').val(Uiho.tool.DetailTimesTamp(obj.settledDatetime));

			$('#residentBeginDatetime').val(Uiho.tool.DetailTimesTamp(obj.residentBeginDatetime));
			$('#residentDay').val(obj.residentDay);
			//$('#worktime').val(obj.tradeBeginTime+'-'+obj.tradeEndTime)
			$('#tradeBeginTime').val(obj.tradeBeginTime);
			$('#tradeEndTime').val(obj.tradeEndTime);
			$('#tel').val(obj.tel);
			$('#intor').val(obj.intor); 
			if(obj.exfE){
				$('#shopTag').val(obj.exfE);
			}
			
			$('#bulletin').val(obj.bulletin);
			$('#address').val(obj.address); 
			$('.nowAddress').html('当前位置：'+obj.address)
			$('#ewm img').attr('src',obj.qrCode);
			$('#coverImgWrap img').attr('src',obj.coverImg);

			if(obj.isRecommend==undefined){
				$('#isRecommend').val('0');
			}else{
				$('#isRecommend').val(obj.isRecommend);
			}
			var WrapBoxHtml='';
			if(obj.userSortList){
				for(var i=0; i<obj.userSortList.length; i++){
					WrapBoxHtml+='<div class="sortListWarp">\
	                            <input class="form-control col-lg-4 col-sm-3" sortid="'+obj.userSortList[i].sortId+'/'+obj.userSubSortList[i].subSortId+'" id="residentDay" disabled name="residentDay" type="text" value="'+obj.userSortList[i].sortName+'/'+obj.userSubSortList[i].subSortName+'">\
	                              <span class="btn btn-warning deletesort">删除</span></div>';
				}
				$('#sortListWarpBox').html(WrapBoxHtml);
			}
			
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
			$('.oldChannel').html(channelListHtml);

			
			//地图 
			$('.lat').val(obj.latitude);
			$('.lng').val(obj.longitude);
			$('body').attr('picsId',obj.picsId);
			map(obj.longitude,obj.latitude,function(e){
				$('.lat').val(e.point.lat);
				$('.lng').val(e.point.lng)
			});


			//商家图集
			var thumbsHtml='';
			if(obj.imageList!=undefined){
				for(var i=0; i<obj.imageList.length; i++){
					thumbsHtml+='<div class="imgwarp"><img src="'+obj.imageList[i].imgUrl+'"><a href="javascript:;" imgid="'+obj.imageList[i].imageId+'">删除</a></div>';
				}
			}
			
			$('#oldthumb').html(thumbsHtml);
			//执行修改函数
			$('#save').on('click',function(){
				updataOneUser(Sid);
			});



			getSortList();
		},
		complete:function(){	
			//执行修改函数
 			document.onkeydown=function(ev){
				var oEvent=ev||event;
			   	if(oEvent.keyCode==13){
			   		//	alert(123);
			   		//updataUserInfo(Sid);
			   	};
			};

			uploadPic();
			deleteChannel();
			//updataOneUser();
			updataInfo();

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
			$('#address').val(addComp.city + addComp.district+ addComp.street + addComp.streetNumber);
			$('.nowAddress').html('当前位置：'+addComp.city + addComp.district+ addComp.street + addComp.streetNumber)
			//document.getElementById('nowaddress').innerHTML='<i class="mui-icon mui-icon-location"></i>当前位置:'+addComp.city + addComp.district+ addComp.street + addComp.streetNumber;
		});
	},false);
}


//删除渠道
function deleteChannel(){
	$('.deleteQds').on('click',function(){
		var ChannelId=$(this).attr('channelId');
		var datas='data={"action":"deleteChannel","params":'+ChannelId+',"source":"mobileweb","target":"channel"}';
		var _this=$(this);

		if(confirm("你确定要删除本条渠道？")){
			$.ajax({
				url:requrl,
				type:"post",
				data:datas,
				success:function(str){
					var oData=$.parseJSON(str);
					if(oData.responseCode==1){
						_this.parents('.cheallLine').remove();
						$('.newChannel').css('display','block');
					}else{
						alert(oData.responseMsg)
					};
				}
			})
		};
	});
};



function updataInfo(){
	var oCheall=$('.cheallLine');
	var editQd=$('.editQd');
	var len=editQd.length;
	for(var i=0; i<len; i++){
		editQd.eq(i).on('click',function(e){
			var oCname=$(this).parents('.cheallLine').attr('cname');
			var oClink=$(this).parents('.cheallLine').attr('clink');
			var oSrc=$(this).parents('.cheallLine').find('img').attr('src');
			$('#qdLink').val(oClink);
			$('#qdName').val(oCname);
			$('.qdImg img').attr('src',oSrc);
			$('#Usave').attr('tragetId',$(this).attr('targetid'))
			$('.updataChanell').css({
				"display":"block",
				"left":$(this).offset().left-170,
				"top":$(this).offset().top-350
			});
			$("#AddUsave").css('display','none');
			$("#Usave").css('display','block')
			e.stopPropagation();
		})
	}

	$(document).on('click',function(){
		$('.updataChanell').css({
			"display":"none"
		})
	});
	$('.updataChanell').on('click',function(e){
		e.stopPropagation();
	});

	$('#Usave').on('click',function(){
		var _this=$(this);
		for(var j=0; j<$('.editQd').length; j++){
			(function(index){
				if(_this.attr('tragetId')==$('.editQd').eq(index).attr('targetid')){
					

					$('.editQd').eq(index).parents('.cheallLine').attr({'cname':$('#qdName').val(),"clink":$('#qdLink').val(),"title":$('#qdName').val()+'\n'+$('#qdLink').val()}).find('img').attr('src',$('.qdImg img').attr('src'));
				}
			})(j)
		}
		$('.updataChanell').css('display','none')
	});

	//封面图 只有一张
	$('.fileInput3').on('change',function(){
		$(this).parent().find('.marktag').html($('.fileInput3').val());
	});
	$('#updataqd').on('click',function(){
		console.log($(this).parent().find('.fileInput3'));
		var thumbs=''; 
		var f=$(this).parent().find('.fileInput3').get(0).files[0];
		var index=$(this).index('.uploadOnePic');
		//return ;
		if(f){
			uploadFile(f,function(evt){
				/* 服务器端返回响应时候触发event事件*/
				var info = evt.target.responseText;
				var data=eval('('+info+')'); 
				thumbs='<img src="'+data.objectURL+'">';
				$('.qdImg').html(thumbs);
			});
		}else{
			alert('请选择图片！');
			return false;
		}
	});



	$('.addqds').on('click',function(e){
		e.stopPropagation();
		$("#AddUsave").css('display','block');
		$("#Usave").css('display','none')
		$('.updataChanell').css({
			"display":"block",
			"left":$(this).offset().left-150,
			"top":$(this).offset().top-310
		});
	});
	$('#AddUsave').on('click',function(){
		var cName=$('#qdName').val();
		var cLink=$('#qdLink').val();
		var cSrc=$('.qdImg img').attr('src');
		//alert(cSrc)
		if(cName=='' || cLink=='' || cSrc==''){
			alert('请填写完整。');
			return false;
		}
		var WrapHtml='';
		WrapHtml='<div class="cheallLine" cLink="'+cLink+'" cName="'+cName+'"   title="'+cName+'\n'+cLink+'"><span class="picwarp"><img src="'+cSrc+'"></span><div class="handlex"><i class="fa fa-times deleteQdNow"></i></div></div>';

		$('.oldChannel').append(WrapHtml);
		$('.updataChanell').css('display','none');

		if($('.cheallLine').length>=6){
			$('.newChannel').css('display','none');
		}
	});

    $(document).on("click", ".deleteQdNow", function(event){
        $(this).parents('.cheallLine').remove();
        $('.newChannel').css('display','block');
    });
}






function updataUserInfo(Sid){
	var username=$('#username').val();
	var tel=$('#tel').val();
	var email=$('#email').val();

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

function uploadPic(){
	changes();
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
		//alert(123);
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
	
}





//修改商家信息
function updataOneUser(userId){
	var shopname=$("#name").val();
	var intor=$("#intor").val();
	var bulletin=$("#bulletin").val();
	var address=$("#address").val();
	var longitude=$(".lng").val();
	var latitude=$(".lat").val();
	var coverImg=$("#coverImgWrap img").attr('src');
	var qrCode=$("#ewm img").attr('src');
	var tel=$("#tel").val();
	var shopTag=$("#shopTag").val();
	var isRecommend=$('#isRecommend').val();

	var  tradeBeginTime=$('#tradeBeginTime').val();
	var  tradeEndTime=$('#tradeEndTime').val();

	if(tradeBeginTime=='' || tradeEndTime==''){
		alert("营业时间不能为空！");
		return false;
	}

	//图片集地址
	var oImageUrl=$('#thumbs img');
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
	var channelListArr='';
	var setJson='';
	var channelArr=[];
	for(var j=0; j<$('.cheallLine').length; j++){
		var name=$('.cheallLine').eq(j).attr('cname');
		var url=$('.cheallLine').eq(j).attr('clink');
		var imgs=$('.cheallLine').eq(j).find('img').attr('src');
		var cId=$('.cheallLine').eq(j).attr('cId');
		if(cId==undefined){
			cId='';
		}
		var channelIdStr='"channelId":"'+cId+'"';
		setJson='{"linkName":"'+name+'","linkUrl":"'+encodeURIComponent(url)+'","note":"'+imgs+'",'+channelIdStr+'}';
		channelArr.push(setJson);
	}
	var ccc='['+channelArr+',]';
	channelListArr=ccc.replace(ccc.substring(ccc.lastIndexOf(',')),']');
	var lens=$('#sortListWarpBox input').length;
    var arrSortid=[],arrSonSortid=[];
    for(var i=0; i<lens; i++){
        arrSortid.push('{"sortId":'+$('#sortListWarpBox input').eq(i).attr('sortid').split('/')[0]+'}')
        arrSonSortid.push('{"subSortId":'+$('#sortListWarpBox input').eq(i).attr('sortid').split('/')[1]+'}');
    };
	var picsId=$('body').attr('picsId');
	var datas='data={"action":"updateUser","params":{"name":"'+shopname+'","channelList":'+channelListArr+',"imageList":'+imageListArr+',"intor":"'+intor+'","bulletin":"'+bulletin+'","address":"'+address+'","longitude":"'+longitude+'","latitude":"'+latitude+'","coverImg":"'+coverImg+'","qrCode":"'+qrCode+'","tel":"'+tel+'","exfE":"'+shopTag+'","tradeBeginTime":"'+tradeBeginTime+'","tradeEndTime":"'+tradeEndTime+'","userId":'+userId+',"isRecommend":"'+isRecommend+'","picsId":'+picsId+',"userSortList":['+arrSortid+'],"userSubSortList":['+arrSonSortid+']},"source":"backstage","target":"user"}';

	//$('#tradeBeginTime').val(obj.tradeBeginTime);
	//$('#tradeEndTime').val(obj.tradeEndTime);
	//tradeBeginTime：开始营业时间；tradeEndTime：结束营业时间；
	//console.log(datas);
	//return false;
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str)
			responseInfo(str);
			setTimeout(function(){
        		history.go(0);
         	},800)
		}
	});

};



function changes(){
	$('.fileInput2').on('change',function(){
		var obj=$(this);
		fileSelected(obj);
		obj.parent().find('.marktag').html(obj.val());
	});
};



 // 获取分类列表

 function getSortList(){
 	var datas='data={"action":"getSortList","params":{"nowPage":1,"pageSize":30},"source":"backstage","target":"sort"}';
	$.ajax({
	    url:requrl,
	    type:"POST",
	    data:datas,
	    success:function(str){
	        var oData=$.parseJSON(str);
	        console.log(oData);
	        if(oData.responseCode==1){
	            var zidHtml='';
	            for(var i=0; i<oData.object.length; i++){
	                var sData=oData.object[i];
	                zidHtml+='<option value="'+sData.sortId+'">'+sData.title+'</option>';
	            }
	            $('#getSortList').html(zidHtml);
	        }else{
	            $('#getSortList').html('<option value="no">'+sData.responseMsg+'</option>');
	        }
	    },
	    complete:function(){
	        
	    }
	});
 }



$('#getSortList').on('change',function(){
    //alert($(this).val());
    var sortId=$(this).val();
    getSubSortList(sortId);
})
function getSubSortList(sortId){
    var datas='data={"action":"getSubSortList","params":{"nowPage":1,"pageSize":20,"sortId":"'+sortId+'"},"source":"backstage","target":"subSort"}';
    $.ajax({
        url:requrl,
        type:"POST",
        data:datas,
        success:function(str){
            var oData=$.parseJSON(str);
            console.log(oData);
            if(oData.responseCode==1){
                var zidHtml='';
                for(var i=0; i<oData.object.length; i++){
                    var sData=oData.object[i];
                    zidHtml+='<option value="'+sData.subSortId+'">'+sData.title+'</option>';
                }
                $('#getSonSortList').html(zidHtml);
            }else{
                $('#getSonSortList').html('<option value="no">'+oData.responseMsg+'</option>');
            };
        },
        complete:function(){
            
        }
    })
};


//添加分类

$('#addSort').on('click',function(){
    var sClassfiyHtml=$('#getSortList').find("option:selected").text()+'/'+$('#getSonSortList').find("option:selected").text();
    var sClassfiyId=$('#getSortList').val()+'/'+$('#getSonSortList').val();
    //alert(sClassfiyHtml);
    if($('#getSonSortList').val()=='no'){
        alert('请先添加子类！');
        return false;
    }
    var sListHtml='<div class="sortListWarp">\
                <input class="form-control col-lg-4  col-sm-3" id="residentDay" sortId="'+sClassfiyId+'" name="residentDay" disabled type="text" value="'+sClassfiyHtml+'">\
                <span class="btn btn-warning deletesort">删除</span></div>';
    $('#sortListWarpBox').append(sListHtml);

    //第一个不显示删除按钮
    if($('.sortListWarp').length==1){
        $('.sortListWarp').find('span').css('display','none');
    }else{
         $('.sortListWarp').find('span').css('display','inline-block');
    }
});

//删除分类
$('#sortListWarpBox').on('click','.deletesort',function(){
    $(this).parent().remove();
      //第一个不显示删除按钮
    if($('.sortListWarp').length==1){
        $('.sortListWarp').find('span').css('display','none');
    }else{
         $('.sortListWarp').find('span').css('display','inline-block');
    }
})