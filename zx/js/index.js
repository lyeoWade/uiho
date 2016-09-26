$(function(){


	analysisCookie();

	Msg();


	setInterval(function(){
		Msg();
	},1000*60*1);
});

//添加管理员
function addmanager(){

}

function analysisCookie(){
	//var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));

	$('.username').html(cookieValue.realname);
	switch(cookieValue.role){
		case 1:
			//alert('超级管理员');
		break;
		case 2:
			$('#managewarp').remove();
		break;
	}
	// if(cookieValue.role){
	// }else{
	// }
}


/*
applyTrial：申请体验未处理总条数；
noContactUser：未联系用户总条数；
signUpUser：报名用户总条数；
untreatedCar：未处理爱车服务总条数；
untreatedFeedback：未处理反馈总条数；
*/
//响应实时数据
function Msg(){
	var datas='data={"action":"countPending","source":"web","target":"count"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var obj=oData.object;
				if(obj.applyTrial!=0 || obj.noContactUser!=0 || obj.signUpUser!=0){
					$('#ugment').addClass('active');
					$('#ugmentChild').css('display','block')
				}
				if(obj.reserveExam!=0 ){
					$("#examMsg").addClass('active');
					$("#examMsgChild").css('display','block')
				}
				if(obj.applyTrial==0)obj.applyTrial='';
				if(obj.signUpUser==0)obj.signUpUser='';
				if(obj.noContactUser==0)obj.noContactUser='';
				if(obj.untreatedCar==0)obj.untreatedCar='';
				if(obj.untreatedFeedback==0)obj.untreatedFeedback='';
				if(obj.withdrawApply==0)obj.withdrawApply='';

				if(obj.reserveExam==0)obj.reserveExam='';
				
				$("#reserveExam").html(obj.reserveExam);


				$('#ty').html(obj.applyTrial);
				$('#allu').html(obj.signUpUser);
				$('#userNum').html(obj.noContactUser);
				$('#ac').html(obj.untreatedCar);
				$('#fk').html(obj.untreatedFeedback);
				$("#txsq").html(obj.withdrawApply);
				console.log(obj.noContactUser);
			}else{
				alert(oData.responseMsg);
			}
			console.log(oData);
		}
	})
};









