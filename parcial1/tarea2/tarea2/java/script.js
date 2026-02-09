const titulo=document.querySelector("#titulo");
const html=document.querySelector("#conejo");
const ps5=document.querySelector("#pconejo");
const java=document.querySelector("#jconejo");

window.addEventListener("scroll", (event)=>{
    titulo.style.right = window.scrollY * 3 + "px";
    html.style.right = window.scrollY * 3 + "px";
    ps5.style.right = window.scrollY * 3 + "px";
    java.style.right = window.scrollY * 3 + "px";



})