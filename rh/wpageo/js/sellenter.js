
var oSelecttype=document.getElementById("selecttype");
var oOffCanvasHide=document.getElementById("offCanvasHide");
var sell=new UihoForRenhuai();

//sell.checkUserId();
var userId=sell.getCookie('userIdByWeixin');
//alert('userId为:'+userId+'?')
//判断是否已经入驻
var datasIs='data={"action":"countUserSettled","params":'+userId+',"source":"mobileweb","target":"user"}';
$.ajax({
	url:sell.requrl,
	type:"POST",
	data:datasIs,
	success:function(str){
		console.log(str);
		var oData=$.parseJSON(str);
		if(oData.responseCode==-1){
			alert(oData.responseMsg);
			window.location.href='statustip.html';
		}else if(oData.responseCode==-2){
			 alert(oData.responseMsg);
			 window.location.href='shopcenter.html';
		}else if(oData.responseCode==-3){
			alert(oData.responseMsg);
			history.go(0);
		}else if(oData.responseCode==-5){
			alert(oData.responseMsg);
			$('#subUserInfo').css('display','block');
			$('#applyBtn').css('display','none');
			getRefuseUserInfo(userId,sell.requrl);
			
		}
		//-5 入驻失败 -2 成功 -1已申请
	}
});

//获取申请用户的信息
function getRefuseUserInfo(userId,url){
	var datas='data={"action":"userInfo","params":'+userId+',"source":"mobileweb","target":"user"}';
	$.ajax({
		url:url,
		type:"POST",
		data:datas,
		success:function(str){
			var sData=$.parseJSON(str);
			console.log(sData)
			if(sData.responseCode==-1){
				var obj=sData.object;
				$('#selecttype').html(obj.userSortList[0].sortName+'&nbsp;'+obj.userSubSortList[0].subSortName).attr('sortid',obj.userSortList[0].sortId+','+obj.userSubSortList[0].subSortId);
				$('#shopCover').html('<img src="'+obj.coverImg+'">');
				$('#ewmWrap').html('<img src="'+obj.qrCode+'">');
				$('.img1').html('<img src="'+obj.imageList[0].imgUrl+'">');
				if(obj.imageList[1]){
					$('.img2').html('<img src="'+obj.imageList[1].imgUrl+'">');
				}
				//var qdListHtml='';
				if(obj.channelList.length>=1){
					for(var j=0; j<obj.channelList.length; j++){
						//alert(obj.channelList[j].channelId)
						deleteChannel(obj.channelList[j].channelId)
					}
				};
				$('#tel').val(obj.tel);
				$('#shopname').val(obj.name);
				$('#shopNotice').val(obj.bulletin);
				$('#shopIntro').val(obj.intor);
				$('#startTime').val(obj.tradeBeginTime);
				$('#endTime').val(obj.tradeEndTime);
				$('#nowShopAddress').val(obj.address);
				$('body').attr('pos',obj.longitude+','+obj.latitude);
				//pos="106.407701,27.79837"
			}else{

			}
		},
		error:function(){

		}
	})
};



function deleteChannel(ChannelId){
	var datas='data={"action":"deleteChannel","params":'+ChannelId+',"source":"mobileweb","target":"channel"}';
	$.ajax({
		url:sell.requrl,
		type:"post",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				console.log(oData.responseMsg)
			}else{
				console.log(oData.responseMsg)
			};
		}
	})
};

