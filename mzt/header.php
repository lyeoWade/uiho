<div class="header">
  <div class="mainnav">
    <h1 class="logo"><a href="index.html">妹子图</a></h1>

    <ul id="menu-nav" class="menu">
      <li><a title="首页" href="index.html">首页</a></li>
      <li><a title="性感妹子" href="xinggan.html">性感妹子</a></li>
      <li><a title="清纯妹子" href="qingchun.html">清纯妹子</a></li>
      <li><a title="丝袜美腿" href="siwa.html">丝袜美腿</a></li>
      <li><a title="性感动图" href="gif.html">性感动图</a></li>
    </ul> 
    <span class="search">
      <form method="post" class="searchform" action="search.html"><input class="search-input" name="search" type="text" placeholder="美女"><button class="search-btn" type="submit">搜索</button></form>
    </span>
  </div>
</div>

<script type="text/javascript">
  var oCul=document.getElementsByTagName('body')[0];
  var oCol=oCul.getAttribute('columns');
  var oLi=document.getElementById('menu-nav').getElementsByTagName('li');

  for(var i=0; i<oLi.length; i++){
    if(oCol==i){
      oLi[i].className='current-menu-item';
    }
  }
</script>