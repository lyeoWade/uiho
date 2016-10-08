var getLocations = function (successFunc, errorFunc) { 
	//successFunc获取定位成功回调函数，errorFunc获取定位失败回调
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var point = new BMap.Point(lon, lat); // 创建点坐标
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                var addComp = rs.addressComponents;
                if (successFunc != undefined)successFunc(addComp,lat,lon);
            });
        },function (error) {
            switch (error.code) {
                case 1:
                    alert("位置服务被拒绝。");
                    break;
                case 2:
                    alert("暂时获取不到位置信息。");
                    break;
                case 3:
                    alert("获取位置信息超时。");
                    break;
                default:
                    alert("未知错误。");
                    break;
            }
            if (errorFunc != undefined)errorFunc(error);
        }, { timeout: 5000, enableHighAccuracy: true });
    } else {
        alert("你的浏览器不支持获取地理位置信息。");
        if (errorFunc != undefined)
            errorFunc("你的浏览器不支持获取地理位置信息。");
    }
};



var getLocation=function(fn){
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		console.log(r);
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			//map.addOverlay(mk);
			//map.panTo(r.point);
			//alert('您的位置：'+r.point.lng+','+r.point.lat);
			var lng=r.point.lng,lat=r.point.lat;
			fn&&fn(lng,lat);
		}else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})

}