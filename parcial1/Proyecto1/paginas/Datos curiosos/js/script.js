
document.addEventListener('DOMContentLoaded', function() {
    
  
    const cartas = document.querySelectorAll('.carta-curiosidad');
    
    // Función para animar con efecto cascada
    function animarCartas() {
        cartas.forEach((carta, index) => {
            setTimeout(() => {
                carta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                carta.style.opacity = '1';
                carta.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Ejecutar la animación
    animarCartas();
    
   
    const grid = document.querySelector('.grid-curiosidades');
    if (grid) {
        grid.addEventListener('click', () => {
            cartas.forEach(carta => {
                carta.style.opacity = '0';
                carta.style.transform = 'translateY(50px)';
            });
            setTimeout(animarCartas, 100);
        });
    }
});