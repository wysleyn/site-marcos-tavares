document.addEventListener('DOMContentLoaded', () => {

    // 1. MENU MOBILE
    const btnMobile = document.getElementById('menu-mobile');
    const navLinks = document.getElementById('nav-links');

    btnMobile.addEventListener('click', () => {
        navLinks.classList.toggle('ativo');
        const icone = btnMobile.querySelector('i');
        if (navLinks.classList.contains('ativo')) {
            icone.classList.remove('fa-bars');
            icone.classList.add('fa-times');
        } else {
            icone.classList.remove('fa-times');
            icone.classList.add('fa-bars');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('ativo');
            btnMobile.querySelector('i').classList.remove('fa-times');
            btnMobile.querySelector('i').classList.add('fa-bars');
        });
    });

    // 2. HEADER E BOTÃO TOPO
    const header = document.getElementById('header');
    const btnTopo = document.getElementById('btn-topo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('rolado');
            btnTopo.classList.add('visivel');
        } else {
            header.classList.remove('rolado');
            btnTopo.classList.remove('visivel');
        }
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. MÁSCARA E FORMULÁRIO
    const form = document.getElementById('form-contato');
    const inputWhats = document.getElementById('whatsapp');
    const formSucesso = document.getElementById('form-sucesso');

    inputWhats.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);
        
        if (valor.length > 6) {
            valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
        } else if (valor.length > 2) {
            valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
        } else if (valor.length > 0) {
            valor = `(${valor}`;
        }
        e.target.value = valor;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const honeypot = document.getElementById('website').value;
        if (honeypot !== '') return;

        let valido = true;
        const campos = form.querySelectorAll('input[required], textarea[required]');

        campos.forEach(campo => {
            const errorMsg = campo.nextElementSibling;
            if (!campo.value.trim()) {
                campo.classList.add('erro');
                if (errorMsg) errorMsg.innerText = 'Ops, por favor preencha esse campo.';
                valido = false;
            } else {
                campo.classList.remove('erro');
                if (errorMsg) errorMsg.innerText = '';
            }
        });

        if (valido) {
            const btnSubmit = form.querySelector('button[type="submit"]');
            const textoOriginal = btnSubmit.innerHTML;
            btnSubmit.innerHTML = 'Enviando...';
            btnSubmit.disabled = true;

            setTimeout(() => {
                form.classList.add('oculto');
                formSucesso.classList.remove('oculto');
                formSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
                form.reset();
                btnSubmit.innerHTML = textoOriginal;
                btnSubmit.disabled = false;
            }, 1500);
        }
    });

    // 4. ANO RODAPÉ
    document.getElementById('ano-atual').innerText = new Date().getFullYear();

    // 5. ANIMAÇÃO DE ROLAGEM
    const elementosAnimar = document.querySelectorAll(
        '.hero-texto, .hero-imagem-wrapper, .atuacao-card, .escritorio-texto, .escritorio-imagem-wrapper, .passo-item, .plantao-texto, .faq-item, .contato-info, .contato-formulario'
    );

    elementosAnimar.forEach(el => el.classList.add('animar'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elementosAnimar.forEach(el => observer.observe(el));
});