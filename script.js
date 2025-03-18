// Интерактивный фон с частицами
const createParticles = () => {
    const bgParticles = document.getElementById('bg-particles');
    const particleCount = 80; // Количество частиц
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайное положение частиц
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Случайные размеры частиц
        const size = Math.random() * 3 + 1;
        
        // Установка стилей частиц
        particle.style.position = 'absolute';
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'var(--primary-color)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.boxShadow = '0 0 10px var(--primary-color)';
        particle.style.transition = 'transform 0.3s ease';
        
        // Сохранение данных частицы для анимации
        particle.setAttribute('data-x', posX);
        particle.setAttribute('data-y', posY);
        particle.setAttribute('data-speed', Math.random() * 2 + 1);
        
        // Добавление частицы в DOM
        bgParticles.appendChild(particle);
    }
};

// Обновление положения частиц при движении мыши
const updateParticlesOnMouseMove = (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    particles.forEach(particle => {
        const particleX = parseFloat(particle.getAttribute('data-x'));
        const particleY = parseFloat(particle.getAttribute('data-y'));
        const speed = parseFloat(particle.getAttribute('data-speed'));
        
        // Расчет расстояния от курсора до частицы
        const distX = mouseX - particleX;
        const distY = mouseY - particleY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Если частица находится вблизи курсора, отталкиваем её
        if (distance < 150) {
            const angle = Math.atan2(distY, distX);
            const repelX = -Math.cos(angle) * (150 - distance) * 0.05;
            const repelY = -Math.sin(angle) * (150 - distance) * 0.05;
            
            particle.style.transform = `translate(${repelX}px, ${repelY}px)`;
        } else {
            // Постепенно возвращаем частицы на исходное положение
            particle.style.transform = `translate(0, 0)`;
        }
    });
};

// Анимация частиц со временем
const animateParticlesOverTime = () => {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        // Добавляем небольшое случайное движение
        const randomX = (Math.random() - 0.5) * 10;
        const randomY = (Math.random() - 0.5) * 10;
        
        particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Изменяем яркость частиц
        const opacity = Math.random() * 0.5 + 0.1;
        particle.style.opacity = opacity;
    });
    
    setTimeout(animateParticlesOverTime, 3000);
};

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
    
    // Обновление частиц при движении мыши
    updateParticlesOnMouseMove(e);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.7)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Link and button hover animation
const expandCursor = () => {
    cursorFollower.style.width = '60px';
    cursorFollower.style.height = '60px';
    cursorFollower.style.background = 'rgba(0, 230, 118, 0.15)';
    cursorFollower.style.mixBlendMode = 'screen';
    cursorFollower.style.border = 'none';
};

const resetCursor = () => {
    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
    cursorFollower.style.background = 'transparent';
    cursorFollower.style.mixBlendMode = 'normal';
    cursorFollower.style.border = '2px solid var(--primary-color)';
};

links.forEach(link => {
    link.addEventListener('mouseenter', expandCursor);
    link.addEventListener('mouseleave', resetCursor);
});

buttons.forEach(button => {
    button.addEventListener('mouseenter', expandCursor);
    button.addEventListener('mouseleave', resetCursor);
});

