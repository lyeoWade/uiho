
function UihoForRenhuai(){
	this.requrl='http://bdbbiz.wego58.com/info/InfoServlet';
	this.TreeList='';
}
//获取商户信息
UihoForRenhuai.prototype.getOneShop=function(userId,fnCall){
	var _this=this.requrl;
	var This=this;
	var datas='data={"action":"userInfo","params":'+userId+',"source":"mobileweb","target":"user"}';
	this.AjaxSend(_this,function(data){
		This.loading();
	},datas,function(str){
		This.removeLoading(); 
		//var oData=$.parseJSON(str);
		var oData=eval('('+str+')');
		//console.log(oData);
		if(oData.responseCode==1){
			$('.sell-logo').html('<i class="mui-icon mui-icon-compose"></i><img class="getfile1" imageType="coverImg" src="'+oData.object.coverImg+'"/>');
			$('.sell-head-cinfo').html('<h1>'+oData.object.name+'</h1><p>剩余'+oData.object.expirationDays+'天到期</p>');
			$('body').attr('pos',oData.object.longitude+','+oData.object.latitude)
			$('#address span').html(oData.object.address);
			$('.nowAddress').html('<i class="mui-icon mui-icon-location"></i>'+oData.object.address).attr('newAddress',oData.object.address);
			$('#notice span').html(oData.object.bulletin);

			$('#tel').html('<i class="tel"></i><span key="tel">'+oData.object.tel+'</span><em class="updata" style="">编辑</em>\
						<em class="saveUserInfo mui-icon mui-icon-checkmarkempty" style="display: none"></em>');

			$('#time').html('<i class="time"></i>营业时间：<input type="time" class="sTime" value="'+oData.object.tradeBeginTime+'" name="" disabled>-<input type="time" name="" value="'+oData.object.tradeEndTime+'" class="eTime" disabled><em class="updata" style="">编辑</em>\
				<em class="saveUserInfo mui-icon mui-icon-checkmarkempty" style="display: none"></em>');

		

			var oChannel=oData.object.channelList,oChannelHtml='';
			if(oChannel!=undefined){
				for(var i=0; i<oChannel.length; i++){
					oChannelHtml+='<li><a href="'+oChannel[i].linkUrl+'" target="_blank"><i style="background: url('+oChannel[i].note+') no-repeat center center; background-size: 94%;"></i>'+oChannel[i].linkName+'</a>\
					<a href="'+oChannel[i].linkUrl+'" class="fr" style="text-align:center; border:0.01rem solid #f1f1f1;">点击查看</a></li>';
				}
				$('.siteList').html(oChannelHtml);
			}else{
				$('.entershop span').html('本店即将接入')
			}

			

			var oImageList='';
			for(var i=0; i<oData.object.imageList.length; i++){
				oImageList+='<span><i class="mui-icon mui-icon-compose"></i><img imageType="imageList" style="margin:0;" imageId="'+oData.object.imageList[i].imageId+'"  picsId="'+oData.object.imageList[i].picsId+'" class="getfile'+(i+2)+'" src="'+oData.object.imageList[i].imgUrl+'"></span>';
			};

			$('.picList').html(oImageList);
			$('.ewmWrap').html('<span><i class="mui-icon mui-icon-compose"></i><img class="getfile4" imageType="qrCode" src="'+oData.object.qrCode+'"/></span><p>'+oData.object.name+'</p>');
			fnCall&&fnCall(oData);

		}else{
			//document.write('');
			//alert(oData.responseMsg);
			window.location.href="sellenter.html";
		}
		//console.log(oData);
	});
};

//{"action":"updateUserResidentInfo","datetime":1464773243511,"params":{"residentDay":30,"userId":2},"source":"backstage","target":"user"}