//重新提交入驻申请
$('#subUserInfo').on('touchend',function(){

	var checkbox=document.getElementById('checkbox');
	if(checkbox.checked==false){
		alert("请阅读商户协议，并勾选");
		return false;
	}
	if(endTime.value.length<=4){
		alert('请填写商户营业时间！');
		return false;
	}
	if(tel.value==''){
		alert('请填写商户联系电话！');
		return false;
	}
	if(shopname.value==''){
		alert('请填写商户名称,以后不可修改！');
		return false;
	}
	if(shopNotice.value.length>30){
		alert('商户公告不超过30字！');
		return false;
	}else if(shopIntro.value.length>100){
		alert('商户介绍不超过100字！');
		return false;
	}
	var oNowShopAddress=$('#nowShopAddress').val().substring(5);
	var oShopNotice=$('#shopNotice').val();
	var oShopIntro=$('#shopIntro').val();
	var oShopname=$('#shopname').val();
	var oEwm=$('#ewmWrap img').attr('src');
	var oShopCover=$('#shopCover img').attr('src');
	var oTel=$('#tel').val();
	var oStartTime=$('#startTime').val();
	var oEndTime=$('#endTime').val();
	var oPos=$('body').attr('pos').split(',');
	var oSelecttype=$('#selecttype').attr('sortid').split(',');

	if(oEwm==undefined){
		oEwm='';
	}
	//alert(oEndTime);

	// 渠道 [{"linkName":"外卖超人","linkUrl":"http://img2.imgtn.bdimg.com/it/u=1536207273,1509014297fm=21gp=0.jpg"}]

	var channelListArr='';
	var setJson='';
	var channelArr=[];
	for(var j=0; j<$('.line-par').length; j++){
		var name=$('.line-par').eq(j).find('.qudaoname').attr('qudaoname');
		var src=$('.line-par').eq(j).find('.targetsrc').attr('src');
		setJson='{"linkName":"'+name+'","linkUrl":"","note":"'+src+'"}';
		channelArr.push(setJson);
	}
	var ccc='['+channelArr+',]';
	channelListArr=ccc.replace(ccc.substring(ccc.lastIndexOf(',')),']');
	

	
	//alert(channelListArr)

	//图片集
	//[{"imgUrl":"http://img2.imgtn.bdimg.com/it/u=1536207273,1509014297fm=21gp=0.jpg"}]

	var oImageUrl=$('.shopPhoto img');
	var imgArr=[];
	var a='';
	if(oImageUrl.length!=0){
		for(var i=0; i<oImageUrl.length; i++){
			a='{"imgUrl":"'+oImageUrl.eq(i).attr('src')+'"}';
			imgArr.push(a);
		}
	};
	var c='['+imgArr+',]';
	var imagesList=c.replace(c.substring(c.lastIndexOf(',')),']');
	//alert(imagesList);
	//提交数据
	var datas='data={"action":"subUserInfo","params":{"address":"'+oNowShopAddress+'","bulletin":"'+oShopNotice+'","channelList":'+channelListArr+',"coverImg":"'+oShopCover+'","imageList":'+imagesList+',"intor":"'+oShopIntro+'","latitude":"'+oPos[1]+'","longitude":"'+oPos[0]+'","name":"'+oShopname+'","qrCode":"'+oEwm+'","userSortList":[{"sortId":'+oSelecttype[0]+'}],"userSubSortList":[{"subSortId":'+oSelecttype[1]+'}],"tel":"'+oTel+'","tradeBeginTime":"'+oStartTime+'","tradeEndTime":"'+oEndTime+'","userId":'+userId+'},"source":"mobileweb","target":"user"}';

	//alert(datas);
	$.ajax({
		url:sell.requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				window.location.href='statustip.html';
			}else{
				alert(oData.responseMsg);
			}
		}
	})
})


//sell.getShopList();
sell.GetSortTreeList(function(cityData){
	//选择分类之后关闭 
	var cityData=cityData;
	(function($, doc) {
		$.init();
		$.ready(function() {
			//普通示例
			//-----------------------------------------
			//级联示例
			var cityPicker = new $.PopPicker({
				layer: 2
			});
			cityPicker.setData(cityData);
			var showCityPickerButton = doc.getElementById('shopClassfiy');
			var cityResult = doc.getElementById('selecttype');
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker.show(function(items) {
					cityResult.innerText = items[0].text + " " + items[1].text;
					cityResult.setAttribute('sortid',items[0].value+','+items[1].value);
					//返回 false 可以阻止选择框的关闭
				});
			}, false);
			//-----------------------------------------
		});
	})(mui, document);
});




