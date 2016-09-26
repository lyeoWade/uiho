/*
*********
*		*
*		*
*********
*/





//判断是否登陆
if(Uiho.cookies.getCookie('userinfo')==undefined){
	if(window!=window.top){
		//window.top.location.href = "login.html";
	}else{
		//window.location.href="login.html";
	}
	//window.location.href="login.html";
}
//获取得到登陆之后的cookie
var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));

//console.log(cookieValue)
//------------------------------------////////////-----------------------------------------

function responseInfo(str){

	var oData=$.parseJSON(str);
	if(oData.responseCode==1){
		$('.addtip').html(oData.responseMsg);
		$('.addtip').addClass('success');
	}else{
		$('.addtip').html(oData.responseMsg);
		$('.addtip').addClass('error');
	}
}



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
  xhr.open("POST", "http://console.qjias.com/resx/StroageServlet");
  //xhr.open("POST", "http://jiabindao.dev.uihu.com/resx/StroageServlet");
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





/*** 公共部分 ***/
//排课新增和修改

function timeTable(id){
	$('#save').on('click',function(){
		var $starttime=$('#starttime').val();
		var $endtime=$('#endtime').val();
		var $period=$('#period').val();
		var $price=$('#price').val();
		if($starttime=='' || $endtime=='' || $price==''){
			$('.addtip').html('以上选项请填写完整！');
			$('.addtip').addClass('error')
			return false;
		}
		if(id==undefined){
			//没有传id表示新增
			var datas='data={ "action": "addOneTimetable","params":{"beginTime":"'+$starttime+'","endTime":"'+$endtime+'","periodType": '+$period+',"price":"'+$price+'" },"source":"web","target":"timetable"}';
		}else{
			//有id表示修改
			var datas='data={ "action": "updateOneTimetable","params":{"beginTime":"'+$starttime+'","endTime":"'+$endtime+'","periodType": '+$period+',"id": '+id+',"price":"'+$price+'" },"source":"web","target":"timetable"}';
		}
		
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				console.log(str);
				if(id==undefined){
					//没有传id表示新增
					operalog("新增一条排课信息！")
				}else{
					//有id表示修改
					operalog("修改一条排课信息！")
				}
				responseInfo(str);
				setTimeout(function(){
					window.location.href="courseArraying.html";
				},800)
			}
		});
	});
}


/*--------------操作日志--------------*/


function operalog(intor){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={"action":"addOneLog","params":{ "intor": "'+intor+'","managerId":'+cookieValue.id+'},"source": "web","target":"log"}',
		success:function(data){
			console.log(data);
		}
	})
}


/* 添加保证金 */


function addOneAccount(Sid,coachId,target){

	var $bondmoney=$('#bondmoney').val(),title='';
	var $type=$('#types').val();
	if($type==1){
		title="学员保证金";
	}else if($type==2){
		title="学员考试预交费用";
	}else if($type==3){
		title="教练佣金";
	}else if($type==4){
		title="教练收入";
	}



	if($bondmoney=='' || !Uiho.ver.num($bondmoney)){
		$('.addtip').html('请正确填写以上选项！');
		$('.addtip').addClass('error');
		return false;
	};
	target&&target;  //如果有这个参数就传
	if(target==1){ //有的话表示扣除
		$bondmoney='-'+$bondmoney;
	}
	var datas='data={"action":"addOneAccount","params":{ "money":"'+$bondmoney+'","title": "'+title+'","type":"'+$type+'","userId":"'+Sid+'","coachId":"'+coachId+'"},"source":"web","target":"account"}';
	//console.log(datas);
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			responseInfo(str);
			operalog(title);
			reload();
		}
	});
};


// 刷新当前页面

function reload(){
	setTimeout(function(){
		location.reload();
	},2000);
}

//保证金列表
function getAccountList(nowPage,pageSize,userId,type,coachId){
	var datas='data={"action":"getAccountList","params":{"nowPage":"'+nowPage+'","pageSize":"'+pageSize+'","type":"'+type+'", "userId":"'+userId+'", "coachId":"'+coachId+'"},"source":"web","target":"account"}';
	
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				var tableHtml='';
				for(var i=0; i<oData.object.length; i++){
					var sData=oData.object[i];

					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.title+'</td><td>'+sData.money+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td></tr>';
				}
				$('#tbody').html(tableHtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					 getAccountList(nowPage,pageSize,userId,type,coachId)
				});
			}else{
				$('#tbody').html('<tr><td colspan="9" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){                                   

		}
	})
};



//删除 

/*
	datas--->请求参数
	typeid-->提示操作标识 (1内容页,0列表页)
	info---->操作日志信息
	fn  ---->回调函数
*/
function deleteOneData(datas,typeid,info,fn){
	var r=confirm("确定删除本条数据吗?");
	if(r==true){
	    $.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					operalog(info);
					if(typeid==1){ //1内容页
						alert(oData.responseMsg+',返回上一页;');
						history.go(-1);
					}else if(typeid==0){ //列表页
						alert(oData.responseMsg);
					}
					fn&&fn();
				}else{
					alert(oData.responseMsg);
				};
			},
			complete:function(data){
			}
		});
	}
}



function deleteFile(){
	$('.deleteBtn').on('click',function(){
		$(this).parents('.form-group').remove();
	})
};




//响应实时数据
function ChildMsg(){
	var oparent=window.parent.document;
	//alert($("#userNum",oparent).html())
	var datas='data={"action":"countPending","source":"web","target":"count"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var obj=oData.object;
				console.log(obj);
				if(obj.applyTrial!=0 || obj.noContactUser!=0 || obj.signUpUser!=0){
					$("#ugment",oparent).addClass('active');
					$("#ugmentChild",oparent).css('display','block')
				}

				if(obj.reserveExam!=0 ){
					$("#examMsg",oparent).addClass('active');
					$("#examMsgChild",oparent).css('display','block')
				}

				if(obj.applyTrial==0)obj.applyTrial='';
				if(obj.signUpUser==0)obj.signUpUser='';
				if(obj.noContactUser==0)obj.noContactUser='';
				if(obj.untreatedCar==0)obj.untreatedCar='';
				if(obj.untreatedFeedback==0)obj.untreatedFeedback='';
				if(obj.withdrawApply==0)obj.withdrawApply='';
				if(obj.reserveExam==0)obj.reserveExam='';
				
				$("#reserveExam",oparent).html(obj.reserveExam);
				$("#ty",oparent).html(obj.applyTrial);
				$("#allu",oparent).html(obj.signUpUser);
				$("#userNum",oparent).html(obj.noContactUser);
				$("#ac",oparent).html(obj.untreatedCar);
				$("#fk",oparent).html(obj.untreatedFeedback);
				$("#txsq",oparent).html(obj.withdrawApply);
				
			}else{
				alert(oData.responseMsg);
			}
			console.log(oData);
		}
	})
};


// if(window.frames["frame"]==undefined){
// 	//window.parent.onscroll=function(){
// 	window.parent.document.getElementById('frame').offsetTop=0;
// 	//}
// }
//console.log(window.location.href)
if(window.location.href.indexOf('#top')!=-1){
	window.location.href=window.location.href;
}else{
	window.location.href=window.location.href+'#top';
}

//console.log(window.location.href)