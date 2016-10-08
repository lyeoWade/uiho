


$(function(){
	
	var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));

	console.log(cookieValue);

	if(cookieValue.managerId!=1){
		$('#manage').remove()
	};


	$('#out').on('click',function(){
		//alert(cookieValue);

		Uiho.cookies.removeCookie('userinfo');

		window.location.href='login.html';
		
	})
});





