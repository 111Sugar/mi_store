window.onload = function () {
    const shadow = document.getElementsByClassName("shadow")[0];
    shadow.style.cssText = "animation:enter 2s 1;animation-fill-mode:forwards;"
}
const myform = document.getElementsByClassName("myform");
const eye = document.getElementById("eye");
myform[1].onfocus = function () {
    eye.style.cssText = "opacity:1;transition:all,.2s"
}
myform[1].onblur = function () {
    eye.style.cssText = "opacity:0;transition:all,.2s"
}
var isPassword = true;
eye.onclick = function () {
    if (isPassword == true) {
        eye.style.cssText = "opacity:0;transition:all,.2s";
        myform[1].type = "text";
    }
    else {
        eye.style.cssText = "opacity:1;transition:all,.2s";
        myform[1].type = "password";
    }
    isPassword = !isPassword;
}
function userSubmit() {
    let iserror = false;
    const error = document.getElementsByClassName("error_container")[0];
    const registration_success = document.getElementById("registration_success");
    const registration_false = document.getElementById("registration_false");
    for (let i = 0; i < myform.length; i++) {
        if (myform[i].value.length == 0) {
            iserror = true;
            error.style.animation = "mymoveone 2s forwards";
            document.body.onmousemove = function () {
                error.style.animation = "mymovetwo 2s forwards";
                location.reload();
            }
        }
    }
    if (iserror == false) {
        let value1 = myform[0].value;
        let value2 = myform[1].value;
        let value3 = myform[2].value;
        let array = {
            "username": value1,
            "password": value2,
            "name": value3
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://180.76.185.37:3000/register", true);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(array));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let result = JSON.parse(xhr.responseText);
                if (result.state == 0) {
                    registration_false.style.animation = "mymoveone 2s forwards";
                    setTimeout(() => {
                        registration_success.style.animation = "mymovetwo 2s forwards";
                        location.reload();
                    }, 2000)
                }
                else if (result.state == 1) {
                    registration_success.style.animation = "mymoveone 2s forwards";
                    let timer1 = setTimeout(() => {
                        registration_success.style.animation = "mymovetwo 2s forwards";
                    }, 2000)
                    clearTimeout(timer1);
                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 3000)
                }
            }
        }
    }
}