// Glitch effect on hero title
const applyGlitchEffect = () => {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Создаем слои для эффекта глитча
    const createGlitchLayers = () => {
        // Удаляем существующие слои если они есть
        const existingLayers = heroTitle.querySelectorAll('.glitch-layer');
        existingLayers.forEach(layer => layer.remove());
        
        // Создаем два слоя глитча
        for (let i = 1; i <= 2; i++) {
            const layer = document.createElement('span');
            layer.className = `glitch-layer glitch-layer-${i}`;
            layer.innerHTML = heroTitle.innerHTML;
            layer.style.position = 'absolute';
            layer.style.top = '0';
            layer.style.left = '0';
            layer.style.width = '100%';
            layer.style.height = '100%';
            layer.style.clip = 'rect(0, 0, 0, 0)';
            layer.style.background = 'linear-gradient(to right, var(--text-color), var(--primary-color))';
            layer.style.webkitBackgroundClip = 'text';
            layer.style.webkitTextFillColor = 'transparent';
            layer.style.backgroundClip = 'text';
            layer.style.color = 'transparent';
            
            heroTitle.style.position = 'relative';
            heroTitle.appendChild(layer);
        }
    };
    
    // Анимация глитч-эффекта
    const animateGlitch = () => {
        const glitchLayer1 = heroTitle.querySelector('.glitch-layer-1');
        const glitchLayer2 = heroTitle.querySelector('.glitch-layer-2');
        
        if (!glitchLayer1 || !glitchLayer2) return;
        
        // Случайные значения для искажения
        const randomClip1 = `rect(${Math.random() * 100}px, ${Math.random() * 100 + 300}px, ${Math.random() * 100 + 100}px, ${Math.random() * 100}px)`;
        const randomClip2 = `rect(${Math.random() * 100}px, ${Math.random() * 100 + 300}px, ${Math.random() * 100 + 100}px, ${Math.random() * 100}px)`;
        
        const randomX1 = (Math.random() - 0.5) * 10;
        const randomY1 = (Math.random() - 0.5) * 10;
        const randomX2 = (Math.random() - 0.5) * 10;
        const randomY2 = (Math.random() - 0.5) * 10;
        
        glitchLayer1.style.clip = randomClip1;
        glitchLayer1.style.transform = `translate(${randomX1}px, ${randomY1}px)`;
        glitchLayer1.style.textShadow = `${randomX1}px ${randomY1}px 3px rgba(255, 0, 234, 0.7)`;
        
        glitchLayer2.style.clip = randomClip2;
        glitchLayer2.style.transform = `translate(${randomX2}px, ${randomY2}px)`;
        glitchLayer2.style.textShadow = `${randomX2}px ${randomY2}px 3px rgba(0, 230, 118, 0.7)`;
        
        // Запускаем случайные глитчи
        setTimeout(animateGlitch, Math.random() * 5000 + 2000);
    };
    
    createGlitchLayers();
    animateGlitch();
    
    // Повторяем эффект глитча по событию наведения
    heroTitle.addEventListener('mouseenter', () => {
        createGlitchLayers();
        
        // Интенсивная анимация при наведении
        const intensiveGlitch = () => {
            const glitchLayer1 = heroTitle.querySelector('.glitch-layer-1');
            const glitchLayer2 = heroTitle.querySelector('.glitch-layer-2');
            
            if (!glitchLayer1 || !glitchLayer2) return;
            
            const randomClip1 = `rect(${Math.random() * 100}px, ${Math.random() * 100 + 300}px, ${Math.random() * 100 + 100}px, ${Math.random() * 100}px)`;
            const randomClip2 = `rect(${Math.random() * 100}px, ${Math.random() * 100 + 300}px, ${Math.random() * 100 + 100}px, ${Math.random() * 100}px)`;
            
            const randomX1 = (Math.random() - 0.5) * 20;
            const randomY1 = (Math.random() - 0.5) * 20;
            const randomX2 = (Math.random() - 0.5) * 20;
            const randomY2 = (Math.random() - 0.5) * 20;
            
            glitchLayer1.style.clip = randomClip1;
            glitchLayer1.style.transform = `translate(${randomX1}px, ${randomY1}px)`;
            glitchLayer1.style.textShadow = `${randomX1}px ${randomY1}px 5px rgba(255, 0, 234, 0.7)`;
            
            glitchLayer2.style.clip = randomClip2;
            glitchLayer2.style.transform = `translate(${randomX2}px, ${randomY2}px)`;
            glitchLayer2.style.textShadow = `${randomX2}px ${randomY2}px 5px rgba(0, 230, 118, 0.7)`;
            
            if (heroTitle.matches(':hover')) {
                requestAnimationFrame(intensiveGlitch);
            }
        };
        
        intensiveGlitch();
    });
};

// Эффект 3D поворота для изображений проектов
const addTiltEffect = () => {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left; // Положение курсора по X внутри элемента
            const y = e.clientY - rect.top; // Положение курсора по Y внутри элемента
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Расчет угла поворота (максимум 15 градусов)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            // Применяем 3D трансформацию
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            // Эффект света
            const imageElement = item.querySelector('.work-image img');
            if (imageElement) {
                imageElement.style.filter = `
                    brightness(1.1) contrast(1.1) 
                    drop-shadow(${rotateY * 0.5}px ${rotateX * -0.5}px 15px rgba(0, 230, 118, 0.3))
                `;
            }
        });
        
        // Возвращаем исходное состояние при уходе курсора
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const imageElement = item.querySelector('.work-image img');
            if (imageElement) {
                imageElement.style.filter = 'grayscale(30%) contrast(120%)';
            }
        });
    });
};

