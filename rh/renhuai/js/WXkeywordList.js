$(function(){
	var nowPage=1,pageSize=20,name='';

	//获取默认的列表
	getWxKeywordList(nowPage,pageSize,name)
	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		name=$('#name').val();
		//选择查询
		getWxKeywordList(nowPage,pageSize,name)
	});

	document.onkeydown=function(ev){
		name=$('#name').val();
		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		getWxKeywordList(nowPage,pageSize,name)
	    };
	};

});

function getWxKeywordList(nowPage,pageSize,name){

	var datas='data={"action":"getWxKeywordList","params":{"name":"'+name+'","nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"backstage","target":"wxKeyword"}';
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
					var role='';
			      
					tableHtml+='<tr><td><input type="checkbox"  keywordId="'+sData.wxKeywordId+'" class="checkBtn"/></td><td>'+(i+1)+'</td><td>'+sData.name+'</td><td>'+sData.linkUrl+'</td>\
						<td><div class="btn-group"><a href="WXkeywordInfo.html?id='+sData.wxKeywordId+'" class="btn btn-primary btn-sm">编辑&nbsp;&nbsp;<i class="fa  fa-chevron-circle-right"></i></a><a href="javascript:;" class="btn btn-warning btn-sm deleteKeyword" keywordId="'+sData.wxKeywordId+'"><i class="fa fa-times"></i>&nbsp;&nbsp;删除</a></div></td></tr>';
				};
				$('tbody').html(tableHtml+'<tr><td>全选:<input type="checkbox" id="allselect"/></td>\
					<td colspan="9"><a href="javascript:;" class="btn btn-warning btn-sm allCheckedBox"><i class="fa fa-times"></i>&nbsp;&nbsp;删除</a></td></tr>');
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getWxKeywordList(nowPage,pageSize,name)
				});
				deleteKeyword(function(){
					getWxKeywordList(nowPage,pageSize,name)
				});
				allselect(function(){
					getWxKeywordList(nowPage,pageSize,name)
				});
			}else{
				$('tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}
		},
		complete:function(){
			
		}
	})
};


function deleteKeyword(fn){
	$('.deleteKeyword').on('click',function(){
		var keywordId=$(this).attr('keywordId');
		var datas='data={"action":"deleteWxKeyword","params":'+keywordId+',"source":"backstage","target":"wxKeyword"}';
		var r=confirm("确定删除本条数据吗?")
		if(r==true){
			$.ajax({
				url:requrl,
				type:"POST",
				data:datas,
				success:function(str){
					var oData=$.parseJSON(str);
					console.log(oData)
					if(oData.responseCode==1){
						alert(oData.responseMsg)
						fn&&fn();
					}else{
						alert(oData.responseMsg)
					}
				}
			});
		}
	});
}



function allselect(fn){
	var oAllSelect=document.getElementById('allselect');
	var oCheckBtn=document.getElementsByClassName('checkBtn');
	var oAllCheckedBox=document.getElementsByClassName('allCheckedBox')[0];
	 
	var Sys=true;
	oAllSelect.onclick=function(){
		//alert(oCheckBtn.length)
		if(Sys){
			for(var i=0; i<oCheckBtn.length; i++){
				oCheckBtn[i].checked=true;
				Sys=false;
			}
		}else{
			for(var i=0; i<oCheckBtn.length; i++){
				oCheckBtn[i].checked=false;
				Sys=true;
			}
		}
	}
	var n=0;
	for(var i=0; i<oCheckBtn.length; i++){
		oCheckBtn[i].onclick=function(){
			if(this.checked==true)
			{
				n++;
			}
			else
			{
				n--;  	
			}
			if(n==oCheckBtn.length)
			{
				oAllSelect.checked=true;
			}
			else
			{
				oAllSelect.checked=false;
			}
		};
	}
	
	oAllCheckedBox.onclick=function(){
		var arrNum=[];
		var i=0;
		while(i<oCheckBtn.length){
			if(oCheckBtn[i].checked==true){
				arrNum.push(oCheckBtn[i].getAttribute('keywordId'))
			}
			i++;
		}
	
		if(arrNum.length<=0){
			alert("请选择要删除的数据;");
			return false;
		}
		var r=confirm("确定删除这些数据吗?")
		if(r==true){
			for(var i=0; i<arrNum.length; i++){
				var datas='data={"action":"deleteWxKeyword","params":'+arrNum[i]+',"source":"backstage","target":"wxKeyword"}';
				$.ajax({
					url:requrl,
					type:"POST",
					data:datas,
					success:function(str){
						var oData=$.parseJSON(str);
						if(oData.responseCode==1){
							fn&&fn();
						}else{
							alert(oData.responseMsg)
						}
					}
				});
			}
			
		}
	}
};












