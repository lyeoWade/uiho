$(function(){

	var Sid=Uiho.tool.geturldata(window.location.href).id;
	var datas='data={"action":"getSort","params":'+Sid+',"source":"backstage","target":"sort"}'
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){

			var oData=$.parseJSON(str);
			var obj=oData.object;
			console.log(obj)
			$('#managerNo').val(obj.sortNo);
			$('#title').val(obj.title);
			$('#thumb2 img').attr('src',obj.imgUrl)
			$('#note').val(obj.note);
			$('#orderBy').val(obj.orderBy); 

			$('#saves').on('click',function(){
				updataUserInfo(Sid);
			});
		},
		complete:function(){			
 			document.onkeydown=function(ev){
				var oEvent=ev||event;
			   	if(oEvent.keyCode==13){
			   		//	alert(123);
			   		updataUserInfo(Sid);
			   	};
			};
		}
	})



	changes();
    
    //封面图 只有一张
    $('#uploadBanner').on('click',function(){
        var thumbs=''; 
        var f=$('.fileInput1').get(0).files[0];
        console.log(f)
        if(f){
            $('.marktag').html(f.name);
            uploadFile(f,function(evt){
                /* 服务器端返回响应时候触发event事件*/
                var info = evt.target.responseText;
                var data=eval('('+info+')'); 
                thumbs+='<img src="'+data.objectURL+'" style="width:80px;">';
                $('#thumb2').html(thumbs);
                deletenewimage();
            });
        }else{
            alert('请选择图片！');
            return false;
        }
    });
});




function updataUserInfo(Sid){
	var title=$('#title').val();
	var note=$('#note').val();
	var orderBy=$('#orderBy').val();
	 var imgUrl='';
    if($('#thumb2 img').length!=0){
        imgUrl=$('#thumb2 img').attr('src')
    }else{
        $('.addtip').html('封面图不能为空');
        $('.addtip').addClass('error')
        return false;
    }
	//提交
	var datas='data={"action":"updateSort","params":{"sortId":'+Sid+',"title":"'+title+'","note":"'+note+'","orderBy":"'+orderBy+'","imgUrl":"'+imgUrl+'"},"source":"backstage","target":"sort"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str);
			responseInfo(str);
			setTimeout(function(){
                history.go(0);
            },800)
		}
	});
}

