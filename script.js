// ===================================
// NAVEGACIÓN Y SCROLL SUAVE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu móvil
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Scroll suave mejorado con animación personalizada
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 400; // Duración en milisegundos (más largo = más suave)
                let start = null;
                
                // Función de easing para un movimiento más natural
                function easeInOutCubic(t) {
                    return t < 0.5
                        ? 4 * t * t * t
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + (distance * ease));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            }
        });
    });

    // Header con fondo al hacer scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Detectar si el botón de WhatsApp está sobre el footer
        const whatsappBtn = document.querySelector('.whatsapp-float');
        const footer = document.querySelector('.footer');
        
        if (whatsappBtn && footer) {
            const whatsappRect = whatsappBtn.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();
            
            // Si el botón de WhatsApp está sobre el footer
            if (whatsappRect.bottom > footerRect.top) {
                whatsappBtn.classList.add('on-footer');
            } else {
                whatsappBtn.classList.remove('on-footer');
            }
        }
        
        lastScroll = currentScroll;
    });

    // Marcar el enlace activo según la sección visible
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Llamar al cargar la página
});

// ===================================
// ANIMACIONES AL HACER SCROLL
// (Intersection Observer)
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Opcional: dejar de observar una vez animado
            // observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observar todos los elementos con la clase 'animate-on-scroll'
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// ===================================
// ANIMACIÓN DE ENTRADA ESCALONADA
// (Para elementos en grid)
// ===================================

const staggerObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const staggerObserverCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.animate-on-scroll');
            
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animated');
                }, index * 100); // Retraso de 100ms entre cada elemento
            });
            
            staggerObserver.unobserve(entry.target);
        }
    });
};

const staggerObserver = new IntersectionObserver(staggerObserverCallback, staggerObserverOptions);

// Aplicar animación escalonada a las grids
document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.servicios-grid, .galeria-grid, .resenas-grid, .contacto-grid');
    
    grids.forEach(grid => {
        staggerObserver.observe(grid);
    });
});

// ===================================
// BOTÓN FLOTANTE DE WHATSAPP
// ===================================

// El botón de WhatsApp está visible desde el inicio
// No requiere JavaScript adicional

// ===================================
// EFECTO PARALLAX SUAVE EN HERO
// (Opcional - descoméntalosiguiente para activar)
// ===================================

/*
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            
            if (heroContent && scrollPosition < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / window.innerHeight);
            }
        });
    }
});
*/

// ===================================
// LAZY LOADING PARA IMÁGENES
// (Útil cuando agregues imágenes reales)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el navegador soporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Si la imagen tiene data-src, cargarla
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observar todas las imágenes con data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});


// ===================================
// MEJORAR ACCESIBILIDAD DEL TECLADO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Permitir cerrar el menú móvil con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navList = document.getElementById('nav-list');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// ===================================
// ANIMACIÓN SUAVE PARA CONTADOR
// (Útil si quieres añadir estadísticas)
// ===================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const counter = setInterval(() => {
        start += increment;
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Ejemplo de uso (descomentar y añadir elementos con clase 'counter'):
/*
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
});
*/

// ===================================
// PERFORMANCE: Debounce para eventos
// ===================================

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Uso optimizado del scroll (ya implementado arriba, pero aquí está la función)
// Puedes usar debounce(tuFuncion, 100) para optimizar eventos que se disparan frecuentemente

// ===================================
// DETECTAR MODO REDUCIDO DE MOVIMIENTO
// ===================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Deshabilitar animaciones para usuarios con preferencia de movimiento reducido
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        element.classList.add('animated'); // Mostrar inmediatamente
    });
}

// ===================================
// CARRUSEL DE FOTOS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        // Remover clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Añadir clase active al slide e indicador actual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startCarousel() {
        // Cambiar cada 7 segundos (7000ms) - transición más lenta
        carouselInterval = setInterval(nextSlide, 7000);
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Click en indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopCarousel();
            startCarousel(); // Reiniciar el auto-play
        });
    });

    // Pausar cuando el mouse está sobre el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }

    // Iniciar el carrusel
    startCarousel();

    // Funcionalidad de Drag/Swipe para carrusel de fotos
    let startXFotos = 0;
    let isDraggingFotos = false;
    let hasMovedFotos = false;

    if (carouselContainer) {
        // Mouse events
        carouselContainer.addEventListener('mousedown', (e) => {
            startXFotos = e.clientX;
            isDraggingFotos = true;
            hasMovedFotos = false;
        });

        carouselContainer.addEventListener('mousemove', (e) => {
            if (isDraggingFotos) {
                hasMovedFotos = true;
            }
        });

        carouselContainer.addEventListener('mouseup', (e) => {
            if (isDraggingFotos && hasMovedFotos) {
                const endX = e.clientX;
                const diff = startXFotos - endX;
                
                // Si el movimiento es mayor a 50px, cambia de slide
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        // Swipe left -> siguiente
                        nextSlide();
                    } else {
                        // Swipe right -> anterior
                        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                        showSlide(currentSlide);
                    }
                    // Reiniciar el auto-play
                    stopCarousel();
                    startCarousel();
                }
            }
            isDraggingFotos = false;
            hasMovedFotos = false;
        });

        carouselContainer.addEventListener('mouseleave', () => {
            isDraggingFotos = false;
            hasMovedFotos = false;
        });

        // Touch events para móviles
        carouselContainer.addEventListener('touchstart', (e) => {
            startXFotos = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startXFotos - endX;
            
            // Si el movimiento es mayor a 50px, cambia de slide
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left -> siguiente
                    nextSlide();
                } else {
                    // Swipe right -> anterior
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                }
                // Reiniciar el auto-play
                stopCarousel();
                startCarousel();
            }
        });
    }
});

