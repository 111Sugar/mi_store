// navigate
const nav_left = document.getElementsByClassName("nav_left_p");
const right_box = document.getElementById("right_box");
const nav_right = document.getElementById("nav_right");
const pre = document.getElementById("pre");
const next = document.getElementById("next");
for (let i = 0; i < nav_left.length; i++) {
    nav_left[i].onmouseover = function () {
        pre.style.opacity = 0;
        next.style.opacity = 0;
        right_box.style.opacity = 1;
        nav_right.style.opacity = 1;
        nav_right.style.top = -458 * i + "px";
    }
}
right_box.onmouseleave = function () {
    right_box.style.opacity = 0;
    pre.style.opacity = 1;
    next.style.opacity = 1;
}
// circular banner 
var curindex = 0;
var slide = document.getElementById("slide");
var banner = document.getElementById("banner");
var right = document.getElementById("nav_right");
var dots = document.getElementsByClassName("dot");
var timer = setInterval("change_auto()", 3000);
function change_auto() {
    if ((curindex >= 0) && (curindex < 4)) {
        curindex++;
        show(curindex);
    }
    else {
        curindex = 0;
        reset_auto();
    }
}
function show(curindex) {
    slide.style.left = -100 * curindex + "%";
    dots[curindex].style.borderColor = "rgba(0,0,0,.5)";
    dots[curindex].style.background = "hsla(0,0%,100%,.5)";
    dots[curindex - 1].style.border = "2px solid hsla(0,0%,100%,.5)";
    dots[curindex - 1].style.background = "rgba(0,0,0,.5)";
}
function reset_auto() {
    slide.style.left = 0;
    dots[0].style.backColor = "rgba(0,0,0,.5)";
    dots[0].style.background = "hsla(0,0%,100%,.5)";
    dots[4].style.border = "2px solid hsla(0,0%,100%,.5)"
    dots[4].style.background = "rgba(0,0,0,.5)";
}
right.onmouseover = function () {
    clearInterval(timer);
}
right.onmouseleave = function () {
    timer = setInterval("change_auto()", 3000);
}
// button_pre
document.getElementById("pre").onclick = function () {
    if (curindex == 0) {
        curindex = 4;
        slide.style.left = -100 * curindex + "%";
        dots[4].style.backColor = "rgba(0,0,0,.5)";
        dots[4].style.background = "hsla(0,0%,100%,.5)";
        dots[0].style.border = "2px solid hsla(0,0%,100%,.5)"
        dots[0].style.background = "rgba(0,0,0,.5)";
    }
    else {
        dots[curindex - 1].style.borderColor = "rgba(0,0,0,.5)";
        dots[curindex - 1].style.background = "hsla(0,0%,100%,.5)";
        dots[curindex].style.border = "2px solid hsla(0,0%,100%,.5)";
        dots[curindex].style.background = "rgba(0,0,0,.5)";
        curindex--;
        slide.style.left = -100 * curindex + "%";
    }
}
// button_next
document.getElementById("next").onclick = function () {
    if (curindex == 4) {
        curindex = 0;
        slide.style.left = 0;
        dots[0].style.backColor = "rgba(0,0,0,.5)";
        dots[0].style.background = "hsla(0,0%,100%,.5)";
        dots[4].style.border = "2px solid hsla(0,0%,100%,.5)"
        dots[4].style.background = "rgba(0,0,0,.5)";
    }
    else {
        dots[curindex + 1].style.borderColor = "rgba(0,0,0,.5)";
        dots[curindex + 1].style.background = "hsla(0,0%,100%,.5)";
        dots[curindex].style.border = "2px solid hsla(0,0%,100%,.5)";
        dots[curindex].style.background = "rgba(0,0,0,.5)";
        curindex++;
        slide.style.left = -100 * curindex + "%";
    }
}
// mi_video
const videos = document.getElementsByClassName("video");
const broadcast = document.getElementsByClassName("broadcast");
for (let i = 0; i < videos.length; i++) {
    videos[i].onmouseover = function () {
        broadcast[i].src = "image/播放键 (1).png";
    }
    videos[i].onmouseout = function () {
        broadcast[i].src = "image/播放键.png";
    }
    videos[i].onclick = function () {
        window.scrollTo(0, 0);
    }
}
// commit_slide
const h_a_item = document.getElementsByClassName("h_a_item");
const commit_slide = document.getElementsByClassName("commit_slide");
for (let i = 0; i < h_a_item.length; i++) {
    h_a_item[i].onmouseenter = function () {
        commit_slide[i].style.animation = "myenter 0.7s forwards";
    }
    h_a_item[i].onmouseleave = function () {
        commit_slide[i].style.animation = "myleave 0.7s forwards";
    }
}
// 请求商品接口
(function () {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://180.76.185.37:3000/shopData", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            result = JSON.parse(xhr.responseText);
            // console.log(result);
            const display = document.getElementsByClassName("goods_item_display");
            const goods_item = document.getElementsByClassName("goods_item");
            for (let i = 0; i < result.length; i++) {
                let image = document.createElement("img");
                let title = document.createElement("p");
                let text = document.createElement("p");
                let price = document.createElement("p");
                display[i].appendChild(image);
                display[i].appendChild(title);
                goods_item[i].appendChild(text);
                goods_item[i].appendChild(price);
                image.src = result[i].imageUrl;
                title.className = "title";
                text.className = "text";
                price.className = "price";
                title.innerText = result[i].name;
                text.innerText = result[i].brand;
                price.innerText = result[i].cost + "元";
            }
        }
    }
})()
//请求购物车数据接口
function obtain(array) {
    console.log(array)
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://180.76.185.37:3000/getCartData");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(array));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText).result;
            console.log(data);
        }
    }
}
const items = document.getElementsByClassName("goods_item");
const myCart = document.getElementsByClassName("goods_add_cart");
for (let i = 0; i < items.length; i++) {
    items[i].onmouseover = function () {
        myCart[i].style.opacity = 1;
    }
    items[i].onmouseleave = function () {
        myCart[i].style.opacity = 0;
    }
    myCart[i].onclick = function () {
        var token = localStorage.getItem("token");
        var array = {
            "token": token
        }
        if (token == null) {
            login();
        }
        else if (token != null) {
            obtain(array);
            setTimeout(() => {
                let isexisted = false;
                for (let k = 0; k < data.length; k++) {
                    if (result[i].id == data[k].id) {
                        isexisted = true;
                    }
                }
                if (isexisted == true) { add_existed() }
                if (isexisted == false) {
                    add_success();
                    let id = result[i].id;
                    let name = result[i].name;
                    let brand = result[i].brand;
                    let imageUrl = result[i].imageUrl;
                    let sales = result[i].sales;
                    let cost = result[i].cost;
                    let color = result[i].color;
                    let myarr = {
                        "token": token,
                        "data": {
                            "id": id,
                            "name": name,
                            "brand": brand,
                            "imageUrl": imageUrl,
                            "sales": sales,
                            "cost": cost,
                            "color": color
                        }
                    }
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "http://180.76.185.37:3000/addCartData", true);
                    xhr.setRequestHeader("content-type", "application/json");
                    xhr.send(JSON.stringify(myarr));
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                        }
                    }
                }
            }, 1000);
        }
    }
}
// 请先登录
function login() {
    const error_container = document.getElementsByClassName("error_container")[0];
    error_container.style.animation = "mymoveone 2s forwards";
    setTimeout(() => {
        error_container.style.animation = "mymovetwo 2s forwards";
    }, 2000)
}
// 添加成功
function add_success() {
    const add_success = document.getElementById("add_success");
    add_success.style.animation = "mymoveone 2s forwards";
    setTimeout(() => {
        add_success.style.animation = "mymovetwo 2s forwards";
    }, 2000)
}
// 已添加
function add_existed() {
    const add_existed = document.getElementById("add_existed");
    add_existed.style.animation = "mymoveone 2s forwards";
    setTimeout(() => {
        add_existed.style.animation = "mymovetwo 2s forwards";
    }, 2000)
}