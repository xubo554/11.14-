$(function(){
    var remobil=/^1[3578]\d{9}$/;
    var options = {
      beforeSubmit: showRequest,
      success: showResponse,
    };
    $('#login').submit(function() {
      $(this).ajaxSubmit(options);
      return false;
    });
   function showRequest(formData, jqForm, options) {
     if(!formData[1].value){
        layer.msg('手机号不能为空!', {icon: 0, time: 1500});
        return false;
     }
     if(!remobil.test(formData[1].value)){
        layer.msg('请填写正确的手机号!', {icon: 0, time: 1500});
        return false;
     }
     if(!formData[2].value){
        layer.msg('秘密不能为空!', {icon: 0, time: 1500});
        return false;
     }
     if(!formData[3].value){
        layer.msg('必须同意用户服务协议哦!', {icon: 0, time: 1500});
        return false;
     }
   }
   function showResponse(responseText, statusText, xhr, $form){
     if(!responseText.status){
        if(!responseText.referer){
          layer.msg(responseText.info+',请重新操作.', {icon: 5, time: 2000}, function() {
            location.reload();
          });
        }else{
          layer.msg(responseText.info, {icon: 0, time: 2000}, function() {
             window.location.href = responseText.referer;
          });
        }
     }else{
          layer.msg(responseText.info, {icon: 6, time: 2000}, function() {
             window.location.href = responseText.referer;
          });
     }
   }
   })
