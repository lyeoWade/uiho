//依赖tool.js

function SetMap(options){
	this.loadCss(); //初始化样式
	options=options||{};
	var _this=this;
	options.obj=options.obj||'MapWrapBox';

	this.oBox=options.obj;//document.getElementById('box');

	// this.oImgInit={
	// 	l:0,
	// 	t:0
	// } 
	this.disL=0;
	this.disT=0;
	options.text=options.text||'<a href="javascript:history.go(-1);">返回上一页</a>';
	this.loadImage(options.ImageUrl,function(){
		_this.createMap(options.obj,this.src);
		_this.oImg=document.getElementById('img');
		_this.oImagemap=document.getElementById('imagemap');
		_this.oBlowUp=document.getElementById('blowUp');
		_this.oNarrow=document.getElementById('narrow');
		_this.init();
		_this.oImgInit={
			w:_this.oImg.offsetWidth,
			h:_this.oImg.offsetHeight,
			l:_this.oImg.offsetLeft,
			t:_this.oImg.offsetTop
		}
		_this.dragMap(options.point);
		_this.BlowUp(options.point);
		_this.Narrow(options.point);
		_this.contextmeunHandle(options.text);
		_this.createDot(options.point);
		_this.upDataDis(options.point);
	});
}
//QQLV000054ZDuCU8
SetMap.prototype.loadImage=function(url, callback) { 
	var img = new Image(); //创建一个Image对象，实现图片的预下载 
	img.src = url; 
	if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
		callback.call(img); 
		return; // 直接返回，不用再处理onload事件 
	} 
	img.onload = function () { //图片下载完毕时异步调用callback函数。 
		callback.call(img);//将回调函数的this替换为Image对象 
	}; 
}; 
SetMap.prototype.init=function (){
	//图片小于最小值时
	if(this.oImg.offsetWidth<this.oBox.offsetWidth){
		this.oImg.style.width=this.oBox.offsetWidth+10+'px';
	}
	
	//初始化图片的位置
	this.oImg.style.width=this.oImg.offsetWidth+'px';
	this.oImg.style.height=this.oImg.offsetHeight+'px';
	this.oImg.style.left=-Math.floor((this.oImg.offsetWidth-this.oBox.offsetWidth)/2)+'px';
	this.oImg.style.top=-Math.floor((this.oImg.offsetHeight-this.oBox.offsetHeight)/2)+'px';
}
SetMap.prototype.dragMap=function(point){
	var disX=0;
	var disY=0;
	var _this=this;
	this.oImg.onmousedown=function(ev){
		var oEvent=ev||event;
		disX=oEvent.clientX-_this.oImg.offsetLeft
		disY=oEvent.clientY-_this.oImg.offsetTop;
		
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var L=oEvent.clientX-disX;
			var T=oEvent.clientY-disY;
			if(L>=0){
				L=0;
			}else if(L<=-(Math.abs(_this.oImg.offsetWidth)-_this.oBox.offsetWidth)){
				L=-(Math.abs(_this.oImg.offsetWidth)-_this.oBox.offsetWidth);
			}

			if(T>=0){
				T=0;
			}else if(T<=-(Math.abs(_this.oImg.offsetHeight)-_this.oBox.offsetHeight)){
				T=-(Math.abs(_this.oImg.offsetHeight)-_this.oBox.offsetHeight);
			}
			_this.oImg.style.left=L+'px';
			_this.oImg.style.top=T+'px';

			//移动时更新数组的值
			_this.oImgInit={
				w:_this.oImg.offsetWidth,
				h:_this.oImg.offsetHeight,
				l:_this.oImg.offsetLeft,
				t:_this.oImg.offsetTop
			}
			//点跟着移动
			_this.upDataDis(point);
			return false;
		}
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
			
		}
	}
}
SetMap.prototype.BlowUp=function(point){
	var _this=this;
	//初始值
	var oImgW=_this.oImg.offsetWidth;
	var oImgH=_this.oImg.offsetHeight;
	this.oBlowUp.onclick=function(){
		//每一次增加的值
		var narrowValueWidth=_this.oImg.offsetWidth*0.1;
		var narrowValueHeight=_this.oImg.offsetHeight*0.1;

		//最大值2倍
		if((_this.oImg.offsetHeight-_this.oBox.offsetHeight)>=oImgH*2){
			return false;
		}
		if((_this.oImg.offsetWidth-_this.oBox.offsetWidth)>=oImgW*2){
			return false;
		}

		var L=_this.oImg.offsetLeft;
		var T=_this.oImg.offsetTop;

		var scaleL=L/(_this.oImg.offsetWidth-_this.oBox.offsetWidth);
		var scaleT=T/(_this.oImg.offsetHeight-_this.oBox.offsetHeight);
		_this.scale={
			l:scaleL,
			t:scaleT
		}
		_this.oImg.style.width=_this.oImg.offsetWidth+narrowValueWidth+'px';
		_this.oImg.style.height=_this.oImg.offsetHeight+narrowValueHeight+'px';
		_this.oImg.style.left=Math.floor(_this.oImg.offsetLeft+narrowValueWidth*scaleL)+'px';
		_this.oImg.style.top=_this.oImg.offsetTop+narrowValueHeight*scaleT+'px';

		//document.title=narrowValueWidth*scaleL;

		_this.disL+=narrowValueWidth*scaleL;
		_this.disT+=narrowValueHeight*scaleT;
		
		console.log(_this.oImg.offsetLeft+'/'+_this.oImgInit.l+'/'+point[2].x);

		//移动时更新数组的值
		/*
			放大: 中心点 
				: 判断点在图片上的位置 
		*/
		//点跟着移动
		var oDivs=_this.oImagemap.getElementsByClassName('mapdot');
		console.log(point[2].x/_this.oImg.offsetLeft*_this.oImgInit.l);
		for(var i=0; i<point.length; i++){
	        oDivs[i].style.left=-(_this.oImgInit.l*_this.oImg.offsetLeft)/point[i].x-_this.oImg.offsetLeft+'px';
	   		oDivs[i].style.top=-(_this.oImgInit.t*_this.oImg.offsetTop)/point[i].y-_this.oImg.offsetTop+'px';
	    }

	    _this.oImgInit={
			w:_this.oImg.offsetWidth,
			h:_this.oImg.offsetHeight,
			l:_this.oImg.offsetLeft,
			t:_this.oImg.offsetTop
		}
		
	}
}
SetMap.prototype.Narrow=function(point){
	var _this=this;
	this.oNarrow.onclick=function(){
		//alert(213)
		//每一次缩小的值
		var narrowValueWidth=_this.oImg.offsetWidth*0.1;
		var narrowValueHeight=_this.oImg.offsetHeight*0.1;
		//判断最小值
		if((_this.oImg.offsetHeight-_this.oBox.offsetHeight)<=narrowValueHeight){
			return false;
		}
		if(_this.oImg.offsetTop>=-narrowValueHeight){
			return false;
		}
		if(_this.oImg.offsetLeft>=-narrowValueWidth){
			return false;
		}
		if((_this.oImg.offsetWidth-_this.oBox.offsetWidth)<=narrowValueWidth){
			return false;
		}

		var L=_this.oImg.offsetLeft;
		var T=_this.oImg.offsetTop;

		var scaleL=L/(_this.oImg.offsetWidth-_this.oBox.offsetWidth);
		var scaleT=T/(_this.oImg.offsetHeight-_this.oBox.offsetHeight);
		
		_this.scale={
			l:scaleL,
			t:scaleT
		}
		
		console.log(scaleL);
		
		_this.oImg.style.height=_this.oImg.offsetHeight-narrowValueHeight+'px';
		_this.oImg.style.width=_this.oImg.offsetWidth-narrowValueWidth+'px';
		
		_this.oImg.style.left=Math.floor(_this.oImg.offsetLeft-narrowValueWidth*scaleL)+'px';
		_this.oImg.style.top=_this.oImg.offsetTop-narrowValueHeight*scaleT+'px';


		//移动时更新数组的值
		_this.oImgInit={
			w:_this.oImg.offsetWidth,
			h:_this.oImg.offsetHeight,
			l:_this.oImg.offsetLeft,
			t:_this.oImg.offsetTop
		}
		document.getElementById('txt').value=JSON.stringify(_this.oImgInit);
		//点跟着移动
		_this.upDataDis(point);
	}
}
/*
****创建点****
* point :　存着点坐标的数组
*/
SetMap.prototype.createDot=function (point){
	var _this=this;
    for(var i=0; i<point.length; i++){
        var oDiv=document.createElement('div');
        oDiv.className='mapdot';
        _this.oImagemap.appendChild(oDiv);
    }
}
SetMap.prototype.upDataDis=function(point){
	var _this=this;
	//console.log(_this.oImgInit);
	var oDivs=_this.oImagemap.getElementsByClassName('mapdot');
	for(var i=0; i<point.length; i++){
        oDivs[i].style.left=point[i].x+_this.oImgInit.l+'px';
   		oDivs[i].style.top=point[i].y+_this.oImgInit.t+'px';
    }
}
//右键菜单
SetMap.prototype.contextmeunHandle=function(text){
	var _this=this;
	this.oImg.oncontextmenu=function(ev){
		var oEvent=ev||event;
		createList(oEvent);
		getDis(oEvent);
		return false;
	}

	function getDis(e){
		var disX=0,disY=0;
		//console.log(_this.scale);
		var disX=Math.abs(_this.oImgInit.w*(_this.getPos(_this.oImg).left-e.clientX))/_this.oImg.offsetWidth;
		var disY=Math.abs(_this.oImgInit.h*(_this.getPos(_this.oImg).top-e.clientY))/_this.oImg.offsetHeight;
		alert(disX+'-'+disY);
		Uiho.cookies.setCookie("noePointDis",disX+','+disY,10);
	}
	document.body.onclick=function(){
		var oL=document.getElementById('meunList');
		if(oL){
			document.body.removeChild(oL);
		}
	};

	//创建列表
	function createList(oEvent){
		var oL=document.getElementById('meunList');
		if(oL){
			document.body.removeChild(oL);
		}
		var oDiv=document.createElement('div');
		oDiv.id="meunList";
		document.body.appendChild(oDiv);
		oDiv.style.left=oEvent.clientX+'px';
		oDiv.style.top=oEvent.clientY+_this.scrollNum().T+'px';
		oDiv.innerHTML+=text;
	}
}
// SetMap.prototype.createMapWrap=function(obj){
	
// }
SetMap.prototype.scrollNum=function(){
	return {
		T:document.body.scrollTop||document.documentElement.scrollTop,
		L:document.body.scrollLeft||document.documentElement.scrollLeft,
	}
}
SetMap.prototype.createMap=function(obj,src){

	//<div id="imagemap"></div>
	obj.innerHTML+='<div id="imagemap"><img id="img" src="'+src+'" /></div>\
		<div class="zoomwrap">\
		<a href="javascript:;" id="blowUp">+</a>\
		<a href="javascript:;" id="narrow">-</a></div>';
}
SetMap.prototype.loadCss=function(){
	var oLink=document.createElement('link');
	oLink.href="js/mapcss.css";
	oLink.rel="stylesheet";
	oLink.type="text/css";
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oLink);
}
SetMap.prototype.FullBg=function(){
	var oBg=document.createElement('div');
	oBg.id="FullBg_bg";
	document.body.appendChild(oBg);
}
SetMap.prototype.getPos=function(obj){
	var l=0,t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {
		left:l,
		top:t
	}
};