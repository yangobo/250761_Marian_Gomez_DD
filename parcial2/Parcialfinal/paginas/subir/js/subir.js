const contenedor = document.querySelector("#formSubir");
const lista = document.querySelector("#listaPersonajes");


const nombreUsuario = document.querySelector("#nombreUsuario");
const fotoNav = document.querySelector("#fotoNav");
const perfilBtn = document.querySelector("#perfilBtn");


let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
    window.location.href = "../../index.html";
}

if (!usuario.admin) {
    window.location.href = "../Inicio/inicio.html";
}


nombreUsuario.textContent = usuario.nombre;
fotoNav.src = usuario.foto;

perfilBtn.addEventListener("click", () => {
    window.location.href = "../Perfil/perfil.html";
});

function irInicio() {
    window.location.href = "../Inicio/inicio.html";
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "../../index.html";
}


let personajes = JSON.parse(localStorage.getItem("personajes"));

if (personajes && personajes.length > 0) {
    mostrarPersonajes(personajes);
}





function mostrarFormulario() {

    contenedor.innerHTML = "";

    const texto = document.createElement("p");
    texto.textContent = "Selecciona un archivo JSON";

    const inputJSON = document.createElement("input");
    inputJSON.type = "file";
    inputJSON.accept = ".json";

   
    inputJSON.style.background = "black";
    inputJSON.style.color = "white";
    inputJSON.style.padding = "20px";

    inputJSON.addEventListener("change", function () {

        const archivo = this.files[0];

        if (archivo) {
            const reader = new FileReader();

            reader.onload = function (e) {

                try {
                    const data = JSON.parse(e.target.result);

                    localStorage.setItem("personajes", JSON.stringify(data));

                    personajes = data;

                    mostrarPersonajes(personajes);

                    alert("JSON cargado correctamente");

                } catch (error) {
                    alert("Archivo JSON inválido");
                }
            };

            reader.readAsText(archivo);
        }
    });

    contenedor.appendChild(texto);
    contenedor.appendChild(inputJSON);
}





function mostrarPersonajes(listaDatos) {

    lista.innerHTML = "";

    for (let i = 0; i < listaDatos.length; i++) {

        const div = document.createElement("div");
        div.className = "tarjeta";

        const img = document.createElement("img");
        img.src = listaDatos[i].imagen;

        const nombre = document.createElement("h3");
        nombre.textContent = listaDatos[i].nombre;

        const juego = document.createElement("p");
        juego.textContent = listaDatos[i].juego;

        const descripcion = document.createElement("p");
        descripcion.textContent = listaDatos[i].descripcion;

        div.appendChild(img);
        div.appendChild(nombre);
        div.appendChild(juego);
        div.appendChild(descripcion);

        lista.appendChild(div);
    }
}


mostrarFormulario();