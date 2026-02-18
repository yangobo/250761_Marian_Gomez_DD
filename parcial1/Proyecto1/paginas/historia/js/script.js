
//paralax los elementos se mueven a izquierda o derecha

const titulo = document.querySelector(".titulo");
const freddy = document.querySelector("#freddy");
const michael = document.querySelector("#Michael");
const texto = document.querySelector("#texto");

window.addEventListener("scroll", () => {
    
    titulo.style.left =  window.scrollY * 4 + "px";
    freddy.style.right = window.scrollY * .8 + "px";
    Michael.style.right = window.scrollY * .6 + "px";
    texto.style.left =  window.scrollY * 0.5 + "px";
});


//Movimiento de fredbear, uso de estructura de control if
const imagen = document.querySelector('#fred');
let x = 0;
let y = 0;
const mo = 30;

document.addEventListener('keydown', (e) => {
    if (e.key.startsWith('Arrow')) {
        e.preventDefault();
    }
    
    if (e.key === 'ArrowUp') y -= mo;
    if (e.key === 'ArrowDown') y += mo;
    if (e.key === 'ArrowLeft') x -= mo;
    if (e.key === 'ArrowRight') x += mo;

    imagen.style.left = x + "px";
    imagen.style.top = y + "px";
});


// Cambia de tamano con un intervalo de tiempo, inspirado en actividad
const notita = document.querySelector("#notita");

//esto solo lo agregue para que quedara centrado
notita.style.display = "flex";
notita.style.alignItems = "center";
notita.style.justifyContent = "center";
notita.style.textAlign = "center";

let bandera = false;
let grande = true;

// Funciones
function cambiarColor(color) {
    notita.style.background = color;
}

function cambiarTamano(ancho, alto) {
    notita.style.width = ancho;
    notita.style.height = alto;
}

function cambiarTexto(texto) {
    notita.innerHTML = texto;
}


setInterval(() => {
    if (grande) {
        cambiarTamano("350px", "200px");
        cambiarColor("linear-gradient(135deg, #320d31, #990078)");
    } else {
        cambiarTamano("250px", "150px");
        cambiarColor("linear-gradient(135deg, #2a1a3a, #1a0f2a)");
    }
    grande = !grande;
}, 1000);


notita.addEventListener("click", () => {
    if (bandera) {
        cambiarColor("linear-gradient(135deg, #497ef9, #990000)");
        cambiarTamano("400px", "250px");
        bandera = false;
    } else {
        cambiarColor("linear-gradient(135deg, #0000ff, #000099)");
        cambiarTamano("300px", "200px");
        cambiarTexto("Juega el minijuego");
        bandera = true;
    }
});