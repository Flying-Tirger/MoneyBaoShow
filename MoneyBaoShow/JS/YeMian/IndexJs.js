
if (getCookie("Name") != null && getCookie("Pwd") != null) {
    $("#UserName").val(getCookie("Name"))
    $("#UserPwd").val(getCookie("Pwd"))
    $("#JZPwd")[0].checked = true;
}

var show_num = [];
draw(show_num);
function dj() {
    draw(show_num);
    alert(show_num)
}

function draw(show_num) {
    var canvas_width = document.getElementById('canvas').clientWidth;
    var canvas_height = document.getElementById('canvas').clientHeight;
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度

    for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt;
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }

}
function randomColor() {//得到随机的颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}
//文本框验证 onblur事件
function UserPwdAndUserName() {
    var UserName = $("#UserName").val();
    if (UserName == null || UserName == "") {
        $("#U_Name").html("用户名不能为空");
        $("#UserName123").show();
    }
    else {
        $("#UserName123").hide();
    }
    var UserPwd = $("#UserPwd").val();
    if (UserPwd == null || UserPwd == "") {
        $("#r_passwordMain").html("密码不能为空");
        $("#w_passwordMain").show();
    }
    else {
        $("#w_passwordMain").hide();
    }
}


//登录
function UserLogin() {

    var yzm = show_num.join("");
    var UserName = $("#UserName").val();

    if (UserName == null || UserName == "") {

        $("#U_Name").html("用户名不能为空");
        $("#UserName123").show();

    }
    var UserPwd = $("#UserPwd").val();
    if (UserPwd == null || UserPwd == "") {
        $("#r_passwordMain").html("密码不能为空");
        $("#w_passwordMain").show();

    }
    if (yzm.toLocaleUpperCase() == $("#VerifCode").val().toLocaleUpperCase() && UserName != null && UserPwd != null) {

        $.ajax({

            url: "https://10.1.159.16:334/Api/UserInfo/GetLogin?UserEmail=" + $("#UserName").val() + "&UserPwd=" + $("#UserPwd").val(),
            success: function (d) {
                if (d > 0) {

                    if ($("#JZPwd")[0].checked) {
                        setCookie("Name", UserName);
                        setCookie("Pwd", UserPwd);
                    }
                    alert('登录成功');
                    sessionStorage.setItem('UserName', UserName);
                    location.href = 'UserInfo.html';
                }
                else
                { 
                    alert('账号密码错误')
                }
            }
        })
    }
    else {
        alert('验证码错误')
    }

}
//设置Cookie
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path:/";
}
/**
 * 获取Cookie中的值
 * @param objName
 * @returns
 */
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) {
            return decodeURI(temp[1]);
        }
    }
}



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




