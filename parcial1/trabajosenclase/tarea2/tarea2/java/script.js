

const fondo = document.querySelector(".layer.fondo");
const nino = document.querySelector(".layer.nino");
const luz = document.querySelector(".layer.luz");
const closet = document.querySelector(".layer.closet");

window.addEventListener("scroll", () => {

  const y = window.scrollY;

  fondo.style.transform = `translateY(${y * 0.1}px)`;
  nino.style.transform = `translateY(${y * 0.3}px)`;
  luz.style.transform = `translateY(${y * 0.5}px)`;
  closet.style.transform = `translateY(${y * 0.7}px)`;

});



const caja2 = document.querySelector(".caja2");
const titulo = document.querySelector("#titulo");
const conejo = document.querySelector("#conejo");
const jconejo = document.querySelector("#jconejo");
const pconejo = document.querySelector("#pconejo");
caja2.addEventListener("scroll", () => {

  const y = caja2.scrollTop;

  titulo.style.right  = y * 0.5 + "px";
  conejo.style.right  = y * 1 + "px";
  jconejo.style.right = y * 1.5 + "px";
  pconejo.style.right = y * 2 + "px";

});

const conejoClick = document.querySelector("#conejoClick");

let altura = 0;

conejoClick.addEventListener("click", () => {
  altura += 1000;              
  conejoClick.style.bottom = altura + "px";
});

const caja4 = document.querySelector(".caja4");
const conejoHover = document.querySelector("#conejoHover");

caja4.addEventListener("mouseover", () => {
  conejoHover.style.transform = "translateX(-120px)";
});

caja4.addEventListener("mouseout", () => {
  conejoHover.style.transform = "translateX(0)";
});





window.addEventListener("load", () => {

  const conejoLoad = document.querySelector("#conejoLoad");

 
  setTimeout(() => {
    conejoLoad.style.top = "40%";
  }, 200);

});
