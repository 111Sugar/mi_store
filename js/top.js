// top_bar
const items_left = document.getElementsByClassName("item_left");
for (let i = 0; i < items_left.length; i++) {
    if (i == items_left.length - 1) { }
    else {
        items_left[i].style.cssText = 'border-right:2px solid #444444;'
    }
}
// header_bar
const search_input = document.getElementById("search_input");
const search_icon = document.getElementById("search_icon");
search_input.onmousemove = function () {
    search_input.style.cssText = "border:1.5px solid #b0b0b0";
    search_icon.style.cssText = "border-top:1.5px solid #b0b0b0;border-bottom:1.5px solid #b0b0b0;border-right:1.5px solid #b0b0b0";
}
search_input.onmouseout = function () {
    search_input.style.cssText = "border:1.5px solid #e0e0e0";
    document.getElementById("search_result").style.opacity = 0;
    search_icon.style.cssText = "border-top:1.5px solid #e0e0e0;border-bottom:1.5px solid #e0e0e0;border-right:1.5px solid #e0e0e0";
}
search_input.onclick = function () {
    search_input.style.cssText = "border:1.5px solid #f56500";
    document.getElementById("search_result").style.opacity = 1;
    search_icon.style.cssText = "border-top:1.5px solid #f56500;border-bottom:1.5px solid #f56500;border-right:1.5px solid #f56500";
}
// top_header
const header = document.getElementsByClassName("top_header_item");
const detail_box = document.getElementById("detail_box");
const detail = document.getElementById("detail");
for (let i = 0; i < header.length; i++) {
    if (i < header.length - 2) {
        header[i].onmouseover = function () {
            detail_box.style.opacity = 1;
            detail.style.left = 0 - 100 * i + "%";
        }
    }
    else {
        header[i].onmouseover = function () {
            detail_box.style.opacity = 0;
        }
    }
}
detail.onmouseleave = function () {
    detail_box.style.opacity = 0;
}
// registration
document.getElementById("registration").onclick = function () {
    window.location.href = "registration.html";
}
// login
document.getElementById("login").onclick = function () {
    window.location.href = "login.html";
}
if (localStorage.getItem("auth") == "user") {
    document.getElementById("user_name").innerHTML = "用户名：" + localStorage.getItem("name");
    document.getElementById("success_login").style.cssText = "opacity:1;z-index:2";
    document.getElementById("top_bar_right").style.cssText = "opacity:0;z-index:1";
}
// 购物车
document.getElementById("cart").onclick = function () {
    window.location.href = "cart.html";
}
// 购物车商品数量
window.onload=function() {
    let token = localStorage.getItem("token");
    let array = {
        "token": token
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://180.76.185.37:3000/getCartData");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(array));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let myresult = JSON.parse(xhr.responseText);
            let count=myresult.result.length;
            document.getElementById("cart").innerText="购物车"+"（"+count+"）";
        }
    }
}
// 退出登录
document.getElementById("exit").onclick = function () {
    let isconfirm = false;
    var msg = "你确定要退出吗？";
    if (confirm(msg) == true) {
        isconfirm = true;
    }
    if (isconfirm == true) {
        localStorage.clear();
        localStorage.setItem("isLogin", "false");
        window.location.href = "index.html";
    }
}
