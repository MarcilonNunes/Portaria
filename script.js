/* Portfólio — script principal */

(function () {
    'use strict';

    // Ano no footer
    var elAno = document.getElementById('ano');
    if (elAno) elAno.textContent = new Date().getFullYear();

    // Menu mobile
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.toggle('ativo');
            toggle.setAttribute('aria-label', menu.classList.contains('ativo') ? 'Fechar menu' : 'Abrir menu');
        });
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { menu.classList.remove('ativo'); });
        });
    }

    // Scroll spy — destaque do link ativo
    var navLinks = document.querySelectorAll('.nav-link');
    var ids = ['inicio', 'sobre', 'habilidades', 'projetos', 'contato'];

    function atualizarAtivo() {
        var y = window.scrollY + 100;
        var atual = 'inicio';
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el && el.offsetTop <= y) atual = id;
        });
        navLinks.forEach(function (link) {
            link.classList.toggle('ativo', link.getAttribute('href') === '#' + atual);
        });
    }
    window.addEventListener('scroll', atualizarAtivo);
    window.addEventListener('load', atualizarAtivo);

    // Botão voltar ao topo
    var backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        function mostrarBotao() {
            backToTop.classList.toggle('visivel', window.scrollY > 400);
        }
        window.addEventListener('scroll', mostrarBotao);
        window.addEventListener('load', mostrarBotao);
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Observer para seções (mantém compatibilidade com classe .visivel)
    var secoes = document.querySelectorAll('.section-anim');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add('visivel');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    secoes.forEach(function (s) { observer.observe(s); });
})();