document.getElementsByTagName('body')[0].style.height=document.body.offsetHeight+'px';

//第一步跳转
var one=document.getElementById('one');
var oCanvasWrapper=document.getElementById('offCanvasWrapper');
oNav=document.getElementById('nav');
oCanvasWrapper.style.height=document.body.offsetHeight+'px';

// document.getElementById('enter1').addEventListener('touchend',function(){
// 	one.style.transition='1.6s';
// 	one.style.transform='translateX(-100%)';
// 	oCanvasWrapper.style.opacity='1';
// 	oCanvasWrapper.style.zIndex='300';
// 	oNav.style.display='none';
// },false);



//展开分类
// var oShopClassfiy=document.getElementById('shopClassfiy');
// var oShopListClassfiy=document.getElementById('shopListClassfiy');
// oShopClassfiy.addEventListener('touchend',function(){
// 	oShopListClassfiy.style.transition='0.5s';
// 	oShopListClassfiy.style.transform="translateX(0%)";
// },false);


//上传图片

//nextstep 添加入驻商家
var oNextstep=document.getElementById('nextstep');
var oAddcanal=document.getElementById('addcanal');
//商户照片
var oShopPhoto=document.getElementsByClassName('shopPhoto')[0];
var nextstep2=document.getElementById('nextstep2');
var oShopCover=document.getElementById('shopCover');
bind(oNextstep,'touchend',function(){
	//判断条件
	if(oSelecttype.innerHTML==''){
		alert('请选择分类');
		return false;
	}else if(oShopPhoto.getElementsByTagName('img').length==0){
		alert('请上传商户图片');
		return false;
	}else if(oShopCover.innerHTML==''){
		alert('请上传商户封面图');
		return false;
	}

	oCanvasWrapper.style.opacity='0';
	oCanvasWrapper.style.zIndex='-300';
	oAddcanal.style.opacity='1';
	oAddcanal.style.zIndex='300';
	nextstep2.style.display='block';
});

var oAddqd=document.getElementsByClassName('addIcon')[0].children[0];
var oShlb=document.getElementById('shlb');
// oShlb.style.height=document.body.offsetHeight+'px';
var oQdLi=oShlb.getElementsByClassName('touchbtn');
var oFirst=document.getElementsByClassName('first')[0];

//选择渠道
var oShopurl=document.getElementsByClassName('shopurl')[0];

var oQdList=document.getElementsByClassName('qdList')[0];

ffff();
function ffff(){
	bind(oAddqd,'touchend',function(){
		oShlb.style.display='block';
		oAddcanal.style.opacity='0';
		oAddcanal.style.zIndex='-300';
	});
}


for(var i=0; i<oQdLi.length; i++){	
	(function(index){
		oQdLi[index].addEventListener('touchend',function(){
			var thisSrc=this;
			oShlb.style.display="none";
			var oUrl=thisSrc.parentNode.getElementsByTagName('img')[0].getAttribute('src');
			var shopName=thisSrc.innerText;
			//清除初始化页面提示
			oFirst.style.display='none';
			oQdList.innerHTML+='<div class="line-par"><div class="line-top">\
				<a href="javascript:;" class="qudaoname" qudaoname="'+shopName+'">'+shopName+'</a><span class="fr deleteShop">删除</span></div>\
				<div class="line-url clearfix"><img class="targetsrc" src="'+oUrl+'"><p class="targetUrl" style="text-align:right; color:#f00;">已选择</p></div></div>';
			nextstep2.style.display='block';
			oAddcanal.style.opacity='1';
			oAddcanal.style.zIndex='300';
			var oDeleteShop=document.getElementsByClassName('deleteShop');
			if(oDeleteShop.length>0){
				for(var i=0; i<oDeleteShop.length; i++){
					oDeleteShop[i].index=i;
					oDeleteShop[i].addEventListener('touchend',function(){
						this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
						//小于6个添加按钮显示
						if(oDeleteShop.length<6){
							oAddqd.parentNode.style.display='block';
						}
						if(oDeleteShop.length<=0){
							nextstep2.style.display='none';
							oFirst.style.display='block';
						}
					},false);
				}
			};
			//超过6个不能添加
			if(oDeleteShop.length>=6){
				oAddqd.parentNode.style.display='none';
			}
		},false);
	})(i)	
	
};