UihoForRenhuai.prototype.GetHomeBannerList=function(type,fnCall){
	var _this=this.requrl;
	var datas='data={"action":"getBannerList","params":{"nowPage":1,"pageSize":5,"type":"'+type+'"},"source":"mobileweb","target":"banner"}';
	this.Ajax(_this,datas,function(str){
		//var oData=$.parseJSON(str);
		var oData=eval('('+str+')');
		if(oData.responseCode==0){
			$('#homebanner').html("<p style='line-height:50px; text-align:center;'>暂无数据</p>");
			fnCall&&fnCall(oData);
		}else{
			var dotHtml='',bannerHtml='',bannerfirst='',bannerLast='';
			for(var i=0; i<oData.object.length; i++){
				bannerHtml+='<div class="mui-slider-item"><a href="'+oData.object[i].linkUrl+'"><img src="'+oData.object[i].coverImg+'"></a></div>';

				bannerLast='<div class="mui-slider-item mui-slider-item-duplicate"><a href="'+oData.object[0].linkUrl+'"><img src="'+oData.object[0].coverImg+'"></a></div>';
				bannerfirst='<div class="mui-slider-item mui-slider-item-duplicate"><a href="'+oData.object[oData.object.length-1].linkUrl+'"><img src="'+oData.object[oData.object.length-1].coverImg+'"></a></div>';
			}
			$('#homebanner').html(bannerfirst+bannerHtml+bannerLast);

			for(var j=0; j<oData.object.length-1;j++){
				dotHtml+='<div class="mui-indicator"></div>';
			}
			$('.mui-slider-indicator').html('<div class="mui-indicator mui-active"></div>'+dotHtml);
			console.log(oData)

			fnCall&&fnCall(oData);
		}
		
		
	});
};
UihoForRenhuai.prototype.GetSortList=function(fnCall){
	var _this=this.requrl;
	var datas='data={"action":"getSortList","params":{"nowPage":1,"pageSize":80},"source":"mobileweb","target":"sort"}';
	this.Ajax(_this,datas,function(str){

		//console.log(str)
		var oData=eval('('+str+')');
		//console.log(oData)
		
		var itemHtml='',iHtml='',flterDownHtml='',btnHtml='';
		var num=Math.ceil(oData.object.length/8);
		
		for(var j=0; j<num; j++){

			var SortListHtml='';
			var Maxn=8*(1+j);
			if(Maxn>oData.object.length){
				Maxn=oData.object.length;
			}
			
			for(var k=8*j; k<Maxn; k++){
				SortListHtml+='<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3"><a href="classify.html?sortId='+oData.object[k].sortId+'&title='+oData.object[k].title+'"><span class="mui-icon" style=" background: url('+oData.object[k].imgUrl+') no-repeat center center; background-size: 80%;"></span><div class="mui-media-body mt0">'+oData.object[k].title+'</div></a></li>';
			}
			iHtml+='<div class="mui-slider-item"><ul class="mui-table-view mui-grid-view mui-grid-9">'+SortListHtml+'</ul></div>';

			btnHtml+='<div class="mui-indicator"></div>';
		};
		//console.log(iHtml);
		$('#sortListWrap').html(iHtml);
		for(var i=0; i<oData.object.length; i++){
			flterDownHtml+='<em href="javascript:;" typeC="1" sortId="'+oData.object[i].sortId+'">'+oData.object[i].title+'</em>';
		};


		$('#Gallery').append('<div class="mui-slider-indicator">'+btnHtml+'</div>')
		$('.sortWrap').html(flterDownHtml);
		fnCall&&fnCall();
	});
}
//获取子分类
UihoForRenhuai.prototype.GetSonSortList=function(sortId,fnCall){
	var _this=this.requrl;
	var datas='data={"action":"getSubSortList","params":{"nowPage":1,"pageSize":20,"sortId":'+sortId+'},"source":"mobileweb","target":"subSort"}';

	this.Ajax(_this,datas,function(str){
		//var oData=$.parseJSON(str);
		var oData=eval('('+str+')');
			//console.log(oData)
		if(oData.responseCode==0){
			$('.SonSortWrap').html("暂无数据");
		}else{
			var SortListHtml='';
			for(var i=0; i<oData.object.length; i++){
				//alert(sortId)
				SortListHtml+='<a href="sonclassify.html?sortId='+sortId+'&subSortId='+oData.object[i].subSortId+'&title='+oData.object[i].title+'" typeC="1" subsortid="'+oData.object[i].subSortId+'">'+oData.object[i].title+'</a>';
			}
			$('.SonSortWrap').html(SortListHtml);
			fnCall&&fnCall();
		}
	});
}
UihoForRenhuai.prototype.GetSortTreeList=function(fnCall){
	var _this=this.requrl,This=this;

	var datas='data={"action":"getSortList","params":{"nowPage":1,"pageSize":30},"source":"mobileweb","target":"sort"}';
	This.Ajax(_this,datas,function(str){
		//var oData=$.parseJSON(str);
		var oData=eval('('+str+')');
		var SortListHtml='';

		var cityData=[];

		for(var i=0; i<oData.object.length; i++){
			var sonWrapHtml='';
			var SortJson='';
			var datas='data={"action":"getSubSortList","params":{"nowPage":1,"pageSize":30,"sortId":'+oData.object[i].sortId+'},"source":"mobileweb","target":"subSort"}';
			$.ajax({
				url:_this,
				type:"POST",
				async:false,
				data:datas,
				success:function(str){
					var oData2=$.parseJSON(str);
					if(oData2.responseCode==1){
						var sonJson=[];
						for(var j=0; j<oData2.object.length; j++){
							sonJson.push('{value: "'+oData2.object[j].subSortId+'",text: "'+oData2.object[j].title+'"}');
						};
						if(sonJson==''){
							sonWrapHtml='';
						}else{
							sonWrapHtml='children:['+sonJson+']';
						}
						
						//console.log(sonJson)
					}
				}
			})

			//SortJson
			cityData.push('{value: "'+oData.object[i].sortId+'",text: "'+oData.object[i].title+'",'+sonWrapHtml+'}');
		};
		var d=eval('['+cityData+']');
		fnCall&&fnCall(d);
	});
}
//商户商户信息
UihoForRenhuai.prototype.sellInfo=function(browseUserId,userId,fnCall){
	var _this=this.requrl;

	var datas='data={"action":"getUser","params":{"browseUserId":'+browseUserId+',"userId":"'+userId+'"},"source":"mobileweb","target":"user"}';
	var This=this;
	this.AjaxSend(_this,function(data){
		This.loading();
	},datas,function(str){
		//var oData=$.parseJSON(str);
		var oData=eval('('+str+')');
		console.log(oData);
		This.removeLoading();
		if(oData.responseCode==1){
			$('.sell-logo img').attr('src',oData.object.coverImg);
			$('.sell-head-info').html('<h1>'+oData.object.name+'</h1>');
			//<p class="fr">还有'+oData.object.residentDay+'天到期</p>
			$('.sell-head-handwrap').html('<a href="recoveryerror.html?correctionUserId='+oData.object.userId+'">我要纠错</a><a href="sellenter.html">我要入驻</a>');
			$('#address').html(oData.object.address);


			$('#notice').html(oData.object.bulletin);
			$('#tel').html('<i class="tel"></i>'+oData.object.tel.replace(/\D/g,' ')+'<a href="tel:'+oData.object.tel+'" class="fr">点击拨打</a>');
			$('#time').html('<i class="time"></i>营业时间：'+oData.object.tradeBeginTime+'-'+oData.object.tradeEndTime);

			var oChannel=oData.object.channelList,oChannelHtml='';
			if(oChannel!=undefined){
				for(var i=0; i<oChannel.length; i++){
					//alert(JSON.stringify(oChannel));
					oChannelHtml+='<li><i class="" style="background:url('+oChannel[i].note+') no-repeat; background-size:90%; "></i>'+oChannel[i].linkName+'<a href="'+oChannel[i].linkUrl+'" class="fr">点击查看</a></li>';
				}
				$('.siteList').html(oChannelHtml);
			}else{
				$('.entershop span').html('本店即将接入')
			}

			$('.intor').html(oData.object.intor);
			$('body').attr("sortId",oData.object.userSortList[0].sortId+','+oData.object.userSubSortList[0].subSortId);
			if(oData.object.qrCode==undefined){

			}else{
				$('.homewx').html('<img src="'+oData.object.qrCode+'"><p>'+oData.object.name+'</p>')
			};

			$('title').html(oData.object.name);

			if(oData.object.imageList==undefined){
				$('.imgList ').html('还未上传图片');
			}else{
				var oImageList='';
				for(var i=0; i<oData.object.imageList.length; i++){
					oImageList+='<img src="'+oData.object.imageList[i].imgUrl+'" data-preview-src="" data-preview-group="1">';
				}
				$('.imgList ').html(oImageList);
			};
			//地图
			var longitude=oData.object.longitude;
			var latitude=oData.object.latitude;
			var map = new BMap.Map("allmapsss");

			map.centerAndZoom(new BMap.Point(longitude,latitude),17);  //初始化地图,设置城市和地图级别。
			var point = new BMap.Point(longitude,latitude);  
			var markerB = new BMap.Marker(point);// 创建标注
			map.panBy(160,160);
			map.addOverlay(markerB);
			//markerB.enableDragging();             // 将标注添加到地图中

			var label = new BMap.Label(oData.object.name,{offset:new BMap.Size(20,-10)});
			markerB.setLabel(label);
			$('.ewmWrap img').attr('src',oData.object.qrCode);
			fnCall&&fnCall();
		}else{
			//document.write('')
			//alert(JSON.stringify(oData))
			alert(oData.responseMsg);
			window.location.href="index.html";
		}
		//console.log(oData);
	});
};

