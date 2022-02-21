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
        let result = JSON.parse(xhr.responseText);
        let data = result.result;
        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement("tr");
            document.getElementById("goods_table").appendChild(tr);
            for (let j = 0; j < 6; j++) {
                const td = document.createElement("td");
                tr.appendChild(td);
                let count = 1;
                switch (j) {
                    case 0:
                        td.innerHTML = `<img src='${data[i].imageUrl}' class="smaller"/><span class="goods_cart_name">${data[i].name}</span>`;
                        td.className = "smallimage";
                        break;
                    case 1:
                        td.innerHTML = `<span>${data[i].color}</span>`;
                        break;
                    case 2:
                        td.innerHTML = `<span class="unit_price">${data[i].cost}</span>`;
                        break;
                    case 3:
                        td.innerHTML = `<span class="totalprice">${data[i].cost * count}</span>元`;
                        break;
                    case 4:
                        td.innerHTML = `<button class="decrease">-</button><span class="goods_count">${count}</span>件<button class="increase">+</button>`;
                        break;
                    case 5:
                        td.innerHTML = `<button class="delete">删除</button><button class="purchase">购买</button>`;
                        break;
                }
            }
            const decrease = document.getElementsByClassName("decrease");
            const increase = document.getElementsByClassName("increase");
            const goods_count = document.getElementsByClassName("goods_count");
            const totalprice = document.getElementsByClassName("totalprice");
            const unit_price = document.getElementsByClassName("unit_price");
            const mydelete = document.getElementsByClassName("delete");
            const purchase=document.getElementsByClassName("purchase");
            for (let i = 0; i < decrease.length; i++) {
                decrease[i].onclick = function () {
                    if (goods_count[i].innerHTML >= 1)
                        goods_count[i].innerHTML -= 1;
                    totalprice[i].innerHTML = unit_price[i].innerHTML * goods_count[i].innerHTML;
                }
                increase[i].onclick = function () {
                    goods_count[i].innerHTML = goods_count[i].innerHTML - 0 + 1;
                    totalprice[i].innerHTML = unit_price[i].innerHTML * goods_count[i].innerHTML;
                }
            }
            for(let i=0;i<purchase.length;i++){
                purchase[i].onclick=function(){
                    let isbuy = false;
                    let msg = "你确定要购买吗？";
                    if (confirm(msg) == true) {
                        isbuy = true;
                    }
                    if (isbuy == true) {
                        let good_id = data[i].id;
                        let myarr = {
                            "token": token,
                            "id": good_id
                        }
                        let xhr2 = new XMLHttpRequest();
                        xhr2.open("POST", "http://180.76.185.37:3000/deleteCartData");
                        xhr2.setRequestHeader("content-type", "application/json");
                        xhr2.send(JSON.stringify(myarr));
                        xhr2.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                success_buy();
                                setTimeout(() => {
                                    location.reload();
                                },3000);
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < mydelete.length; i++) {
                mydelete[i].onclick = function () {
                    let isdelete = false;
                    let msg = "你确定要删除吗？";
                    if (confirm(msg) == true) {
                        isdelete = true;
                    }
                    if (isdelete == true) {
                        let good_id = data[i].id;
                        let myarr = {
                            "token": token,
                            "id": good_id
                        }
                        let xhr2 = new XMLHttpRequest();
                        xhr2.open("POST", "http://180.76.185.37:3000/deleteCartData");
                        xhr2.setRequestHeader("content-type", "application/json");
                        xhr2.send(JSON.stringify(myarr));
                        xhr2.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                success_delete();
                                setTimeout(() => {
                                    location.reload();
                                },3000);
                            }
                        }
                    }
                }
            }
        }
    }
}
function success_buy(){
    const success_buy=document.getElementById("success_buy");
    success_buy.style.animation="mymoveone 2s forwards";
    setTimeout(() => {
        success_buy.style.animation = "mymovetwo 2s forwards";
    }, 2000)
}
function success_delete(){
    const success_delete=document.getElementById("success_delete");
    success_delete.style.animation="mymoveone 2s forwards";
    setTimeout(() => {
        success_delete.style.animation = "mymovetwo 2s forwards";
    }, 2000)
}