function stopTouchendPropagationAfterScroll(){
    var locked = false;
    window.addEventListener('touchmove', function(ev){
        locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
    }, true);
    function stopTouchendPropagation(ev){
        ev.stopPropagation();
        window.removeEventListener('touchend', stopTouchendPropagation, true);
        locked = false;
    }
}



//地图加载 


//106.407701  27.79837




var clickOpenMap=document.getElementById('clickOpenMap');

var oMaps=document.querySelectorAll('.maps')[0];


var backMaps=document.getElementsByClassName('backMaps')[0].children[0];

clickOpenMap.addEventListener('touchend',function(){
	//alert(123)
	oMaps.style.height=document.body.clientHeight+50+'px';
	oMaps.style.opacity='1';
	oMaps.style.zIndex='330';
	
},false);

backMaps.addEventListener('touchend',function(){
	oMaps.style.opacity='0';
	oMaps.style.zIndex='-300';
})


// var sureOneQdBack=document.getElementById('sureOneQdBack');
// sureOneQdBack.addEventListener('touchend',function(){
// 	oShlb.style.display="block";
// 	//oShopurl.style.display="none";
// },false);




//确定一个渠道
//var oSureOneQd=document.getElementById('sureOneQd');


// oSureOneQd.addEventListener('touchend',function(){
// 	//清除初始化页面提示
// 	oFirst.style.display='none';
// 	oShopurl.style.display="none";
// 	oQdList.innerHTML+='<div class="line-par"><div class="line-top">\
// 		<span class="fr deleteShop">删除</span><a class="fr showHome" target="_blank" href="'+addUrlText.value+'">预览</a></div>\
// 		<div class="line-url clearfix"><img class="targetsrc" src="'+addLabelImg.getAttribute('src')+'"><p class="targetUrl">http://'+addUrlText.value+'</p></div></div>';
// 	nextstep2.style.display='block';
// 	oAddcanal.style.opacity='1';
// 	oAddcanal.style.zIndex='300';
// 	var oDeleteShop=document.getElementsByClassName('deleteShop');
// 	if(oDeleteShop.length>0){
// 		for(var i=0; i<oDeleteShop.length; i++){
// 			oDeleteShop[i].index=i;
// 			oDeleteShop[i].addEventListener('touchend',function(){
// 				this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
// 				//小于6个添加按钮显示
// 				if(oDeleteShop.length<6){
// 					oAddqd.parentNode.style.display='block';
// 				}
// 				if(oDeleteShop.length<=0){
// 					nextstep2.style.display='none';
// 					oFirst.style.display='block';
// 				}
// 			},false);
// 		}
// 	};

// 	//超过6个不能添加
// 	if(oDeleteShop.length>=6){
// 		oAddqd.parentNode.style.display='none';
// 	}
// },false);



var shopinfo=document.getElementById('shopinfo');
var startTime=document.getElementById('startTime');
var endTime=document.getElementById('endTime');
var tel=document.getElementById('tel');
nextstep2.addEventListener('touchend',function(){
	setTimeout(function(){
		tel.focus();
		shopinfo.style.display='block';
		oAddcanal.style.opacity='0';
		oAddcanal.style.zIndex='-300';
	},200)
},false)


//验证商家信息



var shopNotice=document.getElementById('shopNotice');
var applyBtn=document.getElementById('applyBtn');
var shopIntro=document.getElementById('shopIntro');
var shopname=document.getElementById('shopname')