//8个分类页面
UihoForRenhuai.prototype.GetOneClassifySortList=function(sortId,isRecommend,isrecent,subSortId,latitude,longitude,nowPage,pageSize,fnCall){
	var _this=this.requrl;
	var This=this;

	var datas='data={"action":"getUserList","params":{"sortId":"'+sortId+'","subSortId":"'+subSortId+'","isRecommend":"'+isRecommend+'","isRecent":"'+isrecent+'","latitude":"'+latitude+'","longitude":"'+longitude+'","nowPage":"'+nowPage+'","pageSize":"'+pageSize+'"},"source":"mobileweb","target":"user"}';
	this.Ajax(_this,datas,function(str){

		console.log(str)
		var oData=eval('('+str+')');
		if(oData.responseCode==0){
			$('#ListWrap').append("<p style='line-height:50px; text-align:center;'>加载完成,没有更多了</p>");
			$('.moreWrap').css('display','none');
		}else{
			$('.moreWrap').css('display','block');
			var SortListHtml='';
			for(var i=0; i<oData.object.length; i++){
				var channelListHtml='';
				var len=0;
				var cHtml='';


				if(oData.object[i].channelList==undefined){
					//console.log(oData.object[i].channelList);
					cHtml=channelListHtml;
				}else{
					if(oData.object[i].channelList.length>=3){
						len=3;
					}else{
						len=oData.object[i].channelList.length;
					}
					for(var j=0; j<len; j++){
						channelListHtml+='<a href="'+oData.object[i].channelList[j].linkUrl+'"><img src="'+oData.object[i].channelList[j].note+'"></a>';
					}
					cHtml='本店已入驻'+channelListHtml;
				}
				

				var targetUri='';
				if(oData.object[i].isExpiration==1){
					targetUri='href="javascript:;" isEnd="end"';
				}else{
					targetUri='href="seller.html?id='+oData.object[i].userId+'"';
				}
				
				SortListHtml+='<li><div class="listdetail clearfix">\
					<a '+targetUri+' class="imgwrap fl"><img src="'+oData.object[i].coverImg+'"></a>\
					<div class="fl"><h3><a '+targetUri+'>'+oData.object[i].name+'</a></h3>\
					<p>'+cHtml+'</p></div></div><span class="km ">'+oData.object[i].distance+'km</span>\
					<div class="marquee">\
						<i></i><div class="scrollNote"><div class="marqueeWrap"><span>'+oData.object[i].bulletin+'</span></div></div></div></li>';
			}
			$('#ListWrap').append(SortListHtml);
			$('#addMore').attr('count',nowPage);
			fnCall&&fnCall(oData);
		
			setTimeout(function(){
				This.noteScroll();
			},4000);

			$("#addMore").unbind('click');
			$('#addMore').on('click',function(){
				var newPage=parseInt($('#addMore').attr('count'))+1;
				$('#addMore').attr('count',newPage);
				This.GetOneClassifySortList(sortId,isRecommend,isrecent,subSortId,latitude,longitude,newPage,pageSize,fnCall);
			});


			$('a[isEnd="end"]').parents('li').find('a').attr('href','javascript:;').end().on('click',function(){
				alert("您查看的商家未续费！");
			});
		};
	});
}

