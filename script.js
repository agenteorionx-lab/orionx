// OrionX Interactive Logic
console.log("OrionX High-Contrast Minimalist Engine Loaded");

document.addEventListener('DOMContentLoaded', () => {
    // Hero X Interactive Parallax & Rotation
    const heroXImg = document.getElementById('hero-x-img');
    
    if (heroXImg) {
        let isDragging = false;
        let previousX = 0;
        let previousY = 0;
        let rotX = 0;
        let rotY = 0;

        // Impedir o arrasto padrão da imagem pelo navegador
        heroXImg.addEventListener('dragstart', (e) => e.preventDefault());
        heroXImg.style.cursor = 'grab';

        // 1. Efeito Hover (passar o mouse sem clicar)
        heroXImg.addEventListener('mousemove', (e) => {
            if (!isDragging) {
                // Descobrir as coordenadas relativas à própria imagem
                const rect = heroXImg.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Variar de -1 a 1 de acordo com o centro da imagem
                const percentX = (e.clientX - centerX) / (rect.width / 2);
                const percentY = (e.clientY - centerY) / (rect.height / 2);
                
                // Tilt sutil (ex. max 20 graus)
                const hoverRotX = percentY * -20;
                const hoverRotY = percentX * 20;

                heroXImg.style.transition = 'transform 0.1s ease-out';
                heroXImg.style.transform = `rotateX(${hoverRotX}deg) rotateY(${hoverRotY}deg)`;
            }
        });

        heroXImg.addEventListener('mouseleave', () => {
            if (!isDragging) {
                heroXImg.style.transition = 'transform 0.5s ease-out';
                heroXImg.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }
        });

        // 2. Efeito Drag (clicar e arrastar livremente 360 graus)
        heroXImg.addEventListener('mousedown', (e) => {
            isDragging = true;
            heroXImg.style.transition = 'none'; // Movimento instantâneo ao segurar
            heroXImg.style.cursor = 'grabbing';
            previousX = e.clientX;
            previousY = e.clientY;
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousX;
                const deltaY = e.clientY - previousY;
                
                // Somar os deltas infinitamente para girar 360+
                rotY += deltaX * 0.5; // Ajuste de sensibilidade Horizontal
                rotX -= deltaY * 0.5; // Ajuste de sensibilidade Vertical (invertido p/ tilt natural)
                
                heroXImg.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
                
                previousX = e.clientX;
                previousY = e.clientY;
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                heroXImg.style.cursor = 'grab';
                // Voltar a 0 suavemente
                heroXImg.style.transition = 'transform 0.8s ease-out';
                rotX = 0;
                rotY = 0;
                heroXImg.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }
        });
    }
});
