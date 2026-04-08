// OrionX Interactive Logic
console.log("OrionX High-Contrast Minimalist Engine Loaded");

// Função para inicializar interatividade do Hero
function initHeroInteractivity() {
    const heroXImg = document.getElementById('hero-x-img');
    if (!heroXImg) return;

    let isDragging = false;
    let previousX = 0, previousY = 0;
    let rotX = 0, rotY = 0;

    heroXImg.addEventListener('dragstart', (e) => e.preventDefault());
    heroXImg.style.cursor = 'grab';

    heroXImg.addEventListener('mousemove', (e) => {
        if (!isDragging) {
            const rect = heroXImg.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const percentX = (e.clientX - centerX) / (rect.width / 2);
            const percentY = (e.clientY - centerY) / (rect.height / 2);
            heroXImg.style.transition = 'transform 0.1s ease-out';
            heroXImg.style.transform = `rotateX(${percentY * -20}deg) rotateY(${percentX * 20}deg)`;
        }
    });

    heroXImg.addEventListener('mouseleave', () => {
        if (!isDragging) {
            heroXImg.style.transition = 'transform 0.5s ease-out';
            heroXImg.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }
    });

    heroXImg.addEventListener('mousedown', (e) => {
        isDragging = true;
        heroXImg.style.transition = 'none';
        heroXImg.style.cursor = 'grabbing';
        previousX = e.clientX;
        previousY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousX;
            const deltaY = e.clientY - previousY;
            rotY += deltaX * 0.5;
            rotX -= deltaY * 0.5;
            heroXImg.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            previousX = e.clientX;
            previousY = e.clientY;
        }
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            heroXImg.style.cursor = 'grab';
            heroXImg.style.transition = 'transform 0.8s ease-out';
            rotX = 0; rotY = 0;
            heroXImg.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }
    });
}

// Inicializar após carregamento completo para não impactar LCP
window.addEventListener('load', () => {
    // Timeout pequeno para garantir que o navegador processou o paint inicial
    setTimeout(initHeroInteractivity, 100);
});
