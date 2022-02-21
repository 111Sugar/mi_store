// footer
const service_items=document.getElementsByClassName("service_items");
for(let i=0;i<service_items.length;i++){
    if(i==service_items.length-1){ }
    else {
        service_items[i].style.cssText='border-right:1.5px solid #e0e0e0;'
    }
}