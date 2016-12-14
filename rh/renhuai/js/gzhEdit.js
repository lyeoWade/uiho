
var sUrlreq='http://rhbiz.dev.uiho.com/rh_cdtg/InfoServlet';
var AppId=Uiho.tool.geturldata(window.location.href).id;



$(function(){
	
	getApp(AppId);
	

	
	updateApp(sUrlreq);
	
	pushGzh(AppId);
});

function getApp(AppId){
	var datas='data={"action":"getApp","params":'+AppId+',"source":"web","target":"app"}'
	$.ajax({
		url:sUrlreq,
		type:"POST",
		data:datas,
		success:function(str){
			
			var oData=eval('('+str+')');
			console.log(oData);
			if(oData.responseCode==1){


				//$('.pushGzh').attr('href','http://rhbiz.dev.uiho.com/rh_cdtg/WbCatServlet?method=releaseMenu&appId='+oData.object.appId);
				$('#gzhname').val(oData.object.appName);
				$('#gzhId').val(oData.object.wxAppid);
				$('#gzhkey').val(oData.object.wxSecret);
				//$('.addtip').html(oData.responseMsg);
				//$('.addtip').removeClass('error').addClass('success');



				//菜单初始化

				var List=oData.object.menuList;
				//console.log(List)

				var oMainNavName=$('.pzgzhwrap1').find('.mainNavName');
				var oMainNavUrl=$('.pzgzhwrap1').find('.mainNavUrl');
				for(var i=0; i<List.length; i++){
					(function(ind){

						if(List[ind].menuName=='sb1'){
							oMainNavName[ind].value='';
							oMainNavUrl[ind].value='';
						}else{

							oMainNavName[ind].value=List[ind].menuName;
							oMainNavUrl[ind].value=List[ind].linkUrl;
						}
						//console.log(List[ind].menuList[0].linkUrl)
						var Wrap=oMainNavName.eq(ind).parents('.add-nav-wrap').find('.pzgzhSonWrap');

						
						if(List[ind].menuList.length==1 && List[ind].menuList[0].linkUrl==undefined){
							Wrap.attr('data-key','0');
							Wrap.css('display','none');
							Wrap.append('<div class="son-nav-wrap clearfix">\
                                    <label for="" class="control-label col-lg-2 col-sm-2">&nbsp;</label>\
                                    <div class="col-lg-3 col-sm-3">\
                                    <input class="form-control sonvalue" id="" type="text" placeholder="子菜单名称(必填)"/></div>\
                                    <div class="col-lg-3 col-sm-3">\
                                    <input class="form-control sonUrl" id="" type="text" placeholder="跳转地址(必填)"  /></div>\
                                    <div class="col-lg-3 col-sm-3">\
                                    <input class="btn btn-warning deleteSonBtn" id="" type="button" value="删除" />\
                                    <span class="dTip"></span></div></div>');
						}else{

							Wrap.attr('data-key','1');
							Wrap.css('display','block');
							for(var j=0; j<List[ind].menuList.length; j++){
								Wrap.append('<div class="son-nav-wrap clearfix">\
                                    <label for="" class="control-label col-lg-2 col-sm-2">&nbsp;</label>\
                                    <div class="col-lg-3 col-sm-3">\
                                    <input class="form-control sonvalue" id="" type="text" placeholder="子菜单名称(必填)" value="'+List[ind].menuList[j].menuName+'" /></div>\
                                    <div class="col-lg-3 col-sm-3">\
                                    <input class="form-control sonUrl" id="" type="text" placeholder="跳转地址(必填)" value="'+List[ind].menuList[j].linkUrl+'" /></div>\
                                    <div class="col-lg-3 col-sm-3">\
                                    <input class="btn btn-warning deleteSonBtn" id="" type="button" value="删除" />\
                                    <span class="dTip"></span></div></div>');
							}
							
						}
					})(i)
				}
				//新增子菜单检测
				AddChildFn();
				DsonNav();
			}else{
				//$('.addtip').html(oData.responseMsg);
				//$('.addtip').addClass('error');
			}
		}
	});

}


//修改菜单

