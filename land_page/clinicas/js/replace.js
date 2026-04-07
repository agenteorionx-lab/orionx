const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const modulosPath = path.join(__dirname, 'new_modulos.html');

let indexContent = fs.readFileSync(indexPath, 'utf-8');
const newModulosContent = fs.readFileSync(modulosPath, 'utf-8');

// 1. Add Swiper CSS in head if not exists
if (!indexContent.includes('swiper-bundle.min.css')) {
    indexContent = indexContent.replace(
        '<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">',
        '<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />'
    );
}

// 2. Add Swiper Pagination Style
if (!indexContent.includes('.swiper-pagination-bullet-active')) {
    indexContent = indexContent.replace(
        '.step-item:last-child .step-connect::after { display: none; }',
        '.step-item:last-child .step-connect::after { display: none; }\n        .swiper-pagination-bullet-active { background-color: #FF5700 !important; }'
    );
}

// 3. Replace Módulos Section
const startMarker = '<!-- 4. MÓDULOS (REDESENHADO: ROI MODE) -->';
const endMarker = '<!-- 5. JORNADA DE IMPLEMENTAÇÃO';
const startIndex = indexContent.indexOf(startMarker);
const endIndex = indexContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    indexContent = indexContent.substring(0, startIndex) + newModulosContent + '\n    ' + indexContent.substring(endIndex);
}

// 4. Add Swiper JS & Script at the end
if (!indexContent.includes('Swiper Configuration for Modulos')) {
    const scriptTag = `
    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
    <script>
        // Swiper Configuration for Modulos
        const categoriesData = [
            {
                badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-500/20',
                badgeText: 'Camada de Conversão (Inbound)',
                iconClass: 'text-emerald-500',
                iconName: 'forum',
                titlePart1: 'Agentes IA',
                titlePart2Class: 'text-emerald-500',
                titlePart2: 'WhatsApp',
                desc: 'Máxima Conversão de Leads em Agendamentos'
            },
            {
                badgeClass: 'bg-primary/10 text-primary border-primary/20 bg-opacity-50',
                badgeText: 'Camada de Retenção (Outbound)',
                iconClass: 'text-primary',
                iconName: 'record_voice_over',
                titlePart1: 'Agentes de',
                titlePart2Class: 'text-primary',
                titlePart2: 'Telefonia IA',
                desc: 'Confirmações e Recuperação de Agenda'
            },
            {
                badgeClass: 'bg-sky-100 text-sky-700 border-sky-500/20',
                badgeText: 'Central de Gestão Unificada',
                iconClass: 'text-sky-500',
                iconName: 'dashboard_customize',
                titlePart1: 'Hub',
                titlePart2Class: 'text-sky-500',
                titlePart2: 'Omnichannel',
                desc: 'Ecossistema de Alta Performance e Lucro'
            }
        ];

        let lastCatIndex = -1;

        const modulosSwiper = new Swiper('.modulosSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3, slidesPerGroup: 3 }
            },
            on: {
                init: function() { updateCategoryHeader(0); },
                slideChange: function () {
                    let catIndex = 0;
                    if(this.activeIndex >= 3 && this.activeIndex < 6) catIndex = 1;
                    if(this.activeIndex >= 6) catIndex = 2;
                    
                    if(catIndex !== lastCatIndex) {
                        updateCategoryHeader(catIndex);
                        lastCatIndex = catIndex;
                    }
                }
            }
        });

        function updateCategoryHeader(index) {
            const data = categoriesData[index];
            const headerEl = document.getElementById('dynamic-category-header');
            if(!headerEl) return;
            
            headerEl.style.opacity = 0;
            headerEl.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                headerEl.innerHTML = \`
                    <div class="flex flex-col md:flex-row items-center justify-center gap-4">
                        <span class="px-4 py-1.5 \${data.badgeClass} text-[11px] font-black rounded-full uppercase tracking-widest border shadow-sm transition-colors duration-500">\${data.badgeText}</span>
                        <h3 class="font-display font-black text-3xl md:text-4xl text-slate-800 uppercase tracking-tight italic flex items-center gap-3 transition-colors duration-500">
                            <span class="material-symbols-outlined text-4xl \${data.iconClass} hidden md:block">\${data.iconName}</span>
                            \${data.titlePart1} <span class="\${data.titlePart2Class}">\${data.titlePart2}</span>
                        </h3>
                    </div>
                    <p class="text-slate-500 font-accent text-xs md:text-sm uppercase tracking-[0.4em] font-bold mt-4 break-words text-center transition-colors duration-500">\${data.desc}</p>
                \`;
                headerEl.style.opacity = 1;
                headerEl.style.transform = 'translateY(0)';
            }, 300);
        }
    </script>
</body>`;
    indexContent = indexContent.replace('</body>', scriptTag);
}

fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('Update complete');
