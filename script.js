// JavaScript para a Landing Page do Livrendia

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const modal = document.getElementById('link-modal');
    const closeBtn = document.querySelector('.close');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    // Links temporários que mostrarão o modal
    const temporaryLinks = [
        'instagram-link',
        'linkedin-link'
    ];

    // Função para abrir o modal
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Adicionar event listeners para links temporários
    temporaryLinks.forEach(linkId => {
        const element = document.getElementById(linkId);
        if (element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        }
    });

    // Event listener para fechar o modal
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal clicando fora dele
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Menu mobile toggle
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Fechar menu mobile ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animação de fade-in para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.feature, .impact-highlight, .social-link');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(45, 74, 62, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Destacar link ativo no menu baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Função global para fechar modal (chamada pelo botão no HTML)
function closeModal() {
    const modal = document.getElementById('link-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Easter egg: Efeito de partículas de livros
function createBookParticles() {
    const bookEmojis = ['📚', '📖', '📘', '📙', '📗', '📕'];
    const container = document.body;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.left = '-50px';
            particle.style.fontSize = '2rem';
            particle.style.zIndex = '1000';
            particle.style.pointerEvents = 'none';
            particle.style.transition = 'all 3s ease-out';
            particle.textContent = bookEmojis[Math.floor(Math.random() * bookEmojis.length)];
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.style.left = window.innerWidth + 'px';
                particle.style.transform = 'rotate(360deg)';
                particle.style.opacity = '0';
            }, 100);
            
            setTimeout(() => {
                container.removeChild(particle);
            }, 3200);
        }, i * 600);
    }
}

// Ativar easter egg quando clicar 5 vezes no logo
let logoClickCount = 0;
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.addEventListener('click', function() {
            logoClickCount++;
            if (logoClickCount >= 5) {
                createBookParticles();
                logoClickCount = 0;
            }
        });
    }
});

console.log('🚀 Livrendia Landing Page carregada com sucesso!');
console.log('📚 Clique 5 vezes no logo para uma surpresa...');