function updateApp(sUrlreq){
	$('#subBtn').on('click',function(){
		var oName=$('#gzhname').val();
		var oId=$('#gzhId').val();
		var oKey=$('#gzhkey').val();
		if(oName==''){$('.addtip').addClass('error').html('微信公众号名称不能为空！');return false;}
		if(oId==''){$('.addtip').addClass('error').html('微信公众号APP ID不能为空！');return false;}
		if(oKey==''){$('.addtip').addClass('error').html('微信公众号授权KEY不能为空！');return false;}

		var cheArr=[];
		var cheUrlArr=[];

		var sParentName=[];
		var sUrl='';
		var sName='';
		$('.pzgzhwrap1').each(function(index){

			var oNowObj=$(this).eq($(this).index()).find('.mainNavName');
			var oMainNavUrl=$(this).eq($(this).index()).find('.mainNavUrl');
			var oDataKey=$(this).eq($(this).index()).parents('.add-nav-wrap').find('.pzgzhSonWrap').attr('data-key');
			var vals=oNowObj.val();
			var urls=oMainNavUrl.val();
			if(vals=='' || byteLenFn(vals)>=16){
				//判断名称
				cheArr.push(1);
				sName='"menuName":"sb1"';
			}
			if( oDataKey==0 && vals!='' && urls=='' ){ 
				//判断跳转链接
				oMainNavUrl.addClass('borderred');
				cheUrlArr.push(1);
			}

			if( oDataKey==0 && vals=='' && urls=='' ){ 
				sUrl='"linkUrl":"1"';
			}else{
				sUrl='"linkUrl":"'+encodeURIComponent(urls)+'"';
				sName='"menuName":"'+vals+'"';
			}
			sParentName.push(sName+','+sUrl);
			//console.log(sName+'-----'+sUrl);
		});


		//判断名称
		if(cheArr.length==3){
			$('.pzgzhwrap1').find('.mainNavName').addClass('borderred');
			$('.addtip').addClass('error').html('请正确填写子菜单名称,不能超过16个字符');
			return false;
		}else{
			$('.addtip').addClass('error').html('');
			$('.pzgzhwrap1').find('.mainNavName').removeClass('borderred');
		}

		

		//判断跳转链接
		if(cheUrlArr.length>=1){
			$('.addtip').addClass('error').html('请正确主菜单跳转链接');
			return false;
		}else{
			$('.addtip').addClass('error').html('');
			$('.pzgzhwrap1').find('.mainNavUrl').removeClass('borderred');
		}

		var isSonVal=[];

		var sonHtmlArr=[];
		var sonHtml='';
		$('.pzgzhSonWrap').each(function(){
			var sDataKey=$(this).attr('data-key');
			if(sDataKey==1){
				var sKeyHtml='';
				$(this).find('.sonvalue').each(function(){
					var sUrl=$(this).parents('.son-nav-wrap').find('.sonUrl');
					if(byteLenFn($(this).val())>=16 || $(this).val()=='' || sUrl.val()==''){
						isSonVal.push(1);
					}else{
						sKeyHtml+='{"linkUrl":"'+encodeURIComponent(sUrl.val())+'","menuName":"'+$(this).val()+'"},';
					};
				});
				var ind=sKeyHtml.lastIndexOf(',');
				sKeyHtml=sKeyHtml.substring(0,ind)+sKeyHtml.substring(ind+1);
				sonHtml='"menuList":['+sKeyHtml+']'
			}else{
				sonHtml='"menuList":[{"menuName":"1"}]';
			}
			sonHtmlArr.push(sonHtml);
			
		});

		//console.log(sonHtmlArr)
		if(isSonVal.length>=1){
			$('.addtip').addClass('error').html('请正确填写子菜单');
			return false;
		}else{
			$('.addtip').addClass('error').html('');
		}


		//console.log(sParentName);

		var strAllArr=[];
		for(var i=0; i<sParentName.length; i++){
			strAllArr.push('{'+sParentName[i]+','+sonHtmlArr[i]+'}');
		}

		var menuListHtml='['+strAllArr+']';
		var datas='data={"action":"updateApp","params":{"appId":'+AppId+',"appName":"'+oName+'","menuList":'+menuListHtml+',"wxAppid":"'+oId+'","wxSecret":"'+oKey+'"},"source":"web","target":"app"}';

		$.ajax({
			url:sUrlreq,
			type:"POST",
			data:datas,
			success:function(str){
				console.log(str)
				var oData=eval('('+str+')');
				if(oData.responseCode==1){
					$('.addtip').html(oData.responseMsg);
					$('.addtip').removeClass('error').addClass('success');
				}else{
					$('.addtip').html(oData.responseMsg);
					$('.addtip').addClass('error');
				}
			}
		});
	});
}


//发布

//http://rhbiz.dev.uiho.com/rh_cdtg/WbCatServlet?method=releaseMenu&appId=1

function pushGzh(appId){
	$('.pushGzh').on('click',function(){
		$.ajax({
			url:'http://rhbiz.dev.uiho.com/rh_cdtg/WbCatServlet',
			type:"POST",
			data:'method=releaseMenu&appId='+appId,
			success:function(str){
				var oData=eval('('+str+')');
				console.log(oData);
				if(oData.requestCode==1){
					alert(oData.requestMsg);
				}else{
					alert(oData.requestMsg);
					//$('.addtip').html(oData.responseMsg);
					//$('.addtip').addClass('error');
				}
			}
		});
	});
}




















