/*
*********
*		*
*		*
*********
*/


//判断是否登陆

// if(Uiho.cookies.getCookie('userinfo')==undefined){
// 	if(window!=window.top){
// 		window.top.location.href = "login.html";
// 	}else{
// 		window.location.href="login.html";
// 	}
// 	window.location.href="login.html";
// }
//获取得到登陆之后的cookie
// var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));
// console.log(cookieValue)
// //公共信息
// $(function(){
// 	$('.username').html(cookieValue.realname);
// });






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




















function Cqk(){
	this.initUrl='http://app.uiho.com/pxb_ciqikou/InfoServlet';

	this.street={"黄桷坪一巷":"1","磁正街":"2","聚森茂街":"3","磁横街":"4","磁南街":"5"};

	this.format={"特产":"1","餐饮":"2","茶饮":"3","土特产":"4","食品":"5","饮品":"6","小食品":"7","工艺品":"8","鞋服":"9","字画":"10","文博场馆":"11","服饰":"12","小吃":"13","伞／杯":"14","宗教":"15","箱包":"16","住宿":"17","副食":"18","其他":"19","饰品":"20","娱乐":"21"};
}

//新增商户
Cqk.prototype.ShopAdd=function(){
	var _this=this;
	_this.getAssessList(function(oData){
		var sHtml='';
		for(var i=0; i<oData.object.length; i++){
			sHtml+='<label><input type="checkbox" value="'+oData.object[i].assessId+'">'+oData.object[i].content+'</label>';
		}
		$('#checkbox').html(sHtml);
	});

	$('#save').on('click',function(){
		var shopname=$('#shopname').val();
		var getstreet=$('#getstreet').val();
		var getformat=$('#getformat').val();
		var address=$('#address').val();
		var checkbox=$('#checkbox input');

		if(shopname=='' || shopname.length>20){
			$('.addtip').addClass('error').html("请输入1-20个字的商户名");
			return false;
		}

		if(address=='' || address.length>50){
			$('.addtip').addClass('error').html("请输入1-50个字的商户地址");
			return false;
		}
		var tmpIsChecked=[];
		checkbox.each(function(ind){
			if(checkbox.eq(ind).is(":checked")){
				tmpIsChecked.push('{"assessId":'+checkbox.eq(ind).attr('value')+'}');
			}
		});

		if(tmpIsChecked.length==0){
			$('.addtip').addClass('error').html("请选择评选项目");
			return false;
		}
		var datas='data={"action":"addBusiness","params":{"address":"'+address+'","busAssessList":['+tmpIsChecked+'],"businessName":"'+shopname+'","format":'+getformat+',"street":'+getstreet+'},"source":"web","target":"business"}';
		
		$.ajax({
			url:_this.initUrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=eval('('+str+')');
				if(oData.responseCode==1){
					$('.addtip').removeClass('error').addClass('success').html(oData.responseMsg);
					setTimeout(function(){
						history.go(0);
					},1000);
				}else{
					alert("数据获取失败");
					history.go(-1);
				}
			}
		});
	});
}
//得到评选项目列表
Cqk.prototype.getAssessList=function(fn){
	var _this=this;
	var datas='data={"action":"getAssessList","source":"web","target":"assess"}';
	$.ajax({
		url:_this.initUrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=eval('('+str+')');
			if(oData.responseCode==1){
				fn(oData);
			}
			//console.log(oData)
		}
	});
};


