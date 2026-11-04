const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

function mezclarTitulo(el) {
  const lineas = el.innerHTML.split('<br>');
  const signos = '#%&*+=?<>/[]01';
  let paso = 0;
  const total = 18;
  const intervalo = setInterval(() => {
    paso++;
    el.innerHTML = lineas.map(linea => [...linea].map((letra, i) => {
      const revelada = i < (paso / total) * linea.length;
      return revelada ? letra : signos[Math.floor(Math.random() * signos.length)];
    }).join('')).join('<br>');
    if (paso >= total) clearInterval(intervalo);
  }, 45);
}

function contar(el) {
  const meta = Number(el.dataset.contar);
  let actual = 0;
  const intervalo = setInterval(() => {
    actual++;
    el.textContent = String(actual).padStart(2, '0');
    if (actual >= meta) clearInterval(intervalo);
  }, 120);
}

function revelarAlBajar() {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visible');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.revelar').forEach(el => observador.observe(el));
}

function relojGuayaquil() {
  const reloj = document.getElementById('reloj');
  const formato = new Intl.DateTimeFormat('es-EC', { timeZone: 'America/Guayaquil', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const tic = () => { reloj.textContent = formato.format(new Date()); };
  tic();
  setInterval(tic, 1000);
}

relojGuayaquil();

if (sinMovimiento) {
  document.querySelectorAll('[data-contar]').forEach(el => { el.textContent = String(el.dataset.contar).padStart(2, '0'); });
} else {
  document.querySelectorAll('[data-mezclar]').forEach(mezclarTitulo);
  document.querySelectorAll('[data-contar]').forEach(contar);
  revelarAlBajar();
}
