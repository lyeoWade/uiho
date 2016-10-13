

function nav(){
	
	var oTab=document.getElementById('tab');
	
	var oUl=oTab.querySelectorAll('.tabul')[0];
	var aLi=oUl.children;
	var oBtn=oTab.querySelectorAll('nav')[0].children;
	var iW=aLi[0].offsetWidth;
	var iNow=0;
	var iX=0;
	var iS=0;
	var iDisx=0;
	var timer=null;
	init();
	bind(oTab,'touchstart',fnstart);
	bind(oTab,'touchmove',fnmove);
	bind(oTab,'touchend',fnend);

	function fnstart(ev){
		
		ev=ev.changedTouches[0];
		//console.log(ev)
		iDisx=ev.pageX;
		iS=iX;
		clearInterval(timer);
	}
	function fnmove(ev){
		ev=ev.changedTouches[0];
		var disx=ev.pageX-iDisx;
		
		iX=disx+iS;
		oUl.style.WebkitTransform=oUl.style.transform="translateX("+iX+"px)";
		//console.log(ev)
		//clearInterval(timer);
	}
	function fnend(ev){
		
		iNow=-Math.round(iX/iW);
		if(iNow<0)iNow=0;
		if(iNow>aLi.length-1)iNow=aLi.length-1;
		init();
		tab();
		console.log(iNow)
		//console.log(ev)
		
		//clearInterval(timer);
	}
	
	
	function init(){
		timer=setInterval(function(){
			iNow++;
			iNow=iNow%aLi.length;
			tab();
		},2000);
	}
	
	
	function tab(){
		iX=-iNow*iW;
		oUl.style.transition='0.5s ease-out';
		oUl.style.transform="translate("+iX+"px)";
		for(var i=0; i<oBtn.length; i++){
			oBtn[i].className='';
		}
		oBtn[iNow].className='active';
	}
	
	
		
}





































