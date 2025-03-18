// Добавляем игровой интерфейс
const addGameInterface = () => {
    // Добавляем информационную панель проекта
    const projectInfoStats = document.createElement('div');
    projectInfoStats.className = 'project-info-stats';
    
    // Получаем название проекта
    const projectTitle = document.querySelector('.project-title').textContent;
    
    // Случайные значения для характеристик проекта
    const stats = [
        { name: 'Сложность', value: Math.floor(Math.random() * 30) + 70 },
        { name: 'Интерес', value: Math.floor(Math.random() * 15) + 85 },
        { name: 'Дизайн', value: Math.floor(Math.random() * 10) + 90 },
        { name: 'Креативность', value: Math.floor(Math.random() * 20) + 80 }
    ];
    
    // Добавляем информацию о проекте
    projectInfoStats.innerHTML = `
        <div>${projectTitle}</div>
        ${stats.map(stat => `
            <div>
                <div class="stat-label">${stat.name}</div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${stat.value}%"></div>
                </div>
            </div>
        `).join('')}
    `;
    
    document.body.appendChild(projectInfoStats);
    
    // Добавляем эффект сканирования
    const scanEffect = document.createElement('div');
    scanEffect.className = 'scan-effect';
    document.body.appendChild(scanEffect);
};

// Глитч-эффект для заголовков
const addGlitchEffect = () => {
    const titles = document.querySelectorAll('.project-title, .section-text h2, .centered-title');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.setAttribute('data-text', text);
        title.classList.add('glitch-text');
        
        title.addEventListener('mouseenter', () => {
            title.style.textShadow = '2px 2px 0 var(--primary-color), -2px -2px 0 var(--glitch-color-1)';
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.textShadow = '';
        });
    });
};

// 3D эффект для изображений при наведении
const add3DEffect = () => {
    const images = document.querySelectorAll('.project-hero-image, .section-image, .ui-item, .mascot-item, .application-item');
    
    images.forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Расчет угла поворота (максимум 10 градусов)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            // Применяем 3D трансформацию
            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            // Эффект света
            const imageElement = image.querySelector('img');
            if (imageElement) {
                imageElement.style.filter = `
                    brightness(1.1) contrast(1.1) 
                    drop-shadow(${rotateY * 0.5}px ${rotateX * -0.5}px 15px rgba(0, 230, 118, 0.3))
                `;
            }
        });
        
        // Возвращаем исходное состояние при уходе курсора
        image.addEventListener('mouseleave', () => {
            if (image.classList.contains('project-hero-image')) {
                image.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg)';
            } else {
                image.style.transform = '';
            }
            
            const imageElement = image.querySelector('img');
            if (imageElement) {
                imageElement.style.filter = 'grayscale(30%) contrast(120%)';
            }
        });
    });
};

// Добавление подсветки при наведении
const addHoverEffects = () => {
    const interactiveElements = document.querySelectorAll('.process-step, .research-method, .result-item, .finding-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px var(--shadow-color)';
            element.style.borderColor = 'var(--primary-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            element.style.borderColor = 'var(--border-color)';
        });
    });
};

// Project page animations
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем игровые элементы интерфейса
    addGameInterface();
    addGlitchEffect();
    add3DEffect();
    addHoverEffects();
    
    // Add animation classes
    document.querySelector('.project-title').classList.add('fade-up-project');
    document.querySelector('.project-subtitle').classList.add('fade-up-project');
    document.querySelector('.project-meta').classList.add('fade-up-project');
    document.querySelector('.project-hero-image').classList.add('fade-up-project');
    
    // Section animations
    const sectionTexts = document.querySelectorAll('.section-text');
    sectionTexts.forEach(text => {
        text.classList.add('slide-left-project');
    });
    
    const sectionImages = document.querySelectorAll('.section-image');
    sectionImages.forEach(image => {
        image.classList.add('slide-right-project');
    });
    
    document.querySelectorAll('.section-content.reversed .section-text').forEach(text => {
        text.classList.remove('slide-left-project');
        text.classList.add('slide-right-project');
    });
    
    document.querySelectorAll('.section-content.reversed .section-image').forEach(image => {
        image.classList.remove('slide-right-project');
        image.classList.add('slide-left-project');
    });
    
    // Process steps animation
    document.querySelectorAll('.process-step').forEach(step => {
        step.classList.add('fade-up-project');
    });
    
    // UI items animation
    document.querySelectorAll('.ui-item').forEach(item => {
        item.classList.add('scale-up-project');
    });
    
    // Results animation
    document.querySelectorAll('.result-item').forEach(item => {
        item.classList.add('fade-up-project');
    });
    
    // Next project animation
    document.querySelector('.next-project-link').classList.add('fade-up-project');
    
    // Start animations
    setTimeout(() => {
        animateProjectElements();
    }, 100);
    
    // Анимация частиц с фоном
    createProjectParticles();
});

// Создание фоновых частиц
const createProjectParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'project-particles';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';
    
    document.body.appendChild(particlesContainer);
    
    // Создаем 30 частиц
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        
        // Случайное положение и размер
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Стилизуем частицы
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'var(--primary-color)';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px var(--primary-color)';
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.transition = 'transform 0.3s ease';
        
        // Добавляем частицу
        particlesContainer.appendChild(particle);
        
        // Анимируем частицу
        animateParticle(particle);
    }
};

// Анимация частиц
const animateParticle = (particle) => {
    // Начальное положение
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    
    // Скорость и направление
    const speedX = (Math.random() - 0.5) * 0.5;
    const speedY = (Math.random() - 0.5) * 0.5;
    
    let x = startX;
    let y = startY;
    
    // Функция анимации
    const animate = () => {
        // Обновляем положение
        x += speedX;
        y += speedY;
        
        // Проверяем границы
        if (x < 0 || x > window.innerWidth) x = startX;
        if (y < 0 || y > window.innerHeight) y = startY;
        
        // Применяем новое положение
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Продолжаем анимацию
        requestAnimationFrame(animate);
    };
    
    animate();
};

// Animate elements on scroll
const animateProjectElements = () => {
    const elements = document.querySelectorAll('.fade-up-project, .slide-left-project, .slide-right-project, .scale-up-project');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.classList.add('animate-project');
        }
    });
};

window.addEventListener('scroll', animateProjectElements);

// Добавление эффекта параллакса при скролле
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.project-section');
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Если секция видима на экране
        if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
            const image = section.querySelector('.section-image');
            if (image) {
                const yOffset = (scrollPosition - sectionTop) * 0.1;
                image.style.transform = `translateY(${yOffset}px)`;
            }
        }
    });
});

// GSAP animations if available
if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate section titles
        gsap.utils.toArray('.section-text h2, .centered-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out"
            });
        });
        
        // Process steps staggered animation
        gsap.from('.process-step', {
            scrollTrigger: {
                trigger: '.process-steps',
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
        
        // UI items staggered animation
        gsap.from('.ui-item', {
            scrollTrigger: {
                trigger: '.ui-showcase',
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            scale: 0.8,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
        
        // Results items staggered animation
        gsap.from('.result-item', {
            scrollTrigger: {
                trigger: '.results-grid',
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
        
        // Research methods animation
        gsap.from('.research-method', {
            scrollTrigger: {
                trigger: '.research-methods',
                start: "top 70%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
        
        // Findings animation
        gsap.from('.finding-item', {
            scrollTrigger: {
                trigger: '.findings-grid',
                start: "top 70%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            scale: 0.8,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    }
}

// Кастомные эффекты для курсора
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    }
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
}); 