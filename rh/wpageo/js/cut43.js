$(function () {

  'use strict';
  var oCutWrap=$('.cutWrap');
  var console = window.console || { log: function () {} },
      $alert = $('.docs-alert'),
      $message = $alert.find('.message'),
      showMessage = function (message, type) {
      };

  // Demo
  // -------------------------------------------------------------------------
  	
  (function () {
    var $image = $('.img-container > img'),
        options = {
          aspectRatio: 4 / 3,
          preview: '.img-preview',
          crop: function (data) {

          }
        };

    $image.on({
      'build.cropper': function (e) {
        console.log(e.type);
      },
      'built.cropper': function (e) {
        console.log(e.type);
      },
      'dragstart.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragmove.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragend.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'zoomin.cropper': function (e) {
        console.log(e.type);
      },
      'zoomout.cropper': function (e) {
        console.log(e.type);
      }
    }).cropper(options);

    $('.uploadimgBack').on("click",function(){
		//alert(123)
		oCutWrap.css({
	  		'opacity':'0',
	  		'z-index':'-600'
	  	});
	});
	

    // Methods
    $(document.body).on('click', '[data-method]', function () {
      var data = $(this).data(),
          $target,
          result;

      if (data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        result = $image.cropper(data.method, data.option);

        if (data.method === 'getCroppedCanvas') {
          	$('#uploadtip').css('display','block');
          	var f=result.toDataURL();
          	sumitImageFile(f,function(evt){
				var data=eval('('+evt+')'); 
				var tClass=getCookie('tClass');

				$(tClass).find('.imgWrap').html('<img src="'+data.objectURL+'"/>');
				$('#uploadtip').css('display','none');
				oCutWrap.css({
					'opacity':'0',
					'z-index':'-300'
				});
			});
        }


        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    });


    // Import image
    var $inputImage = $('#file'),
        URL = window.URL || window.webkitURL,
        blobURL;

    $(".getfile1").on("click", function() {
		 $inputImage.click();
		 setCookie('tClass','.getfile1',8);
	});

    $(".getfile2").on("click", function() {
		 $inputImage.click();
		 setCookie('tClass','.getfile2',8);
	});

	$(".getfile3").on("click", function() {
		 $inputImage.click();
		 setCookie('tClass','.getfile3',8);
	});
	$(".getfile4").on("click", function() {
		 $inputImage.click();
		 setCookie('tClass','.getfile4',8);
	});

	

   var $scale='';
   oCutWrap.css('height',$(window).height());


    if (URL) {
      $inputImage.change(function () {
        var files = this.files,
            file;
        oCutWrap.css({
	  		'opacity':'1',
	  		'z-index':'600'
	  	});

        var tClassScale=getCookie('tClass');
        if(tClassScale=='.getfile1' || tClassScale=='.getfile2' || tClassScale=='.getfile3'){
        	$scale=1.3333333333333333;
        }else if(tClassScale='.getfile4'){
        	$scale=1;
        }
        

		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');
		//    瓦片canvas
		var tCanvas = document.createElement("canvas");
		var tctx = tCanvas.getContext("2d");

		var maxsize = 100 * 1024;

		if (!this.files.length) return;

	    var files = Array.prototype.slice.call(this.files);
	 	
	    var Orientation;
	    files.forEach(function(file, i) {
	        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;


	       	EXIF.getData(file, function () {
		    	//document.title=EXIF.getTag(this, 'Orientation'); 
		       Orientation = EXIF.getTag(this, 'Orientation');
		    });

	        var reader = new FileReader();

	        reader.onload = function() {

              
	          var img = new Image();
	          var result = this.result;
	          img.src = result;



	            //如果图片大小小于100kb，则直接上传
	            if (result.length <= maxsize) {
		          	var blobURL=result;
		            $image.one('built.cropper', function () {
		              URL.revokeObjectURL(blobURL); // Revoke when load complete
		            }).cropper('reset', true).cropper('replace', blobURL).cropper('setAspectRatio', $scale);
		            
		            $inputImage.val('');
	              img = null;
	              return;
	            }
				//      图片加载完毕之后进行压缩，然后上传
	            if (img.complete) {
	            	callback();
	         	} else {
	            	img.onload = callback;
	            }

	          function callback() {
	          		var degree=0,drawWidth,drawHeight,width,height;
				  	drawWidth=img.naturalWidth;
				  	drawHeight=img.naturalHeight;
				  	canvas.width=width=drawWidth;
				  	canvas.height=height=drawHeight; 
				  	var context=canvas.getContext('2d');

				  	//判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
				  	
				  	switch(Orientation){
					    //iphone横屏拍摄，此时home键在左侧
					    case 3:
					      degree=180;
					      drawWidth=-width;
					      drawHeight=-height;
					      break;
					    //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
					    case 6:
					      canvas.width=height;
					      canvas.height=width; 
					      degree=90;
					      drawWidth=width;
					      drawHeight=-height;
					      break;
					    //iphone竖屏拍摄，此时home键在上方
					    case 8:
					      canvas.width=height;
					      canvas.height=width; 
					      degree=270;
					      drawWidth=-width;
					      drawHeight=height;
					      break;
					}
					
				  	//使用canvas旋转校正
				 	context.rotate(degree*Math.PI/180);
				 	context.drawImage(img,0,0,drawWidth,drawHeight);
				  	//返回校正图片
				  	var datas=canvas.toDataURL('image/jpeg', 0.1);
		            var blobURL=datas;
	            	$image.one('built.cropper', function () {
	            	   URL.revokeObjectURL(blobURL); 
	             	}).cropper(options).cropper('reset', true).cropper('setAspectRatio', $scale).cropper('replace', blobURL);

		            $inputImage.val('');
		          	img = null;
	          }
	        };

	        reader.readAsDataURL(file);
	      })

	    function rotateImg(img, direction,canvas) {  
	        //alert(img);
	        //最小与最大旋转方向，图片旋转4次后回到原方向  
	        var min_step = 0;  
	        var max_step = 3;  
	        //var img = document.getElementById(pid);  
	        if (img == null)return;  
	        //img的高度和宽度不能在img元素隐藏后获取，否则会出错  
	        var height = img.height;  
	        var width = img.width;  
	        //var step = img.getAttribute('step');  
	        var step = 2;  
	        if (step == null) {  
	            step = min_step;  
	        }  
	        if (direction == 'right') {  
	            step++;  
	            //旋转到原位置，即超过最大值  
	            step > max_step && (step = min_step);  
	        } else {  
	            step--;  
	            step < min_step && (step = max_step);  
	        }  
	        //img.setAttribute('step', step);  
	        /*var canvas = document.getElementById('pic_' + pid);  
	        if (canvas == null) {  
	            img.style.display = 'none';  
	            canvas = document.createElement('canvas');  
	            canvas.setAttribute('id', 'pic_' + pid);  
	            img.parentNode.appendChild(canvas);  
	        }*/
	        //旋转角度以弧度值为参数  
	        var degree = step * 90 * Math.PI / 180;  
	        var ctx = canvas.getContext('2d');  
	        switch (step) {  
	            case 0:  
	                canvas.width = width;  
	                canvas.height = height;  
	                ctx.drawImage(img, 0, 0);  
	                break;  
	            case 1:  
	                canvas.width = height;  
	                canvas.height = width;  
	                ctx.rotate(degree);  
	                ctx.drawImage(img, 0, -height);  
	                break;  
	            case 2:  
	                canvas.width = width;  
	                canvas.height = height;  
	                ctx.rotate(degree);  
	                ctx.drawImage(img, -width, -height);  
	                break;  
	            case 3:  
	                canvas.width = height;  
	                canvas.height = width;  
	                ctx.rotate(degree);  
	                ctx.drawImage(img, -width, 0);  
	                break;  
	        }  
	    }
	  	//    使用canvas对大图片进行压缩
		function compress(img) {
		    var initSize = img.src.length;
		    var width = img.width;
		    var height = img.height;

		    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
		    var ratio;
		    if ((ratio = width * height / 4000000) > 1) {
		      ratio = Math.sqrt(ratio);
		      width /= ratio;
		      height /= ratio;
		    } else {
		      ratio = 1;
		    }
		    canvas.width = width;
		    canvas.height = height;

			//        铺底色
		    ctx.fillStyle = "#fff";
		    ctx.fillRect(0, 0, canvas.width, canvas.height);

		    //如果图片像素大于100万则使用瓦片绘制
		    var count;
		    if ((count = width * height / 1000000) > 1) {
		      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

			   //            计算每块瓦片的宽和高
		      var nw = ~~(width / count);
		      var nh = ~~(height / count);

		      tCanvas.width = nw;
		      tCanvas.height = nh;

		      for (var i = 0; i < count; i++) {
		        for (var j = 0; j < count; j++) {
		          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

		          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
		        }
		      }
		    } else {
		      ctx.drawImage(img, 0, 0, width, height);
		    }

		    //进行最小压缩
		    var ndata = canvas.toDataURL('image/jpeg', 0.1);

		    console.log('压缩前：' + initSize);
		    console.log('压缩后：' + ndata.length);
		    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

		    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

		    return ndata;
		}
      });
    } else {
      $inputImage.parent().remove();
    }


    // Options
    $('.docs-options:checkbox').on('change', function () {
      var $this = $(this);

      options[$this.val()] = $this.prop('checked');
      $image.cropper('destroy').cropper(options);
    });


    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();

  }());

});


