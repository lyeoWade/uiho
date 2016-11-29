$(function () {

  'use strict';
  var oCutWrap=$('.cutWrap');
  var console = window.console || { log: function () {} },
      $alert = $('.docs-alert'),
      $message = $alert.find('.message'),
      showMessage = function (message, type) {
        // $message.text(message);

        // if (type) {
        //   $message.addClass(type);
        // }

        // $alert.fadeIn();

        // setTimeout(function () {
        //   $alert.fadeOut();
        // }, 3000);
      };

  // Demo
  // -------------------------------------------------------------------------

  (function () {
    var $image = $('.img-container > img'),
        $dataX = $('#dataX'),
        $dataY = $('#dataY'),
        $dataHeight = $('#dataHeight'),
        $dataWidth = $('#dataWidth'),
        $dataRotate = $('#dataRotate'),
        options = {
          // strict: false,
          // responsive: false,
          // checkImageOrigin: false

          // modal: false,
          // guides: false,
          // highlight: false,
          // background: false,

          // autoCrop: false,
          // autoCropArea: 0.5,
          // dragCrop: false,
          // movable: false,
          // resizable: false,
          // rotatable: false,
          // zoomable: false,
          // touchDragZoom: false,
          // mouseWheelZoom: false,

          // minCanvasWidth: 320,
          // minCanvasHeight: 180,
          // minCropBoxWidth: 160,
          // minCropBoxHeight: 90,
          // minContainerWidth: 320,
          // minContainerHeight: 180,

          // build: null,
          // built: null,
          // dragstart: null,
          // dragmove: null,
          // dragend: null,
          // zoomin: null,
          // zoomout: null,

          aspectRatio: 4 / 3,
          preview: '.img-preview',
          crop: function (data) {
            $dataX.val(Math.round(data.x));
            $dataY.val(Math.round(data.y));
            $dataHeight.val(Math.round(data.height));
            $dataWidth.val(Math.round(data.width));
            $dataRotate.val(Math.round(data.rotate));
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
          	console.log(result.toDataURL());
          	//$('#imgs').attr('src',result.toDataURL());
          	var f=result.toDataURL();
          	sumitImageFile(f,function(evt){
				var data=eval('('+evt+')'); 
				var tClass=getCookie('tClass');
				$(tClass).find('.imgWrap').html('<img src="'+data.objectURL+'"/>');

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
    }).on('keydown', function (e) {

      switch (e.which) {
        case 37:
          e.preventDefault();
          $image.cropper('move', -1, 0);
          break;

        case 38:
          e.preventDefault();
          $image.cropper('move', 0, -1);
          break;

        case 39:
          e.preventDefault();
          $image.cropper('move', 1, 0);
          break;

        case 40:
          e.preventDefault();
          $image.cropper('move', 0, 1);
          break;
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


   
   oCutWrap.css('height',$(window).height())
    if (URL) {
      $inputImage.change(function () {
        var files = this.files,
            file;
        oCutWrap.css({
	  		'opacity':'1',
	  		'z-index':'600'
	  	});

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
	          	//alert(123456)
		          	 var blobURL=result;
		             $image.one('built.cropper', function () {
		              URL.revokeObjectURL(blobURL); // Revoke when load complete
		            }).cropper('reset', true).cropper('replace', blobURL);
		            
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
	            var data = compress(img);
	            var blobURL=data;
	             $image.one('built.cropper', function () {
	              URL.revokeObjectURL(blobURL); // Revoke when load complete
	            }).cropper('reset', true).cropper('replace', blobURL);
	            
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