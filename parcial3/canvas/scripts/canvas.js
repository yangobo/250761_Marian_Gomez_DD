import { Cuadrado, Linea, Sticker, Circulo, Estrella, Borrador, TrazoPincel } from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");
const elementos = [];
const rehacer = [];
let filtroActivo = null;

/* CONFIG GLOBAL */
const config = {
    colorLinea: "#0000ff",
    colorRelleno: "#ff0000",
    grosor: 5,
    tamanoSticker: 80
};

/* INPUTS */
const inputColorLinea = document.getElementById("colorLinea");
const inputColorRelleno = document.getElementById("colorRelleno");
const inputGrosor = document.getElementById("grosor");
const inputSticker = document.getElementById("inputSticker");
const inputTamanoSticker = document.getElementById("tamanoSticker");

let imagenSticker = null;
let imgSticker = null;

inputColorLinea.addEventListener("input", e => config.colorLinea = e.target.value);
inputColorRelleno.addEventListener("input", e => config.colorRelleno = e.target.value);
inputGrosor.addEventListener("input", e => config.grosor = e.target.value);
inputTamanoSticker.addEventListener("input", e => config.tamanoSticker = e.target.value);

/* carga imagen */
inputSticker.addEventListener("change", e => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.onload = ev => {

        imagenSticker = ev.target.result;

        imgSticker = new Image();
        imgSticker.src = imagenSticker;
    };

    reader.readAsDataURL(file);
});

/* OPCIONES */
const opciones = {
    pincel:false,
    linea:false,
    borrador:false,
    circulo:false,
    cuadrado:false,
    estrella:false,
    sticker:false
};

const posicionesCursor = {
    iniciales:{x:0,y:0},
    finales:{x:0,y:0}
};

let presionado = false;
let trazoActual = null;
let borradoActual = null;

/* arregla coordenadas cuando el canvas cambia de tamaño */
function obtenerPosicionReal(e){

    const rect = canvas.getBoundingClientRect();

    const escalaX = canvas.width / rect.width;
    const escalaY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * escalaX,
        y: (e.clientY - rect.top) * escalaY
    };
}

/* EVENTOS */

canvas.addEventListener("mousedown", alPresionarClick);
canvas.addEventListener("mousemove", mientrasPrecionaClick);
canvas.addEventListener("mouseup", alSoltarClick);

document.querySelector("#btn_linea").addEventListener("click", ()=>cambiarOpcion("linea"));
document.querySelector("#btn_pincel").addEventListener("click", ()=>cambiarOpcion("pincel"));
document.querySelector("#btn_cuadro").addEventListener("click", ()=>cambiarOpcion("cuadrado"));
document.querySelector("#btn_circulo").addEventListener("click", ()=>cambiarOpcion("circulo"));

document.querySelector("#btn_sticker").addEventListener("click", () => {
    cambiarOpcion("sticker");
    inputSticker.click();
});

document.querySelector("#btn_estrella").addEventListener("click", ()=>cambiarOpcion("estrella"));
document.querySelector("#btn_borrador").addEventListener("click", ()=>cambiarOpcion("borrador"));

document.querySelector(".limpiar").addEventListener("click", Limpiar);
document.querySelector(".guardar").addEventListener("click", guardarImagen);
document.querySelector(".deshacer").addEventListener("click", hacerUndo);
document.querySelector(".rehacer").addEventListener("click", hacerRedo);

/* FUNCIONES */

function cambiarOpcion(op){

    for(let k in opciones){
        opciones[k] = false;
    }

    opciones[op] = true;
}

/* redibuja todos los elementos guardados */
function redibujar(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    elementos.forEach(el => el.Dibujar(ctx));

    if(filtroActivo !== null){
        aplicarFiltro(filtroActivo,false);
    }
}

function alPresionarClick(e){

    const pos = obtenerPosicionReal(e);

    posicionesCursor.iniciales.x = pos.x;
    posicionesCursor.iniciales.y = pos.y;

    presionado = true;

    /* pincel */

    if(opciones.pincel){

        trazoActual = new TrazoPincel(
            config.colorLinea,
            config.grosor
        );

        trazoActual.agregarPunto(pos.x,pos.y);

        elementos.push(trazoActual);

        rehacer.length = 0;
    }

    /* borrador real tipo canvas
       guarda puntos continuos para borrar pixel por pixel */

    if(opciones.borrador){

        borradoActual = new Borrador(config.grosor * 2);

        borradoActual.agregarPunto(pos.x,pos.y);

        elementos.push(borradoActual);

        rehacer.length = 0;
    }
}

function mientrasPrecionaClick(e){

    const pos = obtenerPosicionReal(e);

    posicionesCursor.finales.x = pos.x;
    posicionesCursor.finales.y = pos.y;

    if(!presionado && !opciones.sticker) return;

    /* pincel */

    if(opciones.pincel){

        trazoActual.agregarPunto(pos.x,pos.y);

        redibujar();

        return;
    }

    /* borrador */

    if(opciones.borrador){

        borradoActual.agregarPunto(pos.x,pos.y);

        redibujar();

        return;
    }

    /* preview sticker */

    if(opciones.sticker && imgSticker){

        redibujar();

        ctx.globalAlpha = 0.5;

        ctx.drawImage(
            imgSticker,
            pos.x,
            pos.y,
            config.tamanoSticker,
            config.tamanoSticker
        );

        ctx.globalAlpha = 1;

        return;
    }

    let elemento;

    if(opciones.linea){

        elemento = new Linea(
            posicionesCursor,
            config.colorLinea,
            config.grosor
        );
    }

    else if(opciones.cuadrado){

        elemento = new Cuadrado(
            posicionesCursor,
            config.colorLinea,
            config.colorRelleno,
            config.grosor
        );
    }

    else if(opciones.circulo){

        elemento = new Circulo(
            posicionesCursor,
            config.colorLinea,
            config.colorRelleno,
            config.grosor
        );
    }

    else if(opciones.estrella){

        elemento = new Estrella(
            posicionesCursor,
            config.colorLinea,
            config.colorRelleno,
            config.grosor
        );
    }

    redibujar();

    if(elemento){
        elemento.Dibujar(ctx);
    }
}