function setCookie(name, value, Hours){
	var oDate=new Date();
	var oh=oDate.getHours()+Hours;
	oDate.setHours(oh);
	//alert(oDate)
	document.cookie=name+'='+value+';expires='+oDate;
}
function getCookie(cookiename){
	var result;
	var mycookie = document.cookie;
	var start2 = mycookie.indexOf(cookiename + "=");
	if (start2 > -1) {
		start = mycookie.indexOf("=", start2) + 1;
		var end = mycookie.indexOf(";", start);

		if (end == -1) {
			end = mycookie.length;
		}

		result = unescape(mycookie.substring(start, end));
	}

	return result;
}


function ctxe(){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	//    瓦片canvas
	var tCanvas = document.createElement("canvas");
	var tctx = tCanvas.getContext("2d");

	var maxsize = 100 * 1024;

      if (!this.files.length) return;

      var files = Array.prototype.slice.call(this.files);
      files.forEach(function(file, i) {
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;

        var reader = new FileReader();

        reader.onload = function() {
          var result = this.result;
          var img = new Image();
          img.src = result;
          alert(result)
          //$('.img-container img').attr('src',result);

          //如果图片大小小于100kb，则直接上传
          if (result.length <= maxsize) {
          	//alert(123456)
              img = null;
              return;
          }

  		    //      图片加载完毕之后进行压缩，然后上传
          if (img.complete) {
            callback();
          } else {
            img.onload = callback;
          }

          function callback() {
            var data = compress(img);
          	img = null;
          }
        };

        reader.readAsDataURL(file);
      })


	  //    使用canvas对大图片进行压缩
	function compress(img) {
	    var initSize = img.src.length;
	    var width = img.width;
	    var height = img.height;

	    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
	    var ratio;
	    if ((ratio = width * height / 4000000) > 1) {
	      ratio = Math.sqrt(ratio);
	      width /= ratio;
	      height /= ratio;
	    } else {
	      ratio = 1;
	    }
	    canvas.width = width;
	    canvas.height = height;

		//        铺底色
	    ctx.fillStyle = "#fff";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);

	    //如果图片像素大于100万则使用瓦片绘制
	    var count;
	    if ((count = width * height / 1000000) > 1) {
	      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

		   //            计算每块瓦片的宽和高
	      var nw = ~~(width / count);
	      var nh = ~~(height / count);

	      tCanvas.width = nw;
	      tCanvas.height = nh;

	      for (var i = 0; i < count; i++) {
	        for (var j = 0; j < count; j++) {
	          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

	          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
	        }
	      }
	    } else {
	      ctx.drawImage(img, 0, 0, width, height);
	    }

	    //进行最小压缩
	    var ndata = canvas.toDataURL('image/jpeg', 0.1);

	    console.log('压缩前：' + initSize);
	    console.log('压缩后：' + ndata.length);
	    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

	    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

	    return ndata;
	}

}


function compress(img) {
	    var initSize = img.src.length;
	    var width = img.width;
	    var height = img.height;

	    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
	    var ratio;
	    if ((ratio = width * height / 4000000) > 1) {
	      ratio = Math.sqrt(ratio);
	      width /= ratio;
	      height /= ratio;
	    } else {
	      ratio = 1;
	    }
	    canvas.width = width;
	    canvas.height = height;

		//        铺底色
	    ctx.fillStyle = "#fff";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);

	    //如果图片像素大于100万则使用瓦片绘制
	    var count;
	    if ((count = width * height / 1000000) > 1) {
	      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

		   //            计算每块瓦片的宽和高
	      var nw = ~~(width / count);
	      var nh = ~~(height / count);

	      tCanvas.width = nw;
	      tCanvas.height = nh;

	      for (var i = 0; i < count; i++) {
	        for (var j = 0; j < count; j++) {
	          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

	          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
	        }
	      }
	    } else {
	      ctx.drawImage(img, 0, 0, width, height);
	    }

	    //进行最小压缩
	    var ndata = canvas.toDataURL('image/jpeg', 0.1);

	    console.log('压缩前：' + initSize);
	    console.log('压缩后：' + ndata.length);
	    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

	    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

	    return ndata;
	}