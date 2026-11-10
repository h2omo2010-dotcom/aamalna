// شريط التنقل يأخذ حداً عند التمرير
const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

// تبديل الوضع الفاتح/الداكن، ويُحفظ اختيار الزائر
const root = document.documentElement;
document.getElementById('theme').addEventListener('click', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// تصفية الأعمال
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => { c.classList.toggle('is-on', c === chip); c.setAttribute('aria-pressed', c === chip); });
  const f = chip.dataset.filter;
  cards.forEach(card => card.classList.toggle('hide', f !== 'all' && !card.dataset.cat.split(' ').includes(f)));
}));

// ظهور تدريجي عند التمرير
const els = document.querySelectorAll('.tile, .card, .svc, .sec-head, .contact');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  els.forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(el); });
}

document.getElementById('yr').textContent = new Date().getFullYear();