//得到商户列表
Cqk.prototype.getBusinessList=function(){
	var _this=this;


	var format='',pageSize=20,nowPage=1,orderParam='',street='';
	List(format,street,orderParam,pageSize,nowPage)

	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		format=$('#format').val();
		orderParam=$('#orderParam').val();
		street=$('#street').val();
		//选择查询
		List(format,street,orderParam,pageSize,nowPage)
	});

	function List(format,street,orderParam,pageSize,nowPage){
		var datas='data={"action":"getBusinessList","params":{"format":"'+format+'","queryParam":{"ascOrDesc":"desc","nowPage":'+nowPage+',"orderParam":"'+orderParam+'","pageSize":'+pageSize+'},"street":"'+street+'"},"source":"web","target":"business"}';
		$.ajax({
			url:_this.initUrl,
			type:"POST",
			data:datas,
			beforeSend :function(){
				$('#tbody').html('<tr><td colspan="16" align="center">加载中，请稍后...</td></tr>');
			},
			success:function(str){
				var oData=eval('('+str+')');
				console.log(oData)
				if(oData.responseCode==1){
					var sHtml='';
					for(var i=0; i<oData.object.length; i++){
						var streetName='';
						for(var num in _this.street){
							if(oData.object[i].street==_this.street[num]){
								streetName=num;
							}
						}

						var formatName='';
						for(var k in _this.format){
							if(oData.object[i].format==_this.format[k]){
								formatName=k;
							}
						}
						sHtml+='<tr><td>'+(i+1)+'</td>\
                                    <td>'+streetName+'</td>\
                                    <td>'+formatName+'</td>\
                                    <td>'+oData.object[i].businessName+'</td>\
                                    <td>'+oData.object[i].address+'</td>\
                                    <td>'+oData.object[i].countGood+'</td>\
                                    <td>'+oData.object[i].countScore+'</td>\
                                    <td>'+oData.object[i].countCulture+'</td>\
                                    <td>'+oData.object[i].countIntegrity+'</td>\
                                    <td>'+oData.object[i].countService+'</td>\
                                    <td>'+oData.object[i].countAmbience+'</td>\
                                    <td> \
                                        <div class="btn-group">\
                                            <a href="shopEdit.html?id='+oData.object[i].businessId+'" class="btn btn-primary btn-sm backpage">详情&nbsp;&nbsp;<i class="fa  fa-chevron-circle-right"></i></a>\
                                             <a href="comment.html?id='+oData.object[i].businessId+'" class="btn btn-info btn-sm backpage">评论&nbsp;&nbsp;<i class="fa  fa-chevron-circle-right"></i></a>\
                                        </div>\
                                    </td>\
                                </tr>';
					}

					$('#tbody').html(sHtml);

					$('#pagination').attr('count',oData.count);
					//页码选择 分页
					var allNum=$('#pagination').attr('count');
					Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
						List(format,street,orderParam,pageSize,nowPage)
					});
				}else{
					$('#pagination').attr('count',0);
					//页码选择 分页
					var allNum=$('#pagination').attr('count');
					Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
						List(format,street,orderParam,pageSize,nowPage)
					});
					$('#tbody').html('<tr><td colspan="16" align="center">'+oData.responseMsg+'</td></tr>');
				}
				//console.log(oData)
			}
		});
	}
}

//得到用户详情
Cqk.prototype.getBusiness=function(){
	var _this=this;

	_this.getAssessList(function(oData){
		var sHtml='';
		for(var i=0; i<oData.object.length; i++){
			sHtml+='<label><input type="checkbox" value="'+oData.object[i].assessId+'">'+oData.object[i].content+'</label>';
		}
		$('#checkbox').html(sHtml);
	});

	var shopId=Uiho.tool.geturldata(window.location.href).id;
	var str='data={"action":"getBusiness","params":'+shopId+',"source":"web","target":"business"}';
	$.ajax({
		url:_this.initUrl,
		type:"POST",
		data:str,
		success:function(str){
			var oData=eval('('+str+')');
			console.log(oData.object)
			if(oData.responseCode==1){
				$('#shopname').val(oData.object.businessName);
				$('#getstreet').val(oData.object.street);
				console.log(oData.object.format);
				$('#getformat').val(oData.object.format);
				$('#address').val(oData.object.address);
				var oInput=$('#checkbox input');

				for(var i=0;i<oData.object.busAssessList.length; i++){
					

					for(var j=0; j<oInput.length; j++){
						if(oData.object.busAssessList[i].assessId==oInput.eq(j).val()){
							oInput.eq(j).attr('checked',true);
						}
					}
				};



				$('#ewm').attr('src',oData.object.qrCode)
			}else{
				alert("数据获取失败");
				history.go(-1);
			}
		}
	});

}


