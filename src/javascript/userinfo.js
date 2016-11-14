$(function() {
            var toedit = $("#toedit");
            var stopedit = $("#stopedit");
            var button = $("#getemailcode");
            var rebutton = $("#getremailcode");
            var mail1 = $('#mail1');
            var buttonst = true;
            var rebuttonst = true;
            var reemail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
            var edit_options = {
                success: showResponse,
            };
            var checkmail_options = {
                beforeSubmit: checkmail_showRequest,
                success: showResponse,
            };
            var checkremail_options = {
                beforeSubmit: checkremail_showRequest,
                success: showResponse,
            };
            var repass_options = {
                beforeSubmit: repass_showRequest,
                success: showResponse,
            };
            var checkname_options = {
                beforeSubmit: checkname_showRequest,
                success: showResponse,
            };
            var setbank_options = {
                beforeSubmit: setbank_showRequest,
                success: showResponse,
            };
            var setzfb_options = {
                beforeSubmit: setzfb_showRequest,
                success: showResponse,
            };
            $('#setbank').submit(function() {
                $(this).ajaxSubmit(setbank_options);
                return false;
            });
            $('#setzfb').submit(function() {
                $(this).ajaxSubmit(setzfb_options);
                return false;
            });
            toedit.click(function toedit() {
                $(".noedit").css('display', 'none');
                $(".edit").css('display', 'block');
            });
            stopedit.click(function stopedit() {
                $(".noedit").css('display', 'block');
                $(".edit").css('display', 'none');
            });
            $('#edit').submit(function() {
                $(this).ajaxSubmit(edit_options);
                return false;
            });
            $('#checkmail').submit(function() {
                $(this).ajaxSubmit(checkmail_options);
                return false;
            });
            $('#checkremail').submit(function() {
                $(this).ajaxSubmit(checkmail_options);
                return false;
            });
            $('#repass').submit(function() {
                $(this).ajaxSubmit(repass_options);
                return false;
            });
            $('#checkname').submit(function() {
                $(this).ajaxSubmit(checkname_options);
                return false;
            });

            function setbank_showRequest(formData, jqForm, options) {
                if (!formData[1].value) {
                    layer.msg('银行卡姓名不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[2].value) {
                    layer.msg('银行卡号不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
            }

            function setzfb_showRequest(formData, jqForm, options) {
                if (!formData[1].value) {
                    layer.msg('支付宝姓名不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[2].value) {
                    layer.msg('支付宝帐号号不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
            }

            function repass_showRequest(formData, jqForm, options) {
                if (!formData[1].value) {
                    layer.msg('原始秘密不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[2].value) {
                    layer.msg('新秘密不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[3].value) {
                    layer.msg('重复秘密不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (formData[2].value !== formData[3].value) {
                    layer.msg('两次秘密输入不一致!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
            }

            function checkmail_showRequest(formData, jqForm, options) {
                if (!formData[1].value) {
                    layer.msg('邮箱不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!reemail.test(formData[1].value)) {
                    layer.msg('请填写正确的邮箱!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[2].value) {
                    layer.msg('验证码不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
            }

            function checkremail_showRequest(formData, jqForm, options) {
                if (!formData[1].value) {
                    layer.msg('邮箱不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!reemail.test(formData[1].value)) {
                    layer.msg('请填写正确的邮箱!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[2].value) {
                    layer.msg('验证码不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
            }

            function checkname_showRequest(formData, jqForm, options) {
                if (!formData[1].value) {
                    layer.msg('姓名不能为空!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!formData[2].value) {
                    layer.msg('身份证号不能为空!', {
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
                var email = $("#mail1").val();
                var time = 60;
                if (!rebuttonst) {
                    layer.msg('60秒后才可再次发送', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!email) {
                    layer.msg('请填写邮箱!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!reemail.test(email)) {
                    layer.msg('请填写正确的邮箱!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                layer.msg('验证邮件发送中...', {
                    icon: 16
                });
                $.ajax({
                    type: 'post',
                    url: '/user/center/sendemailcode.html',
                    data: 'email=' + email,
                    dataType: 'json',
                    success: function(data) {
                        var t = setInterval(function() {
                            time--;
                            button.html(time + "秒后重新获取");
                            if (time == 0) {
                                clearInterval(t);
                                buttonst = true;
                                button.removeClass().addClass("btn btn-success").html("重新获取短信验证码");
                            }
                        }, 1000);
                        layer.closeAll('loading');
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

            rebutton.click(function get_mverify() {
                var emai = $('#email2').val();
                var time = 60;
                if (!rebuttonst) {
                    layer.msg('60秒后才可再次发送', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!emai) {
                    layer.msg('请填写邮箱!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                if (!reemail.test(emai)) {
                    layer.msg('请填写正确的邮箱!', {
                        icon: 0,
                        time: 1500
                    });
                    return false;
                }
                layer.msg('验证邮件发送中...', {
                    icon: 16
                });
                $.ajax({
                    type: 'post',
                    url: '/user/center/sendemailcode.html',
                    data: 'email=' + emai,
                    dataType: 'json',
                    success: function(data) {
                        var t = setInterval(function() {
                            time--;
                            rebutton.html(time + "秒后重新获取");
                            if (time == 0) {
                                clearInterval(t);
                                rebuttonst = true;
                                rebutton.removeClass().addClass("btn btn-success").html("重新获取短信验证码");
                            }
                        }, 1000);
                        layer.closeAll('loading');
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
                            rebutton.removeClass().addClass("btn btn-default");
                            rebuttonst = false;
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
            laydate.skin('yalan');
            laydate({
                elem: '#birthday',
                format: 'YYYY/MM/DD', // 分隔符可以任意定义，该例子表示只显示年月
            });
        })