// ===================================
// CARRUSEL DE RESEÑAS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const resenasSlides = document.querySelectorAll('.resena-slide');
    const prevBtn = document.getElementById('resenas-prev');
    const nextBtn = document.getElementById('resenas-next');
    const carouselWrapper = document.querySelector('.resenas-carousel-wrapper');
    let currentResena = 0;
    
    // Variables para el drag/swipe
    let startX = 0;
    let isDragging = false;
    let hasMoved = false;

    function showResena(index) {
        // Remover clase active de todas
        resenasSlides.forEach(slide => slide.classList.remove('active'));
        
        // Añadir clase active a la reseña actual
        resenasSlides[index].classList.add('active');
    }

    function nextResena() {
        // Avanzar a la siguiente, o volver a la primera si estamos en la última
        currentResena = (currentResena + 1) % resenasSlides.length;
        showResena(currentResena);
    }

    function prevResena() {
        // Retroceder a la anterior, o ir a la última si estamos en la primera
        currentResena = (currentResena - 1 + resenasSlides.length) % resenasSlides.length;
        showResena(currentResena);
    }

    // Event listeners para los botones
    if (nextBtn) {
        nextBtn.addEventListener('click', nextResena);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevResena);
    }

    // Funcionalidad "Leer más" para móvil
    function setupLeerMas() {
        const isMobile = window.innerWidth <= 480;
        
        resenasSlides.forEach(slide => {
            const textElement = slide.querySelector('.resena-text');
            if (!textElement) return;
            
            // Remover botón existente si hay
            const existingBtn = slide.querySelector('.leer-mas-btn');
            if (existingBtn) {
                existingBtn.remove();
            }
            
            // Resetear clases
            textElement.classList.remove('truncated', 'expanded');
            
            if (isMobile) {
                // Verificar si el contenido es más alto que el límite
                const tempDiv = document.createElement('div');
                tempDiv.style.cssText = 'position: absolute; visibility: hidden; width: ' + textElement.offsetWidth + 'px;';
                tempDiv.innerHTML = textElement.innerHTML;
                document.body.appendChild(tempDiv);
                const fullHeight = tempDiv.offsetHeight;
                document.body.removeChild(tempDiv);
                
                if (fullHeight > 170) {
                    textElement.classList.add('truncated');
                    
                    // Crear botón "Leer más"
                    const btnLeerMas = document.createElement('button');
                    btnLeerMas.className = 'leer-mas-btn';
                    btnLeerMas.textContent = 'Leer más';
                    btnLeerMas.setAttribute('aria-expanded', 'false');
                    
                    btnLeerMas.addEventListener('click', function() {
                        if (textElement.classList.contains('truncated')) {
                            textElement.classList.remove('truncated');
                            textElement.classList.add('expanded');
                            this.textContent = 'Leer menos';
                            this.setAttribute('aria-expanded', 'true');
                        } else {
                            textElement.classList.add('truncated');
                            textElement.classList.remove('expanded');
                            this.textContent = 'Leer más';
                            this.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    textElement.parentNode.insertBefore(btnLeerMas, textElement.nextSibling);
                }
            }
        });
    }
    
    // Ejecutar al cargar
    setupLeerMas();
    
    // Reejecutar en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupLeerMas, 250);
    });

    // Funcionalidad de Drag/Swipe
    if (carouselWrapper) {
        // Mouse events
        carouselWrapper.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            hasMoved = false;
        });

        carouselWrapper.addEventListener('mousemove', (e) => {
            if (isDragging) {
                hasMoved = true;
            }
        });

        carouselWrapper.addEventListener('mouseup', (e) => {
            if (isDragging && hasMoved) {
                const endX = e.clientX;
                const diff = startX - endX;
                
                // Si el movimiento es mayor a 50px, cambia de slide
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        // Swipe left -> siguiente
                        nextResena();
                    } else {
                        // Swipe right -> anterior
                        prevResena();
                    }
                }
            }
            isDragging = false;
            hasMoved = false;
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            isDragging = false;
            hasMoved = false;
        });

        // Touch events para móviles
        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carouselWrapper.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            // Si el movimiento es mayor a 50px, cambia de slide
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left -> siguiente
                    nextResena();
                } else {
                    // Swipe right -> anterior
                    prevResena();
                }
            }
        });
    }
});

// ===================================
// CONSOLE LOG DE BIENVENIDA
// ===================================

console.log('%c🌟 Equilibrio Consciente', 'font-size: 20px; color: #F2C94C; font-weight: bold;');
console.log('%cUn espacio para volver a habitarse', 'font-size: 14px; color: #6F7C6B; font-style: italic;');
console.log('%c---', 'color: #E8E2D4;');
console.log('%cSitio web desarrollado con ❤️', 'color: #2E302E;');

