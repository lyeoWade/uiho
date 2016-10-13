function cut(){

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

				$(tClass).attr('src',data.objectURL);
				
				var updataInfoImage='';
				switch ($(tClass).attr('imageType')){
					case 'coverImg':
						updataInfoImage='"coverImg":"'+data.objectURL+'"';
					break;
					case 'qrCode':
						updataInfoImage='"qrCode":"'+data.objectURL+'"';
					break;

					//,"imageList":[{"imgUrl":"http://img2.imgtn.bdimg.com/it/u=1536207273,1509014297fm=21gp=0.jpg"}],"picsId":3
					case 'imageList':
						var oImg=$(tClass).parent().find('img');

						var imgJson='';

						imgJson='{"imgUrl":"'+$(tClass).attr('src')+'"}';
						//删除原有的
						var imageId=$(tClass).attr('imageId');
						deleteImages(imageId);
						updataInfoImage='"imageList":['+imgJson+'],"picsId":'+$(tClass).attr('picsId');
						
					break;
				};
				//alert(updataInfoImage)
				//return false;
				var datas='data={"action":"updateUser","params":{'+updataInfoImage+',"userId":'+userId+'},"source":"mobileweb","target":"user"}';
				$.ajax({
					url:GetOneShop.requrl,
					type:"post",
					data:datas,
					success:function(str){
						var oData=$.parseJSON(str);
						if(oData.responseCode==1){
							//alert(oData.responseMsg)
						}else{
							//alert(oData.responseMsg)
						}
						oCutWrap.css({
							'opacity':'0',
							'z-index':'-300'
						});
						console.log(oData);
					}
				});

				oCutWrap.css({
					'opacity':'0',
					'z-index':'-300'
				});

				$('#uploadtip').css('display','none');
			});
        };
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
	    files.forEach(function(file, i) {
	        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;

	        var reader = new FileReader();
	        reader.onload = function() {
	          var result = this.result;
	          var img = new Image();
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
	          	var canvas_w = Number(ctx.canvas.width);
            	var canvas_h = Number(ctx.canvas.height);

	            var data = compress(img);
	            var blobURL=data;
	            //$image.cropper('setAspectRatio', '0.000001');
            	$image.one('built.cropper', function () {
            	   URL.revokeObjectURL(blobURL); 
             	}).cropper(options).cropper('reset', true).cropper('replace', blobURL).cropper('setAspectRatio', $scale);

	            $inputImage.val('');
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
    //$('[data-toggle="tooltip"]').tooltip();

  }());

};


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