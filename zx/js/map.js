//依赖tool.js

function SetMap(options) {
	this.loadCss(); //初始化样式
	options = options || {};
	var _this = this;
	options.obj = options.obj || 'MapWrapBox';

	this.oBox = options.obj; //document.getElementById('box');


	this.disPoint = this.deepCopy(options.point);


	options.text = options.text || '<a href="javascript:history.go(-1);">返回上一页</a>';
	this.loadImage(options.ImageUrl, function() {
		_this.createMap(options.obj, this.src);
		_this.oImg = document.getElementById('img');
		_this.oImagemap = document.getElementById('imagemap');
		_this.oBlowUp = document.getElementById('blowUp');
		_this.oNarrow = document.getElementById('narrow');
		_this.init();
		_this.oImgInit = {
			w: _this.oImagemap.offsetWidth,
			h: _this.oImagemap.offsetHeight,
			l: _this.oImagemap.offsetLeft,
			t: _this.oImagemap.offsetTop
		}
		_this.dragMap(options.point);
		_this.BlowUp(options.point);
		_this.Narrow(options.point);
		_this.contextmeunHandle(options.text);
		_this.createDot(options.point);
		_this.upDataDis(options.point);
		_this.disPoint = options.point;
	});
}
//QQLV000054ZDuCU8
SetMap.prototype.loadImage = function(url, callback) {
	var img = new Image(); //创建一个Image对象，实现图片的预下载 
	img.src = url;
	if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
		callback.call(img);
		return; // 直接返回，不用再处理onload事件 
	}
	img.onload = function() { //图片下载完毕时异步调用callback函数。 
		callback.call(img); //将回调函数的this替换为Image对象 
	};
};
SetMap.prototype.init = function() {
	//图片小于最小值时
	if (this.oImg.offsetWidth < this.oBox.offsetWidth) {
		this.oImg.style.width = this.oBox.offsetWidth + 10 + 'px';
	}

	//初始化图片的位置
	this.oImg.style.width = this.oImg.offsetWidth + 'px';
	this.oImg.style.height = this.oImg.offsetHeight + 'px';
	// this.oImg.style.left=-Math.floor((this.oImg.offsetWidth-this.oBox.offsetWidth)/2)+'px';
	// this.oImg.style.top=-Math.floor((this.oImg.offsetHeight-this.oBox.offsetHeight)/2)+'px';

	//初始化图片的位置
	this.oImagemap.style.width = this.oImg.offsetWidth + 'px';
	this.oImagemap.style.height = this.oImg.offsetHeight + 'px';
	this.oImagemap.style.left = -Math.floor((this.oImg.offsetWidth - this.oBox.offsetWidth) / 2) + 'px';
	this.oImagemap.style.top = -Math.floor((this.oImg.offsetHeight - this.oBox.offsetHeight) / 2) + 'px';
}
SetMap.prototype.dragMap = function(point) {
	var disX = 0;
	var disY = 0;
	var _this = this;
	this.oImagemap.onmousedown = function(ev) {
		var oEvent = ev || event;
		disX = oEvent.clientX - _this.oImagemap.offsetLeft
		disY = oEvent.clientY - _this.oImagemap.offsetTop;
		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			var L = oEvent.clientX - disX;
			var T = oEvent.clientY - disY;
			if (L >= 0) {
				L = 0;
			} else if (L <= -(Math.abs(_this.oImagemap.offsetWidth) - _this.oBox.offsetWidth)) {
				L = -(Math.abs(_this.oImagemap.offsetWidth) - _this.oBox.offsetWidth);
			}

			if (T >= 0) {
				T = 0;
			} else if (T <= -(Math.abs(_this.oImagemap.offsetHeight) - _this.oBox.offsetHeight)) {
				T = -(Math.abs(_this.oImagemap.offsetHeight) - _this.oBox.offsetHeight);
			}
			_this.oImagemap.style.left = L + 'px';
			_this.oImagemap.style.top = T + 'px';

			//移动时更新数组的值
			_this.oImgInit = {
					w: _this.oImagemap.offsetWidth,
					h: _this.oImagemap.offsetHeight,
					l: _this.oImagemap.offsetLeft,
					t: _this.oImagemap.offsetTop
				}
				//点跟着移动
			_this.upDataDis(point);
			return false;
		}
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;

		}
	}
}
SetMap.prototype.BlowUp = function(point) {
	var _this = this;
	//初始值
	var oImgW = _this.oImagemap.offsetWidth;
	var oImgH = _this.oImagemap.offsetHeight;
	this.oBlowUp.onclick = function() {
		//每一次增加的值
		var narrowValueWidth = _this.oImagemap.offsetWidth * 0.1;
		var narrowValueHeight = _this.oImagemap.offsetHeight * 0.1;

		//最大值2倍
		if ((_this.oImagemap.offsetHeight - _this.oBox.offsetHeight) >= oImgH * 2) {
			return false;
		}
		if ((_this.oImagemap.offsetWidth - _this.oBox.offsetWidth) >= oImgW * 2) {
			return false;
		}

		var L = _this.oImagemap.offsetLeft;
		var T = _this.oImagemap.offsetTop;

		var scaleL = L / (_this.oImagemap.offsetWidth - _this.oBox.offsetWidth);
		var scaleT = T / (_this.oImagemap.offsetHeight - _this.oBox.offsetHeight);
		_this.scale = {
			l: scaleL,
			t: scaleT
		}
		_this.oImagemap.style.width = _this.oImagemap.offsetWidth + narrowValueWidth + 'px';

		_this.oImagemap.style.height = _this.oImagemap.offsetHeight + narrowValueHeight + 'px';

		_this.oImagemap.style.left = _this.oImagemap.offsetLeft + narrowValueWidth * scaleL + 'px';
		_this.oImagemap.style.top = _this.oImagemap.offsetTop + narrowValueHeight * scaleT + 'px';

		//重置pic的宽高
		_this.oImg.style.width = _this.oImagemap.offsetWidth + 'px';
		_this.oImg.style.height = _this.oImagemap.offsetHeight + 'px';

		//移动时更新数组的值
		/*
			放大: 中心点 
				: 判断点在图片上的位置 
		*/
		//点跟着移动
		var oDivs = _this.oImagemap.getElementsByClassName('mapdot');

		for (var i = 0; i < point.length; i++) {
			oDivs[i].style.left = point[i].x * (_this.oImagemap.offsetWidth / _this.oImgInit.w) + 'px';
			oDivs[i].style.top = point[i].y * (_this.oImagemap.offsetHeight / _this.oImgInit.h) + 'px';

			_this.disPoint[i].x = oDivs[i].offsetLeft;
			_this.disPoint[i].y = oDivs[i].offsetTop;

		}

		//移动时更新数组的值
		_this.oImgInit = {
			w: _this.oImagemap.offsetWidth,
			h: _this.oImagemap.offsetHeight,
			l: _this.oImagemap.offsetLeft,
			t: _this.oImagemap.offsetTop
		}
		console.log(point);
		console.log(_this.disPoint);
	}
}
SetMap.prototype.Narrow = function(point) {
		var _this = this;
		this.oNarrow.onclick = function() {
			//alert(213)
			//每一次缩小的值
			var narrowValueWidth = _this.oImagemap.offsetWidth * 0.1;
			var narrowValueHeight = _this.oImagemap.offsetHeight * 0.1;
			//判断最小值
			if ((_this.oImagemap.offsetHeight - _this.oBox.offsetHeight) <= narrowValueHeight) {
				return false;
			}
			if (_this.oImagemap.offsetTop >= -narrowValueHeight) {
				return false;
			}
			if (_this.oImagemap.offsetLeft >= -narrowValueWidth) {
				return false;
			}
			if ((_this.oImagemap.offsetWidth - _this.oBox.offsetWidth) <= narrowValueWidth) {
				return false;
			}

			var L = _this.oImagemap.offsetLeft;
			var T = _this.oImagemap.offsetTop;

			var scaleL = L / (_this.oImagemap.offsetWidth - _this.oBox.offsetWidth);
			var scaleT = T / (_this.oImagemap.offsetHeight - _this.oBox.offsetHeight);

			_this.oImagemap.style.height = _this.oImagemap.offsetHeight - narrowValueHeight + 'px';
			_this.oImagemap.style.width = _this.oImagemap.offsetWidth - narrowValueWidth + 'px';

			_this.oImagemap.style.left = Math.floor(_this.oImagemap.offsetLeft - narrowValueWidth * scaleL) + 'px';
			_this.oImagemap.style.top = _this.oImagemap.offsetTop - narrowValueHeight * scaleT + 'px';


			_this.oImg.style.width = _this.oImagemap.offsetWidth + 'px';
			_this.oImg.style.height = _this.oImagemap.offsetHeight + 'px';



			var oDivs = _this.oImagemap.getElementsByClassName('mapdot');

			for (var i = 0; i < point.length; i++) {
				oDivs[i].style.left = point[i].x * (_this.oImagemap.offsetWidth / _this.oImgInit.w) + 'px';
				oDivs[i].style.top = point[i].y * (_this.oImagemap.offsetHeight / _this.oImgInit.h) + 'px';
				point[i].x = oDivs[i].offsetLeft;
				point[i].y = oDivs[i].offsetTop;
			}

			//移动时更新数组的值
			_this.oImgInit = {
				w: _this.oImagemap.offsetWidth,
				h: _this.oImagemap.offsetHeight,
				l: _this.oImagemap.offsetLeft,
				t: _this.oImagemap.offsetTop
			}
		}
	}
	/*
	 ****创建点****
	 * point :　存着点坐标的数组
	 */