// Анимация hero изображения
const animateHeroImage = () => {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    const glowEffect = document.createElement('div');
    glowEffect.className = 'hero-glow';
    glowEffect.style.position = 'absolute';
    glowEffect.style.top = '0';
    glowEffect.style.left = '0';
    glowEffect.style.width = '100%';
    glowEffect.style.height = '100%';
    glowEffect.style.borderRadius = '20px';
    glowEffect.style.boxShadow = '0 0 30px var(--primary-color)';
    glowEffect.style.opacity = '0';
    glowEffect.style.transition = 'opacity 1s ease';
    glowEffect.style.zIndex = '-1';
    
    heroImage.style.position = 'relative';
    heroImage.appendChild(glowEffect);
    
    // Пульсирующий эффект свечения
    const pulseGlow = () => {
        glowEffect.style.opacity = '0.5';
        setTimeout(() => {
            glowEffect.style.opacity = '0.1';
            setTimeout(pulseGlow, 2000);
        }, 2000);
    };
    
    pulseGlow();
    
    // 3D эффект при движении мыши
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const rotateY = (mouseX - 0.5) * 20; // -10 до 10 градусов
        const rotateX = (mouseY - 0.5) * -20; // 10 до -10 градусов
        
        heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
};

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        header.style.background = 'rgba(10, 10, 15, 0.98)';
        header.style.borderBottom = '1px solid var(--border-color)';
    } else {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(10, 10, 15, 0.9)';
        header.style.borderBottom = '1px solid transparent';
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.classList.add('animate');
        }
    });
};

// Add animation classes to elements
window.addEventListener('DOMContentLoaded', () => {
    // Инициализация частиц
    createParticles();
    setTimeout(animateParticlesOverTime, 3000);
    
    // Добавляем глитч-эффект для заголовка
    applyGlitchEffect();
    
    // Добавляем 3D эффект для проектов
    addTiltEffect();
    
    // Анимируем изображение героя
    animateHeroImage();
    
    // Анимации прокрутки
    // Hero section animations
    document.querySelector('.greeting').classList.add('fade-up');
    document.querySelector('.hero-title').classList.add('slide-left');
    document.querySelector('.hero-subtitle').classList.add('slide-left');
    document.querySelector('.hero-description').classList.add('fade-up');
    document.querySelector('.hero-content .btn').classList.add('fade-up');
    document.querySelector('.hero-image').classList.add('slide-right');
    
    // Clients section animations
    document.querySelectorAll('.client').forEach(client => {
        client.classList.add('fade-up');
    });
    
    // Works section animations
    document.querySelectorAll('.work-item').forEach(work => {
        work.classList.add('fade-up');
        // Сразу добавляем класс animate для немедленного отображения
        work.classList.add('animate');
    });
    
    // About section animations
    document.querySelector('.about-text').classList.add('slide-left');
    document.querySelector('.skills-achievements').classList.add('slide-right');
    
    // Contact section animations
    document.querySelector('.contact-info').classList.add('slide-left');
    document.querySelector('.telegram-cta').classList.add('slide-right');
    
    // Start animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});

window.addEventListener('scroll', animateOnScroll);

// Emoji hover animation
const emojis = document.querySelectorAll('.emoji');

emojis.forEach(emoji => {
    emoji.addEventListener('mouseenter', () => {
        emoji.style.transform = 'rotate(15deg) scale(1.2)';
    });
    
    emoji.addEventListener('mouseleave', () => {
        emoji.style.transform = 'rotate(0) scale(1)';
    });
});

// Scroll to sections
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
    });
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = anchor.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// GSAP animations
if (typeof gsap !== 'undefined') {
    // Hero image animation
    gsap.to("#profile-image", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Scroll trigger animations
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Section titles animation
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });
        
        // Skills animation
        gsap.from('.skill', {
            scrollTrigger: {
                trigger: '.skills-list',
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            scale: 0.8,
            stagger: 0.05,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
        
        // Client grid animation
        gsap.from('.client', {
            scrollTrigger: {
                trigger: '.clients-grid',
                start: "top 70%", 
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.5)"
        });
        
        // Works items animation
        gsap.from('.work-item', {
            scrollTrigger: {
                trigger: '.works-grid',
                start: "top 70%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.5)"
        });
    }
} 