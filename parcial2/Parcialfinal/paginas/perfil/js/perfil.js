const contenedor = document.querySelector("#formPerfil");
const volver = document.querySelector("#volver");

let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
    window.location.href = "../../index.html";
}

function redirigirSegunRol() {
    if (usuario.admin) {
        window.location.href = "../Subir/subir.html";
    } else {
        window.location.href = "../Inicio/inicio.html";
    }
}

function mostrarPerfil() {

    contenedor.innerHTML = "";

    const nombre = document.createElement("input");
    nombre.placeholder = "Nombre";
    nombre.value = usuario.nombre;

    const apellido = document.createElement("input");
    apellido.placeholder = "Apellido";
    apellido.value = usuario.apellido;

    const correo = document.createElement("input");
    correo.placeholder = "Correo";
    correo.value = usuario.correo;

    const contraseña = document.createElement("input");
    contraseña.placeholder = "Nueva contraseña";
    contraseña.type = "password";

    // FOTO
    const preview = document.createElement("img");
    preview.src = usuario.foto || "recursos/defaultPfp.png";
    preview.style.width = "80px";
    preview.style.height = "80px";
    preview.style.borderRadius = "50%";
    preview.style.objectFit = "cover";

    const inputFoto = document.createElement("input");
    inputFoto.type = "file";
    inputFoto.accept = "image/*";

    inputFoto.addEventListener("change", function () {
        const archivo = this.files[0];

        if (archivo) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
            };

            reader.readAsDataURL(archivo);
        }
    });

    const guardar = document.createElement("button");
    guardar.textContent = "Guardar cambios";

    contenedor.appendChild(nombre);
    contenedor.appendChild(apellido);
    contenedor.appendChild(correo);
    contenedor.appendChild(contraseña);
    contenedor.appendChild(preview);
    contenedor.appendChild(inputFoto);
    contenedor.appendChild(guardar);

    
    guardar.addEventListener("click", () => {

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));

        let index = usuarios.findIndex(u => u.correo === usuario.correo);

        if (index === -1) {
            alert("Error: usuario no encontrado");
            return;
        }

        usuarios[index].nombre = nombre.value;
        usuarios[index].apellido = apellido.value;
        usuarios[index].correo = correo.value;

        if (contraseña.value !== "") {
            usuarios[index].contraseña = contraseña.value;
        }

        usuarios[index].foto = preview.src;

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

       
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[index]));

        
        usuario = usuarios[index];

        alert("Perfil actualizado");

        redirigirSegunRol(); 
    });
}

volver.addEventListener("click", () => {
    redirigirSegunRol(); 
});

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "../../index.html";
}

mostrarPerfil();