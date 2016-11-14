$(function() {
    $("#gd").mouseover(function() {
        $("#box").removeClass().addClass("col-xs-10");
        $("#gd").css('display', 'none');
        $("#sq").css('display', 'block').css('margin-top', '50px');
    });
    $("#sq").mouseover(function() {
        $("#box").removeClass().addClass("col-xs-10 text-overflow");
        $("#gd").css('display', 'block');
        $("#sq").css('display', 'none');
    });
});
