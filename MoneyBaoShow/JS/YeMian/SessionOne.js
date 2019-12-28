

var UserName = sessionStorage.getItem('UserName');
if (UserName != null && UserName != "")
{
    $("#SessionOne").html("<span style='color:white;line-height: 41px;'>你好" + UserName + "</span>")
}