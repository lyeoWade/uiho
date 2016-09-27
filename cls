[1mdiff --git a/zx/addCompany.html b/zx/addCompany.html[m
[1mdeleted file mode 100644[m
[1mindex 1e7fea6..0000000[m
[1m--- a/zx/addCompany.html[m
[1m+++ /dev/null[m
[36m@@ -1,155 +0,0 @@[m
[31m-<!DOCTYPE html>[m
[31m-<html lang="en">[m
[31m-<head>[m
[31m-    <meta charset="utf-8">[m
[31m-[m
[31m-    <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
[31m-    <meta name="description" content="">[m
[31m-    <meta name="author" content="ThemeBucket">[m
[31m-    <link rel="shortcut icon" href="images/favicon.png">[m
[31m-[m
[31m-    <title>新增公司</title>[m
[31m-[m
[31m-    <!--Core CSS -->[m
[31m-    <link href="bs3/css/bootstrap.min.css" rel="stylesheet">[m
[31m-    <link href="css/bootstrap-reset.css" rel="stylesheet">[m
[31m-    <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />[m
[31m-    <!-- 自己添加的样式文件 -->[m
[31m-    <link rel="stylesheet" type="text/css" href="css/new-add-style.css">[m
[31m-    <!-- Custom styles for this template -->[m
[31m-    <link href="css/style.css" rel="stylesheet">[m
[31m-    <link href="css/style-responsive.css" rel="stylesheet" />[m
[31m-    <link href="js/iCheck/skins/square/green.css" rel="stylesheet">[m
[31m-</head>[m
[31m-[m
[31m-<body>[m
[31m-[m
[31m-<section id="container" class="format">[m
[31m-    <!--main content start-->[m
[31m-    <section id="main-content">[m
[31m-        <section class="wrapper">[m
[31m-            <div class="row second-head">[m
[31m-                <div class="col-lg-12">[m
[31m-                    <div class="head-panel clearfix">[m
[31m-                        <h2 class=" pull-left">新增公司</h2>[m
[31m-                        <div class=" pull-right">[m
[31m-                            <ul class="breadcrumb">[m
[31m-                                <li><a href="#"><i class="fa fa-home"></i> 主页</a></li>[m
[31m-                                <li><a href="#">公司管理</a></li>[m
[31m-                                <li class="active">新增公司</li>[m
[31m-                            </ul>[m
[31m-                        </div>[m
[31m-                    </div>[m
[31m-                </div>[m
[31m-            </div>[m
[31m-            <!-- page start-->[m
[31m-            <div class="row">[m
[31m-                <div class="col-lg-12">[m
[31m-                    <section class="panel">[m
[31m-                        <header class="panel-heading">[m
[31m-                            新增公司[m
[31m-                        </header>[m
[31m-                        <div class="panel-body">[m
[31m-                            <div class="form">[m
[31m-                                <form class="cmxform form-horizontal " id="signupForm" method="get" action="">[m
[31m-                                    [m
[31m-                                    <div class="form-group ">[m
[31m-                                        <label for="title" class="control-label col-lg-3 col-sm-3">标题</label>[m
[31m-                                        <div class="col-lg-6 col-sm-6">[m
[31m-                                            <input class="form-control " id="title" name="title" type="text" />[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    <div class="form-group ">[m
[31m-                                        <label for="description" class="control-label col-lg-3 col-sm-3">介绍</label>[m
[31m-                                        <div class="col-lg-6 col-sm-6">[m
[31m-                                            <textarea class="form-control" id="description"></textarea>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    <div id="filewarp">[m
[31m-                                        <div class="form-group ">[m
[31m-                                            <label for="phone" class="control-label col-lg-3 col-sm-3">图片集</label>[m
[31m-                                            <div class="col-lg-6 col-sm-6">[m
[31m-                                                <input type="file" id="fileInput1" name="fileInput" class="form-control">[m
[31m-                                            </div>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    <div class="form-group">[m
[31m-                                        <div class="col-sm-offset-3 col-lg-6 col-sm-6">[m
[31m-                                            <button class="btn btn-warning col-sm-2" type="button" id="addbanner">新增</button>[m
[31m-                                            <button class="btn btn-primary col-sm-3 col-md-offset-1 " type="button">上传</button>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    [m
[31m-                                    <div id="thumbnail">[m
[31m-                                        <div class="form-group ">[m
[31m-                                            <label for="thumbnail" class="control-label col-lg-3 col-sm-3">缩略图</label>[m
[31m-                                            <div class="col-lg-8 col-sm-8">[m
[31m-                                                <div class="imgwarp">[m
[31m-                                                    <img src="images/weather_image.jpg">[m
[31m-                                                    <a href="">删除</a>[m
[31m-                                                </div>[m
[31m-                                                <div class="imgwarp">[m
[31m-                                                    <img src="images/weather_image.jpg">[m
[31m-                                                    <a href="">删除</a>[m
[31m-                                                </div>[m
[31m-                                                <div class="imgwarp">[m
[31m-                                                    <img src="images/weather_image.jpg">[m
[31m-                                                    <a href="">删除</a>[m
[31m-                                                </div>[m
[31m-                                                <div class="imgwarp">[m
[31m-                                                    <img src="images/weather_image.jpg">[m
[31m-                                                    <a href="">删除</a>[m
[31m-                                                </div>[m
[31m-                                                <div class="imgwarp">[m
[31m-                                                    <img src="images/weather_image.jpg">[m
[31m-                                                    <a href="">删除</a>[m
[31m-                                                </div>[m
[31m-                                                <div class="imgwarp">[m
[31m-                                                    <img src="images/weather_image.jpg">[m
[31m-                                                    <a href="">删除</a>[m
[31m-                                                </div>[m
[31m-                                                <div class="imgwarp">[m
[31m-                                                    <img src="images/weather_image.jpg">[m
[31m-                                                    <a href="">删除</a>[m
[31m-                                                </div>[m
[31m-                                            </div>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    <div class="form-group">[m
[31m-                                        <div class="col-sm-offset-3 col-lg-6 col-sm-6">[m
[31m-                                            <button class="btn btn-primary col-sm-3" type="submit">保存</button>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                </form>[m
[31m-                            </div>[m
[31m-                        </div>[m
[31m-                    </section>[m
[31m-                </div>[m
[31m-            </div>[m
[31m-            <!-- page end-->[m
[31m-        </section>[m
[31m-    </section>[m
[31m-    <!--main content end-->[m
[31m-</section>[m
[31m-[m
[31m-<!-- Placed js at the end of the document so the pages load faster -->[m
[31m-[m
[31m-<!--Core js-->[m
[31m-<script src="js/jquery.js"></script>[m
[31m-<script src="bs3/js/bootstrap.min.js"></script>[m
[31m-<script type="text/javascript" src="js/jquery.validate.min.js"></script>[m
[31m-[m
[31m-<!--common script init for all pages-->[m
[31m-<script src="js/scripts.js"></script>[m
[31m-[m
[31m-<!-- iCheck表单美化插件 -->[m
[31m-<script src="js/iCheck/jquery.icheck.js"></script>[m
[31m-[m
[31m-<!--icheck init -->[m
[31m-<script src="js/icheck-init.js"></script>[m
[31m-[m
[31m-<!--this page script-->[m
[31m-<script src="js/validation-init.js"></script>[m
[31m-<script type="text/javascript" src="js/ifreamHeight.js"></script>[m
[31m-</body>[m
[31m-</html>[m
[1mdiff --git a/zx/addbond.html b/zx/addbond.html[m
[1mdeleted file mode 100644[m
[1mindex 4291b71..0000000[m
[1m--- a/zx/addbond.html[m
[1m+++ /dev/null[m
[36m@@ -1,111 +0,0 @@[m
[31m-<!DOCTYPE html>[m
[31m-<html lang="en">[m
[31m-<head>[m
[31m-    <meta charset="utf-8">[m
[31m-[m
[31m-    <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
[31m-    <meta name="description" content="">[m
[31m-    <meta name="author" content="ThemeBucket">[m
[31m-    <link rel="shortcut icon" href="images/favicon.png">[m
[31m-[m
[31m-    <title>新增保证金</title>[m
[31m-[m
[31m-    <!--Core CSS -->[m
[31m-    <link href="bs3/css/bootstrap.min.css" rel="stylesheet">[m
[31m-    <link href="css/bootstrap-reset.css" rel="stylesheet">[m
[31m-    <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />[m
[31m-    <!-- 自己添加的样式文件 -->[m
[31m-    <link rel="stylesheet" type="text/css" href="css/new-add-style.css">[m
[31m-    <!-- Custom styles for this template -->[m
[31m-    <link href="css/style.css" rel="stylesheet">[m
[31m-    <link href="css/style-responsive.css" rel="stylesheet" />[m
[31m-    <link href="js/iCheck/skins/square/green.css" rel="stylesheet">[m
[31m-</head>[m
[31m-[m
[31m-<body>[m
[31m-[m
[31m-<section id="container" class="format">[m
[31m-    <!--main content start-->[m
[31m-    <section id="main-content">[m
[31m-        <section class="wrapper">[m
[31m-            <div class="row second-head">[m
[31m-                <div class="col-lg-12">[m
[31m-                    <div class="head-panel clearfix">[m
[31m-                        <h2 class=" pull-left">新增保证金/学员考试预交费用</h2>[m
[31m-                        <div class=" pull-right">[m
[31m-                            <ul class="breadcrumb">[m
[31m-                                <li><a href="#"><i class="fa fa-home"></i> 主页</a></li>[m
[31m-                                <li><a href="#">保证金管理</a></li>[m
[31m-                                <li class="active">新增保证金/学员考试预交费用</li>[m
[31m-                            </ul>[m
[31m-                        </div>[m
[31m-                    </div>[m
[31m-                </div>[m
[31m-            </div>[m
[31m-            <!-- page start-->[m
[31m-            <div class="row">[m
[31m-                <div class="col-lg-12">[m
[31m-                    <section class="panel">[m
[31m-                        <header class="panel-heading">[m
[31m-                            新增保证金/学员考试预交费用[m
[31m-                        </header>[m
[31m-                        <div class="panel-body">[m
[31m-                            <div class="form">[m
[31m-                                <form class="cmxform form-horizontal " id="signupForm" method="get" action="">[m
[31m-                                    [m
[31m-                                    <div class="form-group ">[m
[31m-                                        <label for="types" class="control-label col-lg-3 col-sm-3">类型</label>[m
[31m-                                        <div class="col-lg-6 col-sm-6">[m
[31m-                                            <select class="form-control m-bot15" id="types">[m
[31m-                                                <option value="1">学员保证金</option>[m
[31m-                                                <option value="2">学员考试预交费用</option>[m
[31m-                                            </select>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    <div class="form-group ">[m
[31m-                                        <label for="bondmoney" class="control-label col-lg-3 col-sm-3">金额</label>[m
[31m-                                        <div class="col-lg-6 col-sm-6">[m
[31m-                                            <input class="form-control " id="bondmoney" name="bondmoney" type="text" />[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    <div class="form-group">[m
[31m-                                        <div class="col-sm-offset-3 col-lg-6 col-sm-6">[m
[31m-                                            <button class="btn btn-primary col-sm-3" id="addbondBtn" type="button">保存</button>[m
[31m-                                            <span class="addtip"></span>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                </form>[m
[31m-                            </div>[m
[31m-                        </div>[m
[31m-                    </section>[m
[31m-                </div>[m
[31m-            </div>[m
[31m-            <!-- page end-->[m
[31m-        </section>[m
[31m-    </section>[m
[31m-    <!--main content end-->[m
[31m-</section>[m
[31m-[m
[31m-<!-- Placed js at the end of the document so the pages load faster -->[m
[31m-[m
[31m-<!--Core js-->[m
[31m-<script src="js/jquery.js"></script>[m
[31m-<script src="bs3/js/bootstrap.min.js"></script>[m
[31m-[m
[31m-<!--common script init for all pages-->[m
[31m-<script src="js/scripts.js"></script>[m
[31m-[m
[31m-<script type="text/javascript" src="js/tool.js"></script>[m
[31m-<script type="text/javascript" src="js/public.js"></script>[m
[31m-<script type="text/javascript">[m
[31m-    [m
[31m-$(function(){[m
[31m-    var Sid=Uiho.tool.geturldata(window.location.href).id;[m
[31m-    var coachId='';[m
[31m-    $('#addbondBtn').on('click',function(){[m
[31m-        addOneAccount(Sid,coachId)[m
[31m-    });[m
[31m-});[m
[31m-</script>[m
[31m-</body>[m
[31m-</html>[m
[1mdiff --git a/zx/css/new-add-style.css b/zx/css/new-add-style.css[m
[1mindex cf25fff..82a810f 100644[m
[1m--- a/zx/css/new-add-style.css[m
[1m+++ b/zx/css/new-add-style.css[m
[36m@@ -630,11 +630,13 @@[m [mclear:both;[m
 	color: #000 !important;[m
 	background: #fafafa;[m
 }[m
[32m+[m
 .resetsidebar ul.sidebar-menu li ul.sub li a{[m
 	color: #000 !important;[m
 	background: #fff;[m
 }[m
[31m-.resetsidebar ul.sidebar-menu li ul.sub li a:hover{[m
[32m+[m[32m.resetsidebar ul.sidebar-menu li ul.sub li a:hover,[m
[32m+[m[32m .resetsidebar ul.sidebar-menu li ul.sub li.active a{[m
 	color: #000 !important;[m
 	background: #f4f4f4;[m
 }[m
[36m@@ -652,7 +654,12 @@[m [mclear:both;[m
 }[m
 [m
 [m
[31m-[m
[32m+[m[32m.parentHandleIcon{[m
[32m+[m	[32mpadding: 0px 0 0 8px;[m
[32m+[m	[32mdisplay: inline-block;[m
[32m+[m
[32m+[m	[32mvertical-align: middle;[m
[32m+[m[32m}[m
 [m
 [m
 [m
[1mdiff --git a/zx/index.html b/zx/index.html[m
[1mindex 4f4b683..46fba33 100644[m
[1m--- a/zx/index.html[m
[1m+++ b/zx/index.html[m
[36m@@ -287,17 +287,16 @@[m [m$(function(){[m
 	});[m
 });[m
 </script>[m
[31m-<script type="text/javascript">[m
[31m-function iFrameHeight() {   [m
[31m-	setTimeout(function(){[m
[31m-		var ifm= document.getElementById("frame");   [m
[31m-		var subWeb = document.frames ? document.frames["frame"].document : ifm.contentDocument;   [m
[31m-		if(ifm != null && subWeb != null) {[m
[31m-		   ifm.height = subWeb.body.scrollHeight;[m
[31m-		} [m
[31m-	},500)[m
[32m+[m[32m<script type="text/javascript">[m[41m [m
[32m+[m[32msetInterval(function(){[m
[32m+[m	[32mvar ifm= document.getElementById("frame");[m[41m   [m
[32m+[m	[32mvar subWeb = document.frames ? document.frames["frame"].document : ifm.contentDocument;[m[41m   [m
[32m+[m	[32mif(ifm != null && subWeb != null) {[m
[32m+[m	[32m   ifm.height = subWeb.body.scrollHeight;[m
[32m+[m	[32m}[m[41m [m
[32m+[m[32m},500)[m
 	  [m
[31m-};  [m
[32m+[m
 </script>[m
 <script type="text/javascript" src="js/tool.js"></script>[m
 <script type="text/javascript" src="js/public.js"></script>[m
[1mdiff --git a/zx/menuList.html b/zx/menuList.html[m
[1mindex 1f95cdc..5c7638d 100644[m
[1m--- a/zx/menuList.html[m
[1m+++ b/zx/menuList.html[m
[36m@@ -8,7 +8,7 @@[m
     <meta name="author" content="ThemeBucket">[m
     <link rel="shortcut icon" href="images/favicon.png">[m
 [m
[31m-    <title>学员管理</title>[m
[32m+[m[32m    <title>菜单管理</title>[m
 [m
     <!--Core CSS -->[m
     <link href="bs3/css/bootstrap.min.css" rel="stylesheet">[m
[36m@@ -19,7 +19,6 @@[m
     <!--responsive table-->[m
     <link href="css/table-responsive.css" rel="stylesheet" />[m
     <link rel="stylesheet" href="css/bootstrap-switch.css" />[m
[31m-    <link href="js/iCheck/skins/square/green.css" rel="stylesheet">[m
     <!-- Custom styles for this template -->[m
     <link href="css/style.css" rel="stylesheet">[m
     <link href="css/style-responsive.css" rel="stylesheet" />[m
[36m@@ -38,22 +37,13 @@[m
                     <!-- sidebar menu start-->            [m
                     <div class="leftside-navigation">[m
                         <div class="addMP">[m
[31m-                            <a href=""><i class="fa fa-edit"></i>&nbsp;&nbsp;&nbsp;新增父菜单</a>[m
[32m+[m[32m                            <a href="javascript:;" data-url="AddParentMenu.html"><i class="fa fa-edit"></i>&nbsp;&nbsp;&nbsp;新增父菜单</a>[m
                         </div>[m
                         <ul class="sidebar-menu" id="nav-accordion" style="padding-top: 0;">[m
[31m-                            <li class="active">[m
[31m-                                <a  data-url="right.html">[m
[31m-                                    <i class="fa fa-home"></i>[m
[31m-                                    <span>主页</span>[m
[31m-                                </a>[m
[31m-                            </li>[m
[31m-                            [m
                             <li class="sub-menu" id="managewarp">[m
                                 <a href="javascript:;">[m
[31m-                                    <i class="fa fa-group"></i>[m
                                     <span>管理员管理</span>[m
[31m-                                    <i class="fa fa-pencil-square"></i>[m
[31m-                                    <i class="fa fa-times"></i>[m
[32m+[m[32m                                    <span class="parentHandleIcon"><i class="fa fa-search-plus" title="新增子菜单"></i><i class="fa fa-pencil-square" title="查看父菜单"></i><i class="fa fa-times" title="删除父菜单"></i></span>[m
                                 </a>[m
                                 <ul class="sub">[m
                                     <li id="addmanager"><a data-url="addManager.html" ><i class="fa fa-angle-right"></i>新增管理员<i class="fa fa-pencil-square"></i>[m
[36m@@ -63,7 +53,6 @@[m
                             </li>[m
                             <li class="sub-menu">[m
                                 <a href="javascript:;">[m
[31m-                                    <i class="fa fa-laptop"></i>[m
                                     <span>菜单管理</span>[m
                                 </a>[m
                                 <ul class="sub">[m
[36m@@ -73,7 +62,6 @@[m
                             </li>[m
                             <li class="sub-menu">[m
                                 <a href="javascript:;">[m
[31m-                                    <i class="fa fa-home"></i>[m
                                     <span>公司管理</span>[m
                                 </a>[m
                                 <ul class="sub">[m
[36m@@ -88,76 +76,8 @@[m
 [m
             <div class=" rightcontent row">[m
                 <div class="col-sm-12 table-set">[m
[31m-                    <section class="panel">[m
[31m-                        <header class="panel-heading title">[m
[31m-                            <span>学员信息</span>[m
[31m-                            [m
[31m-                        </header>[m
[31m-                        <header class="panel-heading clearfix searchpanel">[m
[31m-                            <div class="pull-left col-sm-11  col-lg-11">[m
[31m-                                <div class="form-group pull-left col-lg-2 col-sm-3">[m
[31m-                                    <label for="password" class="control-label col-lg-3 col-sm-4">状态</label>[m
[31m-                                    <div class="col-lg-8 col-sm-7">[m
[31m-                                        <select class="form-control" id="disabledState">[m
[31m-                                            <option value="">全部状态</option>[m
[31m-                                            <option value="1">可用</option>[m
[31m-                                            <option value="0">不可用</option>[m
[31m-                                        </select>[m
[31m-                                    </div>[m
[31m-                                </div>[m
[31m-                                <div class="form-group pull-left col-lg-2 col-sm-3">[m
[31m-                                    <label for="phone" class="control-label col-lg-3 col-sm-3">手机</label>[m
[31m-                                    <div class="col-lg-8 col-sm-8">[m
[31m-                                        <input type="text" class="form-control" id="phone" placeholder="手机">[m
[31m-                                    </div>[m
[31m-                                </div>[m
[31m-                                <div class="form-group pull-left col-lg-2 col-sm-4">[m
[31m-                                    <label for="realname"  class="control-label col-lg-3 col-sm-3">姓名</label>[m
[31m-                                    <div class="col-lg-8 col-sm-9">[m
[31m-                                        <input type="text" class="form-control" id="realname" placeholder="姓名">[m
[31m-                                    </div>[m
[31m-                                </div>[m
[31m-                            [m
[31m-                            </div>[m
[31m-                            <div class="pull-right">[m
[31m-                                <input type="button" id="SelectQueryBtn" class="btn btn-success" value="查询">[m
[31m-                            </div>[m
[31m-                        </header>[m
[31m-                        <div class="panel-body">[m
[31m-                            <section id="unseen">[m
[31m-                                <table class="table table-bordered table-striped table-condensed">[m
[31m-                                    <thead class="thead">[m
[31m-                                        <tr>[m
[31m-                                            <th><i class=""></i>编号</th>[m
[31m-                                            <th><i class=""></i>名字</th>[m
[31m-                                            <th><i class="fa  fa-mobile-phone"></i>手机号码</th>[m
[31m-                                            <th class="numeric"><i class="fa fa-clock-o"></i>驾照类型</th>[m
[31m-                                            [m
[31m-                                            <th class="numeric"><i class="fa fa-star-half-empty"></i>账号状态</th>[m
[31m-                                            <th class="numeric"><i class="fa fa-wrench"></i>操作</th>[m
[31m-                                        </tr>[m
[31m-                                    </thead>[m
[31m-[m
[31m-                                    <tbody id="tbody">[m
[31m-                                      [m
[31m-                                    </tbody>[m
[31m-                                </table>[m
[31m-                            </section>[m
[31m-                            <div class="box-footer clearfix" id="pagination">[m
[31m-[m
[31m-                               <!--  <div class="pull-left">[m
[31m-                                    <span>共 4 条数据</span>&nbsp;&nbsp;&nbsp;<span>共  1 页</span>[m
[31m-                                </div>[m
[31m-[m
[31m-                                <ul class="pagination pagination-sm no-margin pull-right">[m
[31m-                                    <li><a>首页</a></li>[m
[31m-                                    <li><a>上一页</a></li>[m
[31m-                                    <li class="active"><a onclick="onSub(1)">1</a></li>[m
[31m-                                    <li><a>下一页</a></li>[m
[31m-                                    <li><a>末页</a></li>[m
[31m-                                </ul> -->[m
[31m-                            </div>[m
[31m-                        </div>[m
[32m+[m[32m                    <section class="panel" style="background: transparent;">[m
[32m+[m[32m                        <iframe width="100%" border="0" frameborder="0" src="right.html" name="frame" id="frame" title="frame" scrolling="no"  onLoad="iFrameHeight()" ></iframe>[m
                     </section>[m
                 </div>[m
             </div>[m
[36m@@ -167,13 +87,10 @@[m
     <!--main content end-->[m
 </section>[m
 [m
[31m-<!-- Placed js at the end of the document so the pages load faster -->[m
[31m-[m
 <!--Core js-->[m
 <script src="js/jquery.js"></script>[m
 <script src="bs3/js/bootstrap.min.js"></script>[m
 [m
[31m-<!--common script init for all pages-->[m
 <script src="js/scripts.js"></script>[m
 <script class="include" type="text/javascript" src="js/jquery.dcjqaccordion.2.7.js"></script>[m
 <script src="js/jquery.scrollTo.min.js"></script>[m
[36m@@ -181,16 +98,22 @@[m
 [m
 <script type="text/javascript" src="js/tool.js"></script>[m
 <script type="text/javascript" src="js/public.js"></script>[m
[31m-<script type="text/javascript" src="js/student.js"></script>[m
[31m-[m
 <script type="text/javascript">[m
[31m-    window.onload=function(){[m
[31m-        window.onscroll=function(){[m
[31m-        console.log(document.body.scrollTop)[m
[31m-    }[m
[31m-       // document.body.offsetTop'2000px';[m
[31m-       // console.log(123)[m
[31m-    }[m
[32m+[m[32m$(function(){[m
[32m+[m[32m    $("[data-url]").on('click',function(){[m
[32m+[m[32m        $("[data-url]").parent('li').removeClass('active');[m
[32m+[m[32m        $(this).parent('li').addClass('active')[m
[32m+[m[32m        $("#frame").attr('src',$(this).attr("data-url"));[m
[32m+[m[32m    });[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32msetInterval(function(){[m
[32m+[m[32m    var ifm= document.getElementById("frame");[m[41m   [m
[32m+[m[32m    var subWeb = document.frames ? document.frames["frame"].document : ifm.contentDocument;[m[41m   [m
[32m+[m[32m    if(ifm != null && subWeb != null) {[m
[32m+[m[32m       ifm.height = subWeb.body.scrollHeight;[m
[32m+[m[32m    }[m[41m [m
[32m+[m[32m},2500);[m
 </script>[m
 </body>[m
 </html>[m
\ No newline at end of file[m
[1mdiff --git a/zx/messagesAdd.html b/zx/messagesAdd.html[m
[1mdeleted file mode 100644[m
[1mindex c6873e0..0000000[m
[1m--- a/zx/messagesAdd.html[m
[1m+++ /dev/null[m
[36m@@ -1,100 +0,0 @@[m
[31m-<!DOCTYPE html>[m
[31m-<html lang="en">[m
[31m-<head>[m
[31m-    <meta charset="utf-8">[m
[31m-[m
[31m-    <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
[31m-    <meta name="description" content="">[m
[31m-    <meta name="author" content="ThemeBucket">[m
[31m-    <link rel="shortcut icon" href="images/favicon.png">[m
[31m-[m
[31m-    <title>新增消息</title>[m
[31m-[m
[31m-    <!--Core CSS -->[m
[31m-    <link href="bs3/css/bootstrap.min.css" rel="stylesheet">[m
[31m-    <link href="css/bootstrap-reset.css" rel="stylesheet">[m
[31m-    <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />[m
[31m-    <!-- 自己添加的样式文件 -->[m
[31m-    <link rel="stylesheet" type="text/css" href="css/new-add-style.css">[m
[31m-    <!-- Custom styles for this template -->[m
[31m-    <link href="css/style.css" rel="stylesheet">[m
[31m-    <link href="css/style-responsive.css" rel="stylesheet" />[m
[31m-</head>[m
[31m-[m
[31m-<body>[m
[31m-[m
[31m-<section id="container" class="format">[m
[31m-    <!--main content start-->[m
[31m-    <section id="main-content">[m
[31m-        <section class="wrapper">[m
[31m-            <div class="row second-head">[m
[31m-                <div class="col-lg-12">[m
[31m-                    <div class="head-panel clearfix">[m
[31m-                        <h2 class=" pull-left">新增消息</h2>[m
[31m-                        <div class=" pull-right">[m
[31m-                            <ul class="breadcrumb">[m
[31m-                                <li><a href="#"><i class="fa fa-home"></i> 主页</a></li>[m
[31m-                                <li class="active">新增消息</li>[m
[31m-                            </ul>[m
[31m-                        </div>[m
[31m-                    </div>[m
[31m-                </div>[m
[31m-            </div>[m
[31m-            <!-- page start-->[m
[31m-            <div class="row">[m
[31m-                <div class="col-lg-12">[m
[31m-                    <section class="panel">[m
[31m-                        <header class="panel-heading">[m
[31m-                            新增消息[m
[31m-                        </header>[m
[31m-                        <div class="panel-body">[m
[31m-                            <div class="form">[m
[31m-                                <form class="cmxform form-horizontal " id="signupForm" method="get" action="">[m
[31m-                                    [m
[31m-                                    <div class="form-group ">[m
[31m-                                        <label for="bondset" class="control-label col-lg-3 col-sm-3">消息内容</label>[m
[31m-                                        <div class="col-lg-6 col-sm-6">[m
[31m-                                            <textarea class="form-control " id="msgcontent" placeholder="消息内容"></textarea>[m
[31m-                                           [m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    <div class="form-group ">[m
[31m-                                        <label for="bondset" class="control-label col-lg-3 col-sm-3">消息类型</label>[m
[31m-                                        <div class="col-lg-6 col-sm-6">[m
[31m-                                            <select class="form-control" id="msgtype">[m
[31m-                                                <option value="1">学生端消息</option>[m
[31m-                                                <option value="5">教练端消息</option>[m
[31m-                                            </select>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                    <div class="form-group">[m
[31m-                                        <div class="col-sm-offset-3 col-lg-6 col-sm-6">[m
[31m-                                            <button class="btn btn-primary col-sm-3" id="msgbtn" type="button">发布</button>[m
[31m-                                            <span class="addtip"></span>[m
[31m-                                        </div>[m
[31m-                                    </div>[m
[31m-                                </form>[m
[31m-                            </div>[m
[31m-                        </div>[m
[31m-                    </section>[m
[31m-                </div>[m
[31m-            </div>[m
[31m-            <!-- page end-->[m
[31m-        </section>[m
[31m-    </section>[m
[31m-    <!--main content end-->[m
[31m-</section>[m
[31m-[m
[31m-<!-- Placed js at the end of the document so the pages load faster -->[m
[31m-[m
[31m-<!--Core js-->[m
[31m-<script src="js/jquery.js"></script>[m
[31m-<script src="bs3/js/bootstrap.min.js"></script>[m
[31m-<!--common script init for all pages-->[m
[31m-<script src="js/scripts.js"></script>[m
[31m-<script type="text/javascript" src="js/tool.js"></script>[m
[31m-<script type="text/javascript" src="js/public.js"></script>[m
[31m-<script type="text/javascript" src="js/messagesAdd.js"></script>[m
[31m-[m
[31m-</body>[m
[31m-</html>[m