UihoForRenhuai.prototype.GetNearbySSS=function(nowPage,pageSize,name,lat,lng,fnCall){


	var _this=this.requrl;

	var datas='data={"action":"getUserList","params":{"isRecent":"1","nowPage":'+nowPage+',"pageSize":'+pageSize+',"name":"'+name+'","latitude":"'+lat+'","longitude":"'+lng+'"},"source":"mobileweb","target":"user"}';

	this.Ajax(_this,datas,function(str){
		//console.log(eval('('+str+')'));
		var oData=eval('('+str+')');
		
		if(oData.responseCode==0){
			$('#ListWrap').html("<p style='line-height:50px; text-align:center;'>暂无数据</p>");
			fnCall&&fnCall(oData);
		}else{
			var SortListHtml='';
			for(var i=0; i<oData.object.length; i++){
				var channelListHtml='',cHtml='';
				var len=0;
				if(oData.object[i].channelList==undefined){
					console.log(oData.object[i].channelList);
					cHtml=channelListHtml;
				}else{
					if(oData.object[i].channelList.length>=3){
						len=3;
					}else{
						len=oData.object[i].channelList.length;
					}
					for(var j=0; j<len; j++){
						channelListHtml+='<a href="'+oData.object[i].channelList[j].linkUrl+'"><img src="'+oData.object[i].channelList[j].note+'"></a>';
					}
					cHtml='本店已入驻'+channelListHtml;
				}
				for(var j=0; j<len; j++){
					channelListHtml+='<a href="'+oData.object[i].channelList[j].linkUrl+'"><img src="'+oData.object[i].channelList[j].note+'"></a>';
				}
				SortListHtml+='<li><div class="listdetail clearfix">\
						<a href="seller.html?id='+oData.object[i].userId+'" class="imgwrap fl"><img src="'+oData.object[i].coverImg+'"></a>\
						<div class="fl"><h3><a href="seller.html?id='+oData.object[i].userId+'">'+oData.object[i].name+'</a></h3>\
							<p>'+cHtml+'</p></div>\
						<span class="km ">'+oData.object[i].distance+'km</span></div>\
					<div class="marquee">\
						<i></i><span>'+oData.object[i].bulletin+'</span></div></li>';
			}
			$('#ListWrap').html(SortListHtml);

			fnCall&&fnCall(oData);
		}
	});
};
//猜你喜欢
UihoForRenhuai.prototype.getRandomUserList=function(lat,lng,fnCall){
	var _this=this.requrl;
	var datas='data={"action":"getRandomUserList","params":{"isRecent":"1","nowPage":1,"pageSize":20,"latitude":"'+lat+'","longitude":"'+lng+'"},"source":"mobileweb","target":"user"}';
	var This=this;
	this.Ajax(_this,datas,function(str){
		//var oData=$.parseJSON(str);
		var oData=eval('('+str+')');
		console.log(oData)
		if(oData.responseCode==0){
			$('#ListWrap').html("<p style='line-height:50px; text-align:center;'>暂无数据</p>");
		}else{
			var SortListHtml='';
			for(var i=0; i<oData.object.length; i++){
				
				var channelListHtml='';
				var len=0;
				var cHtml='';
				if(oData.object[i].channelList==undefined){
					console.log(oData.object[i].channelList);
					cHtml=channelListHtml;
				}else{
					if(oData.object[i].channelList.length>=3){
						len=3;
					}else{
						len=oData.object[i].channelList.length;
					}
					for(var j=0; j<len; j++){
						channelListHtml+='<a href="'+oData.object[i].channelList[j].linkUrl+'"><img src="'+oData.object[i].channelList[j].note+'"></a>';
					}
					cHtml='本店已入驻'+channelListHtml;
				} 
				var targetUri='';
				if(oData.object[i].isExpiration==1){
					targetUri='href="javascript:;" isEnd="end"';
				}else{
					targetUri='href="seller.html?id='+oData.object[i].userId+'"';
				}
					
				SortListHtml+='<li><div class="listdetail clearfix">\
					<a '+targetUri+' class="imgwrap fl"><img src="'+oData.object[i].coverImg+'"></a>\
					<div class="fl"><h3><a '+targetUri+'>'+oData.object[i].name+'</a></h3>\
					<p>'+cHtml+'</p></div></div><span class="km ">'+oData.object[i].distance+'km</span>\
					<div class="marquee">\
						<i></i><div class="scrollNote"><div class="marqueeWrap"><span>'+oData.object[i].bulletin+'</span></div></div></div></li>';


			};
			$('#ListWrap').html(SortListHtml);
			fnCall&&fnCall(oData);
			$('a[isEnd="end"]').parents('li').find('a').attr('href','javascript:;').end().on('touchend',function(){
				alert("您查看的商家未续费！");
			});
			This.noteScroll();

		}
	});
}
//获取入驻申请首页的商家列表
UihoForRenhuai.prototype.getShopList=function(fnCall){
	var _this=this.requrl;
	
	var datas='data={"action":"getUserList","params":{"nowPage":1,"pageSize":9},"source":"mobileweb","target":"user"}';
	//alert(datas);

	this.Ajax(_this,datas,function(str){
		//var oData=$.parseJSON(str);
		var oData=eval('('+str+')');
		console.log(oData)
		if(oData.responseCode==0){
			$('.endEnterShop').html("<p style='line-height:50px; text-align:center;'>暂无数据</p>");
		}else{
			var SortListHtml='';
			for(var i=0; i<oData.object.length; i++){

				SortListHtml+='<li><a href="seller.html?id='+oData.object[i].userId+'" ><img src="'+oData.object[i].coverImg+'"><span>'+oData.object[i].name+'</span></a></li>';

			}
			$('.endEnterShop').html(SortListHtml);

			fnCall&&fnCall(oData);
		}
	});
};
//获取历史记录
UihoForRenhuai.prototype.GetHistory=function(UserId,fnCall){
	var _this=this.requrl;
	var datas='data={"action":"getHistoryList","params":{"nowPage":1,"pageSize":20,"userId":'+UserId+'},"source":"mobileweb","target":"history"}';
	var This=this;
	this.Ajax(_this,datas,function(str){
		//var oData=$.parseJSON(str);
		var oData=eval('('+str+')');
		console.log(oData)

		if(oData.responseCode==0){
			$('#nocontent').css('display','block');
		}else{
			var SortListHtml='';
			for(var i=0; i<oData.object.length; i++){
				SortListHtml+='<li class="mui-table-view-cell mui-media"><a href="javascript:;">\
					<img class="mui-media-object mui-pull-left" src="'+oData.object[i].browseUserCoverImg+'"><div class="mui-media-body">'+oData.object[i].browseUserName+'\
						<p class="mui-ellipsis">浏览时间:'+This.DetailTimesTamp(oData.object[i].createDatetime)+'</p></div></a></li>';
			}
			$('#historyListWrap').html(SortListHtml+'<a href="javascript:;" id="clearHistory">清空浏览记录</a>');
			$('#historyListWrap ~ a').css('display','block');
			fnCall&&fnCall();
		}
		
	});
}
UihoForRenhuai.prototype.deleteHistory=function(UserId,fnCall){
	var _this=this.requrl;
	var datas='data={"action":"clearHistory","params":'+UserId+',"source":"mobileweb","target":"history"}';
	var This=this;
	this.Ajax(_this,datas,function(str){
		var oData=$.parseJSON(str);
		console.log(oData);

		if(oData.responseCode==0){
			alert(oData.responseMsg);
		}else{
			$('#historyListWrap').css('display','none')
			$('#nocontent').css('display','block');
			fnCall&&fnCall();
		}
		
	});
};

