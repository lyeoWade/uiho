function znsDate(id ,fn)
{
	var oTex=document.getElementById(id);
	//创建DIV
	var oBox=document.createElement('div');
	oBox.className='dateDiv';	
	var s='<ul class="name"><li><span></span><a href="javascript:;" class="a1">上月</a><a href="javascript:;" class="a2">下月</a></li></ul><ul class="week"><li>一</li>';	
	s+='<li>二</li>';
	s+='<li>三</li>';
	s+='<li>四</li>';
	s+='<li>五</li>';
	s+='<li>六</li>';
	s+='<li>七</li></ul><ul class="dateUl"></ul>';
	oBox.innerHTML=s;
	oTex.appendChild(oBox);

	oBox.style.display='block';
	
	var aUl=oBox.children;
	
	function nowDays(){
	   var oDate=new Date();
	   //将日期先调到下个月，再将天数调为0 回到上个月最后一天
	   oDate.setMonth(oDate.getMonth()+iNow);
	   oDate.setMonth(oDate.getMonth()+1,0); 
	   //oDate.setDate(0);
	   return oDate.getDate();
   };
   
   // 算出本月第一天是星期几
    function firstDay(){
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		 oDate.setDate(1);
		 return oDate.getDay();
		 // 0-6   星期天是0
    };
   
	
	function dateFn(){
	   //每次进来之前都要清空
	   
	   aUl[2].innerHTML='';	
	   
		
	  //接收本月第一天是星期几
	   var firstWeek=firstDay();
	   if(firstWeek==0)firstWeek=7;
	   firstWeek--;
	   
	   //塞空白日期的LI
	   for(var i=0;i<firstWeek;i++)
		{
			var oLi=document.createElement('li');
			aUl[2].appendChild(oLi);
		}
	   
	   
		//接收本月有几天
		var days=nowDays();
		
		//根据本月有多少天创建LI
		for(var i=0;i<days;i++)
		{
			var oLi=document.createElement('li');
			oLi.innerHTML='<span class="daynum">'+(i+1)+'</span>\
			<div class="workName"><span class="nowName">王大锤</span>\
				<ul class="workNameList">\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="workNameListfb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" class="mt-2" id="workNameListfb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="workNameListfb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="workNameListfb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="workNameListfb'+i+'"/><label>副班</label></span></li>\
					<li><input type="button" class="subBtn" value="确&nbsp;&nbsp;定"/></li>\
			<ul></div>\
			<div class="ktp"><span class="ktpName">可调配</span>\
				<ul class="ktpNameList">\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="ktpNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="ktpNameListzb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" class="mt-2" id="ktpNameListzb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="ktpNameListzb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="ktpNameListzb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="ktpNameListzb'+i+'"/><label>副班</label></span></li>\
					<li><input type="button" class="subBtn" value="确&nbsp;&nbsp;定"/></li>\
			<ul></div>\
			<div class="zg"><span class="ktpName">在岗</span>\
				<ul class="zgNameList">\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="zgNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="zgNameListzb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" class="mt-2" id="zgNameListzb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="zgNameListzb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="zgNameListzb'+i+'"/><label>副班</label></span></li>\
					<li>王大锤<span><input type="checkbox" class="mt-2" id="workNameListzb'+i+'"/><label>正班</label></span><span><input type="checkbox" class="mt-2" id="zgNameListzb'+i+'"/><label>副班</label></span></li>\
					<li><input type="button" class="subBtn" value="确&nbsp;&nbsp;定"/></li>\
			<ul></div>\
			<div class="holiday"><input type="checkbox" class="isHoliday" id="isHoliday'+i+'" /><label for="isHoliday'+i+'">节假日</label></div>';
			aUl[2].appendChild(oLi);
		};
		var workNameList=document.getElementsByClassName('workNameList');
		//alert(workNameList.length)
		//获取所有日期的LI
		var aLi=aUl[2].children;
		var oW=aLi[1].offsetWidth
		for(var i=0; i<aLi.length; i++){
			aLi[i].style.height=oW+'px';
		}
		
		//判断是上个月还是下个月还是本月
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		var d=oDate.getDate();
		
		if(iNow<0)
		{
			//上个月
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].className='ccc';	
			};
		}else if(iNow==0){
				
			for(var i=0;i<aLi.length;i++)
			{
				if(aLi[i].innerHTML<d)
				{
					//过去的日期变灰
					aLi[i].className='ccc';	
				}	
				else if(aLi[i].innerHTML==d)
				{
					//当天
					aLi[i].className='red';		
				}
				else if(i%7==5||i%7==6)
				{
					//星期六星期天
					aLi[i].className='sun';	
				}else if(i%7==0){
					//alert(i-(aLi.length-workNameList.length));
					//aLi[i].style.background="#ccc";
					workNameList[i-(aLi.length-workNameList.length)].style.right='-150px';
				}
				
			}
		}
		else
		{
							
			for(var i=0;i<aLi.length;i++)
			{
				if(i%7==5||i%7==6)
				{
					//星期六星期天
					aLi[i].className='sun';	
				}else if(i%7==1){
					workNameList[i].style.right='-150px';
				}
				
			}
	
		}


		
		//改日期标题
		var oS=oBox.getElementsByTagName('span')[0];
		oS.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月';
	};
	
	
	var iNow=0;
	dateFn();
	//上月下月
	var oPre=oBox.getElementsByTagName('a')[0];
	var oNext=oBox.getElementsByTagName('a')[1];
	
	oNext.onclick=function()
	{
		iNow++;
		dateFn();
	};
	
	oPre.onclick=function()
	{
		iNow--;
		dateFn();
	};
	

	fn()&&fn();
};

var oLink=document.createElement('link');
oLink.href='date/date.css';
oLink.rel='stylesheet';
oLink.type='text/css';
document.getElementsByTagName('head')[0].appendChild(oLink);
















