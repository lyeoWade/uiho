
$(function(){
	AddChildFn();
	$('#gzhAddBtn').on('click',function(){

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
		//console.log(strAllArr);


		var menuListHtml='['+strAllArr+']';

		


		var datas='data={"action":"addApp","params":{"appName":"'+oName+'","menuList":'+menuListHtml+',"wxAppid":"'+oId+'","wxSecret":"'+oKey+'"},"source":"web","target":"app"}';


		console.log(datas);

		$.ajax({
			url:'http://rhbiz.dev.uiho.com/rh_cdtg/InfoServlet',
			type:"POST",
			data:datas,
			success:function(str){
				//console.log(str);
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
});



//data={"action":"addApp","params":{"appName":"三都之城","menuList":[{"menuName":"全局三都","linkUrl":"","menuList":[{"linkUrl":"http://apim.uiho.com/","menuName":"第一都"},{"linkUrl":"http://apim.uiho.com/","menuName":"第二都"},{"linkUrl":"http://apim.uiho.com/","menuName":"第三都"}]},{"menuName":"三都攻略","linkUrl":"http://apim.uiho.com/","menuList":[{"menuName":"1"}]},{"menuName":"我在三都","linkUrl":"","menuList":[{"linkUrl":"http://apim.uiho.com/","menuName":"个人中心"},{"linkUrl":"http://apim.uiho.com/","menuName":"消费记录"}]}],"wxAppid":"46862113246545123","wxSecret":"543210456dsfs2d1sfcdssdgdg"},"source":"web","target":"app"}




































