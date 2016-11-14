$(function() {
            // 获取发送短信按钮
            var button = $("#getsms");
            // 定义点击发送短信验证码的状态
            var buttonst = true;
            var remobil = /^1[3578]\d{9}$/;
            var options = {
                beforeSubmit: showRequest,
                success: showResponse,
            };
            $('#reg').submit(function() {
                $(this).ajaxSubmit(options);
                return false;
            });

            function showRequest(formData, jqForm, options) {
                if (!formData[1].value) {
                    layer.msg('手机号不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!remobil.test(formData[1].value)) {
                    layer.msg('请填写正确的手机号!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[2].value) {
                    layer.msg('秘密不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[4].value) {
                    layer.msg('短信验证码不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
            }

            function showResponse(responseText, statusText, xhr, $form) {
                if (!responseText.status) {
                    if (!responseText.referer) {
                        layer.msg(responseText.info, {
                            icon: 5,
                            time: 2000
                        }, function() {
                            location.reload();
                        });
                    } else {
                        layer.msg(responseText.info, {
                            icon: 0,
                            time: 1000
                        }, function() {
                            window.location.href = responseText.referer;
                        });
                    }
                } else {
                    layer.msg(responseText.info, {
                        icon: 6,
                        time: 1000
                    }, function() {
                        window.location.href = responseText.referer;
                    });
                }
            }
            button.click(function get_mverify() {
                var verify = $("input[name='verify']").val();
                var mobile = $("input[name='mobile']").val();
                var time = 60;
                if (!buttonst) {
                    layer.msg('60秒后才可再次发送', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!mobile) {
                    layer.msg('请填写手机号!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!remobil.test(mobile)) {
                    layer.msg('请填写正确的手机号!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!verify) {
                    layer.msg('请填写验证码!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                $.ajax({
                    type: 'post',
                    url: '/user/index/getregsms.html',
                    data: 'verify=' + verify + '&mobile=' + mobile,
                    dataType: 'json',
                    success: function(data) {
                      console.log(data.info);
                        if (!data.status) {
                            if (!data.referer) {
                                layer.msg(data.info, {
                                    icon: 0,
                                    time: 2000
                                });
                            } else {
                                layer.msg(data.info, {
                                    icon: 3,
                                    time: 1500
                                }, function() {
                                    window.location.href = data.referer;
                                });
                            }
                        } else {
                            button.removeClass().addClass("btn btn-default");
                            buttonst = false;
                            var t = setInterval(function() {
                                time--;
                                button.html(time + "秒后重新获取");
                                if (time == 0) {
                                    clearInterval(t);
                                    buttonst = true;
                                    button.removeClass().addClass("btn btn-success").html("重新获取短信验证码");
                                }
                            }, 1000);
                            layer.msg(data.info, {
                                icon: 6,
                                time: 2000
                            });
                        }
                    },
                    error: function() {
                        layer.msg('好像那里出错了,请重新操作.', {
                            icon: 0,
                            time: 2000
                        });
                    }
                });
            });
        })
