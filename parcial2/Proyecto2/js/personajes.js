const contenedor = document.querySelector("#contenedorPersonajes");
const cerrar = document.querySelector("#cerrar");


const logeado = localStorage.getItem("logeado");

if (logeado !== "true") {
    window.location.href = "index.html";
}

if (cerrar) {

    cerrar.addEventListener("click", () => {

        localStorage.removeItem("logeado");
        localStorage.removeItem("usuarioActivo");

        window.location.href = "index.html";

    });

}

function obtenerPersonajes() {

    const url = "https://akabab.github.io/starwars-api/api/all.json";

    fetch(url)
        .then(res => res.json())
        .then(datos => {

            for (let i = 0; i < 20; i++) {
                crearTarjeta(datos[i]);
            }

        })
        .catch(error => {
            console.error("Error:", error);
        });

}

function crearTarjeta(personaje) {

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    const imagen = document.createElement("img");
    imagen.src = personaje.image;

    const nombre = document.createElement("h3");
    nombre.textContent = personaje.name;

    const descripcion = document.createElement("p");
    descripcion.textContent = "Altura: " + personaje.height;

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(descripcion);

    contenedor.appendChild(tarjeta);

}

obtenerPersonajes();