UihoForRenhuai.prototype.GetSearchKeywordList=function(fnCall){
	var _this=this.requrl;
	var datas='data={"action":"getKeywordList","params":{"nowPage":1,"pageSize":12},"source":"mobileweb","target":"keyword"}';
	var This=this;
	this.Ajax(_this,datas,function(str){
		var oData=$.parseJSON(str);
		console.log(oData)

		if(oData.responseCode==0){
			$('#nocontent').css('display','block');
		}else{
			var SortListHtml='';
			for(var i=0; i<oData.object.length; i++){
				SortListHtml+='<a href="javascript:;">'+oData.object[i].name+'</a>';
			}
			$('.hotwrap').html(SortListHtml);
			fnCall&&fnCall();
		}
		
	});
	
}

UihoForRenhuai.prototype.GetSearchHistoryList=function(userId,fnCall){
	var Url=this.requrl;
	var datas='data={"action":"getSearchList","params":{"nowPage":1,"pageSize":10,"userId":'+userId+'},"source":"mobileweb","target":"search"}';

	this.AjaxSend(Url,function(){
		$('.zuijin').html('<p style="line-height:50px; text-align:center; color:#999;">加载中,请稍后...</p>');
	},datas,function(str){
		var oData=$.parseJSON(str);
		if(oData.responseCode==0){
			$('#nocontent').css('display','block');
			$('.zuijin').html('<p style="line-height:50px; text-align:center; color:#999;">暂无搜索记录</p>');
		}else{
			var SortListHtml='';
			for(var i=0; i<oData.object.length; i++){
				SortListHtml+='<a href="javascript:;">'+oData.object[i].content+'</a>';
			}
			$('.zuijin').html(SortListHtml);
			fnCall&&fnCall();
		}
	});
}

