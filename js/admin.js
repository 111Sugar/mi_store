let container = document.getElementById("cart_content_container");
let token = localStorage.getItem("token");
let array = {
    "token": token
}
let xhr = new XMLHttpRequest();
xhr.open("POST", "http://180.76.185.37:3000/getUserData", true);
xhr.setRequestHeader("content-type", "application/json");
xhr.send(JSON.stringify(array));
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let result = JSON.parse(xhr.responseText);
        setItem(result.result);
        myDeleta(result.result);
    }
}
function setItem(result) {
    for (let i = 0; i < result.length; i++) {
        let cartitem = document.createElement("div");
        let infocontainer = document.createElement("div");
        container.appendChild(cartitem);
        cartitem.appendChild(infocontainer);
        cartitem.className = "cart_content_items";
        infocontainer.className = "cart_info_caontainer";
        for (let j = 0; j < 5; j++) {
            let div = document.createElement("div");
            switch (j) {
                case 0:
                    cartitem.appendChild(div);
                    div.innerHTML = result[i].name;
                    div.className = "cart_item_name";
                    break;
                case 1:
                    infocontainer.appendChild(div);
                    div.innerHTML = result[i].username;
                    div.className = "cart_item_username";
                    break;
                case 2:
                    infocontainer.appendChild(div);
                    div.innerHTML = result[i].password;
                    div.className = "cart_item_password";
                    break;
                case 3:
                    infocontainer.appendChild(div);
                    div.innerHTML = "<button>修改</button>";
                    div.className = "cart_item_alert";
                    break;
                case 4:
                    infocontainer.appendChild(div);
                    div.innerHTML = "<button class='cart_item_delete'>删除</button>";
                    break;
            }
        }
    }
}
function myDeleta(result) {
    let mydelete = document.getElementsByClassName("cart_item_delete");
    let isdelete;
    for (let i = 0; i < mydelete.length; i++) {
        let username = result[i].username;
        let array = {
            "username": username,
        }
        mydelete[i].onclick = function () {
            var msg = "您确定要删除吗？\n\n请确认！";
            if (confirm(msg) == true) {
                isdelete = true;
            } else {
                isdelete = false;
            }
            if (isdelete == true) {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://180.76.185.37:3000/deleteUser", true);
                xhr.setRequestHeader("content-type", "application/json");
                xhr.send(JSON.stringify(array));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        location.reload();
                    }
                }
            }
        }
    }
}
document.getElementById("add_good").onclick = function () {
    let container = document.createElement("div");
    document.body.appendChild(container);
    container.className = "add_container";
    for (let i = 0; i < 3; i++) {
        let div = document.createElement("div");
        container.appendChild(div);
        div.className = "add_content";
        switch (i) {
            case 0:
                div.innerHTML = "<span>修改信息</span><img src='image/叉号.png' id='myremove'/>"
                div.id = "add_header";
                break;
            case 1:
                div.id = "add_body";
                div.innerHTML = "\
                <p>商品名称</p>\
                <div><input type='text' placeholder='请输入商品名称' id='add_name'/></div>\
                <p>品牌</p>\
                <div><input type='text' placeholder='请输入商品品牌' id='add_brand'/></div>\
                <p>图片地址</p>\
                <div><input type='text' placeholder='请输入商品图片地址' id='add_url'/></div>\
                <p>销量</p>\
                <div><input type='text' placeholder='默认销量为零' id='add_count'/></div>\
                <p>价格</p>\
                <div><input type='text' placeholder='请输入商品价格' id='add_price'/></div>\
                <p>颜色</p>\
                <div><select id='add_color'>\
                    <option>选择商品颜色</option>\
                    <option>金色</option>\
                    <option>蓝色</option>\
                    <option>白色</option>\
                    <option>红色</option>\
                </select></div>\
                               "
                break;
            case 2:
                div.innerHTML = "<button>取消</button><button class='myconfirm'>确认修改</button>";
                div.id = "add_footer";
        }
        let myremove=document.getElementById("myremove");
        myremove.onclick=function(){
            document.getElementsByClassName("add_container")[0].style.cssText="opacity:0;z-index:-10"
        };
    }
    document.getElementsByClassName("myconfirm")[0].onclick = function () {
        let name = document.getElementById("add_name").value;
        let brand = document.getElementById("add_brand").value;
        let url = document.getElementById("add_url").value;
        let sale = document.getElementById("add_count").value;
        let price = document.getElementById("add_price").value;
        let color = document.getElementById("add_color").value;
        let arr = {
            "shopDatas":{
                "name": name,
                "brand": brand,
                "imageUrl": url,
                "sales": sale,
                "cost": price,
                "color": color
            }
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://180.76.185.37:3000/addShopData", true);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(arr));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let result = JSON.parse(xhr.responseText);
                console.log(result);

            }
        }
    }
}