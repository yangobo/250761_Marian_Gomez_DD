const imagen = document.querySelector('#ima');

let x = 0;
let y = 0;
const mo = 30;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        y -= mo;
    }
    if (e.key === 'ArrowDown') {
        y += mo;
    }
    if (e.key === 'ArrowLeft') {
        x -= mo;
    }
    if (e.key === 'ArrowRight') {
        x += mo;
    }

    imagen.style.left = x + "px";
    imagen.style.top = y + "px";
});

imagen.addEventListener('mouseover', () => {    
     imagen.style.transform = "scale(1.2)";
}); 

imagen.addEventListener("mouseout", () => {
    imagen.style.transform = "scale(1)";
});