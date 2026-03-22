const formulario = document.querySelector("#form_login");
const fotoPerfil = document.getElementById("fotoPerfil");

// usuario activo
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (usuarioActivo && usuarioActivo.foto) {
    fotoPerfil.src = usuarioActivo.foto;
} else {
    fotoPerfil.src = "recursos/defaulfotoP.png";
}

// arreglo de usuarios
const Usuarios = [];

const datosGuardados = localStorage.getItem("usuarios");

if (datosGuardados) {
    const usuariosGuardados = JSON.parse(datosGuardados);

    for (let i = 0; i < usuariosGuardados.length; i++) {
        Usuarios.push(usuariosGuardados[i]);
    }
}

class Usuario {
    constructor(nombre, apellido, correo, contraseña, admin, foto) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña;
        this.admin = admin;
        this.foto = foto;
    }
}

// Admin por default
const adminExiste = Usuarios.some(u => u.correo === "amancio@gmail.com");

if (!adminExiste) {
    const adminDefault = new Usuario(
        "amancio",
        "Principal",
        "amancio@gmail.com",
        "1234",
        true,
        "recursos/defaulfotoP.png"
    );

    Usuarios.push(adminDefault);
    localStorage.setItem("usuarios", JSON.stringify(Usuarios));
}

// LOGIN
function mostrarLogin() {

    formulario.innerHTML = "";

    const correo = document.createElement("input");
    correo.placeholder = "Correo";

    const contraseña = document.createElement("input");
    contraseña.placeholder = "Contraseña";
    contraseña.type = "password";

    const boton = document.createElement("button");
    boton.textContent = "Iniciar sesión";

    const registro = document.createElement("p");
    registro.textContent = "¿No tienes cuenta?";

    formulario.appendChild(correo);
    formulario.appendChild(contraseña);
    formulario.appendChild(boton);
    formulario.appendChild(registro);

    const admin = Usuarios.find(u => u.correo === "amancio@gmail.com");

    if (admin) {
        const sugerido = document.createElement("p");
        sugerido.textContent = `Admin sugerido: ${admin.correo} / ${admin.contraseña}`;
        sugerido.style.fontSize = "12px";
        sugerido.style.opacity = "0.7";
        sugerido.style.cursor = "pointer";

        sugerido.addEventListener("click", () => {
            correo.value = admin.correo;
            contraseña.value = admin.contraseña;
        });

        formulario.appendChild(sugerido);
    }

    boton.addEventListener("click", () => {

        let encontrado = false;

        for (let i = 0; i < Usuarios.length; i++) {

            if (
                Usuarios[i].correo === correo.value &&
                Usuarios[i].contraseña === contraseña.value
            ) {

                encontrado = true;

                localStorage.setItem("usuarioActivo", JSON.stringify(Usuarios[i]));

                fotoPerfil.src = Usuarios[i].foto;

               
                if (Usuarios[i].admin === true) {
                    window.location.href = "paginas/Subir/subir.html";
                } else {
                    window.location.href = "paginas/Inicio/inicio.html";
                }

                break;
            }
        }

        if (!encontrado) {
            alert("Usuario no encontrado");
        }

    });

    registro.addEventListener("click", mostrarRegistro);
}

// REGISTRO
function mostrarRegistro() {

    formulario.innerHTML = "";

    const nombre = document.createElement("input");
    nombre.placeholder = "Nombre";

    const apellido = document.createElement("input");
    apellido.placeholder = "Apellido";

    const correo = document.createElement("input");
    correo.placeholder = "Correo";

    const contraseña = document.createElement("input");
    contraseña.placeholder = "Contraseña";
    contraseña.type = "password";

    const confirmar = document.createElement("input");
    confirmar.placeholder = "Confirmar contraseña";
    confirmar.type = "password";

    // FOTO
    const preview = document.createElement("img");
    preview.src = "recursos/defaulfotoP.png";
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

    // CHECKBOX 
    const adminLabel = document.createElement("label");

    const adminInput = document.createElement("input");
    adminInput.type = "checkbox";

    const textoAdmin = document.createElement("span");
    textoAdmin.textContent = " Administrador";
    textoAdmin.classList.add("adminTexto");

    adminLabel.appendChild(adminInput);
    adminLabel.appendChild(textoAdmin);

    const boton = document.createElement("button");
    boton.textContent = "Registrarse";

    const volver = document.createElement("p");
    volver.textContent = "Volver";

    formulario.appendChild(nombre);
    formulario.appendChild(apellido);
    formulario.appendChild(correo);
    formulario.appendChild(contraseña);
    formulario.appendChild(confirmar);
    formulario.appendChild(preview);
    formulario.appendChild(inputFoto);
    formulario.appendChild(adminLabel);
    formulario.appendChild(boton);
    formulario.appendChild(volver);

    boton.addEventListener("click", () => {

        if (contraseña.value !== confirmar.value) {
            alert("Las contraseñas no coinciden");
            return;
        }

        for (let i = 0; i < Usuarios.length; i++) {
            if (Usuarios[i].correo === correo.value) {
                alert("Correo ya registrado");
                return;
            }
        }

        let fotoFinal = preview.src;

        const usuario = new Usuario(
            nombre.value,
            apellido.value,
            correo.value,
            contraseña.value,
            Boolean(adminInput.checked), 
            fotoFinal
        );

        Usuarios.push(usuario);

        localStorage.setItem("usuarios", JSON.stringify(Usuarios));

        alert("Usuario guardado");

        mostrarLogin();
    });

    volver.addEventListener("click", mostrarLogin);
}

mostrarLogin();