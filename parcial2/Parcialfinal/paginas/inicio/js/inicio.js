const contenedor = document.querySelector("#contenedorPersonajes");
const cerrar = document.querySelector("#cerrar");
const nombreUsuario = document.querySelector("#nombreUsuario");
const fotoNav = document.querySelector("#fotoNav");
const perfilBtn = document.querySelector("#perfilBtn");

const adminBtn = document.querySelector("#adminBtn");


// SESIÓN
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
    window.location.href = "../../index.html";
}

nombreUsuario.textContent = usuario.nombre;
fotoNav.src = usuario.foto || "../../recursos/defaultPfp.png";

if (usuario.admin) {
    adminBtn.style.display = "block";
}

// PERFIL
perfilBtn.addEventListener("click", () => {
    window.location.href = "../Perfil/perfil.html";
});

adminBtn.addEventListener("click", () => {
    window.location.href = "../Subir/subir.html";
});


cerrar.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "../../index.html";
});

// PERSONAJES
let personajes = JSON.parse(localStorage.getItem("personajes"));

if (!personajes || personajes.length === 0) {
    contenedor.innerHTML = "<p>No hay personajes cargados</p>";
} else {
    mostrarPersonajes(personajes);
}

// MOSTRAR PERSONAJES
function mostrarPersonajes(lista) {

    contenedor.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";

        
        const img = document.createElement("img");
        img.src = lista[i].imagen;

        const nombre = document.createElement("h3");
        nombre.textContent = lista[i].nombre;

        const juego = document.createElement("p");
        juego.textContent = lista[i].juego;

        const descripcion = document.createElement("p");
        descripcion.textContent = lista[i].descripcion;

        
        tarjeta.appendChild(img);
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(juego);
        tarjeta.appendChild(descripcion);

        contenedor.appendChild(tarjeta);
    }
}