
var filechooser = document.getElementById("file");

$(".getfile1").on("click", function() {
	filechooser.click();
//	eee(4/3);
	
	setCookie('tClass','.getfile1',8);
});
$(".getfile2").on("click", function() {
	filechooser.click();
	setCookie('tClass','.getfile2',8);
	//eee(4/3);
});
$(".getfile3").on("click", function() {
	filechooser.click();
	setCookie('tClass','.getfile3',8);
	//eee(4/3);
});
$(".getfile4").on("click", function() {
	filechooser.click();
	setCookie('tClass','.getfile4',8);
	//eee(1/1);
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
//    用于压缩图片的canvas


var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var oCutWrap=$('.cutWrap');
oCutWrap.css('height',$(window).height())
//    瓦片canvas
var tCanvas = document.createElement("canvas");
var tctx = tCanvas.getContext("2d");

var maxsize = 100 * 1024;

filechooser.onchange = function() {
  	oCutWrap.css({
  		'opacity':'1',
  		'z-index':'600'
  	});
  	$('#savewrap').attr('src','')
      if (!this.files.length) return;

      var files = Array.prototype.slice.call(this.files);

      if (files.length > 1) {
        alert("最多同时只可上传1张图片");
        return;
      }
      files.forEach(function(file, i) {
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;

        var reader = new FileReader();

        reader.onload = function() {
          var result = this.result;
          var img = new Image();
          img.src = result;

          $('.img-container img').attr('src',result);

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
};

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



// function eee(scale){


//   'use strict';

//   var Cropper = window.Cropper;
//   var console = window.console || { log: function () {} };
//   var container = document.querySelector('.img-container');
//   var image = container.getElementsByTagName('img').item(0);
  
//   var download = document.getElementById('download');
//   var actions = document.getElementById('actions');
//   var isUndefined = function (obj) {
//     return typeof obj === 'undefined';
//   };

  

//   var options = {
//         aspectRatio: scale,  //默认裁剪比列
//         preview: '.img-preview',  //缩略显示节点
//         build: function (e) {
//           console.log(e.type);
//         },
//         built: function (e) {
//           console.log(e);
//         },
//         cropstart: function (e) {
//           console.log(e.type, e.detail.action);
//         },
//         cropmove: function (e) {
//           //console.log(e.type, e.detail.action);
//         },
//         cropend: function (e) {
//           console.log(e.type, e.detail.action);
//         },
//         crop: function (e) {
//           var data = e.detail;
//           console.log(data);
//           //console.log(e.type);
//           // dataX.value = Math.round(data.x);
//           // dataY.value = Math.round(data.y);
//           // dataHeight.value = Math.round(data.height);
//           // dataWidth.value = Math.round(data.width);
//           // dataRotate.value = !isUndefined(data.rotate) ? data.rotate : '';
//           // dataScaleX.value = !isUndefined(data.scaleX) ? data.scaleX : '';
//           // dataScaleY.value = !isUndefined(data.scaleY) ? data.scaleY : '';
//         },
//         zoom: function (e) {
//           console.log(e.type, e.detail.ratio);
//         }
//       };


//   window.cropper = new Cropper(image, options);
//   function preventDefault(e) {
//     if (e) {
//       if (e.preventDefault) {
//         e.preventDefault();
//       } else {
//         e.returnValue = false;
//       }
//     }
//   }

//   // Tooltip
//   $('[data-toggle="tooltip"]').tooltip();


//   // Buttons
//   if (!document.createElement('canvas').getContext) {
//     $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
//   }

//   if (typeof document.createElement('cropper').style.transition === 'undefined') {
//     $('button[data-method="rotate"]').prop('disabled', true);
//     $('button[data-method="scale"]').prop('disabled', true);
//   }



//   // Methods
//   actions.querySelector('.docs-buttons').addEventListener('touchend', function (event) {
//     var e = event || window.event;
//     var target = e.target || e.srcElement;
//     var result;
//     var input;
//     var data;

//     if (!cropper) {
//       return;
//     }

//     while (target !== this) {
//       if (target.getAttribute('data-method')) {
//         break;
//       }

//       target = target.parentNode;
//     }

//     if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
//       return;
//     }

//     data = {
//       method: target.getAttribute('data-method'),
//       target: target.getAttribute('data-target'),
//       option: target.getAttribute('data-option'),
//       secondOption: target.getAttribute('data-second-option')
//     };

//     if (data.method) {
//       if (typeof data.target !== 'undefined') {
//         input = document.querySelector(data.target);

//         if (!target.hasAttribute('data-option') && data.target && input) {
//           try {
//             data.option = JSON.parse(input.value);
//           } catch (e) {
//             console.log(e.message);
//           }
//         }
//       }

//       if (data.method === 'getCroppedCanvas') {
//         data.option = JSON.parse(data.option);
//       }

//       result = cropper[data.method](data.option, data.secondOption);

//       switch (data.method) {
//         case 'scaleX':
//         case 'scaleY':
//           target.setAttribute('data-option', -data.option);
//           break;
//         case 'getCroppedCanvas':

//           console.log('result'+result);

//           if (result) {
//            $('#savewrap').attr('src',result.toDataURL('image/jpeg'));
//           // console.log(result.data)
//             // if (!download.disabled) {
//             //   download.href = result.toDataURL('image/jpeg');
//             // }
//           }

//           break;

//         case 'destroy':
//           cropper = null;
//           break;
//       }

//       if (typeof result === 'object' && result !== cropper && input) {
//         try {
//           input.value = JSON.stringify(result);
//         } catch (e) {
//           console.log(e.message);
//         }
//       }

//     }
//   },false);

// };

// function testCoper(){
//   if (!cropper) {
//     return;
//   }
//   options.built = function () {
//     console.log('built');
//   };

//   cropper.destroy();

//   cropper = new Cropper(image, options);

// }
$('.upLoadImage').on('touchend',function(){
	var f=$('#savewrap').attr('src'); 
	if(f){
		sumitImageFile(f,function(evt){
			var data=eval('('+evt+')'); 
			var tClass=getCookie('tClass');
			$(tClass).find('.imgWrap').html('<img src="'+data.objectURL+'"/>');

			oCutWrap.css({
				'opacity':'0',
				'z-index':'-300'
			});
		});
	}else{
		alert('请裁剪图片！');
		return false;
	};
});