//获取用户列表
Cqk.prototype.getUserList=function(){
	var _this=this;

	var phone='',pageSize=20,nowPage=1,orderParam='',userName='';
	getUserListfn(phone,userName,orderParam,pageSize,nowPage)

	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		phone=$('#phone').val();
		orderParam=$('#orderParam').val();
		userName=$('#userName').val();
		//选择查询
		getUserListfn(phone,userName,orderParam,pageSize,nowPage)
	});

	function getUserListfn(phone,userName,orderParam,pageSize,nowPage){
		var str='data={"action":"getUserList","params":{"phone":"'+phone+'","userName":"'+userName+'","queryParam":{"ascOrDesc":"desc","isDelete":0,"nowPage":'+nowPage+',"orderParam":"'+orderParam+'","pageSize":'+pageSize+'}},"source":"web","target":"user"}';
		$.ajax({
			url:_this.initUrl,
			type:"POST",
			data:str,
			beforeSend :function(){
				$('#tbody').html('<tr><td colspan="16" align="center">加载中，请稍后...</td></tr>');
			},
			success:function(str){
				var oData=eval('('+str+')');
				console.log(oData)
				if(oData.responseCode==1){
					var sHtml='';
					for(var i=0; i<oData.object.length; i++){
						sHtml+="<tr><td>"+(i+1)+"</td>\
                                    <td>"+oData.object[i].openid+"</td>\
                                    <td>"+oData.object[i].userName+"</td>\
                                    <td>"+oData.object[i].phone+"</td>\
                                     <td>"+oData.object[i].address+"</td>\
                                     <td>"+oData.object[i].countGood+"</td>\
                                     <td>"+oData.object[i].countContent+"</td>\
                                </tr>";
					}

					
					$('#tbody').html(sHtml);

					$('#pagination').attr('count',oData.count);
					//页码选择 分页
					var allNum=$('#pagination').attr('count');
					Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
						getUserListfn(phone,userName,orderParam,pageSize,nowPage)
					});
				}else{
					$('#pagination').attr('count',0);
					//页码选择 分页
					var allNum=$('#pagination').attr('count');
					Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
						getUserListfn(phone,userName,orderParam,pageSize,nowPage)
					});
					$('#tbody').html('<tr><td colspan="16" align="center">'+oData.responseMsg+'</td></tr>');
				}
				//console.log(oData)
			}
		});
	}
}

//获取评论列表

Cqk.prototype.getCommentList=function(){
	var _this=this;
	var shopId=Uiho.tool.geturldata(window.location.href).id;
	var pageSize=20,nowPage=1;
	var str='data={"action":"getCommentList","params":{"businessId":'+shopId+'},"queryParam":{"pageSize":'+pageSize+',"nowPage":'+nowPage+'},"source":"web","target":"comment"}';
	$.ajax({
		url:_this.initUrl,
		type:"POST",
		data:str,
		beforeSend :function(){
			$('#tbody').html('<tr><td colspan="16" align="center">加载中，请稍后...</td></tr>');
		},
		success:function(str){
			var oData=eval('('+str+')');
			console.log(oData)
			if(oData.responseCode==1){
				var sHtml='';
				for(var i=0; i<oData.object.length; i++){
					sHtml+='<tr><td>'+(i+1)+'</td>\
                            <td>'+oData.object[i].userName+'</td>\
                            <td>'+oData.object[i].content+'</td>\
                             <td>'+Uiho.tool.DetailTimesTamp(oData.object[i].createDatetime)+'</td>\
                             <td>\
                                <div class="btn-group">\
                                    <a href="commentEdit.html?id='+oData.object[i].commentId+'" class="btn btn-primary btn-sm backpage">详情&nbsp;&nbsp;<i class="fa  fa-chevron-circle-right"></i></a>\
                                </div>\
                            </td>\
                        </tr>';
				}

				$('#tbody').html(sHtml);

				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserListfn(phone,userName,orderParam,pageSize,nowPage)
				});
			}else{
				$('#pagination').attr('count',0);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserListfn(phone,userName,orderParam,pageSize,nowPage)
				});
				$('#tbody').html('<tr><td colspan="16" align="center">'+oData.responseMsg+'</td></tr>');
			}
			//console.log(oData)
		}
	});
}


//评论详情

Cqk.prototype.getComment=function(){
	var _this=this;
	var getCommentId=Uiho.tool.geturldata(window.location.href).id;
	var str='data={"action":"getComment","params":'+getCommentId+',"source":"web","target":"comment"}';
	$.ajax({
		url:_this.initUrl,
		type:"POST",
		data:str,
		success:function(str){
			var oData=eval('('+str+')');
			console.log(oData.object)
			if(oData.responseCode==1){
				$('#userName').val(oData.object.userName);
				$('#createDatetime').val(Uiho.tool.DetailTimesTamp(oData.object.createDatetime));
				$('#content').val(oData.object.content);
				var picHtml='';
				if(oData.object.imageList.length==0){
					picHtml="暂无";
				}else{
					for(var i=0;i<oData.object.imageList.length; i++){
						picHtml+='<img src="'+oData.object.imageList[i].imgUrl+'" alt="">';
					};
				}
					

				$('#commentPic').html(picHtml);
			}else{
				alert("数据获取失败");
				history.go(-1);
			}
		}
	});
}
























