UihoForRenhuai.prototype.clearSearchHistory=function(userId,fnCall){
	var Url=this.requrl;
	var datas='data={"action":"clearSearch","params":'+userId+',"source":"mobileweb","target":"search"}';
	this.AjaxSend(Url,function(){
		$('.zuijin').html('<p style="line-height:50px; text-align:center; color:#999;">清除中,请稍后...</p>')
	},datas,function(str){
		var oData=$.parseJSON(str);
		if(oData.responseCode==0){
			$('#nocontent').css('display','block');
			$('.zuijin').html('<p style="line-height:50px; text-align:center; color:#999;">暂无搜索记录</p>');
		}else{
			$('.zuijin').html('<p style="line-height:50px; text-align:center; color:#999;">暂无搜索记录</p>')
			fnCall&&fnCall();
		}
	});
};

UihoForRenhuai.prototype.xdt=function(){
	var oBox=document.getElementsByClassName('filterBar')[0];
	var oPos=document.getElementsByClassName('xdtdiv')[0];
	var t=getPos(oBox).top;
	window.onscroll=function()
	{
		var _scroll=document.documentElement.scrollTop||document.body.scrollTop;
		if(_scroll>=t){
			oBox.style.position='fixed';
			oBox.style.top='0';
			oBox.style.left='0';
			oPos.style.display='block';	
		}else{
			oBox.style.position='';
			oPos.style.display='none';	
		}	
	};
}



UihoForRenhuai.prototype.noteScroll=function (){
	var scrollNote=document.getElementsByClassName('scrollNote');

	var len=scrollNote.length;
	for(var i=0; i<len; i++){
		(function(index){
			var oMarqueeWrap=scrollNote[index].getElementsByClassName('marqueeWrap')[0];
			clearInterval(oMarqueeWrap.timer)
			var oSpan=scrollNote[index].getElementsByTagName('span');
			if(scrollNote[index].offsetWidth<=oMarqueeWrap.offsetWidth){
				oMarqueeWrap.innerHTML+=oMarqueeWrap.innerHTML;
				var W=oSpan[0].offsetWidth*oSpan.length;
				oMarqueeWrap.style.width=W+'px';
				oMarqueeWrap.timer=setInterval(function(){
					var left=oMarqueeWrap.offsetLeft-1; // 
					oMarqueeWrap.style.left=left%W+'px';
				}, 30);
			}
		})(i)
		
	}
}

