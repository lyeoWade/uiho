
//新增子菜单

function AddChildFn(){
	$('.AddChild').on('click',function(){
		var sMainNameVal=$(this).parents('.pzgzhwrap1').find('.mainNavName').val();
		var sMainUrlVal=$(this).parents('.pzgzhwrap1').find('.mainNavUrl').val();
		var oPzgzhSonWrap=$(this).parents('.add-nav-wrap').find('.pzgzhSonWrap');

		var SonLen=$(this).parents('.add-nav-wrap').find('.son-nav-wrap').length;
		if(SonLen>=5){
			alert('最多添加5个子菜单');
			return false;
		}
		if(sMainNameVal==''){
			alert('请填写当前主菜单名称！');
			return false;
		}
		if(sMainUrlVal!=''){
			alert('请清空当前主菜单对应的链接');
			return false;
		}

		if(oPzgzhSonWrap.attr('data-key')=='0'){
			oPzgzhSonWrap.attr('data-key','1');
			oPzgzhSonWrap.css('display','block');
		}else{
			oPzgzhSonWrap.append('<div class="son-nav-wrap clearfix">\
                <label class="control-label col-lg-2 col-sm-2">&nbsp;</label>\
                <div class="col-lg-3 col-sm-3">\
                <input class="form-control sonvalue" type="text" placeholder="子菜单名称(必填)" /></div>\
                <div class="col-lg-3 col-sm-3">\
                <input class="form-control sonUrl" type="text" placeholder="跳转地址(必填)" /></div>\
                <div class="col-lg-3 col-sm-3">\
                <input class="btn btn-warning deleteSonBtn" type="button" value="删除" /><span class="dTip"></span></div></div>');
		};
		DsonNav();
		checkSonVal();
	});
}

//删除子菜单

function DsonNav(){
	$('.deleteSonBtn').on('click',function(){
		var oPzgzhSonWraps=$(this).parents('.pzgzhSonWrap');
		var sSonLen=$(this).parents('.pzgzhSonWrap').find('.son-nav-wrap').length;
		if(sSonLen==1){
			oPzgzhSonWraps.attr('data-key','0');
			oPzgzhSonWraps.css('display','none');
		}else{
			$(this).parents('.son-nav-wrap').remove();
		}
	});
}

function checkSonVal(){
	$('.sonUrl').on('focusout',function(){
		if($(this).val()=='' ){
			$(this).parents('.son-nav-wrap').find('.dTip').addClass('error').html('跳转地址不能为空');
			$(this).addClass('borderred');
		}else{
			$(this).parents('.son-nav-wrap').find('.dTip').html('');
			$(this).removeClass('borderred');
		}
	});

	$('.sonvalue').on('focusout',function(){
		if($(this).val()=='' || byteLenFn($(this).val())>=16){
			$(this).parents('.son-nav-wrap').find('.dTip').addClass('error').html('子菜单名字不能超过16个字符');
			$(this).addClass('borderred');
		}else{
			$(this).parents('.son-nav-wrap').find('.dTip').html('');
			$(this).removeClass('borderred');
		}
	});
}


function byteLenFn(str){

	var byteLen=0;

	for(var i=0;i<str.length;i++)
	{
		if(/[\u4e00-\u9fa5]/.test(str.charAt(i)))
		{
			byteLen+=2;
		}
		else
		{
			byteLen++;
		}
	}
	return byteLen;
}
