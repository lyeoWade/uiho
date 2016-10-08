/*
*********
*		*
*		*
*********
*/


//判断是否登陆

if(Uiho.cookies.getCookie('userinfo')==undefined){
	if(window!=window.top){
		window.top.location.href = "login.html";
	}else{
		window.location.href="login.html";
	}
	window.location.href="login.html";
}
//获取得到登陆之后的cookie
var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));
console.log(cookieValue)
//公共信息
$(function(){
	$('.username').html(cookieValue.realname);
});






//console.log(cookieValue)
//------------------------------------////////////-----------------------------------------



//上传文件//

// 选择文件
function fileSelected(obj,fn) {
  var file = obj.get(0).files[0];
  var fileSize = 0;
  if (file) {
    if (file.size > 1024 * 1024)
     {fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
  		alert("文件太大," + fileSize);
  		return false;
    }else{
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
    }
    //console.log('Name: ' + file.name);
    //console.log('Size: ' + fileSize);
    fn&&fn(file.name);
  }
};
// 文件上传
function uploadFile(f,fnsuc) {
  var fd = new FormData();
  //alert(123)
  fd.append("fileInput", f);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", fnsuc, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", "http://m.wego58.com/resx/StroageServlet");
  //xhr.open("POST", "http://dev.oss.uiho.com/resx/StroageServlet");
  //xhr.open("POST", "http://rhbiz.dev.uiho.com/resx/StroageServlet");

  xhr.send(fd);
}

//前端删除上传的图片
function deletenewimage(){
	$('.newimage').on('click',function(){
		if(!$('.newimage').attr('websiteImg')){ //如果不是修改
			$(this).parents('.imgwarp').remove();
		}
	})
}

// 上传失败后执行方法
function uploadFailed(evt) {
  alert("上传失败；");
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
		//var data='data={"action":"deleteImage","params":'+$(this).attr('imgid')+',"source": "web","target":"image" }';
		var datas='data={"action":"deleteImage","params":'+$(this).attr('imgid')+',"source":"mobileweb","target":"image"}';
		var r=confirm("确定删除本条数据吗?")
		if(r==true){
			$.ajax({
				url:requrl,
				type:"POST",
				data:datas,
				success:function(str){
					responseInfo(str);
					oWarp.remove();
				}
			});
		}
	})
}

function deleteFile(){
	$('.deleteBtn').on('click',function(){
		$(this).parents('.form-group').remove();
	})
};




function getClassfiyList(fn){
	var datas='data={"action":"getSortList","params":{"nowPage":1,"pageSize":100},"source":"backstage","target":"sort"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				var tableHtml='',zidHtml='';
				for(var i=0; i<oData.object.length; i++){
					var sData=oData.object[i];
						zidHtml+='<option value="'+sData.sortId+'">'+sData.title+'</option>';
				}
				$('#zid').html(zidHtml);
				fn&&fn();
			}else{
				alert("获取分类列表失败;");
			}
		},
		complete:function(){
			
		}
	});
}

/*** 公共部分 ***/

// 刷新当前页面

function reload(){
	setTimeout(function(){
		location.reload();
	},800);
}


//改变时获得上传图片名字
function changes(){
    $('.fileInput1').on('change',function(){
        var obj=$(this);
        $('.marktag').html(obj.get(0).files[0].name);
        fileSelected(obj);
    });
};