function alSoltarClick(e){

    const pos = obtenerPosicionReal(e);

    posicionesCursor.finales.x = pos.x;
    posicionesCursor.finales.y = pos.y;

    trazoActual = null;
    borradoActual = null;

    const posFinal = {
        iniciales:{...posicionesCursor.iniciales},
        finales:{...posicionesCursor.finales}
    };

    let elemento;

    if(opciones.linea){

        elemento = new Linea(
            posFinal,
            config.colorLinea,
            config.grosor
        );
    }

    else if(opciones.cuadrado){

        elemento = new Cuadrado(
            posFinal,
            config.colorLinea,
            config.colorRelleno,
            config.grosor
        );
    }

    else if(opciones.circulo){

        elemento = new Circulo(
            posFinal,
            config.colorLinea,
            config.colorRelleno,
            config.grosor
        );
    }

    else if(opciones.estrella){

        elemento = new Estrella(
            posFinal,
            config.colorLinea,
            config.colorRelleno,
            config.grosor
        );
    }

    else if(opciones.sticker && imagenSticker){

        elemento = new Sticker(
            posFinal,
            imagenSticker,
            config.tamanoSticker
        );
    }

    if(elemento){

        elementos.push(elemento);

        rehacer.length = 0;
    }

    redibujar();

    presionado = false;
}

/* UNDO REDO */

function hacerUndo(){

    if(elementos.length > 0){

        rehacer.push(elementos.pop());

        redibujar();
    }
}

function hacerRedo(){

    if(rehacer.length > 0){

        elementos.push(rehacer.pop());

        redibujar();
    }
}

/* LIMPIAR */

function Limpiar(){

    elementos.length = 0;
    rehacer.length = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);
}

/* FILTROS */

const botonesFiltros = document.querySelectorAll(".filters button");

function quitarFiltro(){

    filtroActivo = null;

    redibujar();
}

botonesFiltros.forEach((btn,i)=>{

    btn.addEventListener("click",()=>{

        i === 0
            ? quitarFiltro()
            : aplicarFiltro(i - 1);
    });
});

function aplicarFiltro(tipo,guardar=true){

    if(guardar){
        filtroActivo = tipo;
    }

    const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    const data = imgData.data;

    for(let i=0;i<data.length;i+=4){

        let r = data[i];
        let g = data[i+1];
        let b = data[i+2];

        const gris = (r+g+b)/3;

        if(tipo===0){

            data[i]=data[i+1]=data[i+2]=gris;
        }

        else if(tipo===1){

            data[i]=gris;
            data[i+1]=0;
            data[i+2]=0;
        }

        else if(tipo===2){

            data[i]=0;
            data[i+1]=gris;
            data[i+2]=0;
        }

        else if(tipo===3){

            data[i]=0;
            data[i+1]=0;
            data[i+2]=gris;
        }

        else if(tipo===4){

            data[i]     = (r * 0.393) + (g * 0.769) + (b * 0.189);
            data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
            data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
        }
    }

    ctx.putImageData(imgData,0,0);
}

/* guarda el canvas como imagen png */

function guardarImagen(){

    const url = canvas.toDataURL("image/png");

    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "dibujopro.png";

    enlace.click();
}

/* MENU MOVIL */

const menuToggle = document.getElementById("menuToggle");
const menuMovil = document.getElementById("menuMovil");

menuToggle.addEventListener("click", () => {
    menuMovil.classList.toggle("active");
});

/* herramientas menu movil */

document.querySelectorAll("#menuMovil button").forEach(btn => {

    btn.addEventListener("click", () => {

        const herramienta = btn.dataset.tool;

        if(!herramienta) return;

        cambiarOpcion(herramienta);

        if(herramienta === "sticker"){
            inputSticker.click();
        }

        menuMovil.classList.remove("active");
    });
});

/* SLIDERS MOBILE */

const grosorMovil = document.getElementById("grosorMobile");
const tamanoStickerMovil = document.getElementById("tamanoStickerMobile");

if(grosorMovil && tamanoStickerMovil){

    grosorMovil.value = config.grosor;
    tamanoStickerMovil.value = config.tamanoSticker;

    grosorMovil.addEventListener("input", e => {

        config.grosor = e.target.value;

        inputGrosor.value = e.target.value;
    });

    tamanoStickerMovil.addEventListener("input", e => {

        config.tamanoSticker = e.target.value;

        inputTamanoSticker.value = e.target.value;
    });
}

/* FILTROS MOBILE */

document.querySelectorAll(".filtros-abajo button").forEach((btn, i) => {

    btn.addEventListener("click", () => {

        if(i === 0){

            quitarFiltro();
        }

        else{

            aplicarFiltro(i - 1);
        }
    });
});

/* COLORES MOBILE */

const colorLineaMovil = document.getElementById("colorLineaMobile");
const colorRellenoMovil = document.getElementById("colorRellenoMobile");

if(colorLineaMovil && colorRellenoMovil){

    colorLineaMovil.value = config.colorLinea;
    colorRellenoMovil.value = config.colorRelleno;

    colorLineaMovil.addEventListener("input", e => {

        config.colorLinea = e.target.value;

        inputColorLinea.value = e.target.value;
    });

    colorRellenoMovil.addEventListener("input", e => {

        config.colorRelleno = e.target.value;

        inputColorRelleno.value = e.target.value;
    });
}