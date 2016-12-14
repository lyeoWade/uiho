// JavaScript Document



var shopId=geturldata(window.location.href).businessId;
//得到商户详情

// if(confirm('确定要清空数据吗？')){

// }
	

getBusiness(shopId);
function getBusiness(shopId){
	var str='data={"action":"getBusiness","params":'+shopId+',"source":"web","target":"business"}';
	$.ajax({
		url:reqUrl,
		type:"POST",
		data:str,
		success:function(str){
			var oData=eval('('+str+')');
			//console.log(oData.object)
			if(oData.responseCode==1){
				$('.shopName').html('商家名称：'+oData.object.businessName);
			 	$('.shopAddress').html('商家地址：'+oData.object.address);
			 	$('.zan').html('<em></em>已'+oData.object.countGood+'人点赞');
				var tagliHtml='';
				for(var i=0;i<oData.object.busAssessList.length; i++){
					tagliHtml+='<li><label>\
                        <input type="radio" name="tags" value="'+oData.object.busAssessList[i].assessId+'" />\
                        <span>'+oData.object.busAssessList[i].assessContent+'</span></label><em>'+oData.object.busAssessList[i].countNum+'人选择</em></li>';
				};
			    $('.taglipj').html(tagliHtml);
			}else{
				alert("数据获取失败,返回上一页");
				history.go(-1);
			}
		}
	});
}
//点赞
function addComment(shopId,assessId){

	var scoreNum=parseInt($('#serverBox input:checked').length)+parseInt($('.scoreSelect').val());
	//图片集
	var oImageUrl=$('.imgWrap img');
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
	var textareas=$('#textareas').val();
	var str='data={"action":"addComment","params":{"assessId":'+assessId+',"businessId":'+shopId+',"imageList":'+imagesList+',"content":"'+textareas+'","score":'+scoreNum+',"userId":'+parseInt(getCookie('userId'))+'},"source":"web","target":"comment"}';
	//alert(str);
	$.ajax({
		url:reqUrl,
		type:"POST",
		data:str,
		success:function(str){
			var oData=eval('('+str+')');
			if(oData.responseCode==1){
				if(geturldata(window.location.href).list==1){
					alert("为商户点赞成功");
					history.go(-1);
				}else{
					alert("为商户点赞成功");
					$('.submitData').css('display','none');
					$('.hiddenBtn').css({
						'background':'#ccc',
						'display':'block'
					});
				}
			}else{
				alert("已为商家点赞");
			}
		}
	});
}

//图片上传 

//http://bdbbiz.wego58.com/resx/StroageServlet





function geturldata(url){
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



window.onload=function(){
	if(!window.BfnScore)
	{
		fnScore();
		window.BfnScore=true;
	}
}
function fnScore()
{
	var oScore=id("score");
	var aLi=oScore.getElementsByTagName("li");
	var arr=["好失望","没有想象的那么差","很一般","良好","棒极了"];
	for(var i=0;i<aLi.length;i++)
	{
		fn(aLi[i]);
	}
	function fn(oLi)
	{
		var aNav=oLi.getElementsByTagName("a");
		var oInput=oLi.getElementsByTagName("input")[0];
		for(var i=0;i<aNav.length;i++)
		{
			aNav[i].index=i;
			bind(aNav[i],"touchstart",function(){
				for(var i=0;i<aNav.length;i++)
				{
					if(i<=this.index)
					{
						addClass(aNav[i],"active");
					}					
					else
					{
						removeClass(aNav[i],"active");
					}
				}
				oInput.value=(this.index+1);
			});
		}
	}

	fnIndex();
}
function fnInfo(oInfo,sInfo)
{
	oInfo.innerHTML=sInfo;
	oInfo.style.WebkitTransform="scale(1)";
	oInfo.style.opacity=1;
	setTimeout(function(){
		oInfo.style.WebkitTransform="scale(0)";
		oInfo.style.opacity=0;
	},1000);
}
function fnIndex()
{
	var oIndex=id("index");
	var oBtn=oIndex.getElementsByClassName("submitData")[0];
	var oInfo=oIndex.getElementsByClassName("info")[0];
	var bScore=false;
	var assessId=0;
	bind(oBtn,"touchend",fnEnd);
	function fnEnd()
	{
		//getServerSocre();
		bScore=fnScoreChecked();
		if(bScore)
		{
			if(bTag())
			{
				
				addComment(shopId,assessId);
				//fnIndexOut();		
			}
			else
			{
				fnInfo(oInfo,"具体评价请选择");	
			}
		}
		else{
			fnInfo(oInfo,"请打综合印象分");
		}
	}
	function fnScoreChecked()
	{
		var oScore=id("score");
		var aInput=oScore.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++)
		{
			if(aInput[i].value==0)
			{
				return false;
			}
		}
		return true;
	}
	function bTag()
	{
		var oTag=id("indexTag");
		var aInput=oTag.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++)
		{
			if(aInput[i].checked)
			{
				assessId=aInput[i].value;//oTag.setAttribute('jtpj',aInput[i].value)
				return true;
			}
		}
		return false;
	}
}

function getServerSocre(){
	alert($('#serverBox input:checked').length);
}
