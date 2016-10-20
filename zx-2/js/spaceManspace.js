$(function(){

	var nowPage=1,pageSize=10,name='';

	getSpaceList(nowPage,pageSize,name);

	//获取默认的列表
	getSpaceList(nowPage,pageSize,name);
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getSpaceList(nowPage,pageSize,name);
	});

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		exfA=$('#exfA').val();
		sub=$('#sub').val();
		name=$('#name').val();
		intor=$('#intor').val();
		//选择查询
		getSpaceList(nowPage,pageSize,name);
	});
});

//获取列表 
function getSpaceList(nowPage,pageSize,name){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={"action":"getSiteList","params": {"nowPage": '+nowPage+',"pageSize":'+pageSize+',"name":"'+name+'"}, "source": "web", "target":"site" }',
		beforeSend:function(){
			$('#tbody').html('<tr><th colspan="8" align="center" style="text-align:center;">加载中,请稍后...</th></tr>');
		}, 
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			var allstr='';
			if(oData.responseCode==1){
				$('#tbody').removeClass('error');
				

				for(var i=0; i<oData.object.length; i++){
					var datas=oData.object[i];
					var subs='';
					switch(datas.sub){
						case 1:
							subs='科目一';
						break;
						case 2:
							subs='科目二';
						break;
						case 3:
							subs='科目三';
						break;
						case 4:
							subs='科目四';
						break;
					}
				
                    allstr+='<tr><td>'+(i+1)+'</td><td>'+datas.name+'</td><td>'+datas.exfA+'</td><td>'+subs+'</td>\
                        <td>'+Uiho.tool.DetailTimesTamp(datas.createTime)+'</td><td><div class="btn-group">\
                        <a href="spaceManspaceEdit.html?id='+datas.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>\
                        <button spaceid="'+datas.id+'" class="btn btn-warning btn-sm deleteList"><i class="fa fa-times"></i></button>\
                        </div></td></tr>';
				};
				 // <a href="javascript:;" title="删除教练" class="btn btn-primary btn-sm"><i class="fa fa-times"></i></a>\
				$('#pagination').attr('count',oData.count);
				$('#tbody').html(allstr);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getSpaceList(nowPage,pageSize,name);
				});


				//删除
				$('.deleteList').on('click',function(){
					
					var datas='data={"action":"deleteOneSite","params":'+$(this).attr('spaceid')+',"source":"web","target": "site" }';
					deleteOneData(datas,0,"删除一个场地！",function(){
						getSpaceList(nowPage,pageSize,name);
					})
				});
				
			}else{
				$('#tbody').html('<tr><th colspan="8" align="center" style="text-align:center;">'+oData.responseMsg+'</th></tr>');
			}
		},
		complete:function(str){

		}
	});
}

