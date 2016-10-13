if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError,{
        // 指示浏览器获取高精度的位置，默认为false
        enableHighAccuracy: true,
        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
        timeout: 5000,
        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        maximumAge: 3000
    });
}else{
    alert("不好意思，你的浏览器不支持html5定位");
}



function locationSuccess(position){
	var coords = position.coords;    
	//alert(coords.latitude+'-'+coords.longitude);

	var locationPos=coords.latitude+','+coords.longitude;

	var map = new BMap.Map("maps");

	map.centerAndZoom(new BMap.Point(coords.longitude,coords.latitude),17);  //初始化地图,设置城市和地图级别。
	
	$('body').attr('pos',coords.longitude+','+coords.latitude);

	//获取当前地址 

	var myGeo = new BMap.Geocoder(); 
	// 根据坐标得到地址描述 
	myGeo.getLocation(new BMap.Point(coords.longitude,coords.latitude), function(result){ 
		if (result){ 
			$('#nowShopAddress').val('商户位置:'+result.address);
		} 
	});
	
	var point = new BMap.Point(coords.longitude,coords.latitude);  
	var markerB = new BMap.Marker(point);// 创建标注
	
	map.addOverlay(markerB);             // 将标注添加到地图中

	markerB.enableDragging();

	var geoc = new BMap.Geocoder();
	//alert(locationPos)
	markerB.addEventListener('dragend',function(e){
		var pt=e.point;
		geoc.getLocation(pt, function(rs){
			var addComp = rs.addressComponents;
			$('#nowShopAddress').val('商户位置:'+addComp.city + addComp.district+ addComp.street + addComp.streetNumber);
		});
	},false);
};


function locationError(error){
    switch(error.code) {
        case error.TIMEOUT:
            alert("获取当前位置超时,请重试！！！");
            break;
        case error.POSITION_UNAVAILABLE:
            alert('不能获取您当前的位置！！！');
            break;
        case error.PERMISSION_DENIED:
            alert('请打开GPS以便于我们获取您当前的位置！！！');
            break;
        case error.UNKNOWN_ERROR:
            alert('未知的错误！！！');
            break;
    }
} 