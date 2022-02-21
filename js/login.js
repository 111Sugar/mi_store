window.onload=function()
{
   const shadow=document.getElementsByClassName("shadow")[0];
   shadow.style.cssText="animation:enter 2s 1;animation-fill-mode:forwards;"
}
const myform = document.getElementsByClassName("myform");
const eye = document.getElementById("eye");
myform[1].onfocus = function () {
    eye.style.cssText = "opacity:1;transition:all,.2s"
}
myform[1].onblur = function () {
    eye.style.cssText = "opacity:0;transition:all,.2s"
}
var isPassword=true;
eye.onclick=function(){
    if(isPassword==true){
        eye.style.cssText = "opacity:0;transition:all,.2s";
        myform[1].type="text";
    }
    else{
        eye.style.cssText = "opacity:1;transition:all,.2s";
        myform[1].type="password";
    }
    isPassword=!isPassword;
}
function userSubmit(){
    const error=document.getElementsByClassName("error_container")[0];
    let value1=myform[0].value;
    let value2=myform[1].value;
    let value3="user";
    let auth=myform[2].checked;
    if(auth==true){
        value3="admin";
    }
    let array ={
        "username":value1,
        "password":value2,
        "auth":value3
      }
    let xhr=new XMLHttpRequest();
    xhr.open("POST","http://180.76.185.37:3000/login",true);
    xhr.setRequestHeader( "content-type","application/json");
    xhr.send(JSON.stringify(array));
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            let result = JSON.parse(xhr.responseText);
            console.log(result);
            if(result.state==0){
                const error = document.getElementsByClassName("error_container")[0];
                error.style.animation = "mymoveone 2s forwards";
                setTimeout(()=>{
                    error.style.animation = "mymovetwo 2s forwards";
                },2000)
                setTimeout(()=>{
                    location.reload();
                },4000)
            }
            if(result.state==1){
                let name=result.name;
                let auth=result.auth;
                let token=result.token;
                localStorage.setItem("name",name);
                localStorage.setItem("token",token);
                localStorage.setItem("auth",auth);
                if(value3=="admin"){
                    window.location.href="admin.html";
                }
                else if(value3=="user"){
                localStorage.setItem("isLogin","true");
                window.location.href="index.html";
                }
                
            }
        }
    }
}