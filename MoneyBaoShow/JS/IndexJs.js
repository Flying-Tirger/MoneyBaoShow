




//流动条
function marquee(height, speed, delay) {
    var scrollT;
    var pause = false;
    var ScrollBox = document.getElementById("upRoll1");
    if (document.getElementById("holder1").offsetHeight <= height) return;
    var _tmp = ScrollBox.innerHTML.replace('holder1', 'holder')
    ScrollBox.innerHTML += _tmp;
    ScrollBox.onmouseover = function () { pause = true }
    ScrollBox.onmouseout = function () { pause = false }
    ScrollBox.scrollTop = 0;
    function start() {
        scrollT = setInterval(scrolling, speed);
        if (!pause) ScrollBox.scrollTop += 2;
    }
    function scrolling() {
        if (ScrollBox.scrollTop % height != 0) {
            ScrollBox.scrollTop += 2;
            if (ScrollBox.scrollTop >= ScrollBox.scrollHeight / 2) ScrollBox.scrollTop = 0;
        }
        else {
            clearInterval(scrollT);
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);
}
//调用流动条
marquee(42, 30, 3000);
//设置轮播图的宽
window.onresize = function () {
    var oM2Ul = document.getElementById('m2-ul');
    oM2Ul.style.width = document.documentElement.clientWidth + 'px';
}


$(document).ready(function () {
    $('.m2-banner-box').mouseenter(function () {
        $('.m2-prev,.m2-next').fadeIn(200);
    });
    $('.m2-banner-box').mouseleave(function () {
        $('.m2-prev,.m2-next').fadeOut(200);
    })
    //焦点图轮播
    $(".prev,.next").hover(function () {
        $(this).stop(true, false).fadeTo("show", 0.9);
    }, function () {
        $(this).stop(true, false).fadeTo("show", 0.4);
    });
    $(".m2-banner-box").slide({
        titCell: ".m2-hd ul",
        mainCell: ".m2-bd ul",
        effect: "fold",
        interTime: 3500,
        delayTime: 500,
        autoPlay: true,
        autoPage: true,
        trigger: "mouseover"
    });
});




