$(function () {
  // 首页个人中心下拉列表
  $("#wdzh").mouseover(function(){
    $(".dropdown-toggle").dropdown("toggle");
    $("#wdzh button").css("background-color","#e6e6e6");
  });
  $("#wdzh").mouseout(function(){
    $(".dropdown-toggle").dropdown("toggle");
    $("#wdzh button").css("background-color","#fff");
  });
  // 头部微信弹出二维码
  $('.wx').mouseover(function(){
    layer.tips('<img src="./images/gzwx.png"/>','.wx', {
     tips: [3, '#fff']
   });
  });
  $('.wx').mouseout(function(){
    layer.tips();
  });
})

