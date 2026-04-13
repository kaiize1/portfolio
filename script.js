'use strict';

let lang = 'fr';

const langToggle = document.getElementById('langToggle');
const burger     = document.getElementById('burger');
const navLinks   = document.getElementById('navLinks');

// ── Language switch ────────────────────────────────────────
function setLang(newLang) {
    lang = newLang;
    langToggle.textContent = lang === 'fr' ? 'FR' : 'EN';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
}

langToggle.addEventListener('click', () => setLang(lang === 'fr' ? 'en' : 'fr'));

// ── Burger menu ────────────────────────────────────────────
burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    });
});

// ── Active nav link on scroll ──────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = navLinks.querySelectorAll('a');

function updateActive() {
    const y = window.scrollY + 80;
    let current = '';
    sections.forEach(s => { if (y >= s.offsetTop) current = s.id; });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

window.addEventListener('scroll', updateActive, { passive: true });
updateActive();
