<?php 
    include "dqt/php/com.php";
?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Cache-Control" content="no-transform">
<meta http-equiv="Cache-Control" content="no-siteapp">
<meta name="applicable-device" content="pc">
<title>丝袜美腿 - 第七图官网（www.images007.com）</title>
<meta name="keywords" content="丝袜美腿,妹子图,美女图片,性感美女,性感妹子,私照,清纯妹子,妹子自拍">
<meta name="description" content="第七图(www.images007.com)每日分享最新最优质的妹子图片和高清性感美女图片,包括性感妹子,丝袜美腿,清纯妹子分享。">
<meta name="renderer" content="webkit">
<link href="css/main.css" rel="stylesheet" type="text/css">
</head>

<body columns="3">

<?php include "header.php";?>

<div class="main">
  <?php include "topad.php";?>
  <div class="main-content">
    <div class="currentpath">当前位置:<a href="http://www.images007.com/">第七图</a> » 丝袜美腿</div>
    <div class="postlist">
      <ul id="pins">
        <?php 
        $id=$_GET['id'];
          
        if (!isset($id)) {
          $id='';
         };
        $perNumber=27; //每页显示的记录数
        $page=$_GET['page']; //获得当前的页面值
        //echo $page;
         $count=mysql_query("select count(*) from imagearr WHERE columns=3 "); //获得记录总数
        $rs=mysql_fetch_array($count); 
        $totalNumber=$rs[0]; //总数 
        $totalPage=ceil($totalNumber/$perNumber); //计算出总页数
        if (!isset($page)) {
         $page=1;
        } //如果没有值,则赋值1
        
        //分页跳转的页面

        $url = $_SERVER['PHP_SELF']; 
        $filename= substr( $url , strrpos($url , '/')+1 );
        $tioi=explode('.',$filename);
        //echo $tioi[0];
        //var_dump(explode('.',$filename));
        $targetLink=$tioi[0];
        $startCount=($page-1)*$perNumber; //分页开始,根据此方法计算出开始的记录

        $result=mysql_query("select * from imagearr WHERE columns=3 order by pushtime desc limit $startCount,$perNumber"); //根据前面的计算出开始的记录和记录数
        
        while ($row=mysql_fetch_array($result)) {
        ?>
        <li>
          <a href="content.html?id=<?php echo $row['id']?>" target="_blank"><img width="236" height="354" class="lazy" alt="<?php echo $row['title'];?>" src="<?php echo substr($row['coverpic'],3)?>" data-original="" style="display: inline;"></a><span><a href="content.html?id=<?php echo $row['id']?>" target="_blank"><?php echo $row['title'];?></a></span><span class="time"><?php echo $row['pushtime']?></span><span class="view"><?php echo $row['frequency']?>次</span>
        </li>
        <?php
            };
        ?>
      </ul>
      
<!-- <nav class="navigation pagination" role="navigation">
<h2 class="screen-reader-text">Posts navigation</h2>
  <div class="nav-links">
    <span class="page-numbers current"><span class="meta-nav screen-reader-text"></span>1<span class="meta-nav screen-reader-text"></span></span>
    <a class="page-numbers" href=""><span class="meta-nav screen-reader-text"></span>2<span class="meta-nav screen-reader-text"></span></a>
    <a class="page-numbers" href=""><span class="meta-nav screen-reader-text"></span>3<span class="meta-nav screen-reader-text"></span></a>
    <span class="page-numbers dots">…</span>
    <a class="page-numbers" href=""><span class="meta-nav screen-reader-text"></span>53<span class="meta-nav screen-reader-text"></span></a>
    <a class="next page-numbers" href="">下一页»</a>
  </div>
</nav>    -->

    <div class="page navigation pagination">
      <div class="page-list nav-links" id="pages">
        <?php include 'page.php'; ?>
      </div>
    </div>  

  <?php include "listbuttom.php";?>

    </div>



<div class="friendlinks">
  <span>友情链接</span>
  <span class="url">
    <a href="" target="_blank">妹子图</a>
    <a href="" target="_blank">妹子</a>
    <a href="" target="_blank">美女</a>
    <a href="" target="_blank">美女图片</a>
    <a href="" target="_blank">美女</a>
    <a href="" target="_blank">夜色美女图片</a>
    <a href="" target="_blank">日本美女</a>
    <a href="" target="_blank">美女图片</a>
    <a href="" target="_blank">特色图</a>
    <a href="" target="_blank">性感美女图片</a>
    <a href="" target="_blank">美女图片</a>
    <a href="" target="_blank">ROSI套图</a>
    <a href="" target="_blank">丝袜诱惑</a>
    <a href="" target="_blank">92美女图片</a>
    <a href="" target="_blank">优优美图</a>
    <a href="" target="_blank">人体艺术图片</a>
    <a href="" target="_blank">美女图片</a>
    <a href="" target="_blank">优优美女图片</a>
    <a href="" target="_blank">Beautyleg美腿</a>
  </span>
</div>
  </div>
  <div class="sidebar">
    <!-- <div class="widgets_ad">☞&nbsp;<span>Mzitu.com</span>&nbsp;手机访问更精彩!</div> -->
    <div class="widgets_ad">☞&nbsp;<span>公告</span>&nbsp;<small>欢迎大家访问第七图,我们会带给大家高质量的美图；</small>
    </div>
    <?php include 'sidertag.php'; ?>
  
  </div>
        


<div class="clearfloat"></div>
</div>

<div class="footer">© 2016 <a href="js/">第七图</a> / 
<a href="http://www.images007.com/model">靓丽模特</a> / 
<a href="http://www.images007.com">校花</a> / 
<a href="http://www.images007.com/mm">小清新</a> / 
<a href="http://www.images007.com/all">图片索引</a>
</div>
<script type="text/javascript" src="js/index.js"></script>

<script type="text/javascript">
  window.onload=function(){
    var indexPos=window.location.href.indexOf('_');
    var oBtn=document.getElementById('pages').getElementsByTagName('a');
    if(indexPos!=-1){
      oNum=window.location.href.split('_')[1];
      //alert(oNum);
      for(var i=0; i<oBtn.length; i++){
        if(oNum==oBtn[i].innerHTML){
          oBtn[i].className='current';
        }
      }
    }
  }
</script>

</body>
</html>