const raiz = document.documentElement;
const botonTema = document.getElementById('tema');

function aplicarTema(tema) {
  raiz.dataset.tema = tema;
  botonTema.textContent = tema === 'light' ? '[ DARK ]' : '[ LIGHT ]';
}

function leerTemaGuardado() {
  try {
    return localStorage.getItem('tema');
  } catch (e) {
    return null;
  }
}

botonTema.addEventListener('click', () => {
  const nuevo = raiz.dataset.tema === 'light' ? 'dark' : 'light';
  aplicarTema(nuevo);
  try {
    localStorage.setItem('tema', nuevo);
  } catch (e) {
    // Sin almacenamiento (modo privado) el tema solo dura esta visita
  }
});

aplicarTema(leerTemaGuardado() || 'dark');
document.getElementById('anio').textContent = new Date().getFullYear();
