function MapAdd(){
	this.selectLayer();
	this.MapPreview();
}
//楼层选择坐标
MapAdd.prototype.selectLayer=function(){
	var oDisWrap=$$('.disWrap');
	var oFloorSelect=$$('#FloorSelect');

	oFloorSelect.onchange=function(){
		if(this.value!=1){
			oDisWrap.style.display="block";
		}else{
			oDisWrap.style.display="none";
		}
	}
	//
}

MapAdd.prototype.MapPreview=function(){

	var oFull=$$('.Full_screen');
	oFull.onclick=function(){
		var m=new SetMap({
			obj:document.getElementById('MapWrapBox'),
			ImageUrl:'images/1.jpg'
		});
		m.FullBg();
	}
	
}


























