
const cartas = document.querySelectorAll('.carta-curiosidad');
const grid = document.querySelector('.grid-curiosidades');


function animarCartas() {
   
    setTimeout(function() {
        cartas[0].style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        cartas[0].style.opacity = '1';
        cartas[0].style.transform = 'translateY(0)';
    }, 0);
    
   
    setTimeout(function() {
        cartas[1].style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        cartas[1].style.opacity = '1';
        cartas[1].style.transform = 'translateY(0)';
    }, 200);
    
  
    if (cartas[2]) {
        setTimeout(function() {
            cartas[2].style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            cartas[2].style.opacity = '1';
            cartas[2].style.transform = 'translateY(0)';
        }, 400);
    }
}


animarCartas();

if (grid) {
    grid.onclick = function() {
        
        cartas[0].style.opacity = '0';
        cartas[0].style.transform = 'translateY(50px)';
        
        cartas[1].style.opacity = '0';
        cartas[1].style.transform = 'translateY(50px)';
        
        if (cartas[2]) {
            cartas[2].style.opacity = '0';
            cartas[2].style.transform = 'translateY(50px)';
        }
        
        
        setTimeout(animarCartas, 100);
    };
}