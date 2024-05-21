// Inicialización del objeto Swiper
var TrandingSlider = new Swiper('.tranding-slider', {
    // Efecto de transición de las diapositivas
    effect: 'coverflow',
    // Cambia el cursor al pasar sobre las diapositivas
    grabCursor: true,
    // Centra las diapositivas activas
    centeredSlides: true,
    // Habilita el bucle infinito del slider
    loop: true,
    // Muestra un número variable de diapositivas según el tamaño del contenedor
    slidesPerView: 'auto',
    // Configuración específica para el efecto de coverflow
    coverflowEffect: {
        // Ángulo de rotación de las diapositivas
        rotate: 0,
        // Estiramiento del efecto de coverflow
        stretch: 0,
        // Profundidad del efecto de coverflow
        depth: 100,
        // Modificador del efecto de coverflow
        modifier: 2.5,
    },
    // Configuración de la paginación del slider
    pagination: {
        // Elemento HTML donde se mostrará la paginación
        el: '.swiper-pagination',
        // Permite hacer clic en los botones de paginación para cambiar de diapositiva
        clickable: true,
    },
    // Configuración de la navegación del slider
    navigation: {
        // Elementos HTML para los botones de navegación siguiente y anterior
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
