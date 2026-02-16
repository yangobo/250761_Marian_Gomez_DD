const titulo=document.querySelector("#titulo");
const conejo=document.querySelector("#conejo");
const conejo2=document.querySelector("#conejo2");
const conejo3=document.querySelector("#conejo3");

window.addEventListener("scroll", (event)=>{
    titulo.style.right = window.scrollY * 3 + "px";
    conejo.style.right = window.scrollY * 3 + "px";
    conejo2.style.right = window.scrollY * 2 + "px";
    conejo3.style.right = window.scrollY * 1 + "px";



})