UihoForRenhuai.prototype.editor=function(obj){
	var editor = obj;
	editor.onfocus = function () {
	  window.setTimeout(function () {
	    var sel,range;
	    if (window.getSelection && document.createRange) {
	      range = document.createRange();
	      range.selectNodeContents(editor);
	      range.collapse(true);
	      range.setEnd(editor, editor.childNodes.length);
	      range.setStart(editor, editor.childNodes.length);
	      sel = window.getSelection();
	      sel.removeAllRanges();
	      sel.addRange(range);
	    } else if (document.body.createTextRange) {
	      range = document.body.createTextRange();
	      range.moveToElementText(editor);
	      range.collapse(true);
	      range.select();
	    }
	  }, 1);
	}

	editor.focus()
}






//取得经纬度

UihoForRenhuai.prototype.jjj=function(locationSuccess){
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(locationSuccess, locationError,{
	        // 指示浏览器获取高精度的位置，默认为false
	        enableHighAccuracy: true,
	        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
	        timeout: 5000,
	        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
	        maximumAge: 3000
	    });
	}else{
	    alert("不好意思，你的浏览器不支持html5定位");
	}

	// function locationSuccess(position){
	// 	var coords = position.coords;    
	// 	//alert(coords.latitude+'-'+coords.longitude);
	// 	//alert(123);
	// 	lat=coords.latitude;
	// 	// return {
	// 	// 	lat:coords.latitude,
	// 	// 	lng:coords.longitude
	// 	// }
	// };

	function locationError(error){
	    switch(error.code) {
	        case error.TIMEOUT:
	            alert("获取当前位置超时,请重试！！！");
	            break;
	        case error.POSITION_UNAVAILABLE:
	            alert('不能获取您当前的位置！！！');
	            break;
	        case error.PERMISSION_DENIED:
	            alert('请打开GPS以便于我们获取您当前的位置！！！');
	            break;
	        case error.UNKNOWN_ERROR:
	            alert('未知的错误！！！');
	            break;
	    }
	}


}

// 选择文件
function fileSelected(obj,fn) {
  var file = obj.get(0).files[0];
  var fileSize = 0;
  if (file) {
    if (file.size > 1024 * 1024){
    	fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
  		//alert("文件太大," + fileSize);
  		//return false;
    }else{
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
    };
    fn&&fn(file.name);
  }
};
// 文件上传
function uploadFile(f,fnsuc) {
  var fd = new FormData();

  fd.append("fileInput", f);
  console.log(f);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", fnsuc, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", "http://m.wego58.com/resx/StroageServlet");
  xhr.send(fd);
  console.log(fd);
}

//前端删除上传的图片
function deletenewimage(){
	$('.newimage').on('click',function(){
		if(!$('.newimage').attr('websiteImg')){ //如果不是修改
			$(this).parents('.imgwarp').remove();
		}
	})
}

function uploadFile2(f,fnsuc) {
  var fd = new FormData();
  fd.append("fileInput", convertBase64UrlToBlob(f),"image.png");
  console.log(convertBase64UrlToBlob(f));
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", fnsuc, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", "http://m.wego58.com/resx/StroageServlet");
  xhr.send(fd);
  console.log(fd);
}


function sumitImageFile(base64Codes,fnsuc){
    
    var formData = new FormData();   
    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    formData.append("fileInput",convertBase64UrlToBlob(base64Codes),"image.png");  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同  ,"image.png" is important 
    
    //console.log(convertBase64UrlToBlob(base64Codes))
    //ajax 提交form
    $.ajax({
        url : "http://m.wego58.com/resx/StroageServlet",
        type : "POST",
        data : formData,
        dataType:"text",
        processData : false,         // 告诉jQuery不要去处理发送的数据
        contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
        success:fnsuc
        
    });
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){
    
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    
    //处理异常 , 将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/png'});
}





// 上传失败后执行方法
function uploadFailed(evt) {
  alert("上传失败；"+evt);
  console.log(evt);
}
// 上传异常中断后执行方法
function uploadCanceled(evt) {
  alert("异常中断!");
}


//删除图片
function deleteImages(){
	$('.imgwarp a').on('click',function(){
		//alert($(this).attr('imgid'));
		var oWarp=$(this).parents('.imgwarp');
		var data='data={"action":"deleteOneImage","params":'+$(this).attr('imgid')+',"source": "web","target":"image" }';
		var r=confirm("确定删除本条数据吗?")
		if(r==true){
			$.ajax({
				url:requrl,
				type:"POST",
				data:data,
				success:function(str){
					responseInfo(str);
					oWarp.remove();
				}
			});
		}
	})
}