SetMap.prototype.createDot = function(point) {
	var _this = this;
	for (var i = 0; i < point.length; i++) {
		var oA = document.createElement('a');
		oA.className = 'mapdot';
		oA.href="patrolEdit.html?data="+i;
		_this.oImagemap.appendChild(oA);
	}
}
SetMap.prototype.upDataDis = function(point) {
		var _this = this;
		var oDivs = _this.oImagemap.getElementsByClassName('mapdot');
		for (var i = 0; i < point.length; i++) {
			oDivs[i].style.left = point[i].x + 'px';
			oDivs[i].style.top = point[i].y + 'px';
		}
	}
	/***
	 *右键菜单 点击之后获取坐标值 存入cookie，跳转页面设置坐标点 
	 *	
	 *
	 */

SetMap.prototype.contextmeunHandle = function(text) {
	var _this = this;
	this.oImg.oncontextmenu = function(ev) {
		var oEvent = ev || event;
		createList(oEvent);
		getDis(oEvent);
		return false;
	}



	function getDis(e) {
		var disX = 0,
			disY = 0;
		var disX = Math.abs(_this.oImgInit.w * (_this.getPos(_this.oImg).left - e.clientX)) / _this.oImg.offsetWidth;
		var disY = Math.abs(_this.oImgInit.h * (_this.getPos(_this.oImg).top - e.clientY)) / _this.oImg.offsetHeight;
		//alert(disX + '-' + disY);
		Uiho.cookies.setCookie("noePointDis", disX + ',' + disY, 10);
	}
	document.body.onclick = function() {
		var oL = document.getElementById('meunList');
		if (oL) {
			document.body.removeChild(oL);
		}
	};

	//创建列表
	function createList(oEvent) {
		var oL = document.getElementById('meunList');
		if (oL) {
			document.body.removeChild(oL);
		}
		var oDiv = document.createElement('div');
		oDiv.id = "meunList";
		document.body.appendChild(oDiv);
		oDiv.style.left = oEvent.clientX + 'px';
		oDiv.style.top = oEvent.clientY + _this.scrollNum().T + 'px';
		oDiv.innerHTML += text;
	}
}
SetMap.prototype.scrollNum = function() {
	return {
		T: document.body.scrollTop || document.documentElement.scrollTop,
		L: document.body.scrollLeft || document.documentElement.scrollLeft,
	}
}
SetMap.prototype.createMap = function(obj, src) {

	//<div id="imagemap"></div>
	obj.innerHTML += '<div id="imagemap"><img id="img" src="' + src + '" /></div>\
		<div class="zoomwrap">\
		<a href="javascript:;" id="blowUp">+</a>\
		<a href="javascript:;" id="narrow">-</a></div>';
}
SetMap.prototype.loadCss = function() {
	var oLink = document.createElement('link');
	oLink.href = "js/mapcss.css";
	oLink.rel = "stylesheet";
	oLink.type = "text/css";
	var oHead = document.getElementsByTagName('head')[0];
	oHead.appendChild(oLink);
}
SetMap.prototype.FullBg = function() {
	var oBg = document.createElement('div');
	oBg.id = "FullBg_bg";
	document.body.appendChild(oBg);
}
SetMap.prototype.getPos = function(obj) {
	var l = 0,
		t = 0;
	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		left: l,
		top: t
	}
};

SetMap.prototype.deepCopy = function(p, c) {　
	var _this = this;　　　
	var c = c || {};　　　　
	for (var i in p) {　　　　　　
		if (typeof p[i] === 'object') {　　　　　　　　
			c[i] = (p[i].constructor === Array) ? [] : {};　　　　　　　　
			_this.deepCopy(p[i], c[i]);　　　　　　
		} else {　　　　　　　　　
			c[i] = p[i];　　　　　　
		}　　　　
	}　　　　
	return c;　
}