// Seleccionar todas las cards
const cards = document.querySelectorAll('.card');

// Recorrer cada card
cards.forEach(card => {
    // Guardar la imagen y la info
    const img = card.querySelector('img');
    const info = card.querySelector('.info');
    
    // Mouse entra con REBOTE
    card.addEventListener('mouseenter', () => {
        // Animación de la card completa con rebote
        card.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        card.style.transform = 'scale(1.1) translateY(-20px)';
        
        card.style.zIndex = '10';
        
        // Animación de la imagen
        img.style.transition = 'transform 0.5s ease';
        img.style.transform = 'scale(1.15)';
        
        // Mostrar info
        info.style.transition = 'opacity 0.4s ease';
        info.style.opacity = '1';
    });

    // Mouse sale con REBOTE
    card.addEventListener('mouseleave', () => {
        // Vuelve con rebote
        card.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        card.style.transform = 'scale(1) translateY(0)';
        card.style.boxShadow = 'none';
        card.style.zIndex = '1';
        
        // Vuelve la imagen
        img.style.transition = 'transform 0.5s ease';
        img.style.transform = 'scale(1)';
        
        // Ocultar info
        info.style.transition = 'opacity 0.3s ease';
        info.style.opacity = '0';
    });
});