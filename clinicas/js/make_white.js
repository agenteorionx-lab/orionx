const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Navbar
html = html.replace(
    'class="fixed top-0 w-full z-50 transition-all duration-300 bg-darker/90 backdrop-blur-md border-b border-white/10"',
    'class="fixed top-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"'
);
html = html.replace(
    '<nav class="hidden md:flex items-center gap-8 text-white">',
    '<nav class="hidden md:flex items-center gap-8 text-slate-800">'
);

// 2. Navbar JS
const oldJS = `        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('bg-white/95', 'shadow-xl', 'border-slate-200');
                navbar.classList.remove('bg-darker/90', 'border-white/10');
                navbar.querySelectorAll('a, span:not(.text-primary)').forEach(el => {
                    if (!el.classList.contains('bg-primary')) {
                        el.classList.add('text-slate-800');
                        el.classList.remove('text-white');
                    }
                });
            } else {
                navbar.classList.remove('bg-white/95', 'shadow-xl', 'border-slate-200');
                navbar.classList.add('bg-darker/90', 'border-white/10');
                navbar.querySelectorAll('a, span:not(.text-primary)').forEach(el => {
                    if (!el.classList.contains('bg-primary')) {
                        el.classList.remove('text-slate-800');
                        el.classList.add('text-white');
                    }
                });
            }
        });`;

const newJS = `        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('bg-white/95', 'shadow-md');
                navbar.classList.remove('bg-white/90');
            } else {
                navbar.classList.remove('bg-white/95', 'shadow-md');
                navbar.classList.add('bg-white/90');
            }
        });`;

html = html.replace(oldJS, newJS);

// 3. Hero Section Parent
html = html.replace(
    '<section class="bg-darker relative overflow-hidden min-h-screen flex flex-col justify-center text-white">',
    '<section class="bg-slate-50 relative overflow-hidden min-h-screen flex flex-col justify-center text-slate-900 border-b border-slate-200">'
);

// 4. Grid Background
html = html.replace(
    '<div class="absolute inset-0" style="background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px;"></div>',
    '<div class="absolute inset-0 tech-grid opacity-10"></div>'
);

// 5. Badge
html = html.replace(
    '<div class="inline-flex items-center gap-2 mb-8 border border-white/20 bg-white/5 py-1.5 px-4 rounded-full backdrop-blur">',
    '<div class="inline-flex items-center gap-2 mb-8 border border-primary/20 bg-primary/5 py-1.5 px-4 rounded-full backdrop-blur shadow-sm">'
);
html = html.replace(
    '<span class="font-mono text-[10px] text-white tracking-widest uppercase">TECNOLOGIA MULTIMODAL // PERFORMANCE EM SAÚDE 24/7</span>',
    '<span class="font-mono text-[10px] text-primary tracking-widest uppercase font-bold">TECNOLOGIA MULTIMODAL // PERFORMANCE EM SAÚDE 24/7</span>'
);

// 6. Title
html = html.replace(
    '<h1 class="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter leading-[1.1] mb-8 drop-shadow-2xl">',
    '<h1 class="font-display font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tighter leading-[1.1] mb-8">'
);

// 7. Subtitle
html = html.replace(
    '<p class="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">',
    '<p class="text-slate-600 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">'
);

// 8. Wait... The Mockups contain extensive replacements. Lets replace it entirely.
// Define exact old HTML of interactive mockups block starting at line 259 to 326
const startHeroCols = html.indexOf('<!-- Col 2: Interactive Mockups');
const endHeroCols = html.indexOf('<!-- Glow effect');

const newHeroCols = `<!-- Col 2: Interactive Mockups (SOPHISTICATED LIGHT) -->
            <div class="w-full lg:w-2/5 relative flex flex-col gap-6" data-aos="fade-left">
                
                <!-- Card 1: WhatsApp Agente -->
                <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 animate-float-slow group">
                    <div class="bg-slate-50 p-4 flex items-center justify-between border-b border-slate-100">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <span class="material-symbols-outlined text-sm">chat_bubble</span>
                            </div>
                            <div>
                                <h4 class="text-slate-800 text-xs font-bold leading-none mb-1">Agente IA — WhatsApp</h4>
                                <span class="text-emerald-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> online
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="flex flex-col gap-3">
                            <div class="bg-slate-100 border border-slate-200 rounded-xl rounded-tl-none p-3 max-w-[85%]">
                                <p class="text-slate-600 text-[11px] leading-relaxed italic border-slate-200">Bom dia! Bem-vindo à Clínica [X]. Precisa agendar um exame ou consulta?</p>
                                <span class="text-[8px] text-slate-400 mt-1 block text-right">09:01</span>
                            </div>
                            <div class="bg-indigo-50 border border-indigo-100 rounded-xl rounded-tr-none p-3 max-w-[85%] ml-auto shadow-sm">
                                <p class="text-indigo-700 text-[11px] leading-relaxed font-medium">Olá, preciso marcar uma ressonância para amanhã. Vocês têm horário?</p>
                                <span class="text-[8px] text-indigo-400 mt-1 block text-right">09:02</span>
                            </div>
                        </div>
                    </div>
                    <div class="px-6 py-3 bg-slate-50 flex gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100">
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">mic</span> ÁUDIO</span>
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">image</span> IMAGEM</span>
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">description</span> DOC</span>
                    </div>
                </div>

                <!-- Card 2: Telefonia Agente -->
                <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl shadow-slate-200/50 flex items-center justify-between animate-float translate-x-4 lg:translate-x-8">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <span class="material-symbols-outlined">call</span>
                        </div>
                        <div>
                            <h4 class="text-slate-800 text-xs font-bold leading-none mb-1">Agente IA — Telefonia</h4>
                            <span class="text-emerald-500 text-[9px] font-bold uppercase tracking-widest">Chamada ativa • 02:34</span>
                        </div>
                    </div>
                    <div class="flex gap-1.5 px-4">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce transition-all"></span>
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce transition-all delay-100"></span>
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/40 animate-bounce transition-all delay-200"></span>
                    </div>
                </div>

                <!-- Card 3: Central Omnichannel -->
                <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl shadow-slate-200/50 flex items-center gap-4 animate-float-fast -translate-x-2 lg:-translate-x-4">
                    <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <span class="material-symbols-outlined text-sm">headset_mic</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-slate-800 text-xs font-bold mb-2">Central Omnichannel</h4>
                        <div class="flex gap-2">
                            <span class="bg-indigo-50 text-indigo-700 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-indigo-200 tracking-tighter">12 conversas</span>
                            <span class="bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-emerald-200 tracking-tighter">5 canais</span>
                        </div>
                    </div>
                </div>

                `;

if (startHeroCols !== -1 && endHeroCols !== -1) {
    html = html.substring(0, startHeroCols) + newHeroCols + html.substring(endHeroCols);
}

fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Update hero complete');
