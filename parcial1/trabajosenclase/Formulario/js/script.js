const nombre =document.querySelector("#input_txt_nombre");

nombre.addEventListener("change", (e)=> {
    console.log(e.target.value);
    const usuario = new Usuario (e.target.value);
    console.log(usuario);
})

class Usuario {
    constructor(nom) {
        this.nombre=nom;
    }
}
