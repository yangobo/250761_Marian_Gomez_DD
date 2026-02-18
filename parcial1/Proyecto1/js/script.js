const cartas = document.querySelectorAll('.carta');

cartas.forEach(carta => {
    const img = carta.querySelector('img');
    const info = carta.querySelector('.info');
    
    // Mouse 
    carta.addEventListener('mouseenter', () => {
        // Animación de la carta
        carta.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        carta.style.transform = 'scale(1.1) translateY(-20px)';
        
        carta.style.zIndex = '10';
        
        // Animación de la imagen
        if (img) {
            img.style.transition = 'transform 0.5s ease';
            img.style.transform = 'scale(1.15)';
        }
        
        // Mostrar info
        if (info) {
            info.style.transition = 'opacity 0.4s ease';
            info.style.opacity = '1';
        }
    });

    // Mouse SALE
    carta.addEventListener('mouseleave', () => {
        
        carta.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        carta.style.transform = 'scale(1) translateY(0)';
        carta.style.boxShadow = 'none';
        carta.style.zIndex = '1';
        
        // Volver la imagen
        if (img) {
            img.style.transition = 'transform 0.5s ease';
            img.style.transform = 'scale(1)';
        }
        
     
        if (info) {
            info.style.transition = 'opacity 0.3s ease';
            info.style.opacity = '0';
        }
    });
});