// checkbox.addEventListener('touchend',function(){
// 	if(this.checked==true){
// 		applyBtn.style.display='none';  // n=n-1; 
// 	}else{
// 		applyBtn.style.display='block';
// 	}
// },false);

try{
applyBtn.addEventListener('touchend',function(){
	var checkbox=document.getElementById('checkbox');
	if(checkbox.checked==false){
		alert("请阅读商户协议，并勾选");
		return false;
	}
	if(endTime.value.length<=4){
		alert('请填写商户营业时间！');
		return false;
	}
	if(tel.value==''){
		alert('请填写商户联系电话！');
		return false;
	}
	if(shopname.value==''){
		alert('请填写商户名称,以后不可修改！');
		return false;
	}
	if(shopNotice.value.length>30){
		alert('商户公告不超过30字！');
		return false;
	}else if(shopIntro.value.length>100){
		alert('商户介绍不超过100字！');
		return false;
	}
	var oNowShopAddress=$('#nowShopAddress').val().substring(5);
	var oShopNotice=$('#shopNotice').val();
	var oShopIntro=$('#shopIntro').val();
	var oShopname=$('#shopname').val();
	var oEwm=$('#ewmWrap img').attr('src');
	var oShopCover=$('#shopCover img').attr('src');
	var oTel=$('#tel').val();
	var oStartTime=$('#startTime').val();
	var oEndTime=$('#endTime').val();
	var oPos=$('body').attr('pos').split(',');
	var oSelecttype=$('#selecttype').attr('sortid').split(',');

	if(oEwm==undefined){
		oEwm='';
	}
	// 渠道 [{"linkName":"外卖超人","linkUrl":"http://img2.imgtn.bdimg.com/it/u=1536207273,1509014297fm=21gp=0.jpg"}]

	var channelListArr='';
	var setJson='';
	var channelArr=[];
	for(var j=0; j<$('.line-par').length; j++){
		var name=$('.line-par').eq(j).find('.qudaoname').attr('qudaoname');
		var src=$('.line-par').eq(j).find('.targetsrc').attr('src');
		setJson='{"linkName":"'+name+'","linkUrl":"","note":"'+src+'"}';
		channelArr.push(setJson);
	}
	var ccc='['+channelArr+',]';
	channelListArr=ccc.replace(ccc.substring(ccc.lastIndexOf(',')),']');
	//图片集
	var oImageUrl=$('.shopPhoto img');
	var imgArr=[];
	var a='';
	if(oImageUrl.length!=0){
		for(var i=0; i<oImageUrl.length; i++){
			a='{"imgUrl":"'+oImageUrl.eq(i).attr('src')+'"}';
			imgArr.push(a);
		}
	};
	var c='['+imgArr+',]';
	var imagesList=c.replace(c.substring(c.lastIndexOf(',')),']');
	//提交数据
	var datas='data={"action":"userSettled","params":{"address":"'+oNowShopAddress+'","bulletin":"'+oShopNotice+'","channelList":'+channelListArr+',"coverImg":"'+oShopCover+'","imageList":'+imagesList+',"intor":"'+oShopIntro+'","latitude":"'+oPos[1]+'","longitude":"'+oPos[0]+'","name":"'+oShopname+'","qrCode":"'+oEwm+'","userSortList":[{"sortId":'+oSelecttype[0]+'}],"userSubSortList":[{"subSortId":'+oSelecttype[1]+'}],"tel":"'+oTel+'","tradeBeginTime":"'+oStartTime+'","tradeEndTime":"'+oEndTime+'","userId":'+userId+'},"source":"mobileweb","target":"user"}';
	//alert(datas);
	$.ajax({
		url:sell.requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				window.location.href='statustip.html';
			}else{
				alert(oData.responseMsg);
				// window.location.href='statustip.html';
			}
		}
	})

},false);

}catch(e){
	alert(e)
}