UihoForRenhuai.prototype.Ajax=function(url,datas,sfn,efn){
	var _this=this;
	$.ajax({
		url:url,
		type:"POST",
		data:datas,
		success:sfn,
		error:efn
	})
}
UihoForRenhuai.prototype.AjaxSend=function(url,beforSend,datas,sfn,efn){
	var _this=this;
	$.ajax({
		url:url,
		type:"POST",
		beforeSend:beforSend,
		data:datas,
		success:sfn,
		error:efn
	})
}
UihoForRenhuai.prototype.geturldata=function(url){
	var urldata=url.split('?')[1].split('&');
	var result=[];
	var c=[];
	for(var i=0; i<urldata.length; i++){
		a=urldata[i].split('=');
		c+=result.concat('"'+urldata[i]+'",')
	};
	var laststr=c.replace(/=/g,'":"');//;
	var aaa='{'+laststr.substring(0,laststr.lastIndexOf(','))+'}';
	var obj=JSON.parse(aaa);

	if(obj.id){
		obj.id=parseInt(obj.id);
	}
	return obj;
};


UihoForRenhuai.prototype.getEncodeData=function(obj){
	return encodeURIComponent(obj);
}

UihoForRenhuai.prototype.getDecodeData=function(obj){
	return decodeURIComponent(obj);
}

UihoForRenhuai.prototype.DetailTimesTamp=function(time){
	var d = new Date(time);    //根据时间戳生成的时间对象
	var date = (d.getFullYear()) + "-" + this.toZero(d.getMonth() + 1) + "-" +this.toZero(d.getDate()) + " " + this.toZero(d.getHours()) + ":" + this.toZero(d.getMinutes()) + ":" + this.toZero(d.getSeconds());
	return date;
};

UihoForRenhuai.prototype.toZero=function(n){
	return n<10?n='0'+n:n;
};

UihoForRenhuai.prototype.checkUserId=function(){
	// var oldUserid=this.getCookie('userIdByWeixin');
	// if(oldUserid==undefined){
	// 	var oS=document.createElement('script');
	// 	oS.src='js/weixin.js';
	// 	document.body.appendChild(oS);

	// 	sell.getCookie('userIdByWeixin');
	// }
}

UihoForRenhuai.prototype.getCookie=function(cookiename){
	var result;
	var mycookie = document.cookie;
	var start2 = mycookie.indexOf(cookiename + "=");
	if (start2 > -1) {
		start = mycookie.indexOf("=", start2) + 1;
		var end = mycookie.indexOf(";", start);

		if (end == -1) {
			end = mycookie.length;
		}

		result = unescape(mycookie.substring(start, end));
	}

	return result;
}
UihoForRenhuai.prototype.setCookie=function(name, value, Hours){
	var oDate=new Date();
	var oh=oDate.getHours()+Hours;
	oDate.setHours(oh);
	//alert(oDate)
	document.cookie=name+'='+value+';expires='+oDate;
}


UihoForRenhuai.prototype.removeCookie=function(name)
{
	Uiho.cookies.setCookie(name, 'undefined', -10);
}


UihoForRenhuai.prototype.loading=function(){
	var oLayer=document.createElement('div');
	//oLayer.style.opacity='1';
	oLayer.id="layer";
	oLayer.innerHTML='<div><div class="spinner">\
		  <div class="spinner-container container1">\
		    <div class="circle1"></div>\
		    <div class="circle2"></div>\
		    <div class="circle3"></div>\
		    <div class="circle4"></div>\
		  </div>\
		  <div class="spinner-container container2">\
		    <div class="circle1"></div>\
		    <div class="circle2"></div>\
		    <div class="circle3"></div>\
		    <div class="circle4"></div>\
		  </div>\
		  <div class="spinner-container container3">\
		    <div class="circle1"></div>\
		    <div class="circle2"></div>\
		    <div class="circle3"></div>\
		    <div class="circle4"></div>\
		  </div>\
		</div>\
	</div>'
	document.body.appendChild(oLayer);
}
UihoForRenhuai.prototype.removeLoading=function(){
	var oLayer=document.getElementById('layer');
	document.body.removeChild(oLayer);
}

function scrollFont(tagClass){
	var oWrap=document.getElementsByClassName(tagClass)[0];
	var oWraps=oWrap.getElementsByTagName('p')[0];
	var oAddressWrap=oWraps.getElementsByTagName('span');

	if(oWrap.offsetWidth<=oWraps.offsetWidth){
		var W=oAddressWrap[0].offsetWidth*oAddressWrap.length;
		oWraps.style.width=W+'px';
		setInterval(function(){
			var left=oWraps.offsetLeft-1; 
			oWraps.style.left=left%W+'px';
		}, 30);